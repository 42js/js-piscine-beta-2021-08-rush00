import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (key, value) => {
  return cookies.set(key, value);
};
