import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const tenants = await prisma.tenant.findMany();
        res.status(200).json(tenants);
    } catch (error) {
        console.error("Failed to fetch tenants:", error);
        res.status(500).json({ error: "Failed to fetch tenants" });
    }
}
