import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { type UserData } from '@/types/LoginFormTypes';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || '');

  const login = async (userData: UserData): Promise<boolean> => {
    const response = await axios.post('http://localhost:8080/auth/login', userData);
    const data = response.data;
    if (data && data.token) {
      token.value = data.token;
      localStorage.setItem('token', data.token);
      return true;
    }
    return false;
  };

  const logout = () => {
    token.value = '';
    localStorage.removeItem('token');
  };

  return { token, login, logout };
});