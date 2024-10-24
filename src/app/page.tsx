import { prisma } from "@/lib/prisma";
import { listBuckets, getBucketTagging } from "@/lib/s3";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, MoreVertical } from "lucide-react";
import { useEffect, useState } from "react";
import { AddTenantDialog } from "@/components/app/add-tenant-dialog";
import { Tenant } from "@/components/app/tenant";

const Home = async () => {
    const [tenants, setTenants] = useState<Tenant[]>([]);

    const handleAddTenant = (newTenant: Tenant) => {
        setTenants([...tenants, newTenant]);
    };

    // initialize the tenants state
    useEffect(() => {
        prisma.tenant.findMany().then((data: any) => {
            setTenants(data);
        });

        tenants.forEach(async (tenant) => {
            const buckets = await listBuckets(tenant.accessKey, tenant.secretKey);
            buckets.Buckets?.forEach(async (bucket) => {
                tenant.buckets.push({
                  name: bucket.Name || "",
                  size: 0,
                  itemCount: 0,
                })
            }
            console.log(buckets);
        })
    }, []);

    const buckets = await listBuckets(tenants?.accessKey || "", tenants?.secretKey || "");
    const firstBucket = buckets.Buckets?.[0];

    const tags = await getBucketTagging(tenants?.accessKey || "", tenants?.secretKey || "", firstBucket?.Name || "");
    // foreach bucket, i would like to apply

    console.log(buckets);

    return (
        <div className="container mx-auto">
            <div className="bg-pink-600 bg-opacity-30 text-white p-2 rounded-md my-2">Head</div>
            <div className="bg-green-600 bg-opacity-30 text-white p-2 rounded-md my-2">
                <div className="container mx-auto p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold">S3 Tenants</h1>
                        <AddTenantDialog onAddTenant={handleAddTenant} />
                    </div>
                    <Accordion type="single" collapsible className="w-full">
                        {tenants.map((tenant) => (
                            <Tenant key={tenant.id} tenant={tenant} />
                        ))}
                    </Accordion>
                </div>
            </div>
            <div className="bg-yellow-600 bg-opacity-30 text-white p-2 rounded-md my-2">Footer</div>
        </div>
    );
};

export default Home;
