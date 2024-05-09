import Auth from './Auth';
import { State } from './types';
// PUBLIC API
export function ForgotPasswordForm({ appearance, logo, socialLayout, }) {
    return (<Auth appearance={appearance} logo={logo} socialLayout={socialLayout} state={State.ForgotPassword}/>);
}
//# sourceMappingURL=ForgotPassword.jsx.map