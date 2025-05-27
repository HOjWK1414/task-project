export interface DocumentsFilter {
    isProcessed: boolean
    isApproved: boolean
    search: string
    page: number
    itemsPerPage: number
}

export const defaultDocumentsFilter: DocumentsFilter = {
    isProcessed: false,
    isApproved: true,
    search: '',
    page: 1,
    itemsPerPage: 10,
}