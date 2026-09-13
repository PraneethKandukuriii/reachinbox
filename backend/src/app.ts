import express from "express";
import campaignRoutes from "./routes/campaign.routes.js";
import senderRoutes from "./routes/sender.routes.js";
import cors from "cors";
import emailRoutes from "./routes/email.routes.js";



const app = express();

app.use(
  cors({
    origin: "http://localhost:3001",
  }),
);

app.use(express.json());

app.use("/api/campaigns", campaignRoutes);
app.use("/api/senders", senderRoutes);
app.use("/api/emails", emailRoutes);


app.get("/health",(req,res)=>{
    res.status(200).json({message:"Ok"});
})

export default app;

