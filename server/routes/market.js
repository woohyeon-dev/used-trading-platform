const express = require('express');
const { Product, User } = require('../models/index');

const router = express.Router();

router.route('/').get(async (req, res, next) => {
  try {
    const products = await Product.findAll({
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
    const result = [];
    for (const product of products) {
      result.push({
        p_id: product.p_id,
        descript: product.descript,
        price: product.price,
        regdate: product.regdate,
        image: product.image,
        title: product.title,
        nickname: product.User.nickname,
        cat_id: product.cat_id,
      });
    }
    res.json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
