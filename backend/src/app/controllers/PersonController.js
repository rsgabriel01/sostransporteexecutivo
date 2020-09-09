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
      let typeIds = [];

      const { name, cpf_cnpj, rg, phone, email } = req.body;
      const { id_executingperson } = req.headers;

      const executingPersonData = await People.findOne({
        where: {
          id: id_executingperson,
        },
        include: ["People_Type", "Users"],
      });

      if (executingPersonData) {
        const activeExecutingPerson = executingPersonData.Users.active;

        console.log(activeExecutingPerson);

        if (activeExecutingPerson != true) {
          return res.status(401).json({
            message: "Ação não permitida.",
          });
        }

        typeIds = executingPersonData.People_Type.map(function (index) {
          return index.id;
        });
      } else {
        return res.status(401).json({
          message:
            "Esse usuário não tem permissao para realizar essa operação.",
        });
      }

      if (!(typeIds.includes("1") || typeIds.includes("2"))) {
        return res.status(401).json({
          message:
            "Esse usuário não tem permissao para realizar essa operação.",
        });
      }

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

      return res.json({
        createdPerson,
        message: "Cadastro de pessoa efetuado com sucesso!",
      });
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  },

  async show(req, res) {
    try {
      const { idPerson } = req.params;
      const { id_executingperson } = req.headers;

      const executingPersonData = await People.findOne({
        where: {
          id: id_executingperson,
        },
        include: ["People_Type", "Users"],
      });

      if (executingPersonData) {
        const activeExecutingPerson = executingPersonData.Users.active;

        console.log(activeExecutingPerson);

        if (activeExecutingPerson != true) {
          return res.status(401).json({
            message: "Ação não permitida.",
          });
        }

        typeIds = executingPersonData.People_Type.map(function (index) {
          return index.id;
        });
      } else {
        return res.status(401).json({
          message: "Seu usuário não tem permissao para realizar essa operação.",
        });
      }

      if (!(typeIds.includes("1") || typeIds.includes("2"))) {
        return res.status(401).json({
          message: "Seu usuário não tem permissao para realizar essa operação.",
        });
      }

      const person = await People.findByPk(idPerson, {
        include: ["Users", "People_Type"],
      });

      if (!person) {
        return res.status(400).json({
          message: "Nenhum cadastro foi encontrada com o código fornecido.",
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
      let typeIds = [];
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

      const {
        idPeople,
        name,
        cpf_cnpj,
        rg,
        phone,
        email,
        typeAdmin,
        typeAttendance,
      } = req.body;

      const { id_executingperson } = req.headers;

      const executingPersonData = await People.findOne({
        where: {
          id: id_executingperson,
        },
        include: ["People_Type", "Users"],
      });

      if (executingPersonData) {
        const activeExecutingPerson = executingPersonData.Users.active;

        console.log(activeExecutingPerson);

        if (activeExecutingPerson != true) {
          return res.status(401).json({
            message: "Ação não permitida.",
          });
        }

        typeIds = executingPersonData.People_Type.map(function (index) {
          return index.id;
        });
      } else {
        return res.status(401).json({
          message: "Seu usuário não tem permissao para realizar essa operação.",
        });
      }

      if (!(typeIds.includes("1") || typeIds.includes("2"))) {
        return res.status(401).json({
          message: "Seu usuário não tem permissao para realizar essa operação.",
        });
      }

      const oldPersonFinded = await People.findOne({
        where: {
          id: idPeople,
        },
        include: ["People_Type"],
      });

      if (oldPersonFinded) {
        typesPersonId = oldPersonFinded.People_Type.map(function (index) {
          return index.id;
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

      const updatedPerson = await People.update(columnsUpdatePerson, {
        where: {
          id: idPeople,
        },
      });

      if (typeAdminOld && !typeAdmin) {
        if (typeIds.includes("1")) {
          if (id_executingperson == idPeople) {
            return res.status(400).json({
              message:
                "Você não pode REMOVER seu proprio cadastro do grupo de Administradores.",
            });
          }

          const destroyedTypeAdmin = await Type_people.destroy({
            where: {
              id_people: idPeople,
              id_type: 1,
            },
          });

          if (destroyedTypeAdmin) {
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
        if (typeIds.includes("1")) {
          const createdTypeAdmin = await Type_people.create({
            id_people: idPeople,
            id_type: 1,
          });

          if (createdTypeAdmin) {
            removedOrAddTypeAdmin = "added";
          }
        } else {
          return res.status(400).json({
            message:
              "Seu usuário não tem permissão para ADICIONAR esse cadastro ao grupo de Administradores.",
          });
        }
      }

      if (typeAttendanceOld && !typeAttendance) {
        if (id_executingperson == idPeople) {
          return res.status(400).json({
            message:
              "Você não pode REMOVER seu proprio cadastro do grupo de Atendentes.",
          });
        }

        const destroyedTypeAttendance = await Type_people.destroy({
          where: {
            id_people: idPeople,
            id_type: 2,
          },
        });

        if (destroyedTypeAttendance) {
          removedOrAddTypeAttendance = "removed";
        }
      }

      if (!typeAttendanceOld && typeAttendance) {
        const createdTypeAttendance = await Type_people.create({
          id_people: idPeople,
          id_type: 2,
        });

        if (createdTypeAttendance) {
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
