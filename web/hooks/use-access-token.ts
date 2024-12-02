import { atom, createStore, useAtom } from "jotai";

export const accessTokenAtom = atom<string | null>(null);

const store = createStore();

export const getAccessToken = () => store.get(accessTokenAtom);
export const setAccessToken = (token: string) =>
  store.set(accessTokenAtom, token);
export const clearAccessToken = () => store.set(accessTokenAtom, null);

export const useAccessToken = () => {
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
  const saveAccessToken = (token: string) => {
    setAccessToken(token);
  };
  const clearAccessToken = () => {
    setAccessToken(null);
  };
  return { accessToken, saveAccessToken, clearAccessToken };
};
