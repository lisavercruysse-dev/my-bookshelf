CREATE TABLE `users` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`userName` varchar(100) NOT NULL,
	`email` varchar(255) NOT NULL,
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
