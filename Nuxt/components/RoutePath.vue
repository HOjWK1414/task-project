<!-- components/ui/RoutePath.vue -->
<template>
    <nav class="text-sm text-gray-500 flex items-center gap-2">
        <template v-for="(segment, index) in segments" :key="index">
            <span v-if="index !== 0">/</span>
            <span v-if="index !== segments.length - 1">
                <NuxtLink :to="getPath(index)" class="hover:underline text-gray-600">
                    {{ getName(getPath(index), segment) }}
                </NuxtLink>
            </span>
            <span v-else class="text-black font-medium">
                {{ getName(getPath(index), segment) }}
            </span>
        </template>
    </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ROUTES } from '~/utils/routes'

const route = useRoute()

const segments = computed(() =>
    route.path.split('/').filter(Boolean)
)

const getPath = (index: number) =>
    '/' + segments.value.slice(0, index + 1).join('/')

const getName = (path: string, fallback: string) => {
    const found = Object.values(ROUTES).find(r => r.path === path)
    return found?.name ?? capitalize(fallback)
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
</script>
