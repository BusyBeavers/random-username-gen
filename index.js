import express from "express";
import cors from "cors";
import { faker } from "@faker-js/faker";

const PORT = process.env.PORT || 5001;
const DEFAULT_MAX_LEN = 20;

const app = express();

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

app.get("/username", (req, res) => {
  const maxLen = parseInt(req.query.maxLen);
  if (req.query.maxLen !== undefined && (isNaN(maxLen) || maxLen <= 0)) {
    res.status(400).json({ error: "maxLen must be a positive integer" });
    return;
  }
  const effectiveMaxLen = isNaN(maxLen) ? DEFAULT_MAX_LEN : maxLen;

  let username = faker.internet.username();

  if (effectiveMaxLen) {
    let attempts = 0;
    while (username.length > effectiveMaxLen && attempts < 100) {
      username = faker.internet.username();
      attempts++;
    }

    // fallback: truncate if no short enough username was found
    if (username.length > effectiveMaxLen) {
      username = username.slice(0, effectiveMaxLen);
    }
  }

  return res.json({ username });
});
