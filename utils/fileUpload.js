const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const ErrorResponse = require('./errorResponse');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

exports.uploadImage = async req => {
  if (req.files === null) {
    return new ErrorResponse('No files attached', 400);
  }

  const image = req.files.image;

  image.mv(`./data/uploads/${image.name}`, error => {
    if (error) {
      return new ErrorResponse(error.message, 500);
    }
  });

  const res = await cloudinary.uploader.upload(`./data/uploads/${image.name}`);

  fs.unlink(`./data/uploads/${image.name}`, err => {
    if (err) throw err;
  });

  return res.secure_url;
};
