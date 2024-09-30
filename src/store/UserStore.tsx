import { create } from 'zustand'
import { User } from '../types'


interface UsersState {
    users: User[]
    totalPages: number
    totalItems: number
    setUsers: (users: User[]) => void
    setTotalPages: (totalPages: number) => void
    setTotalItems: (totalItems: number) => void
}

const useUsersStore = create<UsersState>((set) => ({
    users: [],
    totalPages: 0,
    totalItems: 0,
    setUsers: (users) => set(() => ({ users })),
    setTotalPages: (totalPages) => set(() => ({ totalPages })),
    setTotalItems: (totalItems) => set(() => ({ totalItems })),
}))

export default useUsersStore
