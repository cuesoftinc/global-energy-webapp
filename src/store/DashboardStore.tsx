import { create } from 'zustand'
import { BlogPost } from '../types'


interface DashboardState {
    posts: BlogPost[]
    totalPages: number
    totalItems: number
    isLoading: boolean
    setPosts: (posts: BlogPost[]) => void
    setTotalPages: (totalPages: number) => void
    setTotalItems: (totalItems: number) => void
    setLoading: (isLoading: boolean) => void
}

const useDashboardStore = create<DashboardState>((set) => ({
    posts: [],
    totalPages: 0,
    totalItems: 0,
    isLoading: false,
    setPosts: (posts) => set(() => ({ posts })),
    setTotalPages: (totalPages) => set(() => ({ totalPages })),
    setTotalItems: (totalItems) => set(() => ({ totalItems })),
    setLoading: (isLoading) => set(() => ({ isLoading }))
}))

export default useDashboardStore
