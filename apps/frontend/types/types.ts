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

export type BookData = {
    title: string;
    author: string;
    status: "Read" | "Reading" | "Completed";
    tags: string;
    coverImage: File | null;
};

export type DashboardData = {
    totalBooks: number;
    completed: number;
    reading: number;
    wantToRead: number;
    books: {
        _id: string;
        title: string;
        author: string;
        coverImage: string;
        status: "Read" | "Reading" | "Completed";
    }[];
};
