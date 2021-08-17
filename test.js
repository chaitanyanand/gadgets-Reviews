const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost')
mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true });
BlogPost.create({
    title: 'The Mythbuster’s Guide to Saving Money on Energy Bills',
    body: 'If you have been here a long time, you might remember when I went on ITV Tonight to' 

}, (error, blogpost) => {
        console.log(error, blogpost)
    })
    var id = "60be3e143dff7a24d81beed5";
    BlogPost.findByIdAndDelete(id, (error, blogspot) =>{
    console.log(error,blogspot)
    })
  
