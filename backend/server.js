const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors()); 
app.use(express.json({ limit: '10mb' })); // Increased limit for base64 images
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ============================================
// HARDCODED USER CREDENTIALS (No Database)
// ============================================
const VALID_USER = {
  email: "admin@gmail.com",
  password: "123456"
};

// In-memory storage
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
    image: image || null // Store base64 image or null
  };
  
  games.push(game);
  res.status(201).json(game);
});

// Get all games
app.get("/games", (req, res) => {
  res.json(games);
});

// Update game (now accepts image)
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
  
  // Update image if provided
  if (image !== undefined) {
    game.image = image;
  }
  
  res.json(game);
});

// Delete game
app.delete("/games/:id", (req, res) => {
  const initialLength = games.length;
  games = games.filter(g => g.id !== parseInt(req.params.id));
  
  if (games.length === initialLength) {
    return res.status(404).json({ error: "Game not found" });
  }
  
  res.json({ message: "Game deleted successfully" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}/games`);
  console.log(`🔐 Login with: admin@gmail.com / 123456`);
});
