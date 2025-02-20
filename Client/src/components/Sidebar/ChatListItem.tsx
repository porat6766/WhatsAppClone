import React from 'react';

interface ChatListItemProps {
    chat: any;
    isActive: boolean;
    onClick: () => void;
    loggedInUserId: string;
}

export const ChatListItem: React.FC<ChatListItemProps> = ({ chat, isActive, onClick, loggedInUserId }) => {


    // const otherMember = chat.members.find((member: any) => member._id !== loggedInUserId);
    // console.log(chat);

    return (
        <div
            onClick={onClick}
            className={`p-4 cursor-pointer ${isActive ? 'bg-gray-700' : 'bg-gray-800'}`}
        >
            <div className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    {chat?.profilePic ? (
                        <img
                            src={chat.profilePic}
                            alt={chat.username}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-600 flex items-center justify-center text-white">
                            {chat?.username}
                        </div>
                    )}
                </div>
                <div className="flex-1">
                    <div className="text-white">{chat?.username}</div>
                </div>
            </div>
        </div>
    );
};
