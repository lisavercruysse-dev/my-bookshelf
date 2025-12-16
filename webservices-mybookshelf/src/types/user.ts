import { users } from 'src/drizzle/schema';

export type User = typeof users.$inferSelect;
