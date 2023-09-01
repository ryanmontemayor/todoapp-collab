// import all controller of todos
const todo_control = require("../controller/c_todo");

// routes of user
module.exports.routeTodos = [
    {
        path: "/todoapp/add",
        method: "post",
        action: todo_control.TodosAdd
    },
    {
        path: "/todoapp/list",
        method: "get",
        action: todo_control.TodosList
    },
    {
        path: "/todoapp/update",
        method: "put",
        action: todo_control.TodosUpdate
    },
    {
        path: "/todoapp/remove",
        method: "put",
        action: todo_control.TodosRemove
    }
];