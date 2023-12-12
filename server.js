const express = require("express")
const mongoose = require("mongoose")
const Article = require("./models/article")
const ArticleRouter = require("./routes/articles")
const methodOverride = require("method-override")

const app = express()
const port = 3000

mongoose.connect('mongodb://127.0.0.1:27017/blog')
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });



app.set('view engine', 'ejs')


app.use(express.urlencoded({extended : false}))
app.use(methodOverride('_method'))


app.get("/", async (req, res)=>{
    const articles = await Article.find().sort({ createdAt: 'desc' })
    res.render('articles/index', {articles: articles})
})

app.use('/articles', ArticleRouter)

app.listen(port, ()=>{
    console.log(`Server has started ${port}`)
})