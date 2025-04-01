export interface CompanyData {
  id: string
  contactId: string
  name: string
  shortName: string
  businessEntity: string
  contract: {
    no: string
    issue_date: string
  }
  type: string[]
  status: string
  photos: any[]
  createdAt: string
  updatedAt: string
}

export interface ContactData {
  id: string
  lastname: string
  firstname: string
  phone: string
  email: string
  createdAt: string
  updatedAt: string
}

