import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const users = await Promise.all(
    Array.from({ length: 100 })
      .map(() => ({
        name: faker.name.fullName(),
        email: faker.internet.email(),
        avatarUrl: faker.image.avatar(),
        company: faker.company.name(),
        title: faker.name.jobTitle(),
      }))
      .map((user) => prisma.user.create({ data: user }))
  );

  const currentUserId = users[6].id;
  console.log(currentUserId);

  const usedPairs = new Set<string>();

  const conversations = await Promise.all(
    Array.from({ length: 10 })
      .map(() => {
        const user2 = randomArrayItem(users);

        const pair = [currentUserId, user2.id].sort().join("-");

        if (usedPairs.has(pair)) {
          return null;
        }

        usedPairs.add(pair);

        return prisma.conversation.create({
          data: {
            user1Id: currentUserId,
            user2Id: user2.id,
          },
        });
      })
      .filter(Boolean)
  );

  const messagePromises = Array.from({ length: 50 }).map(() => {
    const conversation = randomArrayItem(conversations);
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
  });

  const moreConvs = await Promise.all(
    Array.from({ length: 100 })
      .map(() => {
        const user1 = randomArrayItem(users);
        const user2 = randomArrayItem(users);

        const pair = [user1.id, user2.id].sort().join("-");

        if (usedPairs.has(pair)) {
          return null;
        }

        usedPairs.add(pair);

        return prisma.conversation.create({
          data: {
            user1Id: user1.id,
            user2Id: user2.id,
          },
        });
      })
      .filter(Boolean)
  );

  Array.from({ length: 200 }).forEach(() => {
    const conversation = randomArrayItem(moreConvs);
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
    process.exit(1);
  });

function randomRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomArrayItem<T>(array: T[]) {
  return array[randomRange(0, array.length)];
}
