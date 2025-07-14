import AppError from "../../../classes/AppError";
import { Friendship } from "../../../types/friendshipTypes";
import { UserSelect } from "../../../types/userTypes";

export default function checkFriendshipUpdateAccess(
	friendship: Friendship,
	user: UserSelect
): void {
	// Requester cannot modify pending request
	if (friendship.status === "pending" && user.id !== friendship.addressee.id) {
		throw new AppError({ message: "Access denied.", status: 403 });
	}

	// Rejected request can be modified after 24h
	if (
		friendship.status === "rejected" &&
		new Date().getTime() - friendship.updatedAt.getTime() < 1000 * 60 * 60 * 24
	) {
		throw new AppError({ message: "Access denied.", status: 403 });
	}
}
