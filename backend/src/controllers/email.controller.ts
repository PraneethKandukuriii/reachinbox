import {Request, Response} from "express";
import { createEmails } from "../services/email.service.js";

export async function createEmailsController(
    req: Request,
    res: Response
) {
    try{
        const { campaignId } = req.params;
        if (typeof campaignId !== "string") {
  return res.status(400).json({
    message: "Invalid campaign ID",
  });
}
        const { senderId, recipients } = req.body;

        const result = await createEmails({ campaignId, senderId, recipients });
        
        res.status(201).json(result);
    } catch (error) {
        console.error("Failed to create emails:", error);   

        res.status(500).json({
            message: "Failed to create emails",
        });

    }
}




