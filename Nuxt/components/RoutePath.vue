<template>
    <nav class="text-sm text-muted-foreground flex items-center gap-2">
        <template v-for="(item, index) in navItems" :key="index">
            <span v-if="index !== 0"> &gt; </span>

            <span v-if="item.path && index !== lastIndex">
                <NuxtLink :to="item.path">{{ item.label }}</NuxtLink>
            </span>

            <span v-else class="text-black font-semibold">
                {{ item.label }}
            </span>
        </template>
    </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ROUTES } from '~/utils/routes'
import type { NavItem } from '~/models/utils/NavItem'

const props = defineProps<{
    keys?: Record<string, string>
}>()

const route = useRoute()

const cleanParams: Record<string, string> = {}
Object.entries(route.params).forEach(([key, value]) => {
    cleanParams[key] = Array.isArray(value) ? value[0] : value ?? ''
})

const allKeys = { ...cleanParams, ...props.keys }

function formatNavItems(items: NavItem[], values: Record<string, string>): (NavItem & { label: string })[] {
    return items.map(item => ({
        ...item,
        label: item.name.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? `{${key}}`),
    }))
}

const matchedRoute = Object.values(ROUTES)
    .filter(r => route.path.startsWith(r.path))
    .sort((a, b) => b.path.length - a.path.length)[0]

const navItems = matchedRoute ? formatNavItems(matchedRoute.items ?? [], allKeys) : []
const lastIndex = navItems.length - 1
</script>
