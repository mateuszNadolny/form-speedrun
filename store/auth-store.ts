import { create } from 'zustand';

interface LoadingAuthState {
  loading: boolean;
  publicId: string | null;
  setIsLoading: (isLoading: boolean) => void;
  setPublicId: (publicId: string) => void;
}

const useLoadingAuthStore = create<LoadingAuthState>()((set) => ({
  loading: false,
  publicId: null,
  setIsLoading: (isLoading: boolean) => set(() => ({ loading: isLoading })),
  setPublicId: (publicId: string) => set(() => ({ publicId }))
}));

export default useLoadingAuthStore;
