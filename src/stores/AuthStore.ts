import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import type UserData from '@/types/UserDataType';

export interface AuthStore {
  token: string;
  login(userData: UserData): Promise<boolean>;
  logout(): void;
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || '');

  const login = async (userData: UserData): Promise<boolean> => {
    let result = false;
    await axios.post('http://localhost:8080/auth/login', userData)
      .then(function(response) {
        const data = response.data;
        if (data && data.token) {
          token.value = data.token;
          localStorage.setItem('token', data.token);
        }
        result = true;
      })
      .catch(function() {
        result = false;
      }); 
    return result;
  };

  const logout = () => {
    token.value = '';
    localStorage.removeItem('token');
  };

  return { token, login, logout };
});