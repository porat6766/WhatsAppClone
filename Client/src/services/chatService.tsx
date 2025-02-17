import { chatsClient } from "../lib/api";

export const GetAllChatsService = async () => {
    try {
        const response = await chatsClient.get("/");
        console.log(response.data);

        return response.data;
    } catch (error: any) {
        console.error("Error fetching chats:", error);
        throw error;
    }
};

