import { create } from "zustand";

export interface chat {
  senderId:string
  message: string;
  createdAt: string;
}

interface stateChatStore {
  memberInfo: IUser | null;
  isOpenChat: boolean;
  setMemberInfo: (memberInfo: IUser) => void;
  setIsOpenChat: (check:boolean) => void;
}

const useChatStore = create<stateChatStore>((set, get) => ({
  memberInfo: null,
  isOpenChat: false,
  setMemberInfo: (memberInfo: IUser) => {
    set({ memberInfo });
  },
  setIsOpenChat: (check) => {
    set({ isOpenChat: check });
  },
}));
export default useChatStore;