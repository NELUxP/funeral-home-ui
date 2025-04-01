import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Home, User, ImageIcon } from "lucide-react"

export default function ComponentsSection() {
  return (
    <div className="rounded-lg bg-[#aecdd3] p-6">
      <h2 className="text-2xl font-medium mb-6 text-[#232323]">Components</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Buttons */}
        <div className="bg-white rounded-lg p-4">
          <h3 className="font-medium mb-4">Buttons</h3>

          <div className="mb-6">
            <p className="text-sm mb-2">Filled button</p>
            <div className="grid grid-cols-3 gap-2 mb-2">
              <Button size="sm" className="bg-[#232323] hover:bg-[#444444]">
                Label
              </Button>
              <Button size="sm" className="bg-[#232323] hover:bg-[#444444]">
                Label
              </Button>
              <Button size="sm" className="bg-[#232323] hover:bg-[#444444]" disabled>
                Label
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-2">
              <Button size="sm" className="bg-[#232323] hover:bg-[#444444]">
                Label
              </Button>
              <Button size="sm" className="bg-[#232323] hover:bg-[#444444]">
                Label
              </Button>
              <Button size="sm" className="bg-[#232323] hover:bg-[#444444]" disabled>
                Label
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Button size="sm" className="bg-[#232323] hover:bg-[#444444]">
                Label
              </Button>
              <Button size="sm" className="bg-[#232323] hover:bg-[#444444]">
                Label
              </Button>
              <Button size="sm" className="bg-[#232323] hover:bg-[#444444]" disabled>
                Label
              </Button>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm mb-2">Outline button</p>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <Button size="sm" variant="outline">
                Label
              </Button>
              <Button size="sm" variant="outline">
                Label
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <Button size="sm" variant="outline">
                Label
              </Button>
              <Button size="sm" variant="outline">
                Label
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button size="sm" variant="outline">
                Label
              </Button>
              <Button size="sm" variant="outline">
                Label
              </Button>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm mb-2">Flattened button</p>
            <div className="grid grid-cols-1 gap-2 mb-2">
              <Button size="sm" variant="ghost" className="justify-start">
                Label
              </Button>
              <Button size="sm" variant="ghost" className="justify-start">
                Label
              </Button>
            </div>
          </div>

          <div>
            <p className="text-sm mb-2">Icon button</p>
            <div className="grid grid-cols-3 gap-2">
              <Button size="icon" variant="ghost" className="h-8 w-8">
                <Search className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="h-8 w-8">
                <Search className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="h-8 w-8">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Inputs and Selectors */}
        <div className="bg-white rounded-lg p-4">
          <h3 className="font-medium mb-4">Inputs and Selectors</h3>

          <div className="mb-6">
            <p className="text-sm mb-2">Input</p>
            <div className="space-y-4">
              <div>
                <p className="text-xs mb-1">Regular</p>
                <Input placeholder="Input text" />
              </div>
              <div>
                <p className="text-xs mb-1">Disabled</p>
                <Input placeholder="Input text" disabled />
              </div>
              <div>
                <p className="text-xs mb-1">Error</p>
                <Input placeholder="Input text" className="border-[#d72323]" />
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm mb-2">Selector</p>
            <div className="space-y-4">
              <div>
                <p className="text-xs mb-1">Regular</p>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Input text" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <p className="text-xs mb-1">Disabled</p>
                <Select disabled>
                  <SelectTrigger>
                    <SelectValue placeholder="Input text" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">Option 1</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <p className="text-xs mb-1">Error</p>
                <Select>
                  <SelectTrigger className="border-[#d72323]">
                    <SelectValue placeholder="Input text" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">Option 1</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Company Details block */}
        <div className="bg-white rounded-lg p-4">
          <div className="flex justify-between mb-2">
            <h3 className="font-medium">Company Details</h3>
            <div className="flex gap-1">
              <Button size="icon" variant="ghost" className="h-6 w-6">
                <Search className="h-3 w-3" />
              </Button>
              <Button size="icon" variant="ghost" className="h-6 w-6">
                <Search className="h-3 w-3" />
              </Button>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Registration number:</span>
              <span>01234-56</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Date established:</span>
              <span>01.01.2024</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Phone number:</span>
              <span>+1 234 567 8900</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Company type:</span>
              <span>Funeral Home, Logistics services</span>
            </div>
          </div>
        </div>

        {/* Contacts block */}
        <div className="bg-white rounded-lg p-4">
          <div className="flex justify-between mb-2">
            <h3 className="font-medium">Contacts</h3>
            <div className="flex gap-1">
              <Button size="icon" variant="ghost" className="h-6 w-6">
                <Search className="h-3 w-3" />
              </Button>
              <Button size="icon" variant="ghost" className="h-6 w-6">
                <Search className="h-3 w-3" />
              </Button>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Representative person:</span>
              <span>David Rosenberg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Phone number:</span>
              <span>+1 765 456 7890</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Email:</span>
              <span>david_rosenberg@gmail.com</span>
            </div>
          </div>
        </div>

        {/* Side menu and Preview */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-medium mb-2">Side menu</h3>
            <div className="flex gap-4">
              <div className="bg-[#232323] rounded-lg p-2 w-12">
                <div className="flex flex-col items-center gap-4">
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-white hover:bg-[#444444]">
                    <Home className="h-5 w-5" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-white hover:bg-[#444444]">
                    <User className="h-5 w-5" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-white hover:bg-[#444444]">
                    <ImageIcon className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-medium mb-2">Preview</h3>
                <div className="bg-gray-100 rounded-lg p-2 h-32 flex items-center justify-center">
                  <Image
                    src="/placeholder.svg?height=100&width=120"
                    alt="Preview"
                    width={120}
                    height={100}
                    className="object-cover rounded"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4">
            <h3 className="font-medium mb-2">Icons</h3>
            <div className="bg-[#232323] rounded-lg p-3">
              <div className="grid grid-cols-12 gap-2">
                {Array.from({ length: 12 }).map((_, i) => (
                  <Button key={i} size="icon" variant="ghost" className="h-6 w-6 text-white hover:bg-[#444444]">
                    <Search className="h-3 w-3" />
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

