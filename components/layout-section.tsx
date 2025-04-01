import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function LayoutSection() {
  return (
    <div className="rounded-lg bg-[#aecdd3] p-6">
      <h2 className="text-2xl font-medium mb-6 text-[#232323]">Layout</h2>

      <div className="bg-white rounded-lg overflow-hidden shadow-sm mb-6">
        <Image
          src="/placeholder.svg?height=400&width=600"
          alt="Layout example"
          width={600}
          height={400}
          className="w-full h-auto"
        />
      </div>

      <h3 className="text-lg font-medium mb-4 text-[#232323]">Dialog boxes</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg">
          <p className="text-sm mb-2">Specify the organization's name</p>
          <div className="border rounded p-2 mb-3 text-sm">Eternal Rest Funeral Home</div>
          <div className="flex justify-between">
            <Button variant="outline" size="sm">
              Cancel
            </Button>
            <Button size="sm" className="bg-[#232323] hover:bg-[#444444]">
              Save changes
            </Button>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg">
          <p className="text-sm mb-2">Remove the organization?</p>
          <p className="text-xs text-gray-500 mb-3">Are you sure you want to remove this organization?</p>
          <div className="flex justify-between">
            <Button variant="outline" size="sm">
              No
            </Button>
            <Button size="sm" className="bg-[#d72323] hover:bg-opacity-90">
              Yes, remove
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

