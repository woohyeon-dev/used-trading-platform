const express = require('express');
const { Product, User, Category } = require('../models/index');

const router = express.Router();

const catId = 0;

router.route('/product').get(async (req, res, next) => {
  try {
    console.log(req.query.cat_id);
    let catId = req.query.cat_id;
    let products;
    if (catId == 0) {
      products = await Product.findAll({
        attributes: {
          exclude: ['writer'],
        },
        include: [
          {
            model: User,
            attributes: ['nickname'],
          },
        ],
        order: [['p_id', 'desc']],
      });
    } else {
      products = await Product.findAll({
        attributes: {
          exclude: ['writer'],
        },
        include: [
          {
            model: User,
            attributes: ['nickname'],
          },
        ],
        where: { cat_id: catId },
        order: [['p_id', 'desc']],
      });
    }

    const result = [];
    for (const p of products) {
      result.push({
        p_id: p.p_id,
        descript: p.descript,
        price: p.price,
        regdate: p.regdate,
        image: p.image,
        title: p.title,
        nickname: p.User.nickname,
        cat_id: p.cat_id,
      });
    }
    res.json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.route('/category').get(async (req, res, next) => {
  try {
    const categories = await Category.findAll({});
    const result = [];
    for (const c of categories) {
      result.push({
        cat_id: c.cat_id,
        cat_name: c.cat_name,
        cat_desc: c.cat_desc,
      });
    }
    res.json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
