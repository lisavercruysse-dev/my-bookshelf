CREATE TABLE `user_books` (
	`isbn` varchar(13) NOT NULL,
	`userId` int unsigned NOT NULL,
	`pagesRead` int unsigned NOT NULL,
	`status` varchar(50) NOT NULL,
	`favorite` boolean NOT NULL DEFAULT false,
	`dateStarted` date,
	`dateEnded` date,
	CONSTRAINT `user_books_isbn_userId_pk` PRIMARY KEY(`isbn`,`userId`)
);
--> statement-breakpoint
ALTER TABLE `books` ADD `favoriteCount` int unsigned NOT NULL;--> statement-breakpoint
ALTER TABLE `user_books` ADD CONSTRAINT `user_books_isbn_books_isbn_fk` FOREIGN KEY (`isbn`) REFERENCES `books`(`isbn`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_books` ADD CONSTRAINT `user_books_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_isbn_books_isbn_fk` FOREIGN KEY (`isbn`) REFERENCES `books`(`isbn`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;