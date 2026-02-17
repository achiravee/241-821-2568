// //
// const http = require('http');
// const host = 'localhost';
// const port = 8000;

// //กำหนดค่าเริ่มต้นของ server เมื่อเปิดใช้งาน เว็บผ่านเบราเซอร์ ที่ localhost:8000
// const requestListener = function(req, res) {
//     res.writeHead(200);
//     res.end('My First Server!');
// }

// //run server
// const server = http.createServer(requestListener);
// server.listen(port, host, () => {
//     console.log(`Server is running at http://${host}:${port}`);
// });

const express = require("express");
const app = express();

const port = 8000; // ห้ามลืมบรรทัดนี้

// ต้องมีบรรทัดนี้เพื่อให้ Server อ่าน JSON จาก Body ได้
app.use(express.json());
let users = []
let counter = 1

//path = GET / test
app.get('/users', (req, res) => {
    res.json(users); 
});

//path = POST /test
app.post('/user',(req,res) => {
    let user = req.body;
    user.id = counter
    counter += 1;
    users.push(user);
    res.json({
        message: 'User added successfully',
        user: user});
});

//path = PUT /user/:id
app.patch('/user/:id',(req,res) => {
    let id = req.params.id;
    let updatedUser = req.body;
    let selectIndex = users.findIndex(user => user.id == id);

    //อัพเดทข้อมูล user
    if (updatedUser.name){
       users[selectIndex] = updatedUser;
    }
    if (updatedUser.email){
        users[selectIndex].email = updatedUser.email;
    }
    //เอาข้อมูล update ส่ง response กลับไป
    res.json({
        message: "User updated successfully",
        data: {
            user: updatedUser,
            indexUpdated: selectIndex
        }
    });
    
})

//path = DELETE /user/id
app.delete('/user/:id',(req,res) => {
    let id = req.params.id;
    //หาindex ของ user ที่ต้อวการลบจากid ที่ส่งมา
    let selectIndex = users.findIndex(user => user.id == id);
    //ลบ user จาก array โดยการ delete 
    users.splice(selectIndex, 1);

    res.json({
        message: 'User deleted successfully',
            indexDeleted: selectIndex
    });
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});