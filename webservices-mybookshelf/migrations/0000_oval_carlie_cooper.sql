CREATE TABLE `books` (
	`isbn` varchar(13) NOT NULL,
	`title` varchar(255) NOT NULL,
	`genre` varchar(100) NOT NULL,
	`amountPages` int unsigned NOT NULL,
	`author` varchar(255) NOT NULL,
	`avgRating` double NOT NULL,
	`ratingCount` int unsigned NOT NULL,
	CONSTRAINT `books_isbn` PRIMARY KEY(`isbn`),
	CONSTRAINT `idx_isbn` UNIQUE(`isbn`)
);
