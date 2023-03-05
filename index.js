const express = require('express')
const app = express()
const PORT = process.env.PORT || 3005
// const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const { MongoClient, Decimal128, ObjectId } = require('mongodb')
const path = require('path')

dotenv.config()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

app.use(express.static('client/build'));

// app.use(cors({
//     origin: 'http://localhost:3000'
// }))

// MONGODB CONNECT //
const client = new MongoClient(process.env.DB_CONNECT)
let collection = MongoConnect(client)

async function MongoConnect (client) {
  try {
    const database = await client.db('financent')
    collection = await database.collection('ledgers')
    console.log("connected to db")
  } catch(e) {
    alert(err)
  }
}

app.get('*', (req, res) => {
  res.sendFile(
      path.resolve(__dirname, 'client', 'build', 
  'index.html')
  );
});

// LEDGERS //

/* Load the Ledgers tied to user */
app.post('/api/ledger/list', async (req, res) => {
  const result = await collection.find({user: req.body.user});
  const data = [];
  await result.forEach((doc) => {
    const obj = {
      "id": doc._id,
      "user": doc.user,
      "name": doc.name,
      "amount": doc.amount,
    }
    data.push(obj)
  })
  res.json({data: data})
})

// Update a ledger
app.put('/api/ledger/update', async (req, res) => {
  const filter = { _id: ObjectId(req.body.id) }
  const updateDetails = {
      $set: {
        name: req.body.name,
        amount: Decimal128.fromString(req.body.amount)
      }
    };
  const result = await collection.updateOne(filter, updateDetails);
  if (result.modifiedCount){
      res.sendStatus(200)
  }else {
      console.log("There has been an error")
      res.sendStatus(404)
  }
})

// Add a new ledger
app.post('/api/ledger/add', async (req, res) => {
    const doc = { user: req.body.user, name: req.body.name, amount: Decimal128.fromString(req.body.amount), transactions: [] }
    const result = await collection.insertOne(doc);
    res.sendStatus(200)
})

// Delete a ledger
app.delete('/api/ledger/delete', async(req, res) => {
  const search = { _id: ObjectId(req.body.id) }
    const deleteResult = await collection.deleteOne(search);
    if (deleteResult.deletedCount === 1) {
        res.sendStatus(200)
    } else {
        res.sendStatus(404)
    }
})

// LEDGER Details //
/* Load a ledger details + transactions */ 
app.post('/api/ledger/view', async (req, res) => {
  const result = await collection.find({_id: ObjectId(req.body.id)});
  const data = [];
  await result.forEach((doc) => {
    let obj = {
      "id": doc._id,
      "user": doc.user,
      "name": doc.name,
      "amount": doc.amount,
      "transactions": doc.transactions
    }
    let run_total = parseFloat(doc.amount)
    obj.transactions.forEach((trx) => {
      trx["running"] = run_total + parseFloat(trx.amount)
      run_total = trx["running"]
    })
    obj["running_bal"] = run_total
    data.push(obj)
  })
  res.json({data: data})
})

// Update a transaction
app.put('/api/ledger/transaction/', async (req, res) => {
  const filter = { _id: ObjectId(req.body.ledger_id) }
  const updateDetails = {
      $set: {
        "transactions.$[transaction].date": req.body.date,
        "transactions.$[transaction].name": req.body.name,
        "transactions.$[transaction].type": req.body.type,
        "transactions.$[transaction].amount": Decimal128.fromString(req.body.amount),
      }
    }
  const options = {
    arrayFilters: [ {"transaction.id": {"$eq": ObjectId(req.body.trx_id) }} ]
  }
  const result = await collection.updateOne(filter, updateDetails, options);
  if (result.modifiedCount){
      res.sendStatus(200)
  }else {
      console.log("There has been an error")
      res.sendStatus(404)
  }
})

// Add a new transaction
app.post('/api/ledger/transaction', async (req, res) => {
  console.log(req.body)
  const query = {_id: ObjectId(req.body.ledger_id)}
  const updateDocument = {
    $push: {
      "transactions": {
        id: ObjectId(),
        date: req.body.date,
        name: req.body.name,
        amount: Decimal128.fromString(req.body.amount),
        type: req.body.type
      }
    }
  }
  const result = await collection.updateOne(query, updateDocument);
  res.sendStatus(200)
})

// Delete a transaction
app.delete('/api/ledger/transaction', async (req, res) => {
  const filter = {_id: ObjectId(req.body.ledger_id)}
  const updateDetails = {
    $pull: { transactions: { id: ObjectId(req.body.transaction_id) } }
  }
const result = await collection.updateMany(filter, updateDetails);
if (result.modifiedCount){
    res.sendStatus(200)
}else {
    console.log("There has been an error")
    res.sendStatus(404)
}
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})