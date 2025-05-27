<template>
    <div class="space-y-4 px-6 py-4">

        <RoutePath />

        <!-- Filters -->
        <div class="flex items-center gap-4">
            <Input v-model="PageModel.data.filter.search" :placeholder="PageModel.search_placeholder"
                class="w-full max-w-sm" />
            <div class="flex items-center gap-2">
                <Switch id="isProcessed" v-model="PageModel.data.filter.isProcessed" />
                <Label for="isProcessed">{{ PageModel.filter_processed }}</Label>
            </div>
            <div class="flex items-center gap-2">
                <Switch id="isApproved" v-model="PageModel.data.filter.isApproved" />
                <Label for="isApproved">{{ PageModel.filter_approved }}</Label>
            </div>
        </div>

        <!-- Dokument preview -->
        <CompanyDocumentsPreview :documents="PageModel.data.documents" />

        <!-- Strankovani -->
        <div class="mt-4 flex justify-center">

            <Pagination v-slot="{ page }" :page="PageModel.data.filter.page"
                @update:page="PageModel.data.filter.page = $event" :items-per-page="PageModel.data.filter.itemsPerPage"
                :default-page="PageModel.data.filter.page" :total="PageModel.data.countOfAllDocuments">
                <PaginationContent v-slot="{ items }">
                    <PaginationPrevious />
                    <template v-for="(item, index) in items" :key="index">
                        <PaginationItem v-if="item.type === 'page'" :value="item.value"
                            :is-active="item.value === page">
                            {{ item.value }}
                        </PaginationItem>
                    </template>
                    <PaginationNext />
                </PaginationContent>
            </Pagination>

        </div>

    </div>
</template>


<script setup lang="ts">

// PageModel
import { documentsPageModel, type DocumentsPageModel } from '~/models/pages/documentsPageModel'
const PageModel = documentsPageModel
PageModel.data = reactive(documentsPageModel.data)

// Models
import type { CompanyDocument } from '~/models/external/keysmash/companyDocument'

// Utils
import { fetchExternal } from '~/utils/fetchExternal'

// Components
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Switch } from '~/components/ui/switch'
import RoutePath from '~/components/RoutePath.vue'
import CompanyDocumentsPreview from '~/components/CompanyDocumentsPreview.vue'
import { Pagination, PaginationContent, PaginationNext, PaginationPrevious, PaginationItem } from '@/components/ui/pagination'

// Vue
import { useRoute } from 'vue-router'
import { useAsyncData } from 'nuxt/app'
import { watch } from 'vue'

const route = useRoute()
const companyId = Number(route.query.id)


function getQuery() {
    return new URLSearchParams({
        companyId: companyId.toString(),
        page: PageModel.data.filter.page.toString(),
        pageSize: PageModel.data.filter.itemsPerPage.toString(),
        isProcessed: PageModel.data.filter.isProcessed.toString(),
        isApproved: PageModel.data.filter.isApproved.toString(),
        search: PageModel.data.filter.search.toString(),
    }).toString()
}

// Dokumenty
const { data: docsData, refresh: refreshDocs } = await useAsyncData(`documents-${companyId}`, () =>
    fetchExternal<CompanyDocument[]>(`/documents?${getQuery()}`, getToken()!)
)

const { data: totalData, refresh: refreshTotal } = await useAsyncData(`documents-total-${companyId}`, () =>
    fetchExternal<{ total: number }>(`/documents/total?${getQuery()}`, getToken()!)
)

watch([() => PageModel.data.filter.page, () => PageModel.data.filter.isApproved, () => PageModel.data.filter.isProcessed, () => PageModel.data.filter.search], async () => {
    await Promise.all([refreshDocs(), refreshTotal()])
    PageModel.data.documents = docsData.value || []
    PageModel.data.countOfAllDocuments = totalData.value?.total || 0
})

PageModel.data.documents = docsData.value || []
PageModel.data.countOfAllDocuments = totalData.value?.total || 0

</script>