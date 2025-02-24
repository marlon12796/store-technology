CREATE TABLE `detalles_venta` (
	`id` int AUTO_INCREMENT NOT NULL,
	`codigo_venta` varchar(55) NOT NULL,
	`codigo_producto` varchar(55) NOT NULL,
	`cantidad` int NOT NULL DEFAULT 1,
	`precio` decimal(10,2) NOT NULL,
	`descuento` int NOT NULL DEFAULT 0,
	`eliminado` boolean NOT NULL DEFAULT false,
	CONSTRAINT `detalles_venta_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `productos` (
	`codigo` varchar(55) NOT NULL,
	`nombre` varchar(256) NOT NULL,
	`descripcion` varchar(256) NOT NULL,
	`precio` decimal(10,2) NOT NULL,
	`stock` int NOT NULL,
	`activo` boolean DEFAULT true,
	`categoria` enum('laptop','celular','tablet','monitor','accesorio','otro'),
	CONSTRAINT `productos_codigo` PRIMARY KEY(`codigo`),
	CONSTRAINT `productos_nombre_unique` UNIQUE(`nombre`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`first_name` varchar(256) NOT NULL,
	`correo` varchar(256) NOT NULL,
	`contrasena` varchar(100) NOT NULL,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_first_name_unique` UNIQUE(`first_name`)
);
--> statement-breakpoint
CREATE TABLE `ventas` (
	`codigo` varchar(55) NOT NULL,
	`numero_documento` varchar(50) NOT NULL,
	`fecha_emision` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`cliente` varchar(255) NOT NULL,
	`subtotal` decimal(10,2) NOT NULL,
	`igv` decimal(10,2) NOT NULL,
	`total` decimal(10,2) NOT NULL,
	`eliminado` boolean NOT NULL DEFAULT false,
	CONSTRAINT `ventas_codigo` PRIMARY KEY(`codigo`)
);
--> statement-breakpoint
ALTER TABLE `detalles_venta` ADD CONSTRAINT `detalles_venta_codigo_venta_ventas_codigo_fk` FOREIGN KEY (`codigo_venta`) REFERENCES `ventas`(`codigo`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `detalles_venta` ADD CONSTRAINT `detalles_venta_codigo_producto_productos_codigo_fk` FOREIGN KEY (`codigo_producto`) REFERENCES `productos`(`codigo`) ON DELETE no action ON UPDATE no action;