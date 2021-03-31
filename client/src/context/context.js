import { createContext } from "react";

export const AppContext = createContext({
  token: null,
  users: null,
  shifts: null,
  getUsers: () => {},
  getUserShifts: () => {},
  login: () => {},
  logout: () => {}
});
