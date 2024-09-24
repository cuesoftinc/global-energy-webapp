import toast from "react-hot-toast"
import api from "../utils/interceptor"
import { User } from "../types";
import { useState } from "react";
import { useQuery } from "react-query";

const useGetAllUsers = () => {
    const [users, setUsers] = useState<User[]>([]);

    const getAllUsers = async () => {
        const response = await api.get("/user")
        console.log("response", response)
        return response.data.data
    }
    useQuery("getAllUsers", getAllUsers, {
        onSuccess: (data) => {
            console.log("data", data)
            setUsers(data);
        },
        onError: () => {
            toast.error("error fetching users")
        }
    })

    return { users }
}

export default useGetAllUsers