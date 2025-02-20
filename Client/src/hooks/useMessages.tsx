import { useQuery } from "@tanstack/react-query";
import { GetMessagesByChatId } from "../services/messagesService";

export const useGetMessagesByChatId = (chatId?: string) => {
    console.log(chatId);

    return useQuery({
        queryKey: ['messages', chatId],
        queryFn: () => {
            if (!chatId) throw new Error('chatId is undefined');
            return GetMessagesByChatId(chatId);
        },
        enabled: !!chatId,
    });
};
