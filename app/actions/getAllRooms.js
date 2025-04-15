"use server";

import { createAdminClient } from "@/config/appwrite";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function getAllRooms() {
  try {
    const { databases } = await createAdminClient();
    //Fetch rooms
    const { documents: rooms } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS
    );
    //Revalidate the path for this path
    return rooms;
  } catch (error) {
    console.log("Error fetching rooms:", error);
    redirect("/error");
  }
}

export default getAllRooms;
