export interface Chat {
    _id: string;
    members: { _id: string; username: string; profilePic?: string }[];
    lastMessage?: { text: string; sender: { _id: string } };
    createdAt: string;
    updatedAt: string;
}

export interface Message {
    id: string;
    content: string;
    timestamp: string;
    isOwn: boolean;
    status: 'sent' | 'delivered' | 'read';
}

export interface User {
    contacts: any[];
    createdAt: string;
    email: string;
    isOnline: boolean;
    lastSeen: string;
    profilePic: string;
    status: string;
    updatedAt: string;
    username: string;
    __v: number;
}
