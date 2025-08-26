import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import { User } from "../models/user.model.js";

// Create a client
export const inngest = new Inngest({ id: "slack" });

const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    connectDB();

    const { id, email_addresses, first_name, last_name, image_url } = event.data;

    const newUser = {
      clerkId: id,
      email: email_addresses[0]?.email_address, // fixed typo
      name: `${first_name || ""} ${last_name || ""}`.trim(),
      image: image_url,
    };

    await User.create(newUser);
  }
);

const deleteUserFromDb = inngest.createFunction(
  { id: "delete-user-from-db" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;
    await User.deleteOne({ clerkId: id });
  }
);

// ✅ Export the functions so the SDK can serve them
export const functions = [syncUser, deleteUserFromDb];
