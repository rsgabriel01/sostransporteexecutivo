SELECT * FROM "People"

SELECT * FROM "People_address"

SELECT * FROM "Users"

SELECT * FROM "Sessions"

SELECT * FROM "Citys"

SELECT * FROM "Neighborhoods"

SELECT * FROM "Types"

SELECT * FROM "Type_people"

SELECT * FROM "Citys" WHERE name = 'CASCAVEL'

SELECT * FROM "Neighborhoods" WHERE id_city = 5941

INSERT INTO "People" (name, active) VALUES ('ADMINISTRADOR', true);

INSERT INTO "People" (name, cpf_cnpj, rg, phone, email, active) VALUES ('GABRIEL RODRIGUES SOUZA', '092997520901', '128930590', '45998044717', 'rsgabriel01@gmail.com', true);

INSERT INTO "People" (name, cpf_cnpj, rg, phone, email, active) VALUES ('ELAINE DE OLIVEIRA ZANINI', '74136147074', '128930591', '45999887766', 'ezanini1@fag.edu.br', true);

INSERT INTO "People" (name, cpf_cnpj, rg, phone, email, active) VALUES ('ANDRÉ AGUSTO RIBEIRO HELENA', '41865677000', '128930592', '45988776655', 'andrehelena@fag.edu.br', true);

INSERT INTO "Type_people" (id_people, id_type, active) VALUES (1, 1, true);

INSERT INTO "Type_people" (id_people, id_type, active) VALUES (1, 2, false);

INSERT INTO "Type_people" (id_people, id_type, active) VALUES (2, 1, true);

INSERT INTO "Type_people" (id_people, id_type, active) VALUES (2, 2, false);

INSERT INTO "Type_people" (id_people, id_type, active) VALUES (3, 1, true);

INSERT INTO "Type_people" (id_people, id_type, active) VALUES (3, 2, false);

INSERT INTO "Type_people" (id_people, id_type, active) VALUES (4, 1, true);

INSERT INTO "Type_people" (id_people, id_type, active) VALUES (4, 2, false);
