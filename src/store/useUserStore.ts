import { create } from 'zustand';

interface UserState {
    user: {
        id: string;
        name: string;
        email: string;
        role: 'admin' | 'user' | 'provider';
    } | null;
    isAuthenticated: boolean;
    login: (user: UserState['user']) => void;
    logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    isAuthenticated: false,
    login: (user) => set({ user, isAuthenticated: true }),
    logout: () => set({ user: null, isAuthenticated: false }),
}));
