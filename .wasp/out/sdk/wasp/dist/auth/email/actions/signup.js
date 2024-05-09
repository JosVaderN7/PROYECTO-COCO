import { api, handleApiError } from 'wasp/client/api';
// PUBLIC API
export async function signup(data) {
    try {
        const response = await api.post('/auth/email/signup', data);
        return response.data;
    }
    catch (e) {
        handleApiError(e);
    }
}
//# sourceMappingURL=signup.js.map