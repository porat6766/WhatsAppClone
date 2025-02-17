import React from 'react';
import { Smile, Paperclip, Mic } from 'lucide-react';

interface MessageInputProps {
    value: string;
    onChange: (value: string) => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({ value, onChange }) => {
    return (
        <div className="p-3 bg-gray-800 flex items-center space-x-3">
            <Smile className="w-6 h-6 text-gray-400 cursor-pointer" />
            <Paperclip className="w-6 h-6 text-gray-400 cursor-pointer" />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Type a message"
                className="flex-1 bg-gray-700 text-gray-200 px-4 py-2 rounded-lg focus:outline-none"
            />
            <Mic className="w-6 h-6 text-gray-400 cursor-pointer" />
        </div>
    );
};