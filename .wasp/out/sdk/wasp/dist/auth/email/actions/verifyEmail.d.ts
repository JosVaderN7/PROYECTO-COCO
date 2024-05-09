export declare function verifyEmail(data: {
    token: string;
}): Promise<{
    success: boolean;
    reason?: string;
}>;
