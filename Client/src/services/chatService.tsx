import { chatsClient } from "../lib/api";

export const GetAllChatsService = async () => {
    try {
        const response = await chatsClient.get("/");

        return response.data;
    } catch (error: any) {
        console.error("Error fetching chats:", error);
        throw error;
    }
};

export const GetChatByUserId = async (userId: string) => {
    try {
        console.log(userId);

        const response = await chatsClient.get(`/user/${userId}`);
        console.log(response.data);
        return response.data;
    } catch (error: any) {
        console.error("Error fetching chats:", error);
        throw error;
    }
};

export const CreateChat = async (receiverId: string) => {
    try {
        console.log(receiverId);
        const response = await chatsClient.post("/", { receiverId });
        console.log(response.data);

        return response.data;
    } catch (error: any) {
        console.error("Error creating chat:", error);
        throw error;
    }
};
