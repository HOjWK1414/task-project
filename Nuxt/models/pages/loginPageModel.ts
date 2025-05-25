export interface LoginPageModel {
    form_header: string
    form_submit: string
    form_description: string
    form_notice: string
    form_email_placeholder: string
    form_psw_placeholder: string
    data: any | null
}

export const loginPageModel: LoginPageModel = {
    form_header: 'Sign in',
    form_submit: 'Sign In with Email',
    form_description: 'Enter your email below',
    form_notice: 'By clicking continue, you agree to our <a href="/terms" class="hover:text-primary underline underline-offset-4">Terms of Service</a> and <a href="/privacy" class="hover:text-primary underline underline-offset-4">Privacy Policy</a> .',
    form_email_placeholder: 'name@example.com',
    form_psw_placeholder: '************',
    data: null,
}