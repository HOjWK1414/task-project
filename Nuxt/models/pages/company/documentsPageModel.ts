import type { CompanyDocument } from '~/models/external/keysmash/companyDocument'
import type { DocumentsFilter } from '~/models/shared/documentsFilterModel'
import { defaultDocumentsFilter } from '~/models/shared/documentsFilterModel'

export interface DocumentsPageModel {
    filter_processed: string
    filter_approved: string
    search_placeholder: string
    no_results: string

    data: {
        documents: CompanyDocument[]
        countOfAllDocuments: number
        filter: DocumentsFilter
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
        filter: defaultDocumentsFilter,
    },
}