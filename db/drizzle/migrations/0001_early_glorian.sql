CREATE TABLE `userData` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`salary` integer,
	`company` text,
	`position` text,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	`deletedAt` integer,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
