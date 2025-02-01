require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connection = require('./db');
const chatRouter = require('./Routes/main')

const app = express();
const port = process.env.PORT || 3000;
// const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [];

// const allowedOrigins = [
//     'https://surch-final.vercel.app',
//     'https://surch-final-fbdx.vercel.app',
//     'http://localhost:3001'
// ];

// const corsOptions = {
//     origin: (origin, callback) => {
//         console.log('Request origin:', origin); // Log the request origin
//         if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//             callback(null, true);
//         } else {
//             console.log('Blocked by CORS:', origin); // Log blocked origins
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     methods: ["GET", "POST", "OPTIONS"],
//     optionsSuccessStatus: 200, // Some legacy browsers choke on 204
// };

// app.use(cors(corsOptions));

// // Enable preflight requests for all routes
// app.options('*', cors(corsOptions));

app.use(cors("*"));

// Enable preflight requests for all routes
app.options('*', cors());

// app.options('*', (req, res) => {
//     res.header('Access-Control-Allow-Origin', req.headers.origin);
//     res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
//     res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
//     res.sendStatus(200);
// });

// Debugging middleware to log requests
app.use((req, res, next) => {
    console.log('Request received: ', req.method, req.url);
    next();
});

// Middleware
app.use(express.json());
app.use(helmet());

try{
    connection();
}
catch(e){
    console.log('Database not connected', e);
};

app.use('/chat', chatRouter);

app.listen(port,() => {
    console.log(`server running on port ${port} `);
})