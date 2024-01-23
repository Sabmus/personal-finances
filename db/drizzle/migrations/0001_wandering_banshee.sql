CREATE TABLE `category` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	`deletedAt` integer
);
--> statement-breakpoint
CREATE TABLE `paymentMethod` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	`deletedAt` integer
);
--> statement-breakpoint
CREATE TABLE `transaction` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`categoryId` text NOT NULL,
	`paymentMethodId` text NOT NULL,
	`amount` real NOT NULL,
	`hasInstalment` integer,
	`instalmentQuantity` integer,
	`instalmentAmount` real,
	`notes` text,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	`deletedAt` integer,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`paymentMethodId`) REFERENCES `paymentMethod`(`id`) ON UPDATE no action ON DELETE cascade
);
