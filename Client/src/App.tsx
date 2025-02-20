import { useEffect, useState } from 'react';
import { SidebarHeader } from './components/Sidebar/SidebarHeader';
import { SearchBar } from './components/Sidebar/SearchBar';
import { ChatListItem } from './components/Sidebar/ChatListItem';
import { ChatHeader } from './components/Chat/ChatHeader';
import { MessageInput } from './components/Chat/MessageInput';
import Login from './components/Login';
import { getAuthTokenFromCookie } from './lib/api';
import { useUserAllProfile, useUserProfile } from './hooks/useUser';
import { useCreateChat } from './hooks/useChat';
import { useGetMessagesByChatId } from './hooks/useMessages';

const App: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<any | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [usersToRender, setUsersToRender] = useState<any[]>();
  const [loggedInUserId, setLoggedInUserId]: any = useState(null);
  const { data: userData } = useUserProfile();
  const { data: allProfiles } = useUserAllProfile();

  const [chatId, setChatId] = useState<string>();

  const { data: ChatData } = useCreateChat(selectedChat?._id);

  const { data: allMessagesFromApi } = useGetMessagesByChatId(chatId);

  useEffect(() => {
    const token = getAuthTokenFromCookie();
    if (token) {
      setIsLoggedIn(true);
      if (allProfiles) setUsersToRender(allProfiles);
      if (userData) setLoggedInUserId(userData._id);
    }
  }, [userData, allProfiles]);

  useEffect(() => {
    setChatId(ChatData?._id);

  }, [ChatData, loggedInUserId, selectedChat]);

  if (!isLoggedIn) {
    return <Login />;
  }

  const handleSelectedUser = (user: any) => {
    setSelectedChat(user);
  };

  return (
    <div className="flex h-screen bg-gray-900">
      <div className="w-96 border-r border-gray-700 flex flex-col">
        <SidebarHeader userDetails={userData} />
        <SearchBar
          setUsersToRender={setUsersToRender}
          allProfiles={allProfiles || []}
        />
        <div className="flex-1 overflow-y-auto">
          {usersToRender && usersToRender.length > 0 ? (
            usersToRender.map((user: any) => (
              <ChatListItem
                loggedInUserId={loggedInUserId}
                key={user._id}
                chat={user}
                isActive={selectedChat?._id === user._id}
                onClick={() => handleSelectedUser(user)}
              />
            ))
          ) : (
            <div className="text-gray-400">No chats found</div>
          )}
        </div>
      </div>

      {selectedChat ? (
        <div className="flex-1 flex flex-col">
          <ChatHeader User={selectedChat} />
          <div className="flex-1 overflow-y-auto p-4 bg-gray-800">
            {/* Render messages */}
            {allMessagesFromApi && allMessagesFromApi.length > 0 ? (
              <div className="message-list">
                {allMessagesFromApi.map((message: any) => (
                  <div
                    key={message._id}
                    className={`message ${message.sender._id === loggedInUserId ? 'sent' : 'received'}`}
                  >
                    <div className="message-header">
                      {/* Display sender's profile picture if available */}
                      <img
                        src={message.sender.profilePic || 'default-profile-pic.png'}
                        alt="Sender"
                        className="profile-pic"
                      />
                      <span className="username">{message.sender.username}</span>
                    </div>

                    {/* Display the message text */}
                    <div className="message-body">
                      <p>{message.text}</p>
                    </div>

                    {/* Display the message timestamp */}
                    <div className="message-footer">
                      <span className="timestamp">{new Date(message.createdAt).toLocaleTimeString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-400">No messages yet</div>
            )}

          </div>
          <MessageInput value={messageInput} onChange={setMessageInput} />
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
