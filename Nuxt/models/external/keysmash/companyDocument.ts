export interface CompanyDocument {
    id: number
    created_at: string
    updated_at: string
    company_id: number
    uploading_user_id: number
    parent_companyCompanyDocument_id: number | null
    file_name: string
    file_extension: string
    file_path: string
    mime_type: string
    metadata: CompanyDocumentMetadata[]
    uploading_user: User
}

export interface CompanyDocumentMetadata {
    id: number
    created_at: string
    updated_at: string
    CompanyDocument_id: number
    CompanyDocument_type_id: number
    CompanyDocument_number: string | null
    approved: string | null
    approving_user_id: number | null
    month: number
    year: number
    date: string
    note: string
    note_internal: string
    invoice: Invoice
    approvals: any[]
    CompanyDocument_type: CompanyDocumentType
    approving_user: any | null
}

export interface Invoice {
    id: number
    created_at: string
    updated_at: string
    metadata_id: number
    contract: string
    centre: string
    accounting_number: string | null
    invoice_type_id: number
    accountant_id: number | null
    invoice_text: string | null
    total: string
    total_tax_base: number | null
    total_tax: number | null
    exchange_rate: number | null
    variable_symbol: string | null
    client_name: string | null
    client_registration_no: string | null
    vendor_name: string
    vendor_registration_no: string | null
    vendor_vat_no: string | null
    vendor_swift: string | null
    vendor_iban: string | null
    vendor_bank_account_number: string | null
    vendor_bank_code: string | null
    currency: string | null
    date_issued: string | null
    date_tax: string | null
    date_tax_audit_report: string | null
    date_due: string | null
    classification_vat: string | null
    pre_accounting: string | null
    breakdowns: any[]
    vat_rates: any[]
    invoice_type: InvoiceType
    pohoda_queue: any[]
}

export interface InvoiceType {
    id: number
    created_at: string
    updated_at: string
    name: string
    name_pohoda: string
    is_custom: boolean
    abbreviation: string
}

export interface CompanyDocumentType {
    id: number
    created_at: string
    updated_at: string
    name: string
}

export interface User {
    id: number
    created_at: string
    updated_at: string
    name: string
    email: string
    active: boolean
    api_enabled: boolean
    is_admin: boolean
    is_accountant: boolean
    is_accountant_external: boolean
    auto_approve: boolean
    access_token_expiration: string
    pohoda_credentials: any | null
}
