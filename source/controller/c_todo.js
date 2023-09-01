const { Op } = require("sequelize");
// import model for todos and user
const { Todos } = require("../model/m_todo");
const { Users } = require("../model/m_user");

// controller for todos
module.exports.TodosAdd = function(req, res) {
    // body payload
    const { title, message, datetime } = req.body;

    // insert todos on logedin user
    Todos.create({
        title, message, datetime, userID: req.user.id
    }).then(result => {
        return res.status(200).send({ 
            status: "Successful", 
            message: "Successfuly creating TODO",
            data: { title, message, datetime }
        });
    }).catch(error => {
        return res.status(400).send({ 
            status: "Invalid", 
            message: "Error accord while creating TODO"
        });
    });
};


// list all todos belongs to the user
module.exports.TodosList = function(req, res) {
    // get the query
    let { page, size, title } = req.query;

    page = parseInt(page);
    size = parseInt(size);

    // list all todos
    Todos.findAndCountAll({
        attributes: ["id", "title", "message", "datetime"],
        where: { userID: req.user.id, active: true, title: {[Op.like]: `%${title}%`} },
        limit: size,
        offset: size * (page - 1),
        order: [["createdAt", "DESC"]],
        raw: true
    }).then(result => {
        // for pagination
        result["cpage"] = page;
        result["tpage"] = Math.ceil(result.count / size);

        res.status(200).send(result);
    }).catch(error => {
        res.status(400).send(error);
    });
};

// list all todos belongs to the user
module.exports.TodosUpdate = function(req, res) {
    // get id of the todo
    const { id } = req.query;
    // get payload
    const { body } = req;

    // update only include fields
    Todos.update(body, {
        where: { id, active: true }
    }).then(result => {
        if (result[0] == 1) {
            res.status(200).send({
                status: "Successful", 
                message: "Successfuly updated TODO",
            });
        } else {
            res.status(200).send({
                status: "Unsuccessful", 
                message: "Nothing to updated TODO",
            });
        }
    }).catch(error => {
        res.status(400).send({
            status: "Invalid",
            message: "Invalid payload, cannot update todo"
        })
    });
};


// list all todos belongs to the user
module.exports.TodosRemove = function(req, res) {
    // get id of the todo
    const { id } = req.query;
    // update only include fields
    Todos.update({ active: false }, {
        where: { id, active: true }
    }).then(result => {
        if (result[0] == 1) {
            res.status(200).send({
                status: "Successful", 
                message: "Successfuly remove TODO",
            });
        } else {
            res.status(200).send({
                status: "Unsuccessful", 
                message: "Nothing to remove TODO",
            });
        }
    }).catch(error => {
        res.status(400).send({
            status: "Invalid",
            message: "Invalid request, cannot remove todo"
        })
    });
};