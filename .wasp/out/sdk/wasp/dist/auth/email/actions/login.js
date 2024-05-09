import { api, handleApiError } from 'wasp/client/api';
import { initSession } from '../../helpers/user';
// PUBLIC API
export async function login(data) {
    try {
        const response = await api.post('/auth/email/login', data);
        await initSession(response.data.sessionId);
    }
    catch (e) {
        handleApiError(e);
    }
}
//# sourceMappingURL=login.js.map