import express from "express";
import { getTextFromPdf } from "./src/utils.js";

const port = 3000;
const app = express();

app.get("/translate", async (req, res) => {
  const result = await getTextFromPdf();
  console.log("result: ", result);
  res.send("END");
});

app.listen(port, () => {
  console.log("Server is running on port 3000");
});
