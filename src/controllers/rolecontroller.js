var Role = require("../models/role");
var jwt = require("jsonwebtoken");

exports.getAll = async (req, res) => {
  try {
    const roles = await Role.findAll();
    return res.status(200).json(roles);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findOne({
      where: { id: id },
    });
    if (role) {
      return res.status(200).json(role);
    }
    return res.status(404).send("Role with the specified ID does not exists");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
exports.create = async (req, res) => {
  try {
    const role = await Role.create(req.body);
    return res.status(201).json(role);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
exports.update = async (req, res) => {
    try {
      const { id } = req.params;
      const [ updated ] = await Role.update(req.body, {
        where: { id: id }
      });
      if (updated) {
        const updateditem = await Role.findOne({ where: { id: id } });
        return res.status(200).json(updateditem);
      }
      throw new Error('role not found');
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };

  exports.delete = async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Role.destroy({
        where: { id: id }
      });
      if (deleted) {
        return res.status(204).send("Role deleted");
      }
      throw new Error("Role not found");
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };