CREATE TABLE `statuses` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(25) NOT NULL,
	CONSTRAINT `statuses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `user_books` MODIFY COLUMN `status` int unsigned NOT NULL;--> statement-breakpoint
ALTER TABLE `user_books` ADD CONSTRAINT `user_books_status_statuses_id_fk` FOREIGN KEY (`status`) REFERENCES `statuses`(`id`) ON DELETE no action ON UPDATE no action;