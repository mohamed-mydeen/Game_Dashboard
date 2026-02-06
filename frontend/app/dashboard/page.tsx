"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "40px 20px",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  },
  container: {
    maxWidth: "700px",
    margin: "0 auto"
  },
  headerWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "40px",
    flexWrap: "wrap" as const,
    gap: "16px"
  },
  header: {
    textAlign: "left" as const,
    flex: "1"
  },
  title: {
    fontSize: "42px",
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: "8px",
    letterSpacing: "-0.5px"
  },
  subtitle: {
    fontSize: "16px",
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "400"
  },
  logoutButton: {
    padding: "12px 24px",
    backgroundColor: "#ffffff",
    color: "#667eea",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "14px",
    transition: "all 0.2s",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
  },
  inputSection: {
    backgroundColor: "#ffffff",
    padding: "24px",
    borderRadius: "16px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
    marginBottom: "30px"
  },
  inputWrapper: {
    display: "flex",
    gap: "12px",
    alignItems: "stretch",
    marginBottom: "16px"
  },
  input: {
    flex: "1",
    padding: "14px 18px",
    borderRadius: "12px",
    border: "2px solid #e5e7eb",
    fontSize: "15px",
    outline: "none",
    transition: "all 0.2s",
    fontWeight: "500",
    color: "#020918"
  },
  imageUploadWrapper: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    marginTop: "12px"
  },
  fileInput: {
    flex: "1",
    padding: "10px 14px",
    borderRadius: "10px",
    border: "2px dashed #cbd5e1",
    fontSize: "14px",
    cursor: "pointer",
    backgroundColor: "#f8fafc"
  },
  imagePreview: {
    width: "60px",
    height: "60px",
    borderRadius: "10px",
    objectFit: "cover" as const,
    border: "2px solid #e5e7eb"
  },
  removeImageButton: {
    padding: "8px 16px",
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "600"
  },
  addButton: {
    padding: "14px 28px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#fff",
    fontWeight: "600",
    fontSize: "15px",
    transition: "all 0.2s",
    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
    whiteSpace: "nowrap" as const
  },
  gamesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px"
  },
  gameCard: {
    backgroundColor: "#ffffff",
    padding: "24px",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
    position: "relative" as const,
    overflow: "hidden",
    border: "4px solid #020918",
  },
  gameCardInner: {
    position: "relative" as const,
    zIndex: 1
  },
  gameImage: {
    width: "100%",
    height: "180px",
    borderRadius: "12px",
    objectFit: "cover" as const,
    marginBottom: "16px",
    backgroundColor: "#f3f4f6"
  },
  gameIcon: {
    width: "100%",
    height: "180px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "64px",
    marginBottom: "16px"
  },
  gameName: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: "16px",
    wordBreak: "break-word" as const
  },
  buttonGroup: {
    display: "flex",
    gap: "10px"
  },
  editButton: {
    flex: "1",
    padding: "10px 16px",
    backgroundColor: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    transition: "all 0.2s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px"
  },
  deleteButton: {
    flex: "1",
    padding: "10px 16px",
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    transition: "all 0.2s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px"
  },
  emptyState: {
    textAlign: "center" as const,
    padding: "60px 20px",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)"
  },
  emptyIcon: {
    fontSize: "64px",
    marginBottom: "16px",
    opacity: 0.5
  },
  emptyText: {
    fontSize: "18px",
    color: "#6b7280",
    fontWeight: "500"
  },
  badge: {
    position: "absolute" as const,
    top: "16px",
    right: "16px",
    backgroundColor: "#fbbf24",
    color: "#78350f",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "700",
    textTransform: "uppercase" as const,
    zIndex: 2
  }
};

