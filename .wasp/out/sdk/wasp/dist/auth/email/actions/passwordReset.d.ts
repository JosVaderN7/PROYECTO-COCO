export declare function requestPasswordReset(data: {
    email: string;
}): Promise<{
    success: boolean;
}>;
export declare function resetPassword(data: {
    token: string;
    password: string;
}): Promise<{
    success: boolean;
}>;
