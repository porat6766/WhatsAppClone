import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Chat } from '../../types/types';

interface SearchBarProps {
    setChatsToRender: React.Dispatch<React.SetStateAction<Chat[]>>;
    allChats: Chat[];
}

export const SearchBar: React.FC<SearchBarProps> = ({ setChatsToRender, allChats }) => {
    const [searchQuery, setSearchQuery] = useState("");


    const handleSearch = (query: string) => {
        setSearchQuery(query);

        const filteredChats = allChats.filter((chat) =>
            chat.members.some((member) =>
                member.username.toLowerCase().includes(query.toLowerCase())
            )
        );

        setChatsToRender(filteredChats);
    };


    return (
        <div className="p-3">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Search or start new chat"
                    className="w-full bg-gray-700 text-gray-200 pl-10 pr-4 py-2 rounded-lg focus:outline-none"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </div>
        </div>
    );
};
