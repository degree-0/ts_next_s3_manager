"use client";
import { prisma } from "@/lib/prisma";
import { listBuckets, getBucketTagging } from "@/lib/s3";
import { Accordion } from "@/components/ui/accordion";
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
        const fetchTentants = async () => {
            try {
                fetch("/api/tenants").then((response) => {
                    response.json().then((data) => {
                        setTenants(data);

                        tenants.forEach((tenant: Tenant) => {
                            const buckets = listBuckets(tenant.accessKey, tenant.secretKey).then((buckets) => {
                                buckets.Buckets?.forEach(async (bucket) => {
                                    tenant.buckets.push({
                                        name: bucket.Name || "",
                                        size: 0,
                                        itemCount: 0,
                                    });
                                });
                            });
                        });
                    });
                });
            } catch (error) {
                console.error("Failed to fetch tenants:", error);
            }
        };

        fetchTentants();
    }, []);

    console.log(tenants);

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
