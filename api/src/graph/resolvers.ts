import { User } from "@prisma/client";
import { Context } from "./server";

export const resolvers = {
  Query: {
    publicProfile: async (
      _: any,
      { userId }: { userId: string },
      ctx: Context
    ) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          id: true,
          name: true,
        },
      });

      return user;
    },
    user: (_: any, __: any, ctx: Context) => {
      return ctx.prisma.user.findUnique({
        where: {
          id: ctx.currentUser.id,
        },
      });
    },
  },
  Mutation: {
    createPrivateChannel: (
      _: any,
      { toUserId }: { toUserId: string },
      ctx: Context
    ) => {
      return ctx.prisma.privateChannel.create({
        data: {
          fromUserId: ctx.currentUser.id,
          toUserId,
        },
      });
    },
    acceptPrivateChannel: async (
      _: any,
      { privateChannelId }: { privateChannelId: string },
      ctx: Context
    ) => {
      const channel = await ctx.prisma.privateChannel.findUnique({
        where: {
          id: privateChannelId,
        },
      });

      if (!channel) {
        throw new Error("Channel not found");
      }

      if (channel.toUserId !== ctx.currentUser.id) {
        throw new Error("Not authorized");
      }

      return await ctx.prisma.privateChannel.update({
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
      ctx: Context
    ) => {
      const channel = await ctx.prisma.privateChannel.findUnique({
        where: {
          id: privateChannelId,
        },
      });

      if (!channel) {
        throw new Error("Channel not found");
      }

      if (
        channel.fromUserId !== ctx.currentUser.id &&
        channel.toUserId !== ctx.currentUser.id
      ) {
        throw new Error("Not authorized");
      }

      if (!channel.isAccepted) {
        throw new Error("Channel not accepted yet");
      }

      return await ctx.prisma.message.create({
        data: {
          content,
          privateChannelId,
          creatorUserId: ctx.currentUser.id,
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
