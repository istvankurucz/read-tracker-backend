import { eq } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { ReadingSnapshotTable } from "../../drizzle/schema/ReadingSnapshotTable";

export default async function deleteReadingSnapshot(id: string): Promise<void> {
	await db.delete(ReadingSnapshotTable).where(eq(ReadingSnapshotTable.id, id));
}
