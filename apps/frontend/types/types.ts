export interface FormData {
    fullname: string,
    username: string;
    email: string;
    password: string;
}

export interface UserType {
  _id: string;
  fullName: string;
  username: string;
  email: string;
}

export type AuthContextType = {
  user: UserType | null;
  loading: boolean;
  login: (user: UserType) => void;
  logout: () => void;
  fetchCurrentUser: () => Promise<void>;
  removeUser: () => void;
};