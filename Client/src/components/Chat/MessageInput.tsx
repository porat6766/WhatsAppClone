import React from 'react';
import { Smile, Paperclip, Mic, Send } from 'lucide-react';

interface MessageInputProps {
    value: string;
    onChange: (value: string) => void;
    onSend?: () => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({
    value,
    onChange,
    onSend = () => { }
}) => {
    const handleSubmit = () => {
        if (value.trim()) {
            onSend();
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey && value.trim()) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="p-3 bg-gray-800 flex items-center space-x-3">
            <Smile className="w-6 h-6 text-gray-400 cursor-pointer hover:text-gray-300 transition-colors" />
            <Paperclip className="w-6 h-6 text-gray-400 cursor-pointer hover:text-gray-300 transition-colors" />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message"
                className="flex-1 bg-gray-700 text-gray-200 px-4 py-2 rounded-lg focus:outline-none"
            />
            {value.trim() ? (
                <Send
                    onClick={handleSubmit}
                    className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400 transition-colors"
                />
            ) : (
                <Mic className="w-6 h-6 text-gray-400 cursor-pointer hover:text-gray-300 transition-colors" />
            )}
        </div>
    );
};

export default MessageInput;