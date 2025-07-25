import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as UserTable from "./schema/UserTable";
import * as FriendshipTable from "./schema/FriendshipTable";
import * as BookTable from "./schema/BookTable";
import * as AuthorTable from "./schema/AuthorTable";
import * as BookAuthorTable from "./schema/BookAuthorTable";
import * as UserBookTable from "./schema/UserBookTable";
import * as RatingTable from "./schema/ReviewTable";
import * as ReadingTable from "./schema/ReadingTable";
import * as ReadingSnapshotTable from "./schema/ReadingSnapshotTable";
import * as GoalTable from "./schema/GoalTable";
import * as ListTable from "./schema/ListTable";
import * as ListBookTable from "./schema/ListBookTable";

// Postgres client
const client = postgres(process.env.DATABASE_URL!, { prepare: false });

// Schema
const schema = {
	...UserTable,
	...FriendshipTable,
	...BookTable,
	...AuthorTable,
	...BookAuthorTable,
	...UserBookTable,
	...RatingTable,
	...ReadingTable,
	...ReadingSnapshotTable,
	...GoalTable,
	...ListTable,
	...ListBookTable,
} as const;

// DB instance
export const db = drizzle(client, { schema });
