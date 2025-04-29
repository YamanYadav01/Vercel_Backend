import express from 'express';
import mongoose from 'mongoose';
import router from './Routes/route/userRoute.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import File from './Model/File.js';
import User from './Model/model.js';

const server = express();

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:5173',  // Frontend URL
    credentials: true,  // Allow cookies to be sent with requests
};

server.use(cors(corsOptions));  // Use CORS middleware
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(cookieParser());  // Use cookie-parser middleware

// File upload configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './Photos');
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

// Serve static photos
server.use('/Photos', express.static('Photos'));

// Routes
server.use('/user', router);
 
// Upload route
server.post('/upload', upload.single('image'), async (req, res) => {
    console.log("userid",  req.body.userId)
    const {userId} = req.body;
    const email = JSON.parse(userId)
    console.log("email,",email)
     const username = await User.findOne({email});
     console.log("username:",username.username)            
    if (req.file) {
        const newFile = new File({
            filename: req.file.filename,
            thoughts: req.body.thoughts,
            userId : req.body.userId,
            username: username.username
        });
        console.log(newFile)
        await newFile.save();
        res.status(200).json({message: "Post Created Successfully"})
        // res.send("Post Created Successfully");
    } else {
        res.status(400).send('No file uploaded');
    }
});

// Example route to set cookie
server.get('/content', (req, res) => {
    console.log("Generating cookie...");
     const email = 'yadavyaman@gmail.com'
    res.cookie("test", email, {
        httpOnly: true,
        secure: false,  // In production, set to `true` with HTTPS
        sameSite: 'None',  // Necessary for cross-origin requests
        expires: new Date(Date.now() + 3600000),  // 1-hour expiry
    });

    res.send("Cookie generated successfully");
});

// MongoDB connection
// mongodb://localhost:27017/Instagram'?
mongoose.connect('mongodb+srv://instagram:insta%40123@social-media55.hzgao28.mongodb.net/socialMediaDB?retryWrites=true&w=majority&appName=social-media55',{
    useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected successfully"))
.catch((err) => console.error("❌ Error connecting to MongoDB:", err));

// Start the server
server.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
