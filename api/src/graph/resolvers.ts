import { User } from "@prisma/client";
import { Context } from "./server";

export const resolvers = {
  Query: {
    user: (_: any, { id }: { id: string }, context: Context) => {
      return context.prisma.user.findUnique({
        where: {
          id,
        },
      });
    },
  },

  Mutation: {
    createPrivateChannel: (
      _: any,
      { toUserId }: { toUserId: string },
      context: Context
    ) => {
      return context.prisma.privateChannel.create({
        data: {
          fromUserId: context.currentUser.id,
          toUserId,
        },
      });
    },
    acceptPrivateChannel: async (
      _: any,
      { privateChannelId }: { privateChannelId: string },
      context: Context
    ) => {
      const channel = await context.prisma.privateChannel.findUnique({
        where: {
          id: privateChannelId,
        },
      });

      if (!channel) {
        throw new Error("Channel not found");
      }

      if (channel.toUserId !== context.currentUser.id) {
        throw new Error("Not authorized");
      }

      return await context.prisma.privateChannel.update({
        where: {
          id: privateChannelId,
        },
        data: {
          isAccepted: true,
        },
      });
    },
    createMessage: async (
      _: any,
      {
        content,
        privateChannelId,
      }: { content: string; privateChannelId: string },
      context: Context
    ) => {
      const channel = await context.prisma.privateChannel.findUnique({
        where: {
          id: privateChannelId,
        },
      });

      if (!channel) {
        throw new Error("Channel not found");
      }

      if (
        channel.fromUserId !== context.currentUser.id &&
        channel.toUserId !== context.currentUser.id
      ) {
        throw new Error("Not authorized");
      }

      if (!channel.isAccepted) {
        throw new Error("Channel not accepted yet");
      }

      return await context.prisma.message.create({
        data: {
          content,
          privateChannelId,
          creatorUserId: context.currentUser.id,
        },
      });
    },
  },
  User: {
    privateChannels: (parent: User, _: any, { prisma }: Context) => {
      return prisma.privateChannel.findMany({
        where: {
          OR: [
            {
              fromUserId: parent.id,
            },
            {
              toUserId: parent.id,
            },
          ],
        },
      });
    },
  },
  PrivateChannel: {
    fromUser: (parent: any, _: any, { prisma }: Context) => {
      return prisma.user.findUnique({
        where: {
          id: parent.fromUserId,
        },
      });
    },
    toUser: (parent: any, _: any, { prisma }: Context) => {
      return prisma.user.findUnique({
        where: {
          id: parent.toUserId,
        },
      });
    },
    messages: (parent: any, _: any, { prisma }: Context) => {
      return prisma.message.findMany({
        where: {
          privateChannelId: parent.id,
        },
      });
    },
  },
  Message: {
    creator: (parent: any, _: any, { prisma }: Context) => {
      return prisma.user.findUnique({
        where: {
          id: parent.creatorUserId,
        },
      });
    },
    privateChannel: (parent: any, _: any, { prisma }: Context) => {
      return prisma.privateChannel.findUnique({
        where: {
          id: parent.privateChannelId,
        },
      });
    },
  },
};
