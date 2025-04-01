"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pencil, Save, X, Loader2 } from "lucide-react"
import type { ContactData } from "@/lib/types"
import { updateContactData } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"
import { format, parseISO } from "date-fns"

interface ContactDetailsProps {
  contactData: ContactData
  token: string
  onUpdate: (data: ContactData) => void
}

export default function ContactDetails({ contactData, token, onUpdate }: ContactDetailsProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstname: contactData.firstname,
    lastname: contactData.lastname,
    phone: contactData.phone,
    email: contactData.email,
  })
  const { toast } = useToast()

  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      const result = await updateContactData(token, contactData.id, formData)
      onUpdate({
        ...contactData,
        ...result,
      })
      setIsEditing(false)
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить контактные данные",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      firstname: contactData.firstname,
      lastname: contactData.lastname,
      phone: contactData.phone,
      email: contactData.email,
    })
    setIsEditing(false)
  }

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), "dd.MM.yyyy")
    } catch (e) {
      return dateString
    }
  }

  const formatPhone = (phone: string) => {
    if (!phone) return ""

    // Format as +X XXX XXX XXXX
    const cleaned = phone.replace(/\D/g, "")
    const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/)

    if (match) {
      return `+${match[1]} ${match[2]} ${match[3]} ${match[4]}`
    }

    return phone
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">Контактная информация</CardTitle>
        {!isEditing ? (
          <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)} className="h-8 w-8">
            <Pencil className="h-4 w-4" />
          </Button>
        ) : (
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" onClick={handleCancel} className="h-8 w-8" disabled={loading}>
              <X className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleSave} className="h-8 w-8" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstname">Имя</Label>
                <Input
                  id="firstname"
                  value={formData.firstname}
                  onChange={(e) => handleChange("firstname", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastname">Фамилия</Label>
                <Input
                  id="lastname"
                  value={formData.lastname}
                  onChange={(e) => handleChange("lastname", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Телефон</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="+X XXX XXX XXXX"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Представитель:</p>
              <p className="font-medium">
                {contactData.firstname} {contactData.lastname}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Телефон:</p>
              <p className="font-medium">{formatPhone(contactData.phone)}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Email:</p>
              <p className="font-medium">{contactData.email}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Создано:</p>
                <p className="font-medium">{formatDate(contactData.createdAt)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Обновлено:</p>
                <p className="font-medium">{formatDate(contactData.updatedAt)}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

