var _a;
import { defineUserSignupFields } from 'wasp/auth/providers/types';
const adminEmails = ((_a = process.env.ADMIN_EMAILS) === null || _a === void 0 ? void 0 : _a.split(',')) || [];
export const getEmailUserFields = defineUserSignupFields({
    username: (data) => data.email,
    isAdmin: (data) => adminEmails.includes(data.email),
    email: (data) => data.email,
});
export const getGitHubUserFields = defineUserSignupFields({
    // NOTE: if we don't want to access users' emails, we can use scope ["user:read"]
    // instead of ["user"] and access args.profile.username instead
    email: (data) => data.profile.emails[0].email,
    username: (data) => data.profile.login,
    isAdmin: (data) => adminEmails.includes(data.profile.emails[0].email),
});
export function getGitHubAuthConfig() {
    return {
        scopes: ['user'],
    };
}
export const getGoogleUserFields = defineUserSignupFields({
    email: (data) => data.profile.email,
    username: (data) => data.profile.name,
    isAdmin: (data) => adminEmails.includes(data.profile.email),
});
export function getGoogleAuthConfig() {
    return {
        scopes: ['profile', 'email'], // must include at least 'profile' for Google
    };
}
//# sourceMappingURL=setUsername.js.map