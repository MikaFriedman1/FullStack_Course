import app from './server.js';
import mongodb from "mongodb";
import ReviewsDAO from "./dao/reviewsDAO.js"

const mongo_username = process.env['MONGO_USERNAME'];
const mongo_password = process.env['MONGO_PASSWORD'];
const mongo_host = process.env['MONGO_HOST'];

console.log(mongo_username, mongo_password, mongo_host);

const mongo_client = mongodb.MongoClient;
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@${mongo_host}/Reviews`;

const port = 8000;

mongo_client.connect(
  uri, 
  {
  maxPoolSize: 50,
  wtimeoutMS: 2500,
  useNewUrlParser: true
})
.catch(err => {
  console.error(err.stack)
  process.exit(1)
})
.then(async client => {
  await ReviewsDAO.injectDB(client)
  app.listen(port, () => {
    console.log(`Listening to ${port}`);
  })
})

