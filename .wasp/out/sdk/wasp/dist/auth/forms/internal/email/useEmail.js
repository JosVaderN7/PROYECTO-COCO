import { signup } from '../../../email/actions/signup';
import { login } from '../../../email/actions/login';
// PRIVATE API
export function useEmail({ onError, showEmailVerificationPending, onLoginSuccess, isLogin, }) {
    async function handleSubmit(data) {
        try {
            if (isLogin) {
                await login(data);
                onLoginSuccess();
            }
            else {
                await signup(data);
                showEmailVerificationPending();
            }
        }
        catch (err) {
            onError(err);
        }
    }
    return {
        handleSubmit,
    };
}
//# sourceMappingURL=useEmail.js.map