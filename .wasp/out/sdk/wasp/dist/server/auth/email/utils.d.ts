import { Email } from 'wasp/server/email/core/types';
export declare function createEmailVerificationLink(email: string, clientRoute: string): Promise<string>;
export declare function createPasswordResetLink(email: string, clientRoute: string): Promise<string>;
export declare function sendPasswordResetEmail(email: string, content: Email): Promise<void>;
export declare function sendEmailVerificationEmail(email: string, content: Email): Promise<void>;
export declare function isEmailResendAllowed<Field extends 'emailVerificationSentAt' | 'passwordResetSentAt'>(fields: {
    [field in Field]: string | null;
}, field: Field, resendInterval?: number): {
    isResendAllowed: boolean;
    timeLeft: number;
};
