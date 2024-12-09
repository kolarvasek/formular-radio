import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const port = 5007;

app.use(cors());
app.use(bodyParser.json());

app.post("/data", (req, res) => {
  const { option } = req.body;

  if (option === "html") {
    res.setHeader("Content-Type", "application/json");
    res.send({ message: "HTML data received" });
  } else if (option === "css") {
    res.setHeader("Content-Type", "application/json");
    res.send({ message: "CSS data received" });
  } else if (option === "js") {
    res.setHeader("Content-Type", "application/json");
    res.send({ message: "JavaScript data received" });
  } else {
    res.send({ message: "Invalid selection" });
  }
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

