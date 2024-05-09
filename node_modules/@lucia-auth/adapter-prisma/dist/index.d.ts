import type { Adapter, DatabaseSession, DatabaseUser, UserId } from "lucia";
export declare class PrismaAdapter<_PrismaClient extends PrismaClient> implements Adapter {
    private sessionModel;
    private userModel;
    constructor(sessionModel: BasicPrismaModel, userModel: BasicPrismaModel);
    deleteSession(sessionId: string): Promise<void>;
    deleteUserSessions(userId: UserId): Promise<void>;
    getSessionAndUser(sessionId: string): Promise<[session: DatabaseSession | null, user: DatabaseUser | null]>;
    getUserSessions(userId: UserId): Promise<DatabaseSession[]>;
    setSession(value: DatabaseSession): Promise<void>;
    updateSessionExpiration(sessionId: string, expiresAt: Date): Promise<void>;
    deleteExpiredSessions(): Promise<void>;
}
interface PrismaClient {
    [K: string]: any;
    $connect: any;
    $transaction: any;
}
interface BasicPrismaModel {
    fields: any;
    findUnique: any;
    findMany: any;
}
export {};
