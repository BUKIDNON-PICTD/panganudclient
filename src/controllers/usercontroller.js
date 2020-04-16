// var User = require('../models/user');
var User2 = require("../models/user2");
var Role = require("../models/role");
var jwt = require("jsonwebtoken");
// var config = require('../config/config');
// var db = require('../config/database');
// var bcrypt = require('bcrypt');

User2.belongsTo(Role, { foreignKey: "roleid", sourceKey: "id" });

function createToken(user) {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    global.gConfig.jwtSecret,
    {
      expiresIn: 86400, // 86400 expires in 24 hours
    }
  );
}
// exports.getItems = (req, res) => {
//   User2.findAll({
//     include: [
//       {
//         model: Role,
//         require: true,
//       },
//     ],
//   })
//     .then((users) => {
//       if (users) {
//         return res.status(200).json(users);
//       }
//     })
//     .catch((err) => {
//       return res.status(400).json({ msg: err });
//     });
// };
exports.getAll = async (req, res) => {
  try {
    const users = await User2.findAll({
      include: [
        {
          model: Role,
          require: true,
        },
      ],
    });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User2.findOne({
      where: { id: id },
      include: [
        {
          model: Role,
          require: true,
        },
      ],
    });
    if (user) {
      return res.status(200).json(user);
    }
    return res.status(404).send("User with the specified ID does not exists");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
exports.create = async (req, res) => {
  try {
    const user = await User2.create(req.body);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
exports.update = async (req, res) => {
    try {
      const { id } = req.params;
      const [ updated ] = await User2.update(req.body, {
        where: { id: id }
      });
      if (updated) {
        const updateditem = await User2.findOne({ where: { id: id } });
        return res.status(200).json(updateditem);
      }
      throw new Error('User not found');
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };

  exports.delete = async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await User2.destroy({
        where: { id: id }
      });
      if (deleted) {
        return res.status(204).send("User deleted");
      }
      throw new Error("User not found");
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };

exports.registerUser = (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res
      .status(400)
      .json({ msg: "You need to send username and password" });
  }

  //mysql
  User2.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (user) {
        return res.status(400).json({ msg: "The user already exists" });
      }
      //set default user to muni role
      req.body.roleid = 2;
      User2.create(req.body)
        .then((newuser) => {
          return res.status(201).json(user);
        })
        .catch((err) => {
          return res.status(400).json({ msg: err });
        });
    })
    .catch((err) => {
      return res.status(400).json({ msg: err });
    });
};

exports.changePassword = (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res
      .status(400)
      .json({ msg: "You need to send username and password." });
  }

  //mysql
  User2.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ msg: "The user dose not exist." });
      }

      user
        .update(req.body)
        .then((newuser) => {
          return res.status(201).json(user);
        })
        .catch((err) => {
          return res.status(400).json({ msg: err });
        });
    })
    .catch((err) => {
      return res.status(400).json({ msg: err });
    });
};

exports.loginUser = (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res
      .status(400)
      .send({ msg: "You need to send username and password." });
  }
  //mysql
  User2.findOne({
    include: [
      {
        model: Role,
        require: true,
      },
    ],
    where: {
      username: req.body.username,
    },
  })
    .then(async function (user) {
      if (!(await user.validPassword(req.body.password))) {
        return res
          .status(400)
          .json({ msg: "The username and password don't match." });
      } else {
        return res.status(200).json({
          token: createToken(user),
        });
      }
    })
    .catch((err) => {
      return res.status(400).json({ msg: "The user does not exist" });
    });
};
