"use client"

import { useEffect, useState } from "react"
import CompanyDetails from "@/components/company-details"
import ContactDetails from "@/components/contact-details"
import PhotoGallery from "@/components/photo-gallery"
import Sidebar from "@/components/sidebar"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Loader2 } from "lucide-react"
import { getCompanyData, getContactData, deleteCompany, getAuthToken } from "@/lib/api"
import type { CompanyData, ContactData } from "@/lib/types"

export default function Home() {
  const [companyData, setCompanyData] = useState<CompanyData | null>(null)
  const [contactData, setContactData] = useState<ContactData | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const { toast } = useToast()
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const authenticate = async () => {
      try {
        const authToken = await getAuthToken("USERNAME")
        setToken(authToken)

        if (authToken) {
          const company = await getCompanyData(authToken, "12")
          const contact = await getContactData(authToken, "16")

          setCompanyData(company)
          setContactData(contact)
        }
      } catch (error) {
        toast({
          title: "Ошибка загрузки данных",
          description: "Не удалось загрузить данные. Пожалуйста, попробуйте позже.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    authenticate()
  }, [toast])

  const handleCompanyUpdate = (updatedData: CompanyData) => {
    setCompanyData(updatedData)
    toast({
      title: "Данные обновлены",
      description: "Информация о компании успешно обновлена",
    })
  }

  const handleContactUpdate = (updatedData: ContactData) => {
    setContactData(updatedData)
    toast({
      title: "Данные обновлены",
      description: "Контактная информация успешно обновлена",
    })
  }

  const handlePhotoUpdate = (photos: any[]) => {
    if (companyData) {
      setCompanyData({
        ...companyData,
        photos,
      })
    }
  }

  const handleDeleteCompany = async () => {
    if (!token) return

    setDeleting(true)
    try {
      await deleteCompany(token, companyData?.id || "")
      toast({
        title: "Компания удалена",
        description: "Компания была успешно удалена",
      })
      // В реальном приложении здесь был бы редирект на список компаний
      setCompanyData(null)
      setContactData(null)
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить компанию",
        variant: "destructive",
      })
    } finally {
      setDeleting(false)
      setDeleteDialogOpen(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#232323]" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <Sidebar />

      <main className="flex-1 ml-16 pt-6">
        <div className="container mx-auto px-4 pb-16">
          {companyData && (
            <div className="mb-6 flex justify-between items-center">
              <h1 className="text-2xl font-bold">{companyData.name}</h1>
              <Button variant="destructive" onClick={() => setDeleteDialogOpen(true)}>
                Удалить организацию
              </Button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {companyData && token && (
              <CompanyDetails companyData={companyData} token={token} onUpdate={handleCompanyUpdate} />
            )}

            {contactData && token && (
              <ContactDetails contactData={contactData} token={token} onUpdate={handleContactUpdate} />
            )}
          </div>

          {companyData && token && (
            <PhotoGallery
              companyId={companyData.id}
              photos={companyData.photos}
              token={token}
              onUpdate={handlePhotoUpdate}
            />
          )}
        </div>
      </main>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Удалить организацию?</DialogTitle>
            <DialogDescription>Вы уверены, что хотите удалить эту организацию?</DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-between sm:justify-between">
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Нет
            </Button>
            <Button variant="destructive" onClick={handleDeleteCompany} disabled={deleting}>
              {deleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Удаление...
                </>
              ) : (
                "Да, удалить"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Toaster />
    </div>
  )
}

