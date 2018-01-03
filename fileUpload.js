//Using Multer
//https://github.com/expressjs/multer
//https://www.npmjs.com/package/multer

app.post('/upload', (req,res,next)=>{
  const multer = require('multer');
  //const upload = multer().single('file'); //if you dont want to store the file into node server
  const upload = multer({ dest: 'uploads/' }).single('file'); //if you want to store the file into node server
  upload(req, res, err => {
  if (err) {
  // An error occurred when uploading
  return res.send(err);
  }
  console.log(request.file);
  console.log(request.body);

  // Everything went fine
    res.send({message:"file uploaded successfully"});
  }) 
});

//Using Formidable
//https://github.com/felixge/node-formidable
//https://www.npmjs.com/package/formidable
 
app.post('/upload', (req,res,next)=>{
  const formidable = require('formidable')
  // parse a file upload 
  const form = new formidable.IncomingForm();

  form.parse(req, function(err, fields, files) {
    if (err) {
      // An error occurred when uploading
      return res.send(err);
    }
    console.log(fields);
    console.log(files);
    res.send({message:"file uploaded successfully"});
  });
});
