import { messagesClient } from "../lib/api"

export const GetMessagesByChatId = async (chatId: string) => {
    try {
        const response = await messagesClient.get(`/${chatId}`)
        return response.data
    } catch (error) {
        console.error("Error fetching messages:", error)
        throw error
    }
}

