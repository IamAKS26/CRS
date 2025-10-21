const mongoose = require('mongoose')

const mongo_url=process.env.MONGO_CONN;

mongoose.connect(mongo_url)
.then(()=>  {
    console.log('MongoDB connected . . . ');
}).catch((err)=> {
    console.log('mongoDB connection Error',err);
}   )

// The extra '}' at the end has been removed.