const express = require("express");
const cors = require("cors");
const app = express();

// CORS - Update with your Vercel URL
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://game-dashboard-btc7w15g8-mohamed-mydeen-shahabudeen-ms-projects.vercel.app/'  // UPDATE THIS
  ],
  credentials: true
})); 

app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const VALID_USER = {
  email: "admin@gmail.com",
  password: "123456"
};

let games = [];
let id = 1;

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  
  if (email === VALID_USER.email && password === VALID_USER.password) {
    const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');
    
    return res.json({ 
      success: true, 
      token,
      message: "Login successful" 
    });
  }
  
  return res.status(401).json({ 
    success: false, 
    message: "Invalid email or password" 
  });
});

app.post("/logout", (req, res) => {
  res.json({ success: true, message: "Logged out successfully" });
});

app.post("/games", (req, res) => {
  const { name, image } = req.body;
  
  if (!name || name.trim() === "") {
    return res.status(400).json({ error: "Game name is required" });
  }
  
  const game = { 
    id: id++, 
    name: name.trim(),
    image: image || null 
  };
  
  games.push(game);
  res.status(201).json(game);
});

app.get("/games", (req, res) => {
  res.json(games);
});

app.put("/games/:id", (req, res) => {
  const { name, image } = req.body;
  
  if (!name || name.trim() === "") {
    return res.status(400).json({ error: "Game name is required" });
  }
  
  const game = games.find(g => g.id === parseInt(req.params.id));
  if (!game) {
    return res.status(404).json({ error: "Game not found" });
  }
  
  game.name = name.trim();
  if (image !== undefined) {
    game.image = image;
  }
  
  res.json(game);
});

app.delete("/games/:id", (req, res) => {
  const initialLength = games.length;
  games = games.filter(g => g.id !== parseInt(req.params.id));
  
  if (games.length === initialLength) {
    return res.status(404).json({ error: "Game not found" });
  }
  
  res.json({ message: "Game deleted successfully" });
});

app.get("/", (req, res) => {
  res.json({ status: "running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
