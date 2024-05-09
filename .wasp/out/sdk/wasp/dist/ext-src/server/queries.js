import { HttpError } from 'wasp/server';
import { getDownloadFileSignedURLFromS3 } from './file-upload/s3Utils.js';
export const getGptResponses = async (args, context) => {
    if (!context.user) {
        throw new HttpError(401);
    }
    return context.entities.GptResponse.findMany({
        where: {
            user: {
                id: context.user.id,
            },
        },
    });
};
export const getAllTasksByUser = async (_args, context) => {
    if (!context.user) {
        throw new HttpError(401);
    }
    return context.entities.Task.findMany({
        where: {
            user: {
                id: context.user.id,
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
};
export const getAllFilesByUser = async (_args, context) => {
    if (!context.user) {
        throw new HttpError(401);
    }
    return context.entities.File.findMany({
        where: {
            user: {
                id: context.user.id,
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
};
export const getDownloadFileSignedURL = async ({ key }, _context) => {
    return await getDownloadFileSignedURLFromS3({ key });
};
export const getDailyStats = async (_args, context) => {
    var _a;
    if (!((_a = context.user) === null || _a === void 0 ? void 0 : _a.isAdmin)) {
        throw new HttpError(401);
    }
    const dailyStats = await context.entities.DailyStats.findFirstOrThrow({
        orderBy: {
            date: 'desc',
        },
        include: {
            sources: true,
        },
    });
    const weeklyStats = await context.entities.DailyStats.findMany({
        orderBy: {
            date: 'desc',
        },
        take: 7,
        include: {
            sources: true,
        },
    });
    return { dailyStats, weeklyStats };
};
export const getPaginatedUsers = async (args, context) => {
    var _a;
    if (!((_a = context.user) === null || _a === void 0 ? void 0 : _a.isAdmin)) {
        throw new HttpError(401);
    }
    const allSubscriptionStatusOptions = args.subscriptionStatus;
    const hasNotSubscribed = allSubscriptionStatusOptions === null || allSubscriptionStatusOptions === void 0 ? void 0 : allSubscriptionStatusOptions.find((status) => status === null);
    let subscriptionStatusStrings = allSubscriptionStatusOptions === null || allSubscriptionStatusOptions === void 0 ? void 0 : allSubscriptionStatusOptions.filter((status) => status !== null);
    const queryResults = await context.entities.User.findMany({
        skip: args.skip,
        take: 10,
        where: {
            AND: [
                {
                    email: {
                        contains: args.emailContains || undefined,
                        mode: 'insensitive',
                    },
                    isAdmin: args.isAdmin,
                },
                {
                    OR: [
                        {
                            subscriptionStatus: {
                                in: subscriptionStatusStrings,
                            },
                        },
                        {
                            subscriptionStatus: {
                                equals: hasNotSubscribed,
                            },
                        },
                    ],
                },
            ],
        },
        select: {
            id: true,
            email: true,
            username: true,
            isAdmin: true,
            lastActiveTimestamp: true,
            subscriptionStatus: true,
            stripeId: true,
        },
        orderBy: {
            id: 'desc',
        },
    });
    const totalUserCount = await context.entities.User.count({
        where: {
            AND: [
                {
                    email: {
                        contains: args.emailContains || undefined,
                        mode: 'insensitive',
                    },
                    isAdmin: args.isAdmin,
                },
                {
                    OR: [
                        {
                            subscriptionStatus: {
                                in: subscriptionStatusStrings,
                            },
                        },
                        {
                            subscriptionStatus: {
                                equals: hasNotSubscribed,
                            },
                        },
                    ],
                },
            ],
        },
    });
    const totalPages = Math.ceil(totalUserCount / 10);
    return {
        users: queryResults,
        totalPages,
    };
};
//# sourceMappingURL=queries.js.map