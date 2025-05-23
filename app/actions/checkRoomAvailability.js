"use server";

import { createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";
import { Query } from "node-appwrite";
import { redirect } from "next/navigation";
import { DateTime } from "luxon";

//Convert a date string to a luxon DateTime object in UTC
function toUTCDateTime(dateString) {
  return DateTime.fromISO(dateString, { zone: "utc" }).toUTC();
}

//Check for overlapping date ranges
function dateRangeOverlaps(checkInA, checkOutA, checkInB, checkOutB) {
  return checkInA < checkOutB && checkInB < checkOutA;
}

async function checkRoomAvailability(roomId, checkIn, checkOut) {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get("appwrite_session");
  if (!sessionCookie) {
    redirect("/login");
  }
  try {
    const { databases } = await createSessionClient(sessionCookie.value);
    const checkInDateTime = toUTCDateTime(checkIn);
    const checkOutDateTime = toUTCDateTime(checkOut);
    //Fetch all bookings for given room
    const { documents: bookings } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
      [Query.equal("room_id", roomId)]
    );
    //Loop over booking and check for overlaps
    for (const booking of bookings) {
      const bookingCheckInDateTime = toUTCDateTime(booking.check_in);
      const bookingCheckOutDateTime = toUTCDateTime(booking.check_out);
      if (
        dateRangeOverlaps(
          checkInDateTime,
          checkOutDateTime,
          bookingCheckInDateTime,
          bookingCheckOutDateTime
        )
      ) {
        return false; //Overlap found, do not book
      }
    }
    //If no overlaps found, continue with booking
    return true;
  } catch (error) {
    console.log("Failed to check availability: ", error);
    return {
      error: "Failed to check availability",
    };
  }
}

export default checkRoomAvailability;
