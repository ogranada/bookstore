

CREATE TABLE IF NOT EXISTS roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    descripcion VARCHAR(200)
);

CREATE TABLE IF NOT EXISTS usuarios (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    apellido VARCHAR(100),
    username VARCHAR(100),
    password VARCHAR(200),
    rol_id INT
);

ALTER TABLE usuarios
	ADD CONSTRAINT fk_roles
    FOREIGN KEY (rol_id)
    REFERENCES `roles`(`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE;

INSERT INTO roles (nombre, descripcion) VALUES 
    ("admin", "usuario que administra el sistema"),
	("comprador", "usuario que compra libros"),
	("vendedor", "usuario que vende libros");


INSERT INTO usuarios (nombre, apellido, username, `password`, rol_id) VALUES 
    ("oscar", "granada", "ogranada", "jajajaja", 1),
    ("aldata", "casales", "acasales", "jejejejeje", 2),
    ("Ariel", "Canosa", "acanosa", "jijijiji", 1);



SELECT usuarios.username, `usuarios`.`password`, roles.nombre as rol 
FROM `usuarios` 
INNER JOIN `roles`
ON usuarios.rol_id = roles.id;

SELECT usuarios.username, `usuarios`.`password`, roles.nombre as rol 
FROM `usuarios` 
INNER JOIN `roles`
ON usuarios.rol_id = roles.id
WHERE roles.nombre = "comprador";


