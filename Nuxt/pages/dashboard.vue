<template>
    <div class="mx-auto m-10 max-w-7xl">

        <div class="mb-8">
            <h1 class="text-3xl font-bold tracking-tight">{{ PageModel.header }}</h1>
            <p class="mt-2 text-gray-500">{{ PageModel.description }}</p>
        </div>


        <RoutePath />

        <Input v-model="PageModel.data.filter" :placeholder="PageModel.filter_placeholder"
            class="w-full max-w-md mt-10 mb-5" />

        <template v-if="!fetchedCompanies || fetchedCompanies === undefined">
            <p>Loading...</p>
        </template>

        <template v-if="filteredCompanies.length">
            <div class="rounded-md border">
                <Table class="w-full borde rounded-md overflow-hidden">
                    <TableHeader class="text-left px-4 py-2 border-b">
                        <TableRow class=" hover:bg-gray-50 transition-colors duration-150">
                            <TableHead>{{ PageModel.table_column_id }}</TableHead>
                            <TableHead>{{ PageModel.table_column_name }}</TableHead>
                            <TableHead>{{ PageModel.table_column_approved }}</TableHead>
                            <TableHead>{{ PageModel.table_column_not_approved }}</TableHead>
                            <TableHead>{{ PageModel.table_column_processed }}</TableHead>
                            <TableHead>{{ PageModel.table_column_not_processed }}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow class="cursor-pointer" v-for="company in filteredCompanies" :key="company.id"
                            v-on:click="redirectToDocuments(company.id)">
                            <TableCell class="p-4 align-middle">{{ company.id }}</TableCell>
                            <TableCell class="p-4 align-middle">{{ company.name }}</TableCell>
                            <TableCell class="p-4 align-middle">{{ company.statistics?.approved ?? '-' }}</TableCell>
                            <TableCell class="p-4 align-middle">{{ company.statistics?.not_approved ?? '-' }}
                            </TableCell>
                            <TableCell class="p-4 align-middle">{{ company.statistics?.processed ?? '-' }}</TableCell>
                            <TableCell class="p-4 align-middle">{{ company.statistics?.not_processed ?? '-' }}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </template>

        <template v-else>
            <p class="text-sm text-gray-500">{{ PageModel.filter_none_records }}</p>
        </template>

        <div class="w-full mt-4 flex justify-end">
            <div class="inline-block">
                <Pagination :items-per-page="10" :total="10" :default-page="1">
                    <PaginationPrevious> Previous </PaginationPrevious>
                    <PaginationNext> Next </PaginationNext>
                </Pagination>
            </div>
        </div>


    </div>
</template>


<script setup lang="ts">

// Page Model
import { dashboardPageModel, type DashboardPageModel } from '~/models/pages/dashboardPageModel'
const staticPageModel = dashboardPageModel
const reactiveData = reactive(structuredClone(dashboardPageModel.data))

const PageModel = {
    ...staticPageModel,
    data: reactiveData
}


// Types
import type { Company } from '~/models/external/keysmash/company'

// Utils
import { fetchExternal } from '~/utils/fetchExternal'

// Components
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Input } from '~/components/ui/input'
import { Pagination, PaginationNext, PaginationPrevious, } from '~/components/ui/pagination'

const { data: fetchedCompanies } = await useAsyncData<Company[]>('companies', async () => {
    const token = getToken()
    const companies = await fetchExternal<Company[]>('/companies', token!)

    await Promise.all(
        companies.map(async (company) => {
            try {
                company.statistics = await fetchExternal(`/companies/${company.id}/statistics`, token!)
            } catch (e) {
                console.error('Chyba při fetchu statistik:', e)
                company.statistics = undefined
            }
        })
    )
    return companies
})

watchEffect(() => {
    if (fetchedCompanies.value) {
        PageModel.data.companies = [...fetchedCompanies.value]
    }
})

const filteredCompanies = computed(() =>
    PageModel.data.companies.filter((c) =>
        c.name.toLowerCase().includes(PageModel.data.filter.toLowerCase())
    )
)

function redirectToDocuments(id: number) {
    const router = useRouter()
    router.push('/company/documents?id=' + id)
}

</script>