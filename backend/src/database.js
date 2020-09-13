import mongoose from 'mongoose';

const DATABASE_URL = "mongodb://localhost/youdiet";

mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: false
});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('connected to mongodb')
})