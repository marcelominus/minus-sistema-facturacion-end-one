//
const sharp = require('sharp');
const fs = require('fs')
//Importamos SHORTID
const shortid = require('shortid');
//---------------------------------------------
module.exports = async(req, res, next) => {
  try {
    const filename = `${shortid.generate()}.jpeg`;
    const data = await sharp(req.file.path).resize(250, 200).jpeg({quality: 60}).toFile(__dirname + `\\..\\..\\public\\img\\company\\${filename}`);
    fs.unlinkSync(req.file.path);
    req.img = filename;

    next();
  } catch (error) {
    //
    console.log(error);
    return res.json({ response: "fail-modify" });
  }
};