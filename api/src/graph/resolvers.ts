import { withFilter } from "graphql-subscriptions";

import { GraphContext } from "./server";

enum Events {
  MessageCreated = "MessageCreated",
}

export const resolvers = {
  Query: {
    currentUser: (_: any, __: any, ctx: GraphContext) => {
      return ctx.prisma.user.findUnique({
        where: {
          id: ctx.currentUser.id,
        },
      });
    },
    allUserProfiles: async (_: any, __: any, ctx: GraphContext) => {
      const profiles = await ctx.prisma.user.findMany({
        select: {
          id: true,
          name: true,
          avatarUrl: true,
          company: true,
          title: true,
        },
      });

      return profiles.filter((profile: any) => profile.id !== ctx.currentUser.id);
    },
    conversations: (_: any, __: any, ctx: GraphContext) => {
      return ctx.prisma.conversation.findMany({
        where: {
          OR: [
            {
              user1Id: ctx.currentUser.id,
            },
            {
              user2Id: ctx.currentUser.id,
            },
          ],
        },
        orderBy: {
          updatedAt: "desc",
        },
      });
    },
    messages: (
      _: any,
      { conversationId }: { conversationId: string },
      ctx: GraphContext
    ) => {
      return ctx.prisma.message.findMany({
        where: {
          conversationId,
        },
        orderBy: {
          createdAt: "asc",
        },
      });
    },
  },
  Mutation: {
    startConversation: async (
      _: any,
      { otherUserId }: { otherUserId: string },
      ctx: GraphContext
    ) => {
      try {
        return await ctx.prisma.conversation.create({
          data: {
            user1Id: ctx.currentUser.id,
            user2Id: otherUserId,
          },
        });
      } catch (err: any) {
        // If the conversation already exists, return it
        // Prisma Client error code: P2002
        // See https://www.prisma.io/docs/reference/api-reference/error-reference#p2002
        if (err?.code === "P2002") {
          return ctx.prisma.conversation.findFirst({
            where: {
              user1Id: ctx.currentUser.id,
              user2Id: otherUserId,
            },
          });
        }

        console.error(err);
        throw new Error("Unable to start conversation");
      }
    },
    sendMessage: async (
      _: any,
      { content, conversationId }: { content: string; conversationId: string },
      ctx: GraphContext
    ) => {
      const conv = await ctx.prisma.conversation.findUnique({
        where: {
          id: conversationId,
        },
      });

      if (!conv) {
        throw new Error("Conversation not found");
      }

      if (
        conv.user1Id !== ctx.currentUser.id &&
        conv.user2Id !== ctx.currentUser.id
      ) {
        throw new Error("Not authorized");
      }

      const sender = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.currentUser.id,
        },
      });

      const [updatedConv, message] = await ctx.prisma.$transaction([
        ctx.prisma.conversation.update({
          where: {
            id: conversationId,
          },
          data: {
            updatedAt: new Date(),
            user1UnreadCount: {
              increment: conv.user1Id === ctx.currentUser.id ? 0 : 1,
            },
            user2UnreadCount: {
              increment: conv.user2Id === ctx.currentUser.id ? 0 : 1,
            },
          },
        }),
        ctx.prisma.message.create({
          data: {
            content,
            conversationId,
            senderId: ctx.currentUser.id,
          },
        }),
      ]);

      ctx.pubsub.publish(Events.MessageCreated, {
        messageCreated: {
          ...message,
          sender,
          conversation: updatedConv,
        },
      });

      return message;
    },
  },
  Subscription: {
    messageCreated: {
      subscribe: withFilter(
        (_: any, __: any, ctx: GraphContext) =>
          ctx.pubsub.asyncIterator(Events.MessageCreated),
        (payload, variables, wsCtx) => {
          const senderId = payload.messageCreated.senderId;
          const user1Id = payload.messageCreated.conversation.user1Id;
          const user2Id = payload.messageCreated.conversation.user2Id;

          return (
            senderId !== wsCtx.currentUser.id &&
            (user1Id === wsCtx.currentUser.id ||
              user2Id === wsCtx.currentUser.id)
          );
        }
      ),
    },
  },
  User: {
    totalUnreadMessagesCnt: async (
      parent: any,
      _: any,
      { prisma }: GraphContext
    ) => {
      const v1 = await prisma.conversation.aggregate({
        _sum: {
          user1UnreadCount: true,
        },
        where: {
          user1Id: parent.id,
        },
      });
      const v2 = await prisma.conversation.aggregate({
        _sum: {
          user2UnreadCount: true,
        },
        where: {
          user2Id: parent.id,
        },
      });

      return (
        (v1._sum?.user1UnreadCount || 0) + (v2._sum?.user2UnreadCount || 0)
      );
    },
  },
  Conversation: {
    unreadCount: (parent: any, _: any, ctx: GraphContext) => {
      return ctx.currentUser.id === parent.user1Id
        ? parent.user1UnreadCount
        : parent.user2UnreadCount;
    },
    otherUser: (parent: any, _: any, ctx: GraphContext) => {
      return ctx.prisma.user.findUnique({
        where: {
          id:
            ctx.currentUser.id === parent.user1Id
              ? parent.user2Id
              : parent.user1Id,
        },
        select: {
          id: true,
          name: true,
          avatarUrl: true,
        },
      });
    },
    lastMessage: (parent: any, _: any, ctx: GraphContext) => {
      return ctx.prisma.message.findFirst({
        where: {
          conversationId: parent.id,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    },
  },
  Message: {
    sender: (parent: any, _: any, { prisma }: GraphContext) => {
      return prisma.user.findUnique({
        where: {
          id: parent.senderId,
        },
      });
    },
    conversation: (parent: any, _: any, { prisma }: GraphContext) => {
      return prisma.conversation.findUnique({
        where: {
          id: parent.conversationId,
        },
      });
    },
  },
};
