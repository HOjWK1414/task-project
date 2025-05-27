<template>
    <div class="flex items-center justify-center min-h-screen w-full">

        <div class="container px-8">
            <div class="flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">

                <div class="flex bg-muted items-center justify-center rounded-2xl p-4">
                    <div class="bg-muted hidden h-full flex-col p-10 text-white lg:flex dark:border-r rounded-2xl">
                        <img src="https://demo.dms.keysmash.eu/reporting.png" />
                    </div>
                </div>


                <div class="min-h-screen flex items-center justify-center">
                    <form @submit.prevent="handleLogin" class="bg-white p-6 rounded w-full max-w-sm space-y-4">
                        <div class="flex flex-col items-center space-y-2 text-center">
                            <h2 class="text-2xl font-semibold tracking-tight">{{ PageModel.form_header }}</h2>
                            <p class="text-muted-foreground text-sm">{{ PageModel.form_description }}</p>
                        </div>

                        <Input
                            class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            v-model="email" type="email" :placeholder="PageModel.form_email_placeholder" required />
                        <Input
                            class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            v-model="password" type="password" :placeholder="PageModel.form_psw_placeholder" required />

                        <Button type="submit"
                            class="w-full ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                            {{ PageModel.form_submit }}
                        </Button>

                        <p class="text-muted-foreground px-8 text-center text-sm" v-html="PageModel.form_notice"></p>

                    </form>
                </div>
            </div>
        </div>
    </div>
</template>



<script setup lang="ts">
import { loginPageModel, type LoginPageModel } from '~/models/pages/loginPageModel'
const PageModel: LoginPageModel = loginPageModel

import { useAuth } from '~/stores/auth'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'

const router = useRouter()
const email = ref('')
const password = ref('')

const handleLogin = async () => {
    const success = await useAuth(email.value, password.value)
    if (success) {
        router.push('/dashboard')
    }
}
</script>
