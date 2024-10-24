import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, MoreVertical } from "lucide-react"

export const Bucket = ({ bucket }: { bucket: Bucket }) => {
    
    const handleCalculateSize = () => {
      console.log(`Calculating size for bucket: ${bucket.name}`)
    }
  
    const handleCheckReplication = () => {
      console.log(`Checking replication for bucket: ${bucket.name}`)
    }
  
    const handleCheckVersioning = () => {
      console.log(`Checking versioning for bucket: ${bucket.name}`)
    }
  
    return (
      <div className="flex justify-between items-center py-2 border-b">
        <div>
          <span className="font-medium">{bucket.name}</span>
          <span className="ml-4 text-sm text-gray-500">
            Size: {bucket.size} | Items: {bucket.itemCount}
          </span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleCalculateSize}>Calculate Size</DropdownMenuItem>
            <DropdownMenuItem onClick={handleCheckReplication}>Check Replication</DropdownMenuItem>
            <DropdownMenuItem onClick={handleCheckVersioning}>Check Versioning</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  }
  