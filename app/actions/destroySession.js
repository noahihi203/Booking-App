"use server";

import { createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";

async function destroySession() {
  //Retrieve the session cookie
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("appwrite_session");
  if (!sessionCookie) {
    return {
      error: "Session not found",
    };
  }
  try {
    const { account } = await createSessionClient(sessionCookie.value);
    //Delete current session
    await account.deleteSession("current");
    //Clear session cookie
    const cookieStore = await cookies();
    cookieStore.delete("appwrite_session");
    return {
      success: true,
    };
  } catch (error) {
    return {
      error: "Error destroying session",
    };
  }
}

export default destroySession;
