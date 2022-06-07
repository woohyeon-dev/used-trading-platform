const express = require('express');
const { Board, Product, User } = require('../models/index');

const router = express.Router();

// 자유게시판 게시물 DB 정보
router.route('/home/board').get(async (req, res, next) => {
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
    for (const b of boards) {
      result.push({
        post_id: b.post_id,
        content: b.content,
        regdate: b.regdate,
        title: b.title,
        views: b.views,
        recommends: b.recommends,
        nickname: b.User.nickname,
      });
    }
    res.json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 중고마켓 게시물 DB 정보
router.route('/home/product').get(async (req, res, next) => {
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

router.post('/home/user', (req, res) => {
  return res.status(200).json({ user: req.user });
});

module.exports = router;
