import React from 'react';
import { User, Video, Phone, Search, MoreVertical } from 'lucide-react';
import { Chat } from '../../types/types';

interface ChatHeaderProps {
    chat: Chat;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ chat }) => {
    return (
        <div className="p-3 bg-gray-800 flex items-center justify-between">
            <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-300" />
                </div>
                <div className="ml-3">
                    <span className="font-medium text-gray-200">{chat.name}</span>
                </div>
            </div>
            <div className="flex items-center space-x-3">
                <Video className="w-5 h-5 text-gray-400 cursor-pointer" />
                <Phone className="w-5 h-5 text-gray-400 cursor-pointer" />
                <Search className="w-5 h-5 text-gray-400 cursor-pointer" />
                <MoreVertical className="w-5 h-5 text-gray-400 cursor-pointer" />
            </div>
        </div>
    );
};
