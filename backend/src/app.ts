import express from "express";
import campaignRoutes from "./routes/campaign.routes.js";
import senderRoutes from "./routes/sender.routes.js";



const app = express();
app.use(express.json());

app.use("/api/campaigns", campaignRoutes);
app.use("/api/senders", senderRoutes);


app.get("/health",(req,res)=>{
    res.status(200).json({message:"Ok"});
})

export default app;

