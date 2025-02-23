CREATE TABLE `productos` (
	`codigo` varchar(55) NOT NULL,
	`nombre` varchar(256) NOT NULL,
	`descripcion` varchar(256) NOT NULL,
	`precio` decimal(10,2) NOT NULL,
	`stock` int NOT NULL,
	`activo` boolean DEFAULT true,
	`categoria` enum('Laptop','Celular','Tablet','Monitor','Accesorio','Otro'),
	CONSTRAINT `productos_codigo` PRIMARY KEY(`codigo`),
	CONSTRAINT `productos_nombre_unique` UNIQUE(`nombre`)
);
