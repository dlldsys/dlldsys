const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const fs=require('fs');
const app = express();
app.use(express.static("public"));
app.use('/uploads',express.static("uploads"));
app.use(fileUpload());
app.listen(3000, () => {
    console.log(`File upload app listening at http://localhost:3000`);
});




app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// 创建文件上传的 POST 路由
app.post("/upload",async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No files were uploaded.");
    }

    const files = req.files.myFiles;

    if (!Array.isArray(files)) {
        files.mv(path.join(__dirname, "uploads", files.name), (err) => {
            if (err) return res.status(500).send(err);
        });
    } else {
        files.forEach(file => {
            file.mv(path.join(__dirname, "uploads", file.name), (err) => {
                if (err) return res.status(500).send(err);
            });
        });
    }
    const data=await fs.readFileSync('./db.json', { encoding: 'utf8', flag: 'r' });
    const saveInfo= JSON.parse(data).concat([{type:'file',content: files.name}]);
    await fs.writeFileSync('./db.json',JSON.stringify( saveInfo));
    res.setHeader('content-type','application/json')
    res.send("Files uploaded successfully!");
});

app.get("/history",async (req, res) => {
    const data=await fs.readFileSync('./db.json', { encoding: 'utf8', flag: 'r' })
    res.setHeader('content-type','application/json')
    res.send(data);
});