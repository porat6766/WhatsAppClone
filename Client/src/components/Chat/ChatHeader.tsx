import React from 'react';
import { Video, Phone, Search, MoreVertical } from 'lucide-react';
import { User } from '../../types/types';

interface ChatHeaderProps {
    User: User;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ User }) => {
    return (
        <div className="p-3 bg-gray-800 flex items-center justify-between">
            <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                    <img src={User?.profilePic} alt="Profile" className="w-full h-full object-cover rounded-full" />
                </div>
                <div className="ml-3">
                    <span className="font-medium text-gray-200">{User?.username}</span>
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
