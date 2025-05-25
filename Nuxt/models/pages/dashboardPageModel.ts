
import type { Company } from '~/models/external/keysmash/company'


export interface DashboardPageModel {
    header: string
    description: string
    filter_placeholder: string
    filter_none_records: string

    table_column_id: string
    table_column_name: string
    table_column_approved: string
    table_column_not_approved: string
    table_column_processed: string
    table_column_not_processed: string

    data: {
        companies: Company[]
        filter: string
    }
}

export const dashboardPageModel: DashboardPageModel = {
    header: 'Document Management System',
    description: 'Upload, organize, and search your documents',
    filter_placeholder: 'Filter companies...',
    filter_none_records: 'No results.',

    table_column_id: 'Company ID',
    table_column_name: 'Name',
    table_column_approved: 'Approved',
    table_column_not_approved: 'Not Approved',
    table_column_processed: 'Processed',
    table_column_not_processed: 'Not Processed',

    data: {
        companies: [],
        filter: ''
    }
}