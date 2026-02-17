"use client";

import { Home, User, Plus, LogIn, LogOut } from "lucide-react";
import { NavLink } from "@/components/shared/NavLink";
import { useState } from "react";
import Image from "next/image";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";

const navItems = [
  { title: "Inicio", url: "/", icon: Home },
  { title: "Mi Perfil", url: "/profile", icon: User },
];

export function AppSidebar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Sidebar>
      {/* Header */}
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="Huellas Vivas"
            width={36}
            height={36}
            className="h-9 w-9"
          />
          <span className="font-heading text-lg font-bold italic text-foreground">
            Huellas Vivas
          </span>
        </div>
      </SidebarHeader>

      <SidebarSeparator />

      {/* Navigation */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      href={item.url}
                      end
                      className="flex items-center hover:bg-accent/60 px-2 py-1 rounded-md"
                      activeClassName="bg-accent text-accent-foreground font-semibold"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="p-4">
        {isLoggedIn ? (
          <div className="flex flex-col gap-2">
            <NavLink href="/create">
              <Button variant="default" size="sm" className="w-full gap-1.5">
                <Plus className="h-4 w-4" />
                Crear solicitud
              </Button>
            </NavLink>

            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-1.5"
              onClick={() => setIsLoggedIn(false)}
            >
              <LogOut className="h-4 w-4" />
              Cerrar sesión
            </Button>
          </div>
        ) : (
          <NavLink href="/login">
            <Button variant="default" size="sm" className="w-full gap-1.5">
              <LogIn className="h-4 w-4" />
              Iniciar sesión
            </Button>
          </NavLink>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
