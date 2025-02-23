CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`first_name` varchar(256) NOT NULL,
	`correo` varchar(256) NOT NULL,
	`contrasena` varchar(100) NOT NULL,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_first_name_unique` UNIQUE(`first_name`)
);
