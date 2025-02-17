import { useQuery } from "@tanstack/react-query";
import { GetAllChatsService } from "../services/chatService";

export const useGetAllChats = () => {
    return useQuery({
        queryKey: ["useGetAllChats"],
        queryFn: () => GetAllChatsService(),
    });
};


