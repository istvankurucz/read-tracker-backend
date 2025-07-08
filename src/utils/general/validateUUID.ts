export default function validateUUID(uuid: unknown): boolean {
	const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
	return typeof uuid === "string" && uuidRegex.test(uuid);
}
