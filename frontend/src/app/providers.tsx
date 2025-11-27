'use client';

import React, { useEffect, useState } from 'react';

interface Theme {
  name: string;
  label: string;
  category: string;
}

const themes: Theme[] = [
  { name: 'light', label: 'Light', category: 'Light' },
  { name: 'dark', label: 'Dark', category: 'Dark' },
  { name: 'cupcake', label: 'Cupcake', category: 'Pastel' },
  { name: 'pastel', label: 'Pastel', category: 'Pastel' },
  { name: 'garden', label: 'Garden', category: 'Pastel' },
  { name: 'bumblebee', label: 'Bumblebee', category: 'Vibrant' },
  { name: 'emerald', label: 'Emerald', category: 'Vibrant' },
  { name: 'acid', label: 'Acid', category: 'Vibrant' },
  { name: 'lemonade', label: 'Lemonade', category: 'Vibrant' },
  { name: 'corporate', label: 'Corporate', category: 'Professional' },
  { name: 'business', label: 'Business', category: 'Professional' },
  { name: 'autumn', label: 'Autumn', category: 'Professional' },
  { name: 'winter', label: 'Winter', category: 'Professional' },
  { name: 'retro', label: 'Retro', category: 'Retro' },
  { name: 'lofi', label: 'Lo-Fi', category: 'Retro' },
  { name: 'wireframe', label: 'Wireframe', category: 'Retro' },
  { name: 'cyberpunk', label: 'Cyberpunk', category: 'Dark & Cool' },
  { name: 'noir', label: 'Noir', category: 'Dark & Cool' },
  { name: 'dracula', label: 'Dracula', category: 'Dark & Cool' },
  { name: 'night', label: 'Night', category: 'Dark & Cool' },
  { name: 'abyss', label: 'Abyss', category: 'Dark & Cool' },
  { name: 'nord', label: 'Nord', category: 'Dark & Cool' },
  { name: 'forest', label: 'Forest', category: 'Warm' },
  { name: 'luxury', label: 'Luxury', category: 'Warm' },
  { name: 'cafe', label: 'Café', category: 'Warm' },
  { name: 'sunset', label: 'Sunset', category: 'Warm' },
  { name: 'coffee', label: 'Coffee', category: 'Warm' },
  { name: 'fantasy', label: 'Fantasy', category: 'Fantasy' },
  { name: 'valentine', label: 'Valentine', category: 'Fantasy' },
  { name: 'halloween', label: 'Halloween', category: 'Fantasy' },
  { name: 'aqua', label: 'Aqua', category: 'Fantasy' },
  { name: 'synthwave', label: 'Synthwave', category: 'Fantasy' },
  { name: 'cmyk', label: 'CMYK', category: 'Modern' },
  { name: 'dim', label: 'Dim', category: 'Modern' },
  { name: 'silk', label: 'Silk', category: 'Modern' },
  { name: 'milky', label: 'Milky', category: 'Modern' },
];

import { SessionProvider, useSession } from 'next-auth/react';
import { useUserStore } from '@/store';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthSync>{children}</AuthSync>
    </SessionProvider>
  );
}

function AuthSync({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const { login, logout } = useUserStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      login({
        id: session.user.id,
        name: session.user.name || '',
        email: session.user.email || '',
        role: session.user.role as any,
      });
    } else if (status === 'unauthenticated') {
      logout();
    }
  }, [session, status, login, logout]);

  if (!mounted) return <>{children}</>;

  return <>{children}</>;
}

export function useTheme() {
  const [theme, setTheme] = useState<string>('light');
  const [mounted, setMounted] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  // Sync theme from backend when session loads
  useEffect(() => {
    if (session?.user?.id) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${session.user.id}`)
        .then(res => res.json())
        .then(data => {
          if (data.theme && data.theme !== theme) {
            setTheme(data.theme);
            document.documentElement.setAttribute('data-theme', data.theme);
            localStorage.setItem('theme', data.theme);
          }
        })
        .catch(err => console.error('Error fetching user theme:', err));
    }
  }, [session]);

  const changeTheme = async (newTheme: string) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    if (session?.user?.id) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${session.user.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ theme: newTheme }),
        });
      } catch (error) {
        console.error('Error saving theme:', error);
      }
    }
  };

  return { theme, changeTheme, mounted, themes };
}

export { themes };
