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

INSERT INTO "Type_people" (id_people, id_type) VALUES (1, 1);

INSERT INTO "Type_people" (id_people, id_type) VALUES (2, 1);