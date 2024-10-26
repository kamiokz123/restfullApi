const express = require("express");
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override');
const path = require("path")
const app = express();
const port = 8080;

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

let posts = [
    {
        id:uuidv4(),
        username:"kamran_haider",
        content:"i am learning backend"
    },
    {
        id:uuidv4(),
        username:"mehdi",
        content:"working on rest api"
    },
    {
        id:uuidv4(),
        username:"haider",
        content:"watching mobile 24/7"
    }
]

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("newPost.ejs")
});

app.post("/posts",(req,res)=>{
    const {username , content } = req.body;
    const id = uuidv4();
    posts.push({id,username,content});
    res.redirect("http://localhost:8080/posts")
})

app.get("/posts/:id",(req,res)=>{
    const { id } = req.params;
    let post = posts.find((p)=>id==p.id);
    res.render("show.ejs",{post});
});

app.get("/posts/:id/edit",(req,res)=>{
    const { id } = req.params;
    let post = posts.find((p)=> id=== p.id);    
    res.render("editPost.ejs",{post});
});

app.patch("/posts/:id",(req,res)=>{
    const { id } = req.params;
    const { content } = req.body;
    let post = posts.find((p)=> id === p.id);
    console.log("post in patch", post);
    
    post.content = content;
    res.redirect("/posts");
});

app.delete("/posts/:id",(req,res)=>{
    const { id } = req.params;
     posts = posts.filter((p)=> id !== p.id);
     res.redirect("/posts");
});


app.listen(port,()=>{
    console.log("listening at port : "+port);
});