
import { useToast } from "@/hooks/use-toast";
import { Check, AlertTriangle, MessageSquare } from "lucide-react";

type NotificationToastType = "success" | "error" | "info";

interface ToastOptions {
  title: string;
  description?: string;
  type?: NotificationToastType;
}

export const useNotificationToast = () => {
  const { toast } = useToast();

  const showToast = ({ title, description, type = "success" }: ToastOptions) => {
    toast({
      title,
      description,
      duration: 4000,
    });
  };

  return { showToast };
};
