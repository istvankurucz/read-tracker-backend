export default function checkNonEmptyObject(obj: Record<any, any>): boolean {
	return Object.keys(obj).length !== 0;
}
