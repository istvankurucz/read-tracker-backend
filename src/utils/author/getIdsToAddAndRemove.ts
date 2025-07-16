export default function getIdsToAddAndRemove(ids: { current: string[]; new: string[] }): {
	add: string[];
	remove: string[];
} {
	// Filter IDs
	const idsToRemove = ids.current.filter((authorId) => !ids.new.includes(authorId));
	const idsToAdd = ids.new.filter((authorId) => !ids.current.includes(authorId));

	// Return IDs
	return {
		add: idsToAdd,
		remove: idsToRemove,
	};
}
