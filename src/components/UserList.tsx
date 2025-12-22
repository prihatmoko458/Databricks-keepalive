
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';

interface UserListProps {
  users: string[];
  currentUser: string;
}

const UserList: React.FC<UserListProps> = ({ users, currentUser }) => {
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
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Online Users</h3>
          <Badge variant="secondary" className="ml-auto">
            {users.length}
          </Badge>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {users.map((user) => (
          <div
            key={user}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
              user === currentUser
                ? 'bg-blue-50 border border-blue-200'
                : 'hover:bg-gray-100'
            }`}
          >
            <div className="relative">
              <Avatar className={`h-10 w-10 bg-gradient-to-r ${getAvatarColor(user)}`}>
                <AvatarFallback className="text-white font-semibold">
                  {getInitials(user)}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium truncate ${
                user === currentUser ? 'text-blue-900' : 'text-gray-900'
              }`}>
                {user} {user === currentUser && '(You)'}
              </p>
              <p className="text-xs text-gray-500">Online</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
