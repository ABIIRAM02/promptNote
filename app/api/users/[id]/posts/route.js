import Prompt from "@model/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request , {params}) => {
    try {
        await connectToDB()
        
        const prompts = await Prompt.find({creater:params.id}).populate('creater')

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 