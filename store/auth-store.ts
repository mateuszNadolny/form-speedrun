import { create } from 'zustand';

interface LoadingAuthState {
  loading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const useLoadingAuthStore = create<LoadingAuthState>()((set) => ({
  loading: false,
  setIsLoading: (isLoading: boolean) => set(() => ({ loading: isLoading }))
}));

export default useLoadingAuthStore;
