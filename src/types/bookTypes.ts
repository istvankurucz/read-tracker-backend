import { LanguageCode } from "../constants/book/languageConstants";
import { BookTable } from "../drizzle/schema/BookTable";
import { AuthorSelect } from "./authorTypes";
import { UserSelect } from "./userTypes";

//#region Book DB types
export type BookSelect = typeof BookTable.$inferSelect;
export type BookInsert = typeof BookTable.$inferInsert;
export type BookUpdate = Partial<Omit<BookSelect, "id" | "userId" | "updatedAt" | "createdAt">>;
//#endregion

//#region Book result
export type BookSource = "local" | "google";
export type BookResult = {
	id: string;
	title: string;
	subtitle: string | null;
	coverUrl: string;
	authors: string[];
	source: BookSource;
};
//#endregion

//#region Google Books response
export type GoogleBooksResponse = {
	kind: "books#volumes";
	totalItems: number;
	items?: GoogleBooksVolume[];
};
export type GoogleBooksVolume = {
	id: string;
	volumeInfo: VolumeInfo;
};
export type VolumeInfo = {
	title: string;
	subtitle?: string;
	authors?: string[];
	publishedDate?: string;
	description?: string;
	industryIdentifiers?: IndustryIdentifier[];
	pageCount?: number;
	categories?: string[];
	imageLinks?: ImageLinks;
	language: LanguageCode;
};
export type IndustryIdentifier = {
	type: string;
	identifier: string;
};
export type ImageLinks = {
	smallThumbnail: string;
	thumbnail: string;
};
//#endregion

// #region Book
export type LocalBook = Omit<BookSelect, "userId" | "updatedAt" | "createdAt"> & {
	authors: AuthorSelect[];
	updatedAt: Date;
	createdAt: Date;
	user: UserSelect;
	source: "local";
};
export type GoogleBook = Omit<BookSelect, "userId" | "updatedAt" | "createdAt"> & {
	authors: string[];
	source: "google";
};
export type Book = LocalBook | GoogleBook;
//#endregion
