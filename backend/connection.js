const mongoose = require('mongoose');
require('dotenv').config();
const url = process.env.MONGO_URL
;
// asynchrouous function - promise object 
mongoose.connect(url)
.then((result) => {
    console.log('database connected');
    //console.log(result);
}).catch((err) => {
    console.log(err);
    
});
 module.exports = mongoose;