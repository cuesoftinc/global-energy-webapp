import { create } from 'zustand';
import { User } from '../types';

interface UserState {
    currentUser: User | null;
    viewedUser: User | null;
    setCurrentUser: (user: User | null) => void;
    setViewedUser: (user: User | null) => void;
}


const useCurrentUserStore = create<UserState>((set) => ({
    currentUser: null,
    viewedUser: null,
    setCurrentUser: (user) => set(() => ({ currentUser: user })),
    setViewedUser: (user) => set(() => ({ viewedUser: user })), 
}));

export default useCurrentUserStore;
