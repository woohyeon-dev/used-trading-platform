const express = require('express');
const { Jap_reply, User } = require('../models/index');

const router = express.Router();

// GET
router.get('/', async (req, res, next) => {
  try {
    const replies = await Jap_reply.findAll({
      attributes: ['reply_id', 'regdate', 'content'],
      include: [
        {
          model: User,
          attributes: ['nickname'],
        },
      ],
      order: [['reply_id', 'desc']],
    });
    const result = [];
    for (const reply of replies) {
      result.push({
        reply_id: reply.reply_id,
        nickname: reply.User.nickname,
        regdate: reply.regdate,
        content: reply.content,
      });
    }
    return res.json(result);
  } catch (err) {
    next(err);
  }
});

// POST
router.post('/create', async (req, res, next) => {
  try {
    await Jap_reply.create({
      // id는 자동 생성
      writer: req.user,
      content: req.body.content,
      // regdate는 자동생성
    });
    return res.status(201).send('게시글이 등록되었습니다.');
  } catch (err) {
    next(err);
  }
});

// PATCH
router.patch('/update', async (req, res, next) => {
  try {
    await Jap_reply.update(
      {
        content: req.body.content,
      },
      {
        where: { reply_id: req.body.reply_id },
      }
    );
    return res.send('수정되었습니다.');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// DELETE
router.delete('/delete', async (req, res) => {
  try {
    await Jap_reply.destroy({
      where: { reply_id: req.body.reply_id },
    });
    return res.send('삭제 완료!');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.update;

module.exports = router;
