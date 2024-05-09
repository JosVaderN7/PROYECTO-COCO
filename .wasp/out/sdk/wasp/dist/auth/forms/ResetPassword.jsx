import Auth from './Auth';
import { State } from './types';
// PUBLIC API
export function ResetPasswordForm({ appearance, logo, socialLayout, }) {
    return (<Auth appearance={appearance} logo={logo} socialLayout={socialLayout} state={State.ResetPassword}/>);
}
//# sourceMappingURL=ResetPassword.jsx.map