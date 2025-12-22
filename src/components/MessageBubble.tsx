
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';

interface Message {
  id: number;
  user: string;
  text: string;
  timestamp: Date;
  isCurrentUser: boolean;
}

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      'from-red-400 to-red-600',
      'from-blue-400 to-blue-600',
      'from-green-400 to-green-600',
      'from-purple-400 to-purple-600',
      'from-pink-400 to-pink-600',
      'from-indigo-400 to-indigo-600',
      'from-yellow-400 to-yellow-600',
      'from-teal-400 to-teal-600',
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  return (
    <div className={`flex ${message.isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${message.isCurrentUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {!message.isCurrentUser && (
          <Avatar className={`h-8 w-8 bg-gradient-to-r ${getAvatarColor(message.user)} flex-shrink-0`}>
            <AvatarFallback className="text-white text-xs font-semibold">
              {getInitials(message.user)}
            </AvatarFallback>
          </Avatar>
        )}
        
        <div className={`rounded-2xl px-4 py-2 shadow-sm ${
          message.isCurrentUser
            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-br-sm'
            : 'bg-white text-gray-900 rounded-bl-sm border border-gray-200'
        }`}>
          {!message.isCurrentUser && (
            <p className="text-xs font-semibold text-gray-600 mb-1">{message.user}</p>
          )}
          <p className="text-sm leading-relaxed">{message.text}</p>
          <p className={`text-xs mt-1 ${
            message.isCurrentUser ? 'text-white/70' : 'text-gray-500'
          }`}>
            {formatDistanceToNow(message.timestamp, { addSuffix: true })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
