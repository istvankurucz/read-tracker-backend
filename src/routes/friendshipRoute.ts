import { Router } from "express";
import authUserMW from "../middlewares/auth/authUserMW";
import validateUserIdMW from "../middlewares/user/validateUserIdMW";
import getUserMW from "../middlewares/user/getUserMW";
import validateFriendSearchDataMW from "../middlewares/friend/validateFriendSearchDataMW";
import searchFriendsMW from "../middlewares/friend/searchFriendsMW";
import returnFriendsResultMW from "../middlewares/friend/returnFriendsResultMW";
import getFriendshipsByUserIdMW from "../middlewares/friend/getFriendshipsByUserIdMW";
import returnFriendshipsMW from "../middlewares/friend/returnFriendshipsMW";
import validateCreateFriendshipDataMW from "../middlewares/friend/validateCreateFriendshipDataMW";
import createFriendshipMW from "../middlewares/friend/createFriendshipMW";
import returnFriendshipMW from "../middlewares/friend/returnFriendshipMW";
import validateFriendshipIdMW from "../middlewares/friend/validateFriendshipIdMW";
import validateUpdateFriendshipDataMW from "../middlewares/friend/validateUpdateFriendshipDataMW";
import getFriendshipMW from "../middlewares/friend/getFriendshipMW";
import checkFriendshipUpdateAccessMW from "../middlewares/friend/checkFriendshipUpdateAccessMW";
import updateFriendshipMW from "../middlewares/friend/updateFriendshipMW";
import deleteFriendshipMW from "../middlewares/friend/deleteFriendshipMW";
import sendFriendshipDeletedResponseMW from "../middlewares/friend/sendFriendshipDeletedResponseMW";
import getFriendshipByUsersMW from "../middlewares/friend/getFriendshipByUsersMW";
import validateFriendIdMW from "../middlewares/friend/validateFriendIdMW";

const router = Router({ mergeParams: true });

// Add MWs
router.use(authUserMW, validateUserIdMW, getUserMW);

// Create friendship
router.post("/", validateCreateFriendshipDataMW, createFriendshipMW, returnFriendshipMW);

// Search friendships
router.get("/search", validateFriendSearchDataMW, searchFriendsMW, returnFriendsResultMW);

// Get friendship
router.get("/:friendshipId", validateFriendshipIdMW, getFriendshipMW, returnFriendshipMW);

// Get friendships
router.get("/", getFriendshipsByUserIdMW, returnFriendshipsMW);

// Update friendship
router.put(
	"/:friendshipId",
	validateFriendshipIdMW,
	getFriendshipMW,
	checkFriendshipUpdateAccessMW,
	validateUpdateFriendshipDataMW,
	updateFriendshipMW,
	returnFriendshipMW
);

// Delete friendship
router.delete(
	"/",
	validateFriendIdMW,
	getFriendshipByUsersMW,
	deleteFriendshipMW,
	sendFriendshipDeletedResponseMW
);

export { router as friendshipRote };
