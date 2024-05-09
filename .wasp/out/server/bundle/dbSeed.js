import { prisma } from 'wasp/server';
import { faker } from '@faker-js/faker';

var TierIds = /* @__PURE__ */ ((TierIds2) => {
  TierIds2["HOBBY"] = "hobby-tier";
  TierIds2["PRO"] = "pro-tier";
  TierIds2["CREDITS"] = "credits";
  return TierIds2;
})(TierIds || {});

function createRandomUser() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const user = {
    email: faker.internet.email({
      firstName,
      lastName
    }),
    username: faker.internet.userName({
      firstName,
      lastName
    }),
    createdAt: faker.date.between({ from: /* @__PURE__ */ new Date("2023-01-01"), to: /* @__PURE__ */ new Date() }),
    lastActiveTimestamp: faker.date.recent(),
    isAdmin: false,
    stripeId: `cus_${faker.string.uuid()}`,
    sendEmail: false,
    subscriptionStatus: faker.helpers.arrayElement(["active", "canceled", "past_due", "deleted", null]),
    datePaid: faker.date.recent(),
    credits: faker.number.int({ min: 0, max: 3 }),
    checkoutSessionId: null,
    subscriptionTier: faker.helpers.arrayElement([TierIds.HOBBY, TierIds.PRO])
  };
  return user;
}
const USERS = faker.helpers.multiple(createRandomUser, {
  count: 50
});
async function devSeedUsers(prismaClient) {
  try {
    await Promise.all(
      USERS.map(async (user) => {
        await prismaClient.user.create({
          data: user
        });
      })
    );
  } catch (error) {
    console.error(error);
  }
}

const seeds = {
  devSeedUsers
};
async function main() {
  const nameOfSeedToRun = process.env.WASP_DB_SEED_NAME;
  if (nameOfSeedToRun) {
    console.log(`Running seed: ${nameOfSeedToRun}`);
  } else {
    console.error("Name of the seed to run not specified!");
  }
  await seeds[nameOfSeedToRun](prisma);
}
main().then(async () => {
  await prisma.$disconnect();
}).catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
//# sourceMappingURL=dbSeed.js.map
