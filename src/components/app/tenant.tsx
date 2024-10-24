import { Bucket } from "@/components/app/buckets"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, MoreVertical } from "lucide-react"


export const Tenant = ({ tenant }: { tenant: Tenant }) => {
    return (
      <AccordionItem value={tenant.id}>
        <AccordionTrigger>{tenant.name}</AccordionTrigger>
        <AccordionContent>
          {tenant.buckets.map((bucket) => (
            <Bucket key={bucket.name} bucket={bucket} />
          ))}
        </AccordionContent>
      </AccordionItem>
    )
  }
  