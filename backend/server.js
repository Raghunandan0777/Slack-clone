import express from "express";
import { ENV } from "./src/config/env.js";
import { connectDB } from "./src/config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { functions, inngest } from "./src/config/inngest.js";
import { serve } from "inngest/express";

const app = express();

app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/inngest", serve(inngest, functions));

app.get("/", (req, res) => {
  res.send("app is running");
});

const startServer = async () => {
  try {
    await connectDB();

    app.listen(ENV.PORT, () => {
      console.log("app is running on port:", ENV.PORT);
    });
  } catch (error) {
    console.error("Error starting server", error);
    process.exit(1);
  }
};

startServer();
