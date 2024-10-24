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
import { useState } from "react"


export const AddTenantDialog = ({ onAddTenant }: { onAddTenant: (tenant: Tenant) => void }) => {
    const [newTenant, setNewTenant] = useState<Omit<Tenant, 'buckets'>>({
      id: '',
      name: '',
      accessKey: '',
      secretKey: '',
    })
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      onAddTenant({ ...newTenant, buckets: [] })
      setNewTenant({ id: '', name: '', accessKey: '', secretKey: '' })
    }
  
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add Tenant</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Tenant</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="id">ID</Label>
              <Input
                id="id"
                value={newTenant.id}
                onChange={(e) => setNewTenant({ ...newTenant, id: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={newTenant.name}
                onChange={(e) => setNewTenant({ ...newTenant, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="accessKey">Access Key</Label>
              <Input
                id="accessKey"
                value={newTenant.accessKey}
                onChange={(e) => setNewTenant({ ...newTenant, accessKey: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="secretKey">Secret Key</Label>
              <Input
                id="secretKey"
                type="password"
                value={newTenant.secretKey}
                onChange={(e) => setNewTenant({ ...newTenant, secretKey: e.target.value })}
                required
              />
            </div>
            <Button type="submit">Add Tenant</Button>
          </form>
        </DialogContent>
      </Dialog>
    )
  }
  