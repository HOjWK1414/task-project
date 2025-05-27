<template>
    <div class="rounded-md border p-4 h-[80vh]">
        <ResizablePanelGroup direction="horizontal" class="h-full">

            <!-- Dokumenty -->
            <ResizablePanel :defaultSize="25" :minSize="10" class="border-r pr-2">
                <ScrollArea class="h-full pr-3">
                    <template v-if="documents.length > 0">
                        <Card v-for="doc in documents" :key="doc.id"
                            :class="['mb-2 cursor-pointer transition hover:bg-accent', selectedDocument?.id === doc.id ? 'bg-muted' : '']"
                            v-on:click="loadDocument(doc)">
                            <CardContent class=" p-3 text-sm flex justify-between items-start gap-4">
                                <div class="flex flex-col items-start gap-1 max-w-[65%]">
                                    <span class="flex h-2 w-2 rounded-full bg-orange-500 mb-1" />
                                    <div class="text-xs font-medium">{{ doc.id }}</div>
                                    <div class="text-muted-foreground line-clamp-2 text-xs">{{ doc.file_name }}</div>
                                </div>
                                <div class="flex flex-col items-end gap-1 max-w-[35%]">
                                    <div class="ml-auto text-xs text-foreground">
                                        {{ formatDate(doc.created_at) }}
                                    </div>
                                    <div class="text-xs truncate w-full text-right"
                                        :class="selectedDocument?.id === doc.id ? 'text-foreground font-semibold' : 'text-muted-foreground font-medium'">
                                        {{ doc.metadata?.[0]?.invoice?.invoice_type?.name ?? '—' }}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </template>
                    <template v-else>
                        <div class="h-full flex items-start justify-center text-muted-foreground text-sm pt-10">
                            No documents to preview.
                        </div>
                    </template>
                </ScrollArea>
            </ResizablePanel>

            <!-- ResizableHandle -->
            <ResizableHandle with-handle />

            <!-- Nahled -->
            <ResizablePanel :defaultSize="45" :minSize="20" class="border-r px-3">
                <div class="h-full flex flex-col">
                    <div v-if="hasValidDocument" class="flex-grow">
                        <iframe :src="document" class="w-full h-full rounded border" />
                    </div>
                    <div v-else-if="documents.length > 0"
                        class="h-full flex items-start justify-center text-muted-foreground text-sm pt-10">
                        Select a document to preview.
                    </div>
                </div>
            </ResizablePanel>

            <!-- ResizableHandle -->
            <ResizableHandle with-handle />

            <!-- Metadata -->
            <ResizablePanel :defaultSize="30" :minSize="20" class="px-4">
                <ScrollArea class="h-full">
                    <template v-if="metadata">
                        <h2 v-if="selectedDocument?.id" class="p-2 text-lg font-semibold">
                            Document ID: {{ selectedDocument.id }}
                        </h2>
                        <div class="p-2 grid grid-cols-2 gap-4 text-sm">
                            <div v-for="field in fields" :key="field.label">
                                <Label class="p-1" :for="field.label">{{ field.label }}</Label>
                                <Input :id="field.label" v-model="field.value" :placeholder="field.placeholder" />
                            </div>
                        </div>
                    </template>
                    <template v-else-if="documents.length > 0">
                        <div class="h-full flex items-start justify-center text-muted-foreground text-sm pt-10">
                            Select a document to view metadata.
                        </div>
                    </template>
                </ScrollArea>
            </ResizablePanel>

        </ResizablePanelGroup>

    </div>

</template>


<script setup lang="ts">
import { computed, ref } from 'vue'
import type { CompanyDocument } from '~/models/external/keysmash/companyDocument'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable'


const props = defineProps<{ documents: CompanyDocument[] }>()

const selectedDocument = ref<CompanyDocument | null>(null)
const document = ref<string>("")

watch(
    () => props.documents,
    async (newDocs) => {
        if (newDocs.length > 0) {
            await loadDocument(newDocs[0])
        }
        else {
            document.value = '';
            selectedDocument.value = null;
        }
    }
)

onMounted(async () => {
    if (props.documents && props.documents.length > 0) {
        await loadDocument(props.documents[0])
    }
})

const metadata = computed(() => selectedDocument.value?.metadata?.[0])
const hasValidDocument = computed(() => selectedDocument.value && document.value && document.value.trim() !== '')
const fields = computed(() => {
    if (!metadata.value) return []
    const i = metadata.value.invoice
    return [
        { label: 'documentNumber', value: metadata.value.CompanyDocument_number ?? undefined, placeholder: 'e.g. 20250000001' },
        { label: 'accountingNumber', value: i.accounting_number ?? undefined, placeholder: 'e.g. XX2025010001' },
        { label: 'vendorName', value: i.vendor_name ?? undefined, placeholder: 'e.g. Klient s.r.o.' },
        { label: 'metadata.month', value: metadata.value.month ?? undefined, placeholder: '1' },
        { label: 'metadata.year', value: metadata.value.year ?? undefined, placeholder: '2025' },
        { label: 'variableSymbol', value: i.variable_symbol ?? undefined, placeholder: 'e.g. 20250000001' },
        { label: 'date_issued', value: i.date_issued ?? undefined, placeholder: 'e.g. 2025-01-01' },
        { label: 'date_due', value: i.date_due ?? undefined, placeholder: 'e.g. 2025-01-01' },
        { label: 'date_tax', value: i.date_tax ?? undefined, placeholder: 'e.g. 2025-01-01' },
        { label: 'date_tax_audit_report', value: i.date_tax_audit_report ?? undefined, placeholder: 'e.g. 2025-01-01' },
        { label: 'contract', value: i.contract ?? undefined, placeholder: 'e.g. 20250000001' },
        { label: 'centre', value: i.centre ?? undefined, placeholder: 'e.g. XX2025010001' },
    ]
})

function formatDate(dateStr: string | undefined): string {
    if (!dateStr) return '—'
    const date = new Date(dateStr)
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${month}/${year}`
}

async function loadDocument(doc: CompanyDocument) {
    const token = getToken()
    selectedDocument.value = doc
    const blob = await fetchExternal<Blob>(`/documents/${doc.id}/download`, token!)

    document.value = URL.createObjectURL(blob)
}

</script>
