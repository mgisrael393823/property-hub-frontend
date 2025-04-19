
import React from 'react';
import { Check, AlertTriangle, MessageSquare, BellDot } from 'lucide-react';
import { cn } from '@/lib/utils';

type NotificationType = 'success' | 'alert' | 'message' | 'update';

interface NotificationItemProps {
  id: string;
  title: string;
  timestamp: string;
  type: NotificationType;
  isRead: boolean;
}

const iconMap = {
  success: Check,
  alert: AlertTriangle,
  message: MessageSquare,
  update: BellDot,
};

const NotificationItem = ({ title, timestamp, type, isRead }: NotificationItemProps) => {
  const Icon = iconMap[type];

  return (
    <div className={cn(
      "flex items-start gap-3 p-4 cursor-pointer transition-colors hover:bg-gray-50",
      !isRead && "bg-[#7E69AB]/5"
    )}>
      <div className="shrink-0 mt-0.5">
        <Icon className="w-5 h-5 text-[#9b87f5]" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-xs text-gray-500 mt-1">{timestamp}</p>
      </div>
    </div>
  );
};

export default NotificationItem;
