export interface ICompany {
    "invoicePrefix": string
    "currentInvoiceNumber": number
    "missingInvoiceNumber": [],
    "currentDNNumber": number
    "currentCNNumber": number
    "defaultInvoiceTemplate": string
    "showAdvanceMenu": boolean,
    "sendSmsToCustomerOnSales": boolean,
    "sendSmsToOwnerOnSales": boolean,
    "sendSMSToSelfOnDueDate": boolean,
    "sendSMSToSelfOnPurchaseDueDate": boolean,
    "sendEmailToCustomerOnSales": boolean,
    "sendSMSToCustomerOnDueDate": boolean,
    "showItemSerialNo": boolean,
    "currentBarcodeIndex": 0,
    "totalSentSMS": 0,
    "isActive": boolean,
    "delInvoices": [],
    "_id": string
    "companyName": string
    "state": string
    "address": string
    "companyEmail": string
    "companyPhone": string
    "gstNo": string
    "users": ICompanyUser[],
    "attachments": [],
    "createdAt": string
    "id": 3,
    "__v": number
    "subscriptions": ICompanySubscription[]
}

export interface ICompanyUser {
    "_id": string
    "username": string
    "role": string
    "createdAt": string
}

export interface ICompanySubscription {
    "packageId": 3,
    "name": string
    "noOfDays": 14,
    "activateDate": string
    "expiresAt": string
}

export class CompanyAddInsertObject {
    "username": string
    "password": string
    "name": string
    "invoicePrefix": string
    "companyName": string
    "state": string
    "address": string
    "companyEmail": string
    "companyPhone": string
    "gstNo": string
    "package": string
}

export class CompanyUpdateInsertObject {
    "id": number
    "invoicePrefix"?: string
    "currentInvoiceNumber"?: number
    "currentDNNumber"?: number
    "currentCNNumber"?: number
    "defaultInvoiceTemplate"?: string
    "showAdvanceMenu"?: boolean
    "sendSmsToCustomerOnSales"?: boolean
    "sendSmsToOwnerOnSales"?: boolean
    "sendSMSToSelfOnDueDate"?: boolean
    "sendSMSToSelfOnPurchaseDueDate"?: boolean
    "sendEmailToCustomerOnSales"?: boolean
    "sendSMSToCustomerOnDueDate"?: boolean
    "showItemSerialNo"?: boolean
    "companyName"?: string
    "state"?: string
    "address"?: string
    "companyEmail"?: string
    "companyPhone"?: string
    "gstNo"?: string

}