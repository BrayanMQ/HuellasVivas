"use client";

import { mockNotifications } from "@/lib/mock-data";
import { Bell, FileCheck, MessageSquare, CheckCircle } from "lucide-react";

interface Props {
  onClose: () => void;
}

const iconMap = {
  proof_request: MessageSquare,
  proof_sent: FileCheck,
  donation_completed: CheckCircle,
};

const NotificationsDropdown = ({ onClose }: Props) => {
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute right-0 top-12 z-50 w-80 rounded-lg border bg-card shadow-elevated animate-fade-in">
        <div className="flex items-center gap-2 border-b p-3">
          <Bell className="h-4 w-4 text-primary" />
          <span className="font-heading font-semibold text-sm">
            Notificaciones
          </span>
        </div>

        <div className="max-h-72 overflow-y-auto">
          {mockNotifications.length === 0 ? (
            <p className="p-4 text-center text-sm text-muted-foreground">
              No tienes notificaciones
            </p>
          ) : (
            mockNotifications.map((notif) => {
              const Icon = iconMap[notif.type];

              return (
                <div
                  key={notif.id}
                  className={`flex items-start gap-3 border-b p-3 last:border-0 transition-colors hover:bg-accent/50 ${
                    !notif.read ? "bg-accent/30" : ""
                  }`}
                >
                  <div className="mt-0.5 rounded-full bg-primary/10 p-1.5">
                    <Icon className="h-3.5 w-3.5 text-primary" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm leading-snug">
                      {notif.message}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {notif.createdAt}
                    </p>
                  </div>

                  {!notif.read && (
                    <span className="mt-1 h-2 w-2 rounded-full bg-secondary flex-shrink-0" />
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationsDropdown;
