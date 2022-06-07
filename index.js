const express = require('express');
var cors = require('cors')
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion , ObjectId } = require('mongodb');

// dbuser4
// mQjfkYJhfJHiQs9K

app.use(cors())
app.use(express.json())

// delte and get mthod 90% similiar
// put and post method 90% similiar

const uri = "mongodb+srv://dbuser4:mQjfkYJhfJHiQs9K@cluster0.tjo1e.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log('connected');

async function run(){
    try{
        await client.connect();
        const notesCollection = client.db("notesTacker").collection("notes");
        
        console.log('connected to db');

        // get api to read all note
        // localhost:5000/notes
        app.get('/notes', async(req,res)=>{
            const query = req.query;
            console.log(query);
            
            const cursor = notesCollection.find( query )
            const result = await cursor.toArray()

            res.send(result);
        })
        // get api to read all note

        // create note
        // {
//     "userName":"tanjin tisha",
//     "textData":"i have acting capability"
// }

        // localhost:5000/note
        app.post('/note', async(req,res)=>{
            const data = req.body;
            console.log(data);
            const result = await notesCollection.insertOne(data);
            res.send(result)

        })
        // create note

        // update note
        //  localhost:5000/note/629f759354e9ee6c798dc3c1
        app.put('/note/:id' , async(req , res)=>{
            const id = req.params.id;
            const data = req.body;
            
            
            const filter = { _id: ObjectId(id) };
            
            const updateDoc = {
                $set: {
                    userName:data.userName,
                    textData:data.textData
                },
                
              };
              const result = await notesCollection.updateOne(filter, updateDoc);
          
            res.send(result);
        })

        // update note

        // delete note
        app.delete('/note/:id', async(req,res)=>{
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };

            const result = await notesCollection.deleteOne(filter);
            res.send(result);
            

        })
        // delete note

    }
    finally{

    }
}
run().catch(console.dir)





app.get('/',(req,res)=>{
    res.send('hlw world');
})

app.listen(port, (req,res)=>{
    console.log('my port is running port =',port);
})

