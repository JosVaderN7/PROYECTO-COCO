import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { requestPasswordReset } from '../../../email/actions/passwordReset.js';
import { Form, FormItemGroup, FormLabel, FormInput, SubmitButton, FormError } from '../Form';
import { AuthContext } from '../../Auth';
// PRIVATE API
export const ForgotPasswordForm = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { isLoading, setErrorMessage, setSuccessMessage, setIsLoading } = useContext(AuthContext);
    const onSubmit = async (data) => {
        var _a, _b;
        setIsLoading(true);
        setErrorMessage(null);
        setSuccessMessage(null);
        try {
            await requestPasswordReset(data);
            reset();
            setSuccessMessage('Check your email for a password reset link.');
        }
        catch (error) {
            setErrorMessage({
                title: error.message,
                description: (_b = (_a = error.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message,
            });
        }
        finally {
            setIsLoading(false);
        }
    };
    return (<>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormItemGroup>
          <FormLabel>E-mail</FormLabel>
          <FormInput {...register('email', {
        required: 'Email is required',
    })} type="email" disabled={isLoading}/>
          {errors.email && <FormError>{errors.email.message}</FormError>}
        </FormItemGroup>
        <FormItemGroup>
          <SubmitButton type="submit" disabled={isLoading}>
            Send password reset email
          </SubmitButton>
        </FormItemGroup>
      </Form>
    </>);
};
//# sourceMappingURL=ForgotPasswordForm.jsx.map