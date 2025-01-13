const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require('body-parser');  // 中间件，用于解析req.body
const port=5432;
const path = require("path");
const fs=require('fs');
const app = express();
app.use(bodyParser.json());  // 使用中间件解析JSON数据
app.use(express.static("public"));
app.use('/uploads',express.static("uploads"));
app.use(fileUpload());
app.listen(port, () => {
    console.log(`File upload app listening at http://localhost:`+port);
});




app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// 创建文件上传的 POST 路由
app.post("/upload",async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No files were uploaded.");
    }
    let fileName=req.query.id;
    var extension = fileName.substring(fileName.lastIndexOf(".") + 1); // "txt"
    var nameWithoutExtension=fileName.substring(fileName.lastIndexOf("\\") + 1);
    // 获取不带扩展名的文件名
    fileName=nameWithoutExtension;
    const files = req.files.myFiles;

    if (!Array.isArray(files)) {
        files.mv(path.join(__dirname, "uploads", fileName), (err) => {
            if (err) return res.status(500).send(err);
        });
    } else {
        files.forEach(file => {
            file.mv(path.join(__dirname, "uploads", fileName), (err) => {
                if (err) return res.status(500).send(err);
            });
        });
    }
    const data=await fs.readFileSync('./db.json', { encoding: 'utf8', flag: 'r' });
    const saveInfo= JSON.parse(data).concat([{type:'file',content: fileName}]);
    await fs.writeFileSync('./db.json',JSON.stringify( saveInfo), { encoding: 'utf8'});
    res.setHeader('content-type','application/json')
    res.send("Files uploaded successfully!");
});

app.get("/history",async (req, res) => {
    const data=await fs.readFileSync('./db.json', { encoding: 'utf8', flag: 'r' })
    res.setHeader('content-type','application/json')
    res.send(data);
});

app.post("/savetext",async (req, res) => {
    var text= req.body.text;
    const data=await fs.readFileSync('./db.json', { encoding: 'utf8', flag: 'r' });
    const saveInfo= JSON.parse(data).concat([{type:'text',content: text}]);
    await fs.writeFileSync('./db.json',JSON.stringify( saveInfo), { encoding: 'utf8'});
    res.setHeader('content-type','application/json')
    res.send("Files uploaded successfully!");
})

app.get("/clear",async (req, res) => {
    await fs.writeFileSync('./db.json',JSON.stringify( []), { encoding: 'utf8'});
    res.setHeader('content-type','application/json')
    res.send("Files uploaded successfully!");
});