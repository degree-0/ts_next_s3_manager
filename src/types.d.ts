type Bucket = {
    name: string
    size: number
    itemCount: number
  }

type Tenant = {
    id: string
    name: string
    
    accessKey: string
    secretKey: string
    buckets: Bucket[]
  }