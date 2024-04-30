import { atom } from "recoil";

export const loginState = atom({
  key: "loginState",
  default: false,
});

export const userDataState = atom({
  key: "userDataState",
  default: {
    createdAt: null,
    displayName: null,
    email: null,
    memberId: null,
    modifiedAt: null,
  },
});

export const memberIdState = atom({
  key: "memberIdState",
  default: null,
});
