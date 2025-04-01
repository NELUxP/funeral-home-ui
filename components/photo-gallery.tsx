"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, X, Loader2 } from "lucide-react"
import Image from "next/image"
import { uploadCompanyImage, deleteCompanyImage } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"
import { format, parseISO } from "date-fns"

interface PhotoGalleryProps {
  companyId: string
  photos: any[]
  token: string
  onUpdate: (photos: any[]) => void
}

export default function PhotoGallery({ companyId, photos, token, onUpdate }: PhotoGalleryProps) {
  const [uploading, setUploading] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      // Отправляем файл на сервер
      const result = await uploadCompanyImage(token, companyId, file)

      // Обновляем список фотографий
      onUpdate([...photos, result])

      toast({
        title: "Изображение загружено",
        description: "Изображение успешно добавлено в галерею",
      })
    } catch (error) {
      toast({
        title: "Ошибка загрузки",
        description: "Не удалось загрузить изображение",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleDeleteImage = async (imageName: string) => {
    setDeletingId(imageName)
    try {
      // Отправляем запрос на удаление изображения
      await deleteCompanyImage(token, companyId, imageName)

      // Обновляем список фотографий
      onUpdate(photos.filter((photo) => photo.name !== imageName))

      toast({
        title: "Изображение удалено",
        description: "Изображение успешно удалено из галереи",
      })
    } catch (error) {
      toast({
        title: "Ошибка удаления",
        description: "Не удалось удалить изображение",
        variant: "destructive",
      })
    } finally {
      setDeletingId(null)
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), "dd.MM.yyyy")
    } catch (e) {
      return dateString
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">Фотографии</CardTitle>
        <div>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
          <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Загрузка...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Загрузить фото
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {photos.length === 0 ? (
          <div className="text-center py-8 text-gray-500">Нет загруженных фотографий</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((photo) => (
              <div key={photo.name} className="relative group">
                <div className="aspect-square relative overflow-hidden rounded-md border">
                  <Image src={photo.filepath || "/placeholder.svg"} alt="Company photo" fill className="object-cover" />
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleDeleteImage(photo.name)}
                  disabled={deletingId === photo.name}
                >
                  {deletingId === photo.name ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4" />}
                </Button>
                <div className="mt-2 text-sm text-gray-500">Добавлено: {formatDate(photo.createdAt)}</div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

