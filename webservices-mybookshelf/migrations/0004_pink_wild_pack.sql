ALTER TABLE `reviews` ADD `title` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `reviews` ADD `recommended` boolean NOT NULL;--> statement-breakpoint
ALTER TABLE `shelves` ADD `description` varchar(500);--> statement-breakpoint
ALTER TABLE `shelves` ADD `dateAdded` date NOT NULL;