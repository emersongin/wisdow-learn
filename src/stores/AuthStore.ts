import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import type UserData from '@/types/UserDataType';

export interface AuthStore {
  token: string;
  signIn(userData: UserData): Promise<boolean>;
  signOut(): void;
}

export interface SignInResult {
  successMessage: string;
  errorMessage: string;
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || '');

  const signIn = async (userData: UserData): Promise<Partial<SignInResult>> => {
    try {
      const response = await axios.post('http://localhost:8080/auth/login', userData);

      console.log(response.data);

      const data = response.data;
      if (data && data.token) {
        token.value = data.token;
        localStorage.setItem('token', data.token);
      }
      return {
        successMessage: 'Successfully logged in',
      }; 
    } catch (error: any) {
      const data = error.response.data;
      const errorMessage = data.message;
      const errorContent = data.erros?.username || data.erros?.password || '';
      return {
        errorMessage: `${errorMessage} ${errorContent}`
      };
    }
  };

  const signOut = () => {
    token.value = '';
    localStorage.removeItem('token');
  };

  return { token, signIn, signOut };
});