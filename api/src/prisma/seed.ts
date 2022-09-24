import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      email: "alice@prisma.io",
      name: "Alice",
      avatarUrl: "https://bit.ly/2Z4KKcF",
      company: "Prisma",
      title: "ADMIN",
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: "bob@prisma.io" },
    update: {},
    create: {
      email: "bob@prisma.io",
      name: "Bob",
      avatarUrl: "https://bit.ly/2Z4KKcF",
      company: "Prisma",
      title: "ADMIN",
    },
  });

  console.log({ alice, bob });

  const conversation = await prisma.conversation.create({
    data: {
      user1Id: alice.id,
      user2Id: bob.id,
    },
  });

  console.log({ conversation });

  const message = await prisma.message.create({
    data: {
      conversationId: conversation.id,
      senderId: alice.id,
      content: "Hello World",
    },
  });

  console.log({ message });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
