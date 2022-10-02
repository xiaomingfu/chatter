import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createUsers(cnt: number) {
  return await Promise.all(
    Array.from({ length: cnt })
      .map(() => ({
        name: faker.name.fullName(),
        email: faker.internet.email(),
        avatarUrl: faker.image.avatar(),
        company: faker.company.name(),
        title: faker.name.jobTitle(),
      }))
      .map((user) => prisma.user.create({ data: user }))
  );
}

const usedPairs = new Set<string>();
async function createConv(u1: string, u2: string) {
  const pair = [u1, u2].sort().join("-");

  if (usedPairs.has(pair)) {
    return null;
  }

  usedPairs.add(pair);

  const conv = await prisma.conversation.create({
    data: {
      user1Id: u1,
      user2Id: u2,
    },
  });

  return conv;
}

async function main() {
  const users = await createUsers(20);
  const currentUserId = users[6].id;
  console.log(currentUserId);

  const conversations = await Promise.all(
    Array.from({ length: 10 })
      .map(() => {
        const user2 = randomArrayItem(users);
        return createConv(currentUserId, user2.id);
      })
      .filter(Boolean)
  );

  const messagePromises = Array.from({ length: 100 }).map(() => {
    const conversation = randomArrayItem(conversations);
    if (conversation != null) {
      const senderId = randomArrayItem([
        conversation.user1Id,
        conversation.user2Id,
      ]);
      const content = faker.lorem.paragraph(1);
      return prisma.message.create({
        data: {
          content,
          conversationId: conversation.id,
          senderId,
          createdAt: faker.date.past(),
        },
      });
    }
  });

  const moreConvs = await Promise.all(
    Array.from({ length: 100 })
      .map(() => {
        const user1 = randomArrayItem(users);
        const user2 = randomArrayItem(users);
        return createConv(user1.id, user2.id);
      })
      .filter(Boolean)
  );

  Array.from({ length: 1000 }).forEach(() => {
    const conversation = randomArrayItem(moreConvs);
    if (conversation != null) {

      const senderId = randomArrayItem([
        conversation.user1Id,
        conversation.user2Id,
      ]);
      const content = faker.lorem.paragraph();
      messagePromises.push(
        prisma.message.create({
          data: {
            content,
            conversationId: conversation.id,
            senderId,
          },
        })
      );
    }
  });

  await Promise.all(messagePromises);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    return 1;
  });

function randomRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomArrayItem<T>(array: T[]) {
  return array[randomRange(0, array.length)];
}
