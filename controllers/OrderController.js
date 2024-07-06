const configApp = require("../config/configApp");
const db = require("../models/index");

const data = async (req, res) => {
    const user = req.user;
    const orders = await db.Order.findAll({
        where: { user_id: user.id }
    });
    // for (const order of orders) {
    //     const product = await order.getProduct();
    //     order.product_name = product.name;
    // }
    return res.json(orders)
}
const create = async (req, res) => {
    try {
        const data = req.body
        const user = req.user
        const dataStore = {
            user_id: user.id,
            order_id: data.order_id,
            product_code: data.product_code,
            quantity: data.quantity
        }
        await db.Order.create(dataStore)
        return res.json({
            code: 200,
            message: "Created Order successfully"
        })
    } catch (err) {
        console.log(err);
        return res.json({
            code: 500,
            message: "Created Order fail"
        })
    }
}
module.exports = {
    data,
    create
};
