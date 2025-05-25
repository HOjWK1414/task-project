<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <form @submit.prevent="handleLogin" class="bg-white p-6 rounded shadow-md w-full max-w-sm space-y-4">
            <h2 class="text-xl font-bold">{{ PageModel.form_header }}</h2>
            <p>{{ PageModel.form_description }}</p>

            <Input v-model="email" type="email" :placeholder="PageModel.form_email_placeholder" required />
            <Input v-model="password" type="password" :placeholder="PageModel.form_psw_placeholder" required />

            <Button type="submit" class="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
                {{ PageModel.form_submit }}
            </Button>

            <p class="text-sm text-muted-foreground" v-html="PageModel.form_notice"></p>

        </form>
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
