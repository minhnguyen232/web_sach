const configApp = require("../config/configApp");
const db = require("../models/index");
const { Upload } = require("../services/Storage");
const authMethods = require("../services/auth/auth.methods");

const index = async (req, res) => {
    return res.render("../views/admin/index.ejs", {
        layout: "../views/layout/admin.ejs"
    });
}
const Auth = async (req, res) => {
    return res.render("../views/auth/login.ejs", {
        layout: "../views/layout/admin.ejs"
    });
}
const users = async (req, res) => {
    const users = await db.User.findAll({
        where: { role: 0 }
    })
    return res.json(users)
}
const updateOrder = async (req, res) => {
    const id = req.params.id;
    const status = req.body.status;
    const order = await db.Order.findOne({
        where: { order_id: id }
    })
    if (order) {
        db.Order.update({ status: status }, {
            where: { order_id: id },
        })
            .then(([rowsUpdated]) => {
                if (rowsUpdated >= 1) {
                    return res.json({
                        code: 200,
                        message: "Update success"
                    })
                } else {
                    return res.json({
                        code: 503,
                        message: "Update error"
                    })
                }
            })
            .catch((error) => {
                console.log(error);
                return res.json({
                    code: 503,
                    message: "Update error"
                })
            });
    } else {
        return res.json({
            code: 404,
            message: "Not found"
        })
    }
}
const orders = async (req, res) => {
    const orders = await db.Order.findAll({
        include: [
            {
                model: db.Product,
                as: 'product',
            },
            {
                model: db.User,
                as: 'user',
            },
        ],
    })
    return res.json(orders)
}
const addProduct = async (req, res, next) => {
    const folder = 'products';
    const info = await Upload(req, res, folder, 'img');
    if (!info) {
        return res.status(404).
            json({
                code: 500,
                message: "Invalid request"
            })
    }
    const filePath = info.file.path;
    var data = info.body;
    data.img = filePath;
    try {
        db.Product.create(data)
            .then((response) => {
                return res.json({
                    code: 200,
                    message: "Create success"
                })
            })
            .catch((error) => {
                console.log(error);
                return res.json({
                    code: 503,
                    message: "Create error"
                })
            });
    } catch (err) {
        console.log(err);
        return res.json({
            code: 500,
            message: 'Add product failed'
        })
    }
}
const updateProduct = async (req, res, next) => {
    const id = req.params.id;
    const product = await db.Product.findOne({
        where: { id: id }
    })
    if (product) {
        const folder = 'products';
        const info = await Upload(req, res, folder, 'img');

        if (!info) {
            return res.status(404).
                json({
                    code: 500,
                    message: "Invalid request"
                })
        }
        const filePath = info.file.path;
        var data = info.body;
        data.img = filePath;
        db.Product.update(data, {
            where: { id: id },
        })
            .then(([rowsUpdated]) => {
                if (rowsUpdated >= 1) {
                    return res.json({
                        code: 200,
                        message: "Update success"
                    })
                } else {
                    return res.json({
                        code: 503,
                        message: "Update error"
                    })
                }
            })
            .catch((error) => {
                console.log(error);
                return res.json({
                    code: 503,
                    message: "Update error"
                })
            });
    } else {
        return res.json({
            code: 404,
            message: "Not found"
        })
    }
}
const deleteProduct = async (req, res) => {
    const id = req.params.id;
    const product = await db.Product.findOne({
        where: { id: id }
    })
    if (product) {
        db.Product.destroy({
            where: { id: id },
        })
            .then((rowsUpdated) => {
                if (rowsUpdated >= 1) {
                    return res.json({
                        code: 200,
                        message: "Delete success"
                    })
                } else {
                    return res.json({
                        code: 503,
                        message: "Delete error"
                    })
                }
            })
            .catch((error) => {
                console.log(error);
                return res.json({
                    code: 503,
                    message: "Delete error"
                })
            });
    } else {
        return res.json({
            code: 404,
            message: "Not found"
        })
    }
}
const updateUser = async (req, res) => {
    const id = req.params.id;
    const user = await db.User.findOne({
        where: { id: id }
    })
    const data = req.body
    if (user) {
        db.User.update(data, {
            where: { id: id },
        })
            .then(([rowsUpdated]) => {
                if (rowsUpdated >= 1) {
                    return res.json({
                        code: 200,
                        message: "Update success"
                    })
                } else {
                    return res.json({
                        code: 503,
                        message: "Update error"
                    })
                }
            })
            .catch((error) => {
                console.log(error);
                return res.json({
                    code: 503,
                    message: "Update error"
                })
            });
    } else {
        return res.json({
            code: 404,
            message: "Not found"
        })
    }
}
const deleteUser = async (req, res) => {
    const id = req.params.id;
    const user = await db.User.findOne({
        where: { id: id }
    })
    if (user) {
        db.User.destroy({
            where: { id: id },
        })
            .then((rowsUpdated) => {
                if (rowsUpdated >= 1) {
                    db.Order.destroy({
                        where: { user_id: user.id },
                    })
                    return res.json({
                        code: 200,
                        message: "Delete success"
                    })
                } else {
                    return res.json({
                        code: 503,
                        message: "Delete error"
                    })
                }
            })
            .catch((error) => {
                console.log(error);
                return res.json({
                    code: 503,
                    message: "Delete error"
                })
            });
    } else {
        return res.json({
            code: 404,
            message: "Not found"
        })
    }
}
module.exports = {
    index,
    Auth,
    users,
    orders,
    updateOrder,
    addProduct,
    updateProduct,
    deleteProduct,
    updateUser,
    deleteUser
};
