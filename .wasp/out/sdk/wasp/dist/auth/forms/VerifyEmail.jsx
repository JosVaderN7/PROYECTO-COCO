import Auth from './Auth';
import { State } from './types';
// PUBLIC API
export function VerifyEmailForm({ appearance, logo, socialLayout, }) {
    return (<Auth appearance={appearance} logo={logo} socialLayout={socialLayout} state={State.VerifyEmail}/>);
}
//# sourceMappingURL=VerifyEmail.jsx.map