   // app.js
   const express = require('express');
   const path = require('path');
   const { exec } = require('child_process');
   const app = express();
   const PORT = process.env.PORT || 3001;
   const multer = require('multer');
   const upload = multer({ dest: 'uploads/' });


   const fs = require('fs');
   const logger = require('morgan');

   // Set the view engine to EJS
   app.set('view engine', 'ejs');

   // Set the directory for views
   app.set('views', path.join(__dirname, 'views'));

   // Serve static files from the 'public' directory
   app.use(express.static(path.join(__dirname, 'public')));

   // Define a route
   app.get('/', (req, res) => {
     res.render('index', { title: 'My Express App', message: 'Hello, World!' });
   });


   app.use(logger('dev'));

   app.use(express.json());
   app.use(express.urlencoded({ extended: true }));
   app.post('/upload', upload.single('file'), async (req, res) => {
    try {
      if (req.file.mimetype !== 'video/mp4') {
        console.log('Invalid file type:', req.file.mimetype);
        return res.status(400).json({ error: 'Only mp4 files are allowed' });
      }
      
      const folderPath = req.body.folderPath; // Get the folder path from the request body
      const filePath = path.join(__dirname, 'uploads', folderPath, req.file.filename + '.mp4');
      const responsePath = 'uploads/' + folderPath + '/' + req.file.filename + '.mp4';

      await fs.promises.mkdir(path.dirname(filePath), { recursive: true });

      await fs.promises.rename(req.file.path, filePath);

      // Convert the file using a promise-based function
      await convertFile(filePath);

      res.json({ message: 'File uploaded and converted successfully', file: responsePath });
    } catch (error) {
      console.error('Error uploading or converting file:', error);
      res.status(500).json({ error: 'Error uploading or converting file' });
    }
  });

  // Helper function to convert the file
  function convertFile(filePath) {
    return new Promise((resolve, reject) => {
      exec(`sh convert.sh ${filePath}`, (err, stdout, stderr) => {
        if (err) {
          console.error('Error executing conversion script:', err);
          return reject('Error executing conversion script');
        }
        console.log('Conversion script executed successfully:', stdout);
        resolve(stdout);
      });
    });
  }


   // Start the server
   app.listen(PORT, () => {
     console.log(`Server is running on http://localhost:${PORT}`);
   });

   // Add this helper function at the top level of your app.js
   function ensureDirectoryExists(filePath) {
     const dirname = path.dirname(filePath);
     if (fs.existsSync(dirname)) {
       return true;
     }
     fs.mkdirSync(dirname, { recursive: true });
     return true;
   }