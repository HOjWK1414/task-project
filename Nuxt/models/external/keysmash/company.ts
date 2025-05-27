
import type { CompanyStatistic } from './companyStatistic'

export interface Company {
    id: number
    name: string
    registration_no: string
    vat_no: string
    active: boolean
    data_mining_enabled: boolean
    use_pohoda_enumeration_dropdowns: boolean
    virtual_assistant_enabled: boolean
    virtual_assistant_auto_approve: boolean
    created_at: string
    updated_at: string
    statistics?: CompanyStatistic
}