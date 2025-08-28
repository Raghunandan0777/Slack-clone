import express from "express";
import { ENV } from "./src/config/env.js";
import { connectDB } from "./src/config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { functions, inngest } from "./src/config/inngest.js";
import { serve } from "inngest/express";

const app = express();

app.use(express.json());
app.use(clerkMiddleware());

// Inngest v3-compatible handler
app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions,
  })
);

app.get("/", (req, res) => {
  res.send("App is running");
});

// 🔑 Create a function to build the server
export async function buildServer() {
  await connectDB();
  return app;
}

// ✅ Export handler for Vercel
export default async function handler(req, res) {
  const builtApp = await buildServer();
  return builtApp(req, res);
}

// ✅ Only run app.listen locally (not in Vercel)
if (process.env.NODE_ENV !== "production") {
  buildServer().then((builtApp) => {
    builtApp.listen(ENV.PORT || 3000, () => {
      console.log("App running on port:", ENV.PORT || 3000);
    });
  });
}
