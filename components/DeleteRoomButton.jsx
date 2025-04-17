"use client"
import { FaTrash } from "react-icons/fa";
import deleteRoom from "@/app/actions/deleteRoom";
import { toast } from "react-toastify";

const DeleteRoomButton = ({ roomId }) => {
    const handleDeleteRoom = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this room? This action cannot be undone.");
        if (confirmed) {
            try {
                const response = await deleteRoom(roomId);
                if (response.success) {
                    toast.success("Room deleted successfully!");
                } else {
                    toast.error(response.error || "Failed to delete room. Please try again.");
                }
            } catch (error) {
                console.error("Error deleting room:", error);
                toast.error("Failed to delete room. Please try again.");
            }
        }
    }
    return (
        <button
            onClick={handleDeleteRoom}
            className="bg-red-500 text-white px-4 py-2 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-red-700"
        >
            <FaTrash className="inline mr-1" /> Delete
        </button>
    )
}
export default DeleteRoomButton;