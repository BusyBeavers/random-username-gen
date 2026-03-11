import express from "express";
import cors from "cors";
import { faker } from "@faker-js/faker";

const PORT = process.env.PORT || 5001;

const app = express();

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

app.get("/username", (req, res) => {
  const maxLen = req.query.maxLen ? parseInt(req.query.maxLen) : null;

  let username = faker.internet.username();

  if (maxLen) {
    let attempts = 0;
    while (username.length > maxLen && attempts < 100) {
      username = faker.internet.username();
      attempts++;
    }

    // fallback: truncate if no short enough username was found
    if (username.length > maxLen) {
      username = username.slice(0, maxLen);
    }
  }

  return res.json({ username });
});
