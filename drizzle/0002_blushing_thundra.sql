CREATE TABLE `detalles_venta` (
	`id` int AUTO_INCREMENT NOT NULL,
	`codigo_venta` varchar(55),
	`codigo_producto` varchar(55),
	`cantidad` int NOT NULL DEFAULT 1,
	`precio` decimal(10,2) NOT NULL,
	`descuento` int NOT NULL DEFAULT 0,
	CONSTRAINT `detalles_venta_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `ventas` (
	`codigo` varchar(55) NOT NULL,
	`numero_documento` varchar(50) NOT NULL,
	`fecha_emision` date NOT NULL DEFAULT now(),
	`cliente` varchar(255) NOT NULL,
	`subtotal` decimal(10,2) NOT NULL,
	`igv` decimal(10,2) NOT NULL,
	`total` decimal(10,2) NOT NULL,
	CONSTRAINT `ventas_codigo` PRIMARY KEY(`codigo`)
);
--> statement-breakpoint
ALTER TABLE `productos` MODIFY COLUMN `categoria` enum('laptop','celular','tablet','monitor','accesorio','otro');--> statement-breakpoint
ALTER TABLE `detalles_venta` ADD CONSTRAINT `detalles_venta_codigo_venta_ventas_codigo_fk` FOREIGN KEY (`codigo_venta`) REFERENCES `ventas`(`codigo`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `detalles_venta` ADD CONSTRAINT `detalles_venta_codigo_producto_productos_codigo_fk` FOREIGN KEY (`codigo_producto`) REFERENCES `productos`(`codigo`) ON DELETE no action ON UPDATE no action;