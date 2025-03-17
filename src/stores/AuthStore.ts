import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import type UserData from '@/types/UserDataType';

export interface AuthStore {
  token: string;
  login(userData: UserData): Promise<boolean>;
  logout(): void;
}

export interface SignInResult {
  successMessage: string;
  errorMessage: string;
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || '');

  const signIn = async (userData: UserData): Promise<Partial<SignInResult>> => {
    await axios.post('http://localhost:8080/auth/login', userData)
      .then(function(response) {
        const data = response.data;
        if (data && data.token) {
          token.value = data.token;
          localStorage.setItem('token', data.token);
        }
        return {
          successMessage: 'Successfully logged in',
        }; 
      })
      .catch(function(error) {
        const data = error.response.data;
        const errorMessage = data.message;
        const errorContent = data.erros.username || data.erros.password;
        return {
          errorMessage: `${errorMessage}: ${errorContent}`
        };
      });
    return { errorMessage: 'Invalid credentials' };
  };

  const signOut = () => {
    token.value = '';
    localStorage.removeItem('token');
  };

  return { token, signIn, signOut };
});