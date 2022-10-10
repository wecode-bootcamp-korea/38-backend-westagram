const http=require("http");
const express=require("express");
const cors=require("cors");
const morgan=require("morgan");

require("dotenv").config();
const routes=require("./routes");
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(routes);


app.get("/ping",(req, res)=>{
    res.status(200).json({"message":"PONG!"});
})

const server = http.createServer(app);
const PORT = process.env.PORT;

const start = async () => {
  try {
    server.listen(PORT, () => {
      console.log(`SERVER IS LISTENING ON PORT : ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
};

start();