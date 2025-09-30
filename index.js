const express = require("express");
const app = express();

console.log("[BOOT] index.js loaded"); // should print immediately

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => res.type("text/plain").send("OK"));
app.get("/hello", (req, res) => res.type("text/plain").send("Hello Express JS"));

app.get("/user", (req, res) => {
  const firstname = req.query.firstname || "Pritesh";
  const lastname  = req.query.lastname  || "Patel";
  res.json({ firstname, lastname });
});

app.post("/user/:firstname/:lastname", (req, res) => {
  const { firstname, lastname } = req.params;
  res.json({ firstname, lastname });
});

app.post("/users", (req, res) => {
  if (!Array.isArray(req.body)) {
    return res.status(400).json({ error: "Body must be an array of users" });
  }
  res.json(req.body);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`[RUNNING] Server at http://localhost:${PORT}`);
});
