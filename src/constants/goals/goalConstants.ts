// Goal type
export const goalTypeOptions = ["yearly", "monthly", "weekly"] as const;
export type GoalType = (typeof goalTypeOptions)[number];
