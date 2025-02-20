import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { User } from '../../types/types';

interface SearchBarProps {
    setUsersToRender: React.Dispatch<React.SetStateAction<User[] | undefined>>;
    allProfiles: User[];
}


export const SearchBar: React.FC<SearchBarProps> = ({ setUsersToRender, allProfiles }) => {
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (allProfiles) {
            setUsersToRender(allProfiles);
        }
    }, [allProfiles]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);

        if (!query.trim()) {
            setUsersToRender(allProfiles);
            return;
        }

        const filteredChats = allProfiles?.filter((profile: any) =>
            profile.username.toLowerCase().includes(query.toLowerCase())
        );

        setUsersToRender(filteredChats || []);
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