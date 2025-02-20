import { useQuery } from "@tanstack/react-query";
import { CreateChat, GetAllChatsService, GetChatByUserId } from "../services/chatService";

export const useGetAllChats = () => {
  return useQuery({
    queryKey: ["useGetAllChats"],
    queryFn: () => GetAllChatsService(),
  });
};


export const useGetChatByUserId = (userId?: string) => {
  return useQuery({
    queryKey: ["useGetChatByUserId", userId],
    queryFn: () => GetChatByUserId(userId!),
    enabled: Boolean(userId),
  });
};

export const useCreateChat = (receiverId?: string) => {
  return useQuery({
    queryKey: ["useCreateChat", receiverId],
    queryFn: () => CreateChat(receiverId!),
    enabled: Boolean(receiverId),
  });
};
