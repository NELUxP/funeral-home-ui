import type { CompanyData, ContactData } from "./types"

const API_BASE_URL = "https://test-task-api.allfuneral.com"

export async function getAuthToken(username: string): Promise<string> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth?user=${username}`, {
      method: "GET",
    })

    if (!response.ok) {
      throw new Error("Authentication failed")
    }

    // Извлекаем токен из заголовка Authorization
    const token = response.headers.get("Authorization")?.replace("Bearer ", "")

    if (!token) {
      throw new Error("No token received")
    }

    return token
  } catch (error) {
    console.error("Auth error:", error)
    throw error
  }
}

export async function getCompanyData(token: string, companyId: string): Promise<CompanyData> {
  try {
    const response = await fetch(`${API_BASE_URL}/companies/${companyId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch company data")
    }

    return await response.json()
  } catch (error) {
    console.error("Get company error:", error)
    throw error
  }
}

export async function getContactData(token: string, contactId: string): Promise<ContactData> {
  try {
    const response = await fetch(`${API_BASE_URL}/contacts/${contactId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch contact data")
    }

    return await response.json()
  } catch (error) {
    console.error("Get contact error:", error)
    throw error
  }
}

export async function updateCompanyData(token: string, companyId: string, data: any): Promise<any> {
  try {
    // Форматируем данные в соответствии с документацией API
    const requestData = {
      name: data.name,
      shortName: data.shortName,
      businessEntity: data.businessEntity,
      contract: {
        no: data.contract.no,
        issue_date: data.contract.issue_date, // Убедимся, что это в формате ISO
      },
      type: data.type,
    }

    const response = await fetch(`${API_BASE_URL}/companies/${companyId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestData),
    })

    if (!response.ok) {
      throw new Error("Failed to update company data")
    }

    return await response.json()
  } catch (error) {
    console.error("Update company error:", error)
    throw error
  }
}

export async function updateContactData(token: string, contactId: string, data: any): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/contacts/${contactId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error("Failed to update contact data")
    }

    return await response.json()
  } catch (error) {
    console.error("Update contact error:", error)
    throw error
  }
}

export async function deleteCompany(token: string, companyId: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/companies/${companyId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to delete company")
    }
  } catch (error) {
    console.error("Delete company error:", error)
    throw error
  }
}

export async function uploadCompanyImage(token: string, companyId: string, file: File): Promise<any> {
  try {
    // Используем FormData для отправки файла
    const formData = new FormData()
    formData.append("file", file)

    const response = await fetch(`${API_BASE_URL}/companies/${companyId}/image`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        // Не добавляем Content-Type, браузер сам установит правильный с boundary
      },
      body: formData,
    })

    if (!response.ok) {
      throw new Error("Failed to upload image")
    }

    return await response.json()
  } catch (error) {
    console.error("Upload image error:", error)
    throw error
  }
}

export async function deleteCompanyImage(token: string, companyId: string, imageName: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/companies/${companyId}/image/${imageName}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to delete image")
    }
  } catch (error) {
    console.error("Delete image error:", error)
    throw error
  }
}

