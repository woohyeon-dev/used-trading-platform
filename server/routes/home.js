const express = require('express');
const { Board, Product, User } = require('../models/index');

const router = express.Router();

// 자유게시판 게시물 DB 정보
router.route('/api/po').get(async (req, res, next) => {
  try {
    const boards = await Board.findAll({
      attributes: {
        exclude: ['writer'],
      },
      include: [
        {
          model: User,
          attributes: ['nickname'],
        },
      ],
      order: [['post_id', 'desc']],
      limit: 7,
    });
    const result = [];
    for (const board of boards) {
      result.push({
        post_id: board.post_id,
        descript: board.descript,
        regdate: board.regdate,
        title: board.title,
        views: board.views,
        recommends: board.recommends,
        nickname: board.User.nickname,
      });
    }
    res.json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 중고마켓 게시물 DB 정보
router.route('/api/pr').get(async (req, res, next) => {
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
      limit: 10,
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
