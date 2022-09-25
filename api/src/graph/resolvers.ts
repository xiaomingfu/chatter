import { User } from "@prisma/client";

import { Context } from "./server";

export const resolvers = {
  Query: {
    currentUser: (_: any, __: any, ctx: Context) => {
      return ctx.prisma.user.findUnique({
        where: {
          id: ctx.currentUser.id,
        },
      });
    },
    userProfile: async (
      _: any,
      { userId }: { userId: string },
      ctx: Context
    ) => {
      const profile = await ctx.prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          id: true,
          name: true,
          avatarUrl: true,
          company: true,
          title: true,
        },
      });

      return profile;
    },
    allUserProfiles: async (_: any, __: any, ctx: Context) => {
      const profiles = await ctx.prisma.user.findMany({
        select: {
          id: true,
          name: true,
          avatarUrl: true,
          company: true,
          title: true,
        },
      });

      return profiles.filter((profile) => profile.id !== ctx.currentUser.id);
    },
    conversations: (_: any, __: any, ctx: Context) => {
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
    conversation: (_: any, { id }: { id: string }, ctx: Context) => {
      return ctx.prisma.conversation.findUnique({
        where: {
          id,
        },
      });
    },
    messages: (
      _: any,
      { conversationId }: { conversationId: string },
      ctx: Context
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
      ctx: Context
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
      ctx: Context
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

      return await ctx.prisma.message.create({
        data: {
          content,
          conversationId,
          senderId: ctx.currentUser.id,
        },
      });
    },
  },
  User: {
    conversations: (parent: User, _: any, { prisma }: Context) => {
      return prisma.conversation.findMany({
        where: {
          OR: [
            {
              user1Id: parent.id,
            },
            {
              user2Id: parent.id,
            },
          ],
        },
      });
    },
  },
  Conversation: {
    unreadCount: (parent: any, _: any, ctx: Context) => {
      return ctx.currentUser.id === parent.user1Id
        ? parent.user1UnreadCount
        : parent.user2UnreadCount;
    },
    otherUser: (parent: any, _: any, ctx: Context) => {
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
    lastMessage: (parent: any, _: any, ctx: Context) => {
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
    sender: (parent: any, _: any, { prisma }: Context) => {
      return prisma.user.findUnique({
        where: {
          id: parent.senderId,
        },
      });
    },
    conversation: (parent: any, _: any, { prisma }: Context) => {
      return prisma.conversation.findUnique({
        where: {
          id: parent.conversationId,
        },
      });
    },
  },
};
