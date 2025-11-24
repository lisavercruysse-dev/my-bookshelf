CREATE TABLE `reviews` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`isbn` varchar(13) NOT NULL,
	`userId` int unsigned NOT NULL,
	`body` varchar(1000) NOT NULL,
	`stars` smallint unsigned NOT NULL,
	`date` date NOT NULL,
	`title` varchar(255) NOT NULL,
	CONSTRAINT `reviews_id` PRIMARY KEY(`id`),
	CONSTRAINT `idx_id` UNIQUE(`id`)
);
