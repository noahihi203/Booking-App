"use server";

import { revalidatePath } from "next/cache";

export async function submitRoom(formData) {
  await createRoom(formData);
  revalidatePath("/");
}
