const multer = require('multer');

// multer 옵션
// hdd에 저장
const storage = multer.diskStorage({
  destination(req, file, cb) {
    // 저장위치 설정
    //req: 요청정보  file : 업로드 파일 정보, cb: 업로드 설정완료시 호출
    // public 폴더에 저장
    cb(null, 'public/');
  },
  filename(req, file, cb) {
    // 저장시 파일명 Date.now()_파일이름
    cb(null, `${Date.now()}__${file.originalname}`);
  },
});

// 미들웨어
// 파일명을 보기 쉽게해서 관리하기 쉽게함
const upload = multer({
  storage: storage,
  // 용량제한 10mb
  limits: { fileSize: 10 * 1024 * 1024 },
});

module.exports.upload = upload;
