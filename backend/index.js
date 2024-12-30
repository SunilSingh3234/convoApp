const express = require('express');
const multer  = require('multer');
const docxToPDF = require('docx-pdf');
const cors = require("cors");
const path = require("path");

const app = express();
const port = 3000;
app.use(cors());

// file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
    
      cb(null, file.originalname);
    },
  });
  app.post('/converFile', upload.single('file'),  (req, res, next) => {
    try {
        if(!req.file){
            return res.status(400).json({
                message:"Please Upload a File"
            })
            
        }

// defining output path
        let outoutpath =path.join(__dirname,"files",`${req.file.originalname}.pdf`)

        docxToPDF( req.file.path ,outoutpath,(err,result) =>{
            if(err){
              console.log(err);
              return res.status(500).json({
                message:"error to  convert "
              });
            }
            res.download(outoutpath,()=>{
               console.log("file downloaded");
            })
            
          });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"Internal server error"
        })
    }
  })
  
  const upload = multer({ storage: storage })
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})