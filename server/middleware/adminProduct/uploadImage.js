//Importamos MULTER
const multer  = require('multer');
//Importamos SHORTID
const shortid = require('shortid');

//---------------------------------------------
module.exports = function (req, res, next) {
  try {
    const configurationMulter = {
        storage : fileStorage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, __dirname + '\\..\\..\\public\\img\\product');
            },
            filename : (req, file, cb) => {
                const extension = file.mimetype.split('/')[1];
                const nombreImg = `${shortid.generate()}.${extension}`;
                cb(null, nombreImg);
            }
        }),
        fileFilter(req, file, cb){
            if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
                cb(null, true);
            }else{
                cb(new Error('format-no-validate'))
            }
        }
    }
    const uploadFile = multer(configurationMulter).single('image');
    uploadFile(req, res, function(error){
        if(error){
            res.json({ response : 'error'})
        }else{            
            next();
        }
    })
    
  } catch (error) {
    return res.status(401).json({ msg: "fail-upload" });
  }
};