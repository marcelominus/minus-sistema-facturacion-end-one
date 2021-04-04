//
const sharp = require('sharp');
const fs = require('fs')
//Importamos SHORTID
const shortid = require('shortid');
//---------------------------------------------
module.exports = async(req, res, next) => {
  try {
    const filename = `${shortid.generate()}.jpeg`;
    const data = await sharp(req.file.path).resize(300, 300).jpeg({quality: 60}).toFile(__dirname + `\\..\\..\\public\\img\\product\\${filename}`);
    fs.unlinkSync(req.file.path);
    req.img = filename;

    next();
  } catch (error) {
    //
    return res.json({ response: "fail-modify" });
  }
};