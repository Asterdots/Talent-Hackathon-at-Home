const multer = require('multer');
const shortid = require('shortid');

module.exports = {
  limits: {fileSize: 1000000},
  storage: fileStorage = multer.diskStorage({
    destination: (req, file, next) => {
      next(null, `${__dirname}/../public/uploads/profiles`);
    },
    filename: (req, file, next) => {
      const extension = file.mimetype.split('/')[1];
      next(null, `${shortid.generate()}.${extension}`);
    }
  }),
  fileFilter(req, file, next) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') next(null, true);
    else next(new Error('Formato no válido'), false); 
  }
};