import { create } from 'zustand'
import { Subscription } from '../types'


interface SubState {
    subs: Subscription[]
    totalPages: number
    totalItems: number
    setSubs: (subs: Subscription[]) => void
    setTotalPages: (totalPages: number) => void
    setTotalItems: (totalItems: number) => void
}

const useSubscriptionStore = create<SubState>((set) => ({
    subs: [],
    totalPages: 0,
    totalItems: 0,
    setSubs: (subs) => set(() => ({ subs })),
    setTotalPages: (totalPages) => set(() => ({ totalPages })),
    setTotalItems: (totalItems) => set(() => ({ totalItems })),
}))

export default useSubscriptionStore
