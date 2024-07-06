const { RandomString } = require("../Utils/Helper");
const configApp = require("../config/configApp");
const db = require("../models/index");
const index = async (req, res, next) => {
    const ITEMS_PER_PAGE = 10;
    const config = configApp.config();

    // Get the current page from the query parameters, default to 1 if not provided
    const page = parseInt(req.query.page) || 1;

    // Calculate the offset based on the current page and items per page
    const offset = (page - 1) * ITEMS_PER_PAGE;

    try {
        // Fetch a specific page of products using offset and limit
        const list_products = await db.Product.findAll({
            offset,
            limit: ITEMS_PER_PAGE,
        });

        // Assuming you have the total number of products in the database available
        const totalProducts = await db.Product.count();

        return res.render("../views/product/show.ejs", {
            layout: "../views/index.ejs",
            products: list_products,
            currentPage: page,
            totalPages: Math.ceil(totalProducts / ITEMS_PER_PAGE),
        });
    } catch (error) {
        // Handle errors
        next(error);
    }
};
const data = async (req, res, next) => {
    const list_products = await db.Product.findAll();
    res.json([...list_products])
}
const detail = async (req, res, next) => {
    const id = req.params.id;
    return res.render("../views/product/details.ejs", {
        layout: "../views/index.ejs",
        id: id,
    });
}
const dataDetail = async (req, res, next) => {
    const id = req.params.id;
    const product = await db.Product.findByPk(JSON.parse(id));
    if (product) {
        return res.json(product);
    } else {
        res.status(404)
        return res.json("not found");
    }

}
const create = async (req, res, next) => {
    var list_products = [{ 
        "name": "Giày the thao Puma Jada Blink Black White",
        "company": "",
        "img": "img/giay/puma/jada.png",
        "price": "490000",
        "star": 3,
        "rateCount": 26,
        "promo": {
            "name": "moiramat",
            "value": "0"
        },
        "detail": {
            "size": "42",
            "xuatsu": "ĐỨC"
        },
        "code": "Stt1"
    }, {
        "name": "Giày the thao Puma Men",
        "company": "",
        "img": "img/giay/puma/men.png",
        "price": "740000",
        "star": 3,
        "rateCount": 26,
        "promo": {
            "name": "moiramat",
            "value": "0"
        },
        "detail": {
            "size": "49",
            "xuatsu": "ĐỨC"
        },
        "code": "Stt2"
    }]
    list_products.map((product, i) => {
        const { name,
            company,
            img,
            price,
            star,
            rateCount,
            promo,
            detail,
            code, } = product
        product.price = product.price * 1000
        product.code = RandomString(10)
        db.Product.create(product);
    })
    return res.json("success");
}

module.exports = {
    index,
    data,
    detail,
    create,
    dataDetail,
};
