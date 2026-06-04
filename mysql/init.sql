use app_db;

CREATE TABLE users(
	id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(80) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    cpf  CHAR(11) NOT NULL UNIQUE,
    nome VARCHAR(80) NOT NULL,
    adm BOOL DEFAULT FALSE,
    ativo BOOL DEFAULT FALSE
);

CREATE TABLE eventos(
	id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(50) NOT NULL,
    texto VARCHAR(255) NOT NULL,
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL
);

CREATE TABLE certificados(
	id INT AUTO_INCREMENT PRIMARY KEY,
    carga_horaria INT NOT NULL,
    id_user INT NOT NULL,
    id_evento INT NOT NULL,
    
    UNIQUE(id_user, id_evento),
    
    FOREIGN KEY(id_user) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(id_evento) REFERENCES eventos(id) ON DELETE CASCADE
);