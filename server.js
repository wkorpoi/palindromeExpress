const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient 
const ObjectId = require('mongodb').ObjectId

var db, collection;

const url = "mongodb+srv://wadiyakorpoi:palindrome123@cluster0.wteeqc7.mongodb.net/?retryWrites=true&w=majority";
const dbName = "palindrome";

app.listen(5290, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => { 
  db.collection('words').find().toArray((err,words)=> {
  res.render('index.ejs', {
   words 
  })
})
})


app.post('/submit', (req, res) => {
  const input = req.body.word 
  const isAPalindrome = input == input.split("").reverse().join("")
  console.log(input,isAPalindrome)
  db.collection('words').insertOne({ input, isAPalindrome}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/payForOrder', (req, res) => {
  console.log(req.body, "thisIsTheBody")
  db.collection('shop')
  .findOneAndUpdate({_id: ObjectId(req.body.id)}, {
    $set: {
      paid: true 
    }
  }, {
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
}) 

app.delete('/delete', (req, res) => {
  db.collection('words').deleteOne({_id: ObjectId(req.body._id)}, (err, result) => {
    if (err) return res.send(500, err)
  })
})






