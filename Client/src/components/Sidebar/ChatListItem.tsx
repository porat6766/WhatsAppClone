import React from 'react';

interface ChatListItemProps {
    chat: any;
    isActive: boolean;
    onClick: () => void;
    loggedInUserId: string;
}

export const ChatListItem: React.FC<ChatListItemProps> = ({ chat, isActive, onClick, loggedInUserId }) => {


    const otherMember = chat.members.find((member: any) => member._id !== loggedInUserId);
    console.log(chat);

    return (
        <div
            onClick={onClick}
            className={`p-4 cursor-pointer ${isActive ? 'bg-gray-700' : 'bg-gray-800'}`}
        >
            <div className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    {otherMember?.profilePic ? (
                        <img
                            src={otherMember.profilePic}
                            alt={otherMember.username}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-600 flex items-center justify-center text-white">
                            {otherMember?.username[0]}
                        </div>
                    )}
                </div>
                <div className="flex-1">
                    <div className="text-white">{otherMember?.username}</div>
                </div>
            </div>
        </div>
    );
};
