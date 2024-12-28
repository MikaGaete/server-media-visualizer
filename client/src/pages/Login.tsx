import {Formik} from "formik";
import {LoginErrors} from "../types/LoginTypes.tsx";
import {CustomInput} from "../templates/CustomInput.tsx";

export const Login = () => {
    // TODO connect with the login api when available
    // TODO saved necessary user data from the response on the store when available

    return (
        <div className={'bg-[#f1f1f1] w-screen min-h-screen flex flex-col justify-center items-center raleway-normal-400'}>
            <Formik
                initialValues={{ username: '', password: '' }}
                validate={values => {
                    const errors: LoginErrors = {};
                    const numbers = /^(?=.*\d).+$/;
                    const specialCharacters = /^(?=.*[!@#$%^&*(),.?":{}|<>]).+$/;

                    if (!values.username) errors.username = 'Username is required';
                    if (!values.password) errors.password = 'You must enter a password';
                    else if (values.password.length < 8) errors.password = 'Password must be at least 8 characters';
                    else if (values.password.length > 32) errors.password = 'Password must be at most 32 characters';
                    else if (!numbers.test(values.password)) errors.password = 'Password must contain at least one number';
                    else if (!specialCharacters.test(values.password)) errors.password = 'Password must contain at least one special character';

                    return errors;
                }}
                onSubmit={(values, {setSubmitting}) => {
                    setTimeout(() => {setSubmitting(false)}, 400);
                    console.log(values);
                    //handleSubmit(values)
                }}
            >
                {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting}) => (
                    <form className={'w-[30%] flex flex-col gap-16'} onSubmit={handleSubmit}>
                        <div className={'flex justify-start'}>
                            <h1 className={'text-6xl raleway-normal-800'}>Login</h1>
                        </div>
                        <div className={'flex flex-col gap-2'}>
                            <CustomInput type={'text'} name={'username'} value={values.username} label={'Username'}
                                         error={errors.username} touched={touched.username} handleChange={handleChange}
                                         handleBlur={handleBlur} placeholder={'John Doe'}
                            />
                            <CustomInput type={'text'} name={'password'} value={values.password} label={'Password'}
                                         error={errors.password} touched={touched.password} handleChange={handleChange}
                                         handleBlur={handleBlur} placeholder={'Sup3rS3cr3tP4ssw0ord!'}
                            />
                        </div>
                        <button type={'submit'} disabled={isSubmitting} className={'h-12 bg-[#181818] text-white raleway-normal-400 px-8 py-2 rounded-2xl'}>Login!</button>
                    </form>
                )}
            </Formik>
        </div>
    );
};