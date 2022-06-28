const express = require('express');
const { Product, User, Category } = require('../models/index');
const { Op } = require('sequelize');
const { upload } = require('../utils/upload');

const router = express.Router();

router.get('/product', async (req, res, next) => {
  console.log(req.query);
  try {
    const catId = req.query.cat_id;
    let searchWord = req.query.searchWord;
    if (!searchWord) {
      searchWord = '';
    }
    let products;
    if (catId) {
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
        where: {
          cat_id: catId,
        },
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
        where: {
          title: {
            [Op.like]: '%' + searchWord + '%',
          },
        },
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
    return res.json(result);
  } catch (err) {
    next(err);
  }
});

router.get('/category', async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      order: [['cat_id']],
    });
    const result = [];
    for (const c of categories) {
      result.push({
        cat_id: c.cat_id,
        cat_name: c.cat_name,
        cat_desc: c.cat_desc,
      });
    }
    return res.json(result);
  } catch (err) {
    next(err);
  }
});

router.post('/create', upload.single('image'), async (req, res, next) => {
  try {
    const { title, cat_id, price, descript } = req.body;
    if (req.user) {
      await Product.create({
        title,
        cat_id,
        price,
        descript,
        image: req.file.filename,
        writer: req.user,
        // p_id 자동
      });
      return res.send('게시글이 작성되었습니다.');
    } else {
      return res.send('로그인 후 이용해주세요');
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
