import React from 'react';
import { MessageCircle, MoreVertical } from 'lucide-react';

export const SidebarHeader: React.FC<{ userDetails: any }> = ({ userDetails }) => {
    return (
        <div className="p-3 bg-gray-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                    <img
                        src={userDetails?.profilePic}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-full"
                    />
                </div>
                <span className="text-white font-medium">{userDetails?.username || "Unknown User"}</span>
            </div>

            <div className="flex items-center space-x-3">
                <MessageCircle className="w-5 h-5 text-gray-400 cursor-pointer" />
                <MoreVertical className="w-5 h-5 text-gray-400 cursor-pointer" />
            </div>
        </div>
    );
};
