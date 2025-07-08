import { timestamp, uuid } from "drizzle-orm/pg-core";

// ID
const id = uuid("id").primaryKey().defaultRandom();

// Timestamp
const updatedAt = timestamp("updated_at")
	.defaultNow()
	.notNull()
	.$onUpdate(() => new Date());
const createdAt = timestamp("created_at").defaultNow().notNull();

export { id, updatedAt, createdAt };
