import type {NextApiRequest, NextApiResponse} from 'next'
import prisma from "@/prisma/client";

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
) {
    try {
        const data = await prisma.post.findMany();
        return response.status(200).json(data);
    } catch (error) {
        return response.status(500).json({error});
    }
}