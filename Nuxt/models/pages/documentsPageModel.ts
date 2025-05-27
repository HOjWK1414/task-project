import type { CompanyDocument } from '~/models/external/keysmash/companyDocument'

export interface DocumentsPageModel {
    filter_processed: string
    filter_approved: string
    search_placeholder: string
    no_results: string

    data: {
        documents: CompanyDocument[]
        countOfAllDocuments: number
        filter: {
            isProcessed: boolean
            isApproved: boolean
            search: string
            page: number
            itemsPerPage: number
        }
    }
}

export const documentsPageModel: DocumentsPageModel = {
    filter_processed: 'isProcessed',
    filter_approved: 'isApproved',
    search_placeholder: 'Search documents...',
    no_results: 'No documents match your filter.',

    data: {
        documents: [],
        countOfAllDocuments: 0,
        filter: {
            isProcessed: false,
            isApproved: true,
            search: '',
            page: 1,
            itemsPerPage: 10,
        }
    }
}