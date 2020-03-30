const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const ErrorResponse = require('./errorResponse');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

exports.uploadImage = async files => {
  let results = [];

  if (!files) {
    results = false;
  }

  const images =
    files.images.length && files.images.length > 0
      ? files.images
      : [files.images];

  if (images) {
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      image.mv(`./data/uploads/${image.name}`, error => {
        if (error) {
          return new ErrorResponse(error.message, 500);
        }
      });

      const res = await cloudinary.uploader.upload(
        `./data/uploads/${image.name}`
      );

      results.push(res.secure_url);

      fs.unlink(`./data/uploads/${image.name}`, err => {
        if (err) throw err;
      });
    }
  }

  return results;
};

exports.deleteImage = async urls => {
  public_ids = [];
  urls.forEach(url => {
    public_ids.push(
      url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.'))
    );
  });
  const res = await cloudinary.api.delete_resources(public_ids);
  console.log(res);
  return Object.keys(res.deleted).length;
};
