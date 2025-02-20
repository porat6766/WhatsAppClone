import axios from "axios";

export const getAuthTokenFromCookie = () => {
  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((cookie) => cookie.startsWith("token"));
  return tokenCookie ? tokenCookie.split("=")[1] : null;
};

export const deleteToken = () => {
  document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
};

export const usersClient = axios.create({
  baseURL:
    "http://localhost:3000/users",

  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${getAuthTokenFromCookie()}`,
  },
});

export const chatsClient = axios.create({
  baseURL: "http://localhost:3000/chats",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${getAuthTokenFromCookie()}`,
  },
});

export const messagesClient = axios.create({
  baseURL: "http://localhost:3000/messages",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${getAuthTokenFromCookie()}`,
  },
});

