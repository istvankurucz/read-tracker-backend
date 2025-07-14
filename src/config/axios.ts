import axios from "axios";

// Create Google Books API instance
export const googleBooksClient = axios.create({
	baseURL: process.env.GOOGLE_BOOKS_API_URL!,
});
