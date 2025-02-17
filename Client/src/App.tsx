import React, { useEffect, useState } from 'react';
import { SidebarHeader } from './components/Sidebar/SidebarHeader';
import { SearchBar } from './components/Sidebar/SearchBar';
import { ChatListItem } from './components/Sidebar/ChatListItem';
import { ChatHeader } from './components/Chat/ChatHeader';
import { MessageInput } from './components/Chat/MessageInput';
import Login from './components/Login';
import { getAuthTokenFromCookie } from './lib/api';
import { useUserProfile } from './hooks/useUser';
import { useGetAllChats } from './hooks/useChat';

const App: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<any | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [chatsToRender, setChatsToRender] = useState<any[]>();
  const [loggedInUserId, setLoggedInUserId]: any = useState(null);
  const { data: userData } = useUserProfile();

  const { data: allChats } = useGetAllChats();

  useEffect(() => {
    const token = getAuthTokenFromCookie();
    if (token) {
      setIsLoggedIn(true);
      setChatsToRender(allChats);
      setLoggedInUserId(userData?._id);
    }
  }, [userData, allChats]);

  if (!isLoggedIn) {
    return <Login />;
  }

  return (
    <div className="flex h-screen bg-gray-900">
      <div className="w-96 border-r border-gray-700 flex flex-col">
        <SidebarHeader userDetails={userData} />

        <SearchBar setChatsToRender={setChatsToRender} allChats={allChats && allChats} />

        <div className="flex-1 overflow-y-auto">
          {chatsToRender && chatsToRender.length > 0 ? (
            chatsToRender.map((chat: any) => (
              <ChatListItem
                loggedInUserId={loggedInUserId}
                key={chat.id}
                chat={chat}
                isActive={selectedChat?.id === chat.id}
                onClick={() => setSelectedChat(chat)}
              />
            ))
          ) : (
            <div className="text-gray-400">No chats found</div>
          )}
        </div>
      </div>

      {selectedChat ? (
        <div className="flex-1 flex flex-col">
          <ChatHeader chat={selectedChat} />
          <div className="flex-1 overflow-y-auto p-4 bg-gray-800">
          </div>
          <MessageInput
            value={messageInput}
            onChange={setMessageInput}
          />
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-800">
          <p className="text-gray-400">Select a chat to start messaging</p>
        </div>
      )}
    </div>
  );
};

export default App;
