import Image from "next/image"

export default function SourcesSection() {
  return (
    <div className="rounded-lg bg-[#aecdd3] p-6">
      <h2 className="text-2xl font-medium mb-6 text-[#232323]">Sources</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-2 rounded-lg">
          <Image
            src="/placeholder.svg?height=200&width=300"
            alt="Funeral home interior"
            width={300}
            height={200}
            className="w-full h-auto rounded"
          />
        </div>
        <div className="bg-white p-2 rounded-lg">
          <Image
            src="/placeholder.svg?height=200&width=300"
            alt="Funeral home exterior"
            width={300}
            height={200}
            className="w-full h-auto rounded"
          />
        </div>
        <div className="bg-white p-2 rounded-lg">
          <Image
            src="/placeholder.svg?height=200&width=300"
            alt="Funeral service setup"
            width={300}
            height={200}
            className="w-full h-auto rounded"
          />
        </div>
      </div>
    </div>
  )
}

