import { and, eq, ilike, like, not, or, sql } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { UserTable } from "../../drizzle/schema/UserTable";
import { FriendshipResult } from "../../types/friendshipTypes";
import { FriendshipTable } from "../../drizzle/schema/FriendshipTable";

export default async function searchFriends(options: {
	userId: string;
	q: string;
	limit?: number;
}): Promise<FriendshipResult[]> {
	// Extract options
	const { userId, q, limit } = options;

	// Get friends result
	const result = limit
		? await db
				.select({
					id: UserTable.id,
					name: UserTable.name,
					status: FriendshipTable.status,
				})
				.from(UserTable)
				.leftJoin(
					FriendshipTable,
					or(
						eq(FriendshipTable.requesterId, UserTable.id),
						eq(FriendshipTable.addresseeId, UserTable.id)
					)
				)
				.where(
					and(
						not(eq(UserTable.id, userId)),
						or(
							ilike(UserTable.name, `%${q}%`),
							like(sql`CAST(${UserTable.id} AS TEXT)`, `%${q}%`)
						)
					)
				)
				.limit(limit)
		: await db
				.select({
					id: UserTable.id,
					name: UserTable.name,
					status: FriendshipTable.status,
				})
				.from(UserTable)
				.leftJoin(
					FriendshipTable,
					or(
						eq(FriendshipTable.requesterId, UserTable.id),
						eq(FriendshipTable.addresseeId, UserTable.id)
					)
				)
				.where(
					and(
						not(eq(UserTable.id, userId)),
						or(
							ilike(UserTable.name, `%${q}%`),
							like(sql`CAST(${UserTable.id} AS TEXT)`, `%${q}%`)
						)
					)
				);

	// Return result
	return result;
}
