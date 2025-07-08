// Friendship status
export const friendshipStatusOptions = ["pending", "accepted", "rejected"] as const;
export type FriendshipStatus = (typeof friendshipStatusOptions)[number];
