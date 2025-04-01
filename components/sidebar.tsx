import { Button } from "@/components/ui/button"
import { Home, Users, Briefcase, FileText, Settings, HelpCircle, LogOut } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Sidebar() {
  return (
    <div className="fixed left-0 top-0 bottom-0 w-16 bg-[#232323] flex flex-col items-center py-4">
      {/* Logo */}
      <div className="mb-8">
      <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
          <Image
            src="/logo.png"
            alt="Logo"
            width={24}
            height={24}
            className="object-contain"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col items-center gap-4">
        <Link href="#">
          <Button variant="ghost" size="icon" className="text-white hover:bg-[#444444]">
            <Home className="h-5 w-5" />
            <span className="sr-only">Главная</span>
          </Button>
        </Link>
        <Link href="#">
          <Button variant="ghost" size="icon" className="text-white hover:bg-[#444444]">
            <Users className="h-5 w-5" />
            <span className="sr-only">Контакты</span>
          </Button>
        </Link>
        <Link href="#">
          <Button variant="ghost" size="icon" className="text-white hover:bg-[#444444]">
            <Briefcase className="h-5 w-5" />
            <span className="sr-only">Компании</span>
          </Button>
        </Link>
        <Link href="#">
          <Button variant="ghost" size="icon" className="text-white hover:bg-[#444444]">
            <FileText className="h-5 w-5" />
            <span className="sr-only">Документы</span>
          </Button>
        </Link>
      </nav>

      {/* Bottom actions */}
      <div className="flex flex-col items-center gap-4 mt-auto">
        <Link href="#">
          <Button variant="ghost" size="icon" className="text-white hover:bg-[#444444]">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Настройки</span>
          </Button>
        </Link>
        <Link href="#">
          <Button variant="ghost" size="icon" className="text-white hover:bg-[#444444]">
            <HelpCircle className="h-5 w-5" />
            <span className="sr-only">Помощь</span>
          </Button>
        </Link>
        <Link href="#">
          <Button variant="ghost" size="icon" className="text-white hover:bg-[#444444]">
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Выход</span>
          </Button>
        </Link>
      </div>
    </div>
  )
}

