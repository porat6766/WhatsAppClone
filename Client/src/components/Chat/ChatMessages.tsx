const ChatMessages = ({ chatMessagesByUserId }: any) => {
    return (
        <div>
            {chatMessagesByUserId.map((message: any) => (
                <div key={message._id}>
                    <p>{message.text}</p>
                </div>
            ))}
        </div>
    )
}

export default ChatMessages
