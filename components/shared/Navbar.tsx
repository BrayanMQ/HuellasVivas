"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PawPrint, Bell, Menu, X, Plus, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockNotifications } from "@/lib/mock-data";
import NotificationsDropdown from "./NotificationsDropdown";

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const pathname = usePathname();
  const isAuth = pathname === "/login" || pathname === "/register";

  // Mock: simulate logged in state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="rounded-xl bg-primary p-1.5 transition-transform group-hover:scale-110">
            <PawPrint className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-heading text-xl font-bold text-foreground">
            Huellas Vivas
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-2">
          {isLoggedIn ? (
            <>
              <Link href="/create">
                <Button variant="default" size="sm" className="gap-1.5">
                  <Plus className="h-4 w-4" />
                  Crear solicitud
                </Button>
              </Link>

              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setNotifOpen(!notifOpen)}
                  className="relative"
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-secondary-foreground">
                      {unreadCount}
                    </span>
                  )}
                </Button>

                {notifOpen && (
                  <NotificationsDropdown onClose={() => setNotifOpen(false)} />
                )}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLoggedIn(false)}
              >
                Cerrar sesión
              </Button>
            </>
          ) : (
            !isAuth && (
              <Link href="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 border border-border hover:border-primary hover:text-primary transition-colors"
                >
                  <LogIn className="h-4 w-4" />
                  Iniciar sesión
                </Button>
              </Link>
            )
          )}
        </nav>

        {/* Mobile toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-card p-4 animate-fade-in">
          <div className="flex flex-col gap-2">
            {isLoggedIn ? (
              <>
                <Link href="/create" onClick={() => setMobileOpen(false)}>
                  <Button variant="default" size="sm" className="w-full gap-1.5">
                    <Plus className="h-4 w-4" />
                    Crear solicitud
                  </Button>
                </Link>

                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start gap-1.5"
                  onClick={() => setNotifOpen(!notifOpen)}
                >
                  <Bell className="h-4 w-4" />
                  Notificaciones
                  {unreadCount > 0 && (
                    <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-secondary-foreground">
                      {unreadCount}
                    </span>
                  )}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => {
                    setIsLoggedIn(false);
                    setMobileOpen(false);
                  }}
                >
                  Cerrar sesión
                </Button>
              </>
            ) : (
              <Link href="/login" onClick={() => setMobileOpen(false)}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full gap-1.5 border border-border hover:border-primary hover:text-primary transition-colors"
                >
                  <LogIn className="h-4 w-4" />
                  Iniciar sesión
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
