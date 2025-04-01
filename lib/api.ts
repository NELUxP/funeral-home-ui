import type { CompanyData, ContactData } from "./types"

const API_BASE_URL = "https://test-task-api.allfuneral.com"

export async function getAuthToken(username: string): Promise<string> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth?user=${username}`, {
      method: "GET",
    })

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error")
      throw new Error(`Authentication failed: ${response.status} ${errorText}`)
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
      const errorText = await response.text().catch(() => "Unknown error")
      throw new Error(`Failed to fetch company data: ${response.status} ${errorText}`)
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
      const errorText = await response.text().catch(() => "Unknown error")
      throw new Error(`Failed to fetch contact data: ${response.status} ${errorText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Get contact error:", error)
    throw error
  }
}

export async function updateCompanyData(token: string, companyId: string, data: any): Promise<any> {
  console.log("Sending update request with data:", JSON.stringify(data))

  try {
    const response = await fetch(`${API_BASE_URL}/companies/${companyId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })

    // Получаем текст ответа для лучшей диагностики
    const responseText = await response.text()

    if (!response.ok) {
      throw new Error(`Failed to update company data: ${response.status}, Message: ${responseText}`)
    }

    // Если ответ пустой, возвращаем исходные данные
    if (!responseText.trim()) {
      return data
    }

    try {
      // Пробуем распарсить JSON
      return JSON.parse(responseText)
    } catch (e) {
      // Возвращаем исходные данные, если не удалось распарсить ответ
      return data
    }
  } catch (error) {
    console.error("Update company error:", error)
    throw error
  }
}

export async function updateContactData(token: string, contactId: string, data: any): Promise<any> {
  console.log("Sending contact update request with data:", JSON.stringify(data))

  try {
    const response = await fetch(`${API_BASE_URL}/contacts/${contactId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })

    // Получаем текст ответа для лучшей диагностики
    const responseText = await response.text()

    if (!response.ok) {
      throw new Error(`Failed to update contact data: ${response.status}, Message: ${responseText}`)
    }

    // Если ответ пустой, возвращаем исходные данные
    if (!responseText.trim()) {
      return data
    }

    try {
      // Пробуем распарсить JSON
      return JSON.parse(responseText)
    } catch (e) {
      // Возвращаем исходные данные, если не удалось распарсить ответ
      return data
    }
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
      const errorText = await response.text().catch(() => "Unknown error")
      throw new Error(`Failed to delete company: ${response.status} ${errorText}`)
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
      const errorText = await response.text().catch(() => "Unknown error")
      throw new Error(`Failed to upload image: ${response.status} ${errorText}`)
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
      const errorText = await response.text().catch(() => "Unknown error")
      throw new Error(`Failed to delete image: ${response.status} ${errorText}`)
    }
  } catch (error) {
    console.error("Delete image error:", error)
    throw error
  }
}

