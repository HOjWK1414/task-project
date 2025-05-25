import { defineStore } from 'pinia'
import type { UserDto } from '~/models/appDtos/units/userDto'
import type { LoginRequest } from '~/models/appDtos/units/authorization/requests/loginRequest'
import type { LoginResponse } from '~/models/appDtos/units/authorization/responses/loginResponse'

import type { RegisterRequest } from '~/models/appDtos/units/authorization/requests/registerRequest'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<UserDto | null>(null)
  const token = ref<string | null>(null)
  const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl as string

  const register = async (data: RegisterRequest) => {
    await $fetch('/api/auth/register', {
      baseURL: apiBaseUrl,
      method: 'POST',
      body: data
    })
  }

  const login = async (data: LoginRequest) => {
    const response = await $fetch<LoginResponse>('/api/auth/login', {
      baseURL: apiBaseUrl,
      method: 'POST',
      body: data
    })

    user.value = response.User
    token.value = response.Token
    localStorage.setItem('token', response.Token)
  }

  return { user, token, login, register }
})