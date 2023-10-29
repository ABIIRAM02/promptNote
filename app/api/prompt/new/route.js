const { connectToDB } = require("@utils/database"); 
import Prompt from "@model/prompt";

export const POST = async ( req , res ) => {
    const { userId , prompt , tag } = await req.json();

    try{
        await connectToDB();
        const newPrompt = new Prompt({
            creater:userId,
            prompt,
            tag
        })

        await newPrompt.save()

        return new Response(JSON.stringify(newPrompt) , { status:201 })

    }catch(error) {
        return new Response('Failed to create new Prompt' , {status : 500})
    }

}