const express = require('express');
const { Board, User } = require('../models/index');

const router = express.Router();

// 자유게시판 게시물 DB 정보
router.route('/').get(async (req, res, next) => {
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

module.exports = router;
