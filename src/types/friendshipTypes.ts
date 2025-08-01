import { FriendshipStatus } from "../constants/friendships/friendshipConstants";
import { FriendshipTable } from "../drizzle/schema/FriendshipTable";
import { User } from "./userTypes";

//#region Friendship DB type
export type FriendshipSelect = typeof FriendshipTable.$inferSelect;
export type FriendshipInsert = typeof FriendshipTable.$inferInsert;
export type FriendshipUpdate = Partial<Pick<FriendshipSelect, "status">>;
//#endregion

//#region Friendship search
export type FriendshipResult = {
	id: string;
	name: string;
	status: FriendshipStatus | null;
};
//#endregion

//#region Friendship
export type Friendship = Pick<FriendshipSelect, "id" | "status" | "updatedAt" | "createdAt"> & {
	requester: User;
	addressee: User;
};
//#endregion
