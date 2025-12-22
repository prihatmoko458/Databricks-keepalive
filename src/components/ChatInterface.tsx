
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Send, LogOut, Users, Phone, Video, MoreVertical } from 'lucide-react';
import MessageBubble from './MessageBubble';
import UserList from './UserList';

interface Message {
  id: number;
  user: string;
  text: string;
  timestamp: Date;
  isCurrentUser: boolean;
}

interface ChatInterfaceProps {
  currentUser: string;
  onLogout: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ currentUser, onLogout }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      user: 'Alice',
      text: 'Hey everyone! Welcome to the chat!',
      timestamp: new Date(Date.now() - 300000),
      isCurrentUser: false,
    },
    {
      id: 2,
      user: 'Bob',
      text: 'Thanks! This looks great 🎉',
      timestamp: new Date(Date.now() - 240000),
      isCurrentUser: false,
    },
    {
      id: 3,
      user: currentUser,
      text: 'Hello! Just joined the chat',
      timestamp: new Date(Date.now() - 60000),
      isCurrentUser: true,
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [showUserList, setShowUserList] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        user: currentUser,
        text: newMessage.trim(),
        timestamp: new Date(),
        isCurrentUser: true,
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const onlineUsers = ['Alice', 'Bob', 'Charlie', currentUser];

  return (
    <div className="h-screen flex flex-col lg:flex-row bg-white">
      {/* Sidebar - User List */}
      <div className={`lg:w-80 bg-gray-50 border-r border-gray-200 ${showUserList ? 'block' : 'hidden'} lg:block`}>
        <UserList users={onlineUsers} currentUser={currentUser} />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowUserList(!showUserList)}
              className="lg:hidden"
            >
              <Users className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-500">
                <AvatarFallback className="text-white font-semibold">GC</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">General Chat</h2>
                <p className="text-sm text-gray-500">{onlineUsers.length} members online</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <Phone className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <Video className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="sm" onClick={onLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <Input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
            <Button
              type="submit"
              disabled={!newMessage.trim()}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
