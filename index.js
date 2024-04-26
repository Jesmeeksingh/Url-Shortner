const express = require("express")
const {connectToMongoDB} = require("./connect")
const URL = require('./models/url')
const urlRoute = require('./routes/url')
const app = express()
const PORT =8000

connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
.then(()=>console.log('mongodb is connected'));
app.use(express.json)
app.use("/url",urlRoute);

app.get('/:shortId',async (req,res)=>{
    const shortId = req.params.shortId;
    await URL.findOneAndUpdate({
        shortId
    },{
        $push:{
            visitHistory:{
                timestamp:Date.now()
            }
        }
    })
})

app.listen(PORT,()=>{
    console.log(`server started at Port ${PORT}`);
})