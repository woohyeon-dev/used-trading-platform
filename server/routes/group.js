const express = require('express');
const fs = require('fs');
const { Team_member } = require('../models/index');
const { upload } = require('../utils/upload');

const router = express.Router();

// GET
router.get('/', async (req, res, next) => {
  try {
    const members = await Team_member.findAll({});
    return res.json(members);
  } catch (err) {
    next(err);
  }
});

// POST
router.post('/create', upload.single('image'), async (req, res, next) => {
  try {
    const { name, mb_tell, introduction } = req.body;
    await Team_member.create({
      // mb_id 자동 생성
      name,
      mb_tell,
      image: req.file.filename,
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
    await Team_member.update(
      {
        // mb_id 자동 생성
        name,
        mb_tell,
        image: req.file.filename,
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
router.delete('/delete', async (req, res, next) => {
  const fileName = req.query.image;
  if (fs.existsSync('public/' + fileName)) {
    // 파일이 존재한다면 true 그렇지 않은 경우 false 반환
    try {
      fs.unlinkSync('public/' + fileName);
      console.log('이미지 파일 삭제 성공');
      await Team_member.destroy({
        where: { mb_id: req.query.mb_id },
      });
      return res.send('삭제 완료!');
    } catch (err) {
      next(err);
    }
  }
});

module.exports = router;
