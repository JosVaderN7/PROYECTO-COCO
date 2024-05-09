import { createJWT, TimeSpan } from 'wasp/auth/jwt';
import { emailSender } from 'wasp/server/email';
import { createProviderId, updateAuthIdentityProviderData, findAuthIdentity, deserializeAndSanitizeProviderData, } from 'wasp/auth/utils';
import { config as waspServerConfig } from 'wasp/server';
// PUBLIC API
export async function createEmailVerificationLink(email, clientRoute) {
    const { jwtToken } = await createEmailJWT(email);
    return `${waspServerConfig.frontendUrl}${clientRoute}?token=${jwtToken}`;
}
// PUBLIC API
export async function createPasswordResetLink(email, clientRoute) {
    const { jwtToken } = await createEmailJWT(email);
    return `${waspServerConfig.frontendUrl}${clientRoute}?token=${jwtToken}`;
}
async function createEmailJWT(email) {
    const jwtToken = await createJWT({ email }, { expiresIn: new TimeSpan(30, "m") });
    return { jwtToken };
}
// PUBLIC API
export async function sendPasswordResetEmail(email, content) {
    return sendEmailAndSaveMetadata(email, content, {
        passwordResetSentAt: (new Date()).toISOString(),
    });
}
// PUBLIC API
export async function sendEmailVerificationEmail(email, content) {
    return sendEmailAndSaveMetadata(email, content, {
        emailVerificationSentAt: (new Date()).toISOString(),
    });
}
async function sendEmailAndSaveMetadata(email, content, metadata) {
    // Save the metadata (e.g. timestamp) first, and then send the email
    // so the user can't send multiple requests while the email is being sent.
    const providerId = createProviderId("email", email);
    const authIdentity = await findAuthIdentity(providerId);
    const providerData = deserializeAndSanitizeProviderData(authIdentity.providerData);
    await updateAuthIdentityProviderData(providerId, providerData, metadata);
    emailSender.send(content).catch((e) => {
        console.error('Failed to send email', e);
    });
}
// PUBLIC API
export function isEmailResendAllowed(fields, field, resendInterval = 1000 * 60) {
    const sentAt = fields[field];
    if (!sentAt) {
        return {
            isResendAllowed: true,
            timeLeft: 0,
        };
    }
    const now = new Date();
    const diff = now.getTime() - new Date(sentAt).getTime();
    const isResendAllowed = diff > resendInterval;
    // Time left in seconds
    const timeLeft = isResendAllowed ? 0 : Math.round((resendInterval - diff) / 1000);
    return { isResendAllowed, timeLeft };
}
//# sourceMappingURL=utils.js.map