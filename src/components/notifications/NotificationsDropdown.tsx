
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from 'lucide-react';
import NotificationItem from './NotificationItem';

// Mock notifications data - in a real app, this would come from an API
const notifications = [
  {
    id: '1',
    title: 'Your booking request was accepted',
    timestamp: '2h ago',
    type: 'success',
    isRead: false,
  },
  {
    id: '2',
    title: 'New application received for Office Space Photography',
    timestamp: '5h ago',
    type: 'update',
    isRead: false,
  },
  {
    id: '3',
    title: 'Project brief has been updated',
    timestamp: '1d ago',
    type: 'alert',
    isRead: true,
  },
] as const;

const NotificationsDropdown = () => {
  const hasUnread = notifications.some(n => !n.isRead);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative inline-flex items-center justify-center">
        <Bell className="w-5 h-5 text-gray-600 hover:text-gray-900" />
        {hasUnread && (
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
          <div className="py-2 px-4 border-b">
            <h3 className="font-heading font-semibold">Notifications</h3>
          </div>
          <div className="divide-y">
            {notifications.map((notification) => (
              <NotificationItem key={notification.id} {...notification} />
            ))}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationsDropdown;
