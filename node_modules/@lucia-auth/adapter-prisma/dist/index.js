export class PrismaAdapter {
    sessionModel;
    userModel;
    constructor(sessionModel, userModel) {
        this.sessionModel = sessionModel;
        this.userModel = userModel;
    }
    async deleteSession(sessionId) {
        try {
            await this.sessionModel.delete({
                where: {
                    id: sessionId
                }
            });
        }
        catch {
            // ignore if session id is invalid
        }
    }
    async deleteUserSessions(userId) {
        await this.sessionModel.deleteMany({
            where: {
                userId
            }
        });
    }
    async getSessionAndUser(sessionId) {
        const userModelKey = this.userModel.name[0].toLowerCase() + this.userModel.name.slice(1);
        const result = await this.sessionModel.findUnique({
            where: {
                id: sessionId
            },
            include: {
                [userModelKey]: true
            }
        });
        if (!result)
            return [null, null];
        const userResult = result[userModelKey];
        delete result[userModelKey];
        return [transformIntoDatabaseSession(result), transformIntoDatabaseUser(userResult)];
    }
    async getUserSessions(userId) {
        const result = await this.sessionModel.findMany({
            where: {
                userId
            }
        });
        return result.map(transformIntoDatabaseSession);
    }
    async setSession(value) {
        await this.sessionModel.create({
            data: {
                id: value.id,
                userId: value.userId,
                expiresAt: value.expiresAt,
                ...value.attributes
            }
        });
    }
    async updateSessionExpiration(sessionId, expiresAt) {
        await this.sessionModel.update({
            where: {
                id: sessionId
            },
            data: {
                expiresAt
            }
        });
    }
    async deleteExpiredSessions() {
        await this.sessionModel.deleteMany({
            where: {
                expiresAt: {
                    lte: new Date()
                }
            }
        });
    }
}
function transformIntoDatabaseSession(raw) {
    const { id, userId, expiresAt, ...attributes } = raw;
    return {
        id,
        userId,
        expiresAt,
        attributes
    };
}
function transformIntoDatabaseUser(raw) {
    const { id, ...attributes } = raw;
    return {
        id,
        attributes
    };
}