export default function Dashboard() {
  const [games, setGames] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState("");
  
  const router = useRouter();

  
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const email = localStorage.getItem("userEmail");
    
    if (!token) {
  
      router.push("/");
      return;
    }
    
    setUserEmail(email || "");
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const res = await fetch("http://localhost:5000/games");
      const data = await res.json();
      setGames(data);
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {

      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };


  const removeImage = () => {
    setSelectedImage(null);
  };


  const addOrUpdateGame = async () => {
    if (!name.trim()) return;
    
    if (editId) {
      await fetch(`http://localhost:5000/games/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name,
          image: selectedImage
        })
      });
      setEditId(null);
    } else {
      await fetch("http://localhost:5000/games", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name,
          image: selectedImage
        })
      });
    }
    
    setName("");
    setSelectedImage(null);
    fetchGames();
  };

  const deleteGame = async (id: number) => {
    await fetch(`http://localhost:5000/games/${id}`, {
      method: "DELETE"
    });
    fetchGames();
  };

  const editGame = (game: any) => {
    setName(game.name);
    setEditId(game.id);
    setSelectedImage(game.image);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addOrUpdateGame();
    }
  };

  
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    router.push("/");
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        {/* Header with Logout */}
        <div style={styles.headerWrapper}>
          <div style={styles.header}>
            <h1 style={styles.title}>🎮 Game Dashboard</h1>
            <p style={styles.subtitle}>
              Welcome, {userEmail} • Manage your favorite games
            </p>
          </div>
          <button
            style={styles.logoutButton}
            onClick={handleLogout}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.backgroundColor = "#f3f4f6";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.backgroundColor = "#ffffff";
            }}
          >
            🚪 Logout
          </button>
        </div>

        {/* Input Section */}
        <div style={styles.inputSection}>
          {/* Game Name Input */}
          <div style={styles.inputWrapper}>
            <input
              style={{
                ...styles.input,
                borderColor: name ? "#667eea" : "#e5e7eb"
              }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter game name..."
            />
            <button
              style={{
                ...styles.addButton,
                transform: name ? "scale(1)" : "scale(0.98)",
                opacity: name ? "1" : "0.7"
              }}
              onClick={addOrUpdateGame}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.02)";
                e.currentTarget.style.boxShadow = "0 6px 16px rgba(102, 126, 234, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.4)";
              }}
            >
              {editId ? "✓ Update" : "+ Add Game"}
            </button>
          </div>

          {/* Image Upload Section */}
          <div style={styles.imageUploadWrapper}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={styles.fileInput}
            />
            {selectedImage && (
              <>
                <img 
                  src={selectedImage} 
                  alt="Preview" 
                  style={styles.imagePreview}
                />
                <button
                  style={styles.removeImageButton}
                  onClick={removeImage}
                >
                  ✕ Remove
                </button>
              </>
            )}
          </div>
        </div>

        {/* Games Grid */}
        {games.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>🎯</div>
            <p style={styles.emptyText}>No games yet. Add your first game above!</p>
          </div>
        ) : (
          <div style={styles.gamesGrid}>
            {games.map((game) => (
              <div
                key={game.id}
                style={{
                  ...styles.gameCard,
                  transform: hoveredCard === game.id ? "translateY(-8px)" : "translateY(0)",
                  boxShadow: hoveredCard === game.id 
                    ? "0 12px 30px rgba(0, 0, 0, 0.15)" 
                    : "0 4px 20px rgba(0, 0, 0, 0.1)"
                }}
                onMouseEnter={() => setHoveredCard(game.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {editId === game.id && (
                  <div style={styles.badge}>Editing</div>
                )}
                <div style={styles.gameCardInner}>
                  {/* Display game image or default icon */}
                  {game.image ? (
                    <img 
                      src={game.image} 
                      alt={game.name}
                      style={styles.gameImage}
                    />
                  ) : (
                    <div style={styles.gameIcon}>🎮</div>
                  )}
                  
                  <h3 style={styles.gameName}>{game.name}</h3>
                  
                  <div style={styles.buttonGroup}>
                    <button
                      style={styles.editButton}
                      onClick={() => editGame(game)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#2563eb";
                        e.currentTarget.style.transform = "scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#3b82f6";
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    >
                      Edit
                    </button>
                    <button
                      style={styles.deleteButton}
                      onClick={() => deleteGame(game.id)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#dc2626";
                        e.currentTarget.style.transform = "scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#ef4444";
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

}
