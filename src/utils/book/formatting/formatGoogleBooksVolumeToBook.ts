import { GoogleBook, GoogleBooksVolume } from "../../../types/bookTypes";

export default function formatGoogleBooksVolumeToBook(volume: GoogleBooksVolume): GoogleBook {
	// ISBN
	const isbn =
		volume.volumeInfo.industryIdentifiers?.find((identifier) => identifier.type === "ISBN_10")
			?.identifier ??
		volume.volumeInfo.industryIdentifiers?.[0]?.identifier ??
		null;
	const releaseDate = volume.volumeInfo.publishedDate
		? new Date(volume.volumeInfo.publishedDate)
		: null;

	return {
		id: volume.id,
		title: volume.volumeInfo.title,
		subtitle: volume.volumeInfo.subtitle ?? null,
		authors: volume.volumeInfo.authors ?? [],
		coverUrl: volume.volumeInfo.imageLinks?.thumbnail ?? "",
		pages: volume.volumeInfo.pageCount ?? -1,
		language: volume.volumeInfo.language,
		isbn: isbn,
		genre: volume.volumeInfo.categories?.[0]?.split(" / ")[0] ?? null,
		description: volume.volumeInfo.description ?? null,
		releaseDate: releaseDate,
		source: "google",
	};
}
