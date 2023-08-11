const mongoose=require('mongoose')

const url= "mongodb://Sakshi:Bhagwat_22@ac-pdbq4rm-shard-00-00.5iaa9ss.mongodb.net:27017,ac-pdbq4rm-shard-00-01.5iaa9ss.mongodb.net:27017,ac-pdbq4rm-shard-00-02.5iaa9ss.mongodb.net:27017/StackOverflow?ssl=true&replicaSet=atlas-bbhig2-shard-0&authSource=admin&retryWrites=true&w=majority"

module.exports.connect = () => {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      // useFindAndModify: false,
      useUnifiedTopology: true,
      // useCreateIndex: true,
    })
    .then(() => console.log("MongoDB is connected successfully"))
    .catch((err) => console.log("Error: ", err));
};
