const express = require('express');
const fs = require('fs');
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
    next(err);
  }
});

// DELETE
router.delete('/delete', async (req, res) => {
  const fileName = req.query.image.replace('http://localhost:5000/img', '');
  if (fs.existsSync('public' + fileName)) {
    // 파일이 존재한다면 true 그렇지 않은 경우 false 반환
    try {
      fs.unlinkSync('public' + fileName);
      console.log('이미지 파일 삭제 성공');
      await Team_member.destroy({
        where: { mb_id: req.query.mb_id },
      });
    } catch (err) {
      next(err);
    }
  }
  return res.send('삭제 완료!');
});

module.exports = router;
