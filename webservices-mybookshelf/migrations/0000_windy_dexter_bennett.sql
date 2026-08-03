CREATE TABLE `books` (
	`isbn` varchar(20) NOT NULL,
	`title` varchar(100) NOT NULL,
	`genre` varchar(100) NOT NULL,
	`description` text NOT NULL,
	`amountPages` int unsigned NOT NULL,
	`author` varchar(255) NOT NULL,
	`imageLink` varchar(255),
	CONSTRAINT `books_isbn` PRIMARY KEY(`isbn`),
	CONSTRAINT `idx_isbn` UNIQUE(`isbn`)
);
--> statement-breakpoint
CREATE TABLE `reviews` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`isbn` varchar(13) NOT NULL,
	`userId` int unsigned NOT NULL,
	`body` text,
	`stars` smallint unsigned NOT NULL,
	`date` date NOT NULL,
	`title` varchar(255) NOT NULL,
	CONSTRAINT `reviews_id` PRIMARY KEY(`id`),
	CONSTRAINT `idx_id` UNIQUE(`id`)
);
--> statement-breakpoint
CREATE TABLE `shelfBooks` (
	`id` int unsigned NOT NULL,
	`isbn` varchar(13) NOT NULL,
	CONSTRAINT `shelfBooks_id_isbn_pk` PRIMARY KEY(`id`,`isbn`)
);
--> statement-breakpoint
CREATE TABLE `shelves` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`userId` int unsigned NOT NULL,
	CONSTRAINT `shelves_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_books` (
	`isbn` varchar(13) NOT NULL,
	`userId` int unsigned NOT NULL,
	`pagesRead` int unsigned NOT NULL,
	`dateStarted` date,
	`dateEnded` date,
	CONSTRAINT `user_books_isbn_userId_pk` PRIMARY KEY(`isbn`,`userId`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`userName` varchar(50) NOT NULL,
	`email` varchar(255) NOT NULL,
	`passwordHash` varchar(255) NOT NULL,
	`roles` json NOT NULL,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `idx_user_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_isbn_books_isbn_fk` FOREIGN KEY (`isbn`) REFERENCES `books`(`isbn`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `shelfBooks` ADD CONSTRAINT `shelfBooks_id_shelves_id_fk` FOREIGN KEY (`id`) REFERENCES `shelves`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `shelfBooks` ADD CONSTRAINT `shelfBooks_isbn_books_isbn_fk` FOREIGN KEY (`isbn`) REFERENCES `books`(`isbn`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `shelves` ADD CONSTRAINT `shelves_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_books` ADD CONSTRAINT `user_books_isbn_books_isbn_fk` FOREIGN KEY (`isbn`) REFERENCES `books`(`isbn`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_books` ADD CONSTRAINT `user_books_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;