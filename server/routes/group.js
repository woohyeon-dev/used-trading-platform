const express = require('express');
const { Team_member } = require('../models/index');
const { upload } = require('../utils/upload');

const router = express.Router();

// GET
router.get('/', async (req, res, next) => {
  try {
    const members = await Team_member.findAll({});
    const result = [];
    for (const m of members) {
      result.push({
        mb_id: m.mb_id,
        name: m.name,
        image: m.image,
        mb_tell: m.mb_tell.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
        introduction: m.introduction,
      });
    }
    return res.json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// POST
router.post('/create', upload.single('image'), async (req, res, next) => {
  try {
    const { name, mb_tell, introduction } = req.body;
    const image = `http://localhost:5000/img/${req.file.filename}`;
    await Team_member.create({
      // mb_id 자동 생성
      name,
      mb_tell,
      image: image,
      introduction,
    });
    return res.status(201).send('추가 완료!');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// PUT
router.put('/update', upload.single('image'), async (req, res, next) => {
  try {
    const { name, mb_tell, introduction } = req.body;
    const image = `http://localhost:5000/img/${req.file.filename}`;
    await Team_member.update(
      {
        // mb_id 자동 생성
        name,
        mb_tell,
        image: image,
        introduction,
      },
      {
        where: { mb_id: req.body.mb_id },
      }
    );
    return res.send('수정 완료!');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// DELETE
router.delete('/delete', async (req, res) => {
  try {
    await Team_member.destroy({
      where: { mb_id: req.query.mb_id },
    });
    return res.send('삭제 완료!');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
