<template>
    <div class="p-6 space-y-4">
        <h1>{{ PageModel.header }}</h1>
        <p class="text-gray-500">{{ PageModel.description }}</p>

        <RoutePath />

        <Input v-model="PageModel.data.filter" :placeholder="PageModel.filter_placeholder" class="w-full max-w-md" />

        <template v-if="fetchedCompanies && filteredCompanies.length">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>{{ PageModel.table_column_id }}</TableHead>
                        <TableHead>{{ PageModel.table_column_name }}</TableHead>
                        <TableHead>{{ PageModel.table_column_approved }}</TableHead>
                        <TableHead>{{ PageModel.table_column_not_approved }}</TableHead>
                        <TableHead>{{ PageModel.table_column_processed }}</TableHead>
                        <TableHead>{{ PageModel.table_column_not_processed }}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="company in filteredCompanies" :key="company.id">
                        <TableCell>{{ company.id }}</TableCell>
                        <TableCell>{{ company.name }}</TableCell>
                        <TableCell>{{ company.statistics?.approved ?? '-' }}</TableCell>
                        <TableCell>{{ company.statistics?.not_approved ?? '-' }}</TableCell>
                        <TableCell>{{ company.statistics?.processed ?? '-' }}</TableCell>
                        <TableCell>{{ company.statistics?.not_processed ?? '-' }}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </template>

        <template v-else>
            <p class="text-sm text-gray-500">{{ PageModel.filter_none_records }}</p>
        </template>

        <Pagination :items-per-page="10" :total="10" :default-page="1">
            <PaginationPrevious />
            <PaginationNext />
        </Pagination>


    </div>
</template>


<script setup lang="ts">

// Page Model
import { dashboardPageModel, type DashboardPageModel } from '~/models/pages/dashboardPageModel'
import RoutePath from '~/components/RoutePath.vue'

// Types
import type { Company } from '~/models/external/keysmash/company'

// Utils
import { fetchExternal } from '~/utils/fetchExternal'

// Components
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Input } from '~/components/ui/input'
import { Pagination, PaginationNext, PaginationPrevious, } from '~/components/ui/pagination'

// Auth
const token = useCookie('token').value

const PageModel = reactive<DashboardPageModel>(structuredClone(dashboardPageModel))

const { data: fetchedCompanies } = await useAsyncData<Company[]>('companies', async () => {
    const companies = await fetchExternal<Company[]>('/companies', token!)

    await Promise.all(
        companies.map(async (company) => {
            try {
                company.statistics = await fetchExternal(`/companies/${company.id}/statistics`, token!)
            } catch {
                company.statistics = undefined
            }
        })
    )

    return companies
})

watchEffect(() => {
    if (fetchedCompanies.value) {
        PageModel.data.companies = fetchedCompanies.value
    }
})

const filteredCompanies = computed(() =>
    PageModel.data.companies.filter((c) =>
        c.name.toLowerCase().includes(PageModel.data.filter.toLowerCase())
    )
)

</script>
