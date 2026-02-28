const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const mysql = require('mysql2/promise')
const port = 8000; // ห้ามลืมบรรทัดนี้
app.use(bodyParser.json());

// ต้องมีบรรทัดนี้เพื่อให้ Server อ่าน JSON จาก Body ได้
app.use(express.json());
let users = []
let counter = 1

let conn = null
const initDBConnection = async () => {
    conn = await mysql.createConnection({
    host:'localhost',
        user:'root',
        password:'root',
        database:'webdb',
        port:8821
    })
}

//path = GET /users สำหรับ get ข้อมูลuser ทั้งหมด
app.get ('/users',async (req,res) => {
    const results = await conn.query('SELECT * FROM users');
    res.json(results[0]);
})

//path = POST /test
app.post('/users',async(req,res) => {
    try{
       let user = req.body;
        const results = await conn.query('INSERT INTO users SET ?',user);
        res.json({
        message: 'User created successfully',
        data:results[0]
        }) 
    }catch (error){
        console.error('Error creating user:',error);
        res.status(500).json({
            message:'Error creating user',
            error: error.message
        });
    }
});
    
app.get('/users/:id', async (req,res) => {
    try{
        let id = req.params.id
        const results = await conn.query('SELECT * FROM users WHERE id = ?',id)
        if (results[0].length == 0){
            throw {statusCode: 404,message:'Uer not found'};
        }
        res.json(results[0][0]);
    }
    catch (error) {
        console.error('Error fetching user:',error.message);
        let statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            message:'Error fetching user',
            error:error.message
        });
    }
})

//PUT /user/:id สำหรับการแก้ไขข้อมูล user ที่มี id ตรงกับที่ส่งมา
app.put('/users/:id', async (req,res) => {
    try{
        let id = req.params.id
        let updatedUser = req.body;
        const results = await conn.query('SELECT * FROM users WHERE id = ?',[updatedUser,id])
        if (results[0].affectedRows == 0){
            throw {statusCode: 404, message:'Uer not found'};
        }
        res.json({
            message:'User updated successfully',
            data: updatedUser
        });
    }
    catch (error) {
        console.error('Error fetching user:',error.message);
        let statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            message:'Error fetching user',
            error:error.message
        });
    }
})

app.delete('/users/:id', async (req,res) => {
    try{
        let id = req.params.id
        const results = await conn.query('DELETE FROM users WHERE id = ?',id)
        if (results[0].affectedRows == 0){
            throw {statusCode: 404,message:'Uer not found'};
        }
        res.json({
            message: 'User deleted successfully'
        });
    }
    catch (error) {
        console.error('Error fetching user:',error.message);
        let statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            message:'Error fetching user',
            error:error.message
        });
    }
})

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
    let selectedIndex = users.findIndex(user => user.id == id);
    //ลบ user จาก array โดยการ delete 
    users.splice(selectedIndex, 1);

    res.json({
        message: 'User deleted successfully',
            indexDeleted: selectedIndex
    });
})

app.listen(port, async() => {
    await initDBConnection();
    console.log(`Server is running on port ${port}`);
});