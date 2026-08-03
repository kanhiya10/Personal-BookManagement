import api from "./api";
import {BookData} from "@/types/types";

export const addBook = (formData: any) => {
  return api.post("/books/add", formData, {
 headers: { "Content-Type": "multipart/form-data" },
 });
};

export const fetchAllBooks = () => {
  return api.get("/books/fetchAll");
};


export const getBooks = (params: { status: string; tag: string }) => {
  return api.get("/books", { params });
};

 export const deleteBook = (bookId: string) => 
  api.delete<{ message: string }>(`/books/delete/${bookId}`);

 export const updateBookStatus = (
  id: string,
  status: "Read" | "Reading" | "Completed"
) => {
  return api.patch(`/books/${id}/status`, {
    status,
  });
};