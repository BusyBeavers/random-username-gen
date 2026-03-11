import express from "express";
import cors from "cors";

const PORT = process.env.PORT || 5001;

const app = express();

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

app.get("/username", async (req, res) => {
  try {
    const response = await fetch("https://randomuser.me/api/");
    const data = await response.json();

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Failed to fetch data from randomuser.me" });
    }

    const user = data.results[0].login;
    return res.json({ username: user.username });
  } catch (err) {
    console.error("Error fetching random username:", err);
    return res.status(500).json({ error: "Server error" });
  }
});
