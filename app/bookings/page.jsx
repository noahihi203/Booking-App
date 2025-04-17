import Heading from "@/components/Heading";
import getMyBooking from "../actions/getMyBooking";
import BookedRoomCard from "@/components/BookedRoomCard";


const BookingsPage = async () => {
    const bookings = await getMyBooking();
    return (
        <>
            <Heading title="My Bookings"/>
            {bookings.length === 0 ? (
                <p className="text-gray-600 mt-4">You have no bookings</p>
            ) : (
                bookings.map((booking) => <BookedRoomCard key={booking.$id} booking={booking} />)
            )}
        </>
    );
}
export default BookingsPage;