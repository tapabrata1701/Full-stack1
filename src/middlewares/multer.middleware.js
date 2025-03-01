import multer from 'multer';


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./Public/temp") // Save files in the "./Public/temp" directory
    },
    filename: function (req, file, cb) {     //learn more about uniqueSuffix, file extension and file name
      cb(null, file.originalname) // Use the original file name
    }
  })
  
  export const upload = multer(
    { 
      storage,
    })