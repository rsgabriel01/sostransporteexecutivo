const { People, Type_people } = require("../models");
const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");

const moment = require("moment");

var CpfValidation = require("../helpers/CpfValidation");

module.exports = {
  async index(req, res) {
    try {
      const people = await People.findAll({});

      return res.json(people);
    } catch (error) {
      console.log(error);
    }
  },

  async store(req, res) {
    try {
      const {
        name,
        cpf_cnpj,
        rg,
        phone,
        email,
        typeAdmin,
        typeAttendance,
      } = req.body;
      const { id_executingperson } = req.headers;

      if (CpfValidation(cpf_cnpj) === false) {
        return res.status(400).json({
          message: "O CPF informado é inválido, por favor verifique.",
        });
      }

      const cpfFinded = await People.findOne({
        where: {
          cpf_cnpj,
        },
      });

      if (cpfFinded) {
        return res.status(400).json({
          message: "O CPF informado já foi cadastrado, por favor verifique.",
        });
      }

      const emailFinded = await People.findOne({
        where: {
          email,
        },
      });

      if (emailFinded) {
        return res.status(400).json({
          message: "O email informado já foi cadastrado, por favor verifique.",
        });
      }

      const createdPerson = await People.create({
        name: name.toUpperCase(),
        cpf_cnpj,
        rg,
        phone,
        email,
        active: true,
      });

      if (createdPerson) {
        const createdTypePeople1 = await Type_people.create({
          id_people: createdPerson.id,
          id_type: 1,
          active: typeAdmin,
        });

        if (createdTypePeople1) {
          const createdTypePeople2 = await Type_people.create({
            id_people: createdPerson.id,
            id_type: 2,
            active: typeAttendance,
          });
        }
      }

      const createdPersonComplete = await People.findByPk(createdPerson.id, {
        include: ["People_Type"],
      });

      return res.json({
        createdPersonComplete,
        message: "Cadastro de pessoa efetuado com sucesso!",
      });
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },

  async show(req, res) {
    try {
      let typesPersonId = [];

      const { idPerson } = req.params;
      const { id_executingperson } = req.headers;

      const person = await People.findByPk(idPerson, {
        include: ["Users", "People_Type"],
      });

      if (!person) {
        return res.status(400).json({
          message:
            "Nenhum cadastro de pessoa foi encontrada com o código fornecido.",
        });
      }

      typesPersonId = person.People_Type.map(function (index) {
        if (index.Type_people.active) {
          return index.Type_people.id_type;
        }
      });

      if (typesPersonId.includes("4")) {
        return res.status(400).json({
          message:
            "Nenhum cadastro de pessoa foi encontrada com o código informado.",
        });
      }

      const {
        id,
        name,
        cpf_cnpj,
        rg,
        phone,
        email,
        active,
        Users,
        People_Type,
      } = person;

      const responseData = {
        person: { id, name, cpf_cnpj, phone, email, active, rg },
        user: Users,
        peopleType: People_Type,
      };

      return res.json(responseData);
    } catch (error) {
      console.log(error);
    }
  },

  async update(req, res) {
    try {
      let typesExecutingPersonIds = [];
      let typesPersonId = [];
      let columnsUpdatePerson = {};

      let removedOrAddTypeAdmin = "";
      let removedOrAddTypeAttendance = "";

      let nameOld = "";
      let cpf_cnpjOld = "";
      let rgOld = "";
      let phoneOld = "";
      let emailOld = "";
      let typeAdminOld;
      let typeAttendanceOld;
      let activeOld;

      const {
        idPeople,
        name,
        cpf_cnpj,
        rg,
        phone,
        email,
        typeAdmin,
        typeAttendance,
        active,
      } = req.body;

      // console.log(req.body);

      const { id_executingperson } = req.headers;

      const executingPersonData = await People.findOne({
        where: {
          id: id_executingperson,
        },
        include: ["People_Type", "Users"],
      });

      typesExecutingPersonIds = executingPersonData.People_Type.map(function (
        index
      ) {
        if (index.Type_people.active) {
          return index.Type_people.id_type;
        }
      });

      const oldPersonFinded = await People.findOne({
        where: {
          id: idPeople,
        },
        include: ["People_Type"],
      });

      console.log(JSON.stringify(oldPersonFinded));

      if (oldPersonFinded) {
        typesPersonId = oldPersonFinded.People_Type.map(function (index) {
          if (index.Type_people.active) {
            return index.Type_people.id_type;
          }
        });

        if (typesPersonId.includes("4")) {
          return res.status(400).json({
            message: "Nenhum cadastro foi encontrada com o código informado.",
          });
        }

        nameOld = oldPersonFinded.name;
        cpf_cnpjOld = oldPersonFinded.cpf_cnpj;
        rgOld = oldPersonFinded.rg;
        phoneOld = oldPersonFinded.phone;
        emailOld = oldPersonFinded.email;
        activeOld = oldPersonFinded.active;

        typeAdminOld = typesPersonId.includes("1") ? true : false;
        typeAttendanceOld = typesPersonId.includes("2") ? true : false;
      } else {
        return res.status(400).json({
          message: "Nenhum cadastro foi encontrada com o código informado.",
        });
      }

      if (nameOld.toUpperCase() != name.toUpperCase()) {
        columnsUpdatePerson["name"] = name.toUpperCase();
      }

      if (cpf_cnpjOld != cpf_cnpj) {
        if (CpfValidation(cpf_cnpj) === false) {
          return res.status(400).json({
            message: "O CPF informado é inválido, por favor verifique.",
          });
        }

        const cpfFinded = await People.findOne({
          where: {
            cpf_cnpj,
          },
        });

        if (cpfFinded) {
          return res.status(400).json({
            message:
              "O CPF informado para alteração já foi cadastrado, por favor verifique.",
          });
        }

        columnsUpdatePerson["cpf_cnpj"] = cpf_cnpj;
      }

      if (rgOld != rg) {
        columnsUpdatePerson["rg"] = rg;
      }

      if (phoneOld != phone) {
        columnsUpdatePerson["phone"] = phone;
      }

      if (emailOld != email) {
        if (email != "") {
          const emailFinded = await People.findOne({
            where: {
              email,
            },
          });

          if (emailFinded) {
            return res.status(400).json({
              message:
                "O email informado  já foi cadastrado, por favor verifique.",
            });
          }
        }

        columnsUpdatePerson["email"] = email;
      }

      if (activeOld != active) {
        if (
          !typesExecutingPersonIds.includes("1") &&
          typesPersonId.includes("1")
        ) {
          return res.status(400).json({
            message:
              "Seu usuário não tem permissão para MUDAR o status de cadastros de perfis Administradores.",
          });
        }

        if (id_executingperson == idPeople) {
          return res.status(400).json({
            message: "Você não pode INATIVAR seu proprio cadastro.",
          });
        }

        columnsUpdatePerson["active"] = active;
      }

      console.log(columnsUpdatePerson);

      const updatedPerson = await People.update(columnsUpdatePerson, {
        where: {
          id: idPeople,
        },
      });

      console.log(`TypeAdminOld: ${typeAdminOld} TypeAdmin: ${typeAdmin}`);

      if (typeAdminOld && !typeAdmin) {
        if (typesExecutingPersonIds.includes("1")) {
          if (id_executingperson == idPeople) {
            return res.status(400).json({
              message:
                "Você não pode REMOVER seu proprio cadastro do grupo de Administradores.",
            });
          }

          const inactivedTypeAdmin = await Type_people.update(
            { active: false },
            {
              where: {
                id_people: idPeople,
                id_type: 1,
              },
            }
          );

          if (inactivedTypeAdmin) {
            removedOrAddTypeAdmin = "removed";
          }
        } else {
          return res.status(400).json({
            message:
              "Seu usuário não tem permissão para REMOVER esse cadastro do grupo de Administradores.",
          });
        }
      }

      if (!typeAdminOld && typeAdmin) {
        if (typesExecutingPersonIds.includes("1")) {
          const activedTypeAdmin = await Type_people.update(
            { active: true },
            {
              where: {
                id_people: idPeople,
                id_type: 1,
              },
            }
          );

          if (activedTypeAdmin) {
            removedOrAddTypeAdmin = "added";
          }
        } else {
          return res.status(400).json({
            message:
              "Seu usuário não tem permissão para ADICIONAR esse cadastro ao grupo de Administradores.",
          });
        }
      }

      console.log(
        `TypeAttendanceOld: ${typeAttendanceOld} TypeAttendance: ${typeAttendance}`
      );

      if (typeAttendanceOld && !typeAttendance) {
        if (id_executingperson == idPeople) {
          return res.status(400).json({
            message:
              "Você não pode REMOVER seu proprio cadastro do grupo de Atendentes.",
          });
        }

        const inactivedTypeAttendance = await Type_people.update(
          { active: false },
          {
            where: {
              id_people: idPeople,
              id_type: 2,
            },
          }
        );

        if (inactivedTypeAttendance) {
          removedOrAddTypeAttendance = "removed";
        }
      }

      if (!typeAttendanceOld && typeAttendance) {
        const activedTypeAttendance = await Type_people.update(
          { active: true },
          {
            where: {
              id_people: idPeople,
              id_type: 2,
            },
          }
        );

        if (activedTypeAttendance) {
          removedOrAddTypeAttendance = "added";
        }
      }

      const newPersonFinded = await People.findOne({
        where: {
          id: idPeople,
        },
        include: ["People_Type"],
      });

      return res.json({
        newPersonFinded,
        message: "Cadastro alterado com sucesso.",
      });
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },
};
