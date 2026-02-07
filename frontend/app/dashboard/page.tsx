"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

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
    gap: "16px"
  },
  header: { flex: 1 },
  title: {
    fontSize: "42px",
    fontWeight: "800",
    color:"#080808"
  },
  subtitle: {
    fontSize: "16px",
    color: "rgba(255,255,255,0.8)"
  },
  logoutButton: {
    padding: "12px 24px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    fontWeight: "700"
  },
  inputSection: {
    backgroundColor: "#c097c1",
    padding: "24px",
    borderRadius: "16px",
    marginBottom: "30px",
    color:"#080808"
  },
  inputWrapper: {
    display: "flex",
    gap: "12px",
    marginBottom: "16px",
    

  },
  input: {
    flex: 1,
    padding: "14px",
    borderRadius: "12px",
    border: "2px solid #080808",
    color:"#080808"

  },
  addButton: {
    padding: "14px 28px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    background: "#667eea",
    color: "#fff",
    fontWeight: "600"
  },
  imageUploadWrapper: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    color:"#080808"
  },
  fileInput: {
    flex: 1
  },
  imagePreview: {
    width: "60px",
    height: "60px",
    borderRadius: "10px",
    objectFit: "cover" as const
  },
  removeImageButton: {
    padding: "6px 12px",
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  },
  gamesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px"
  },
  gameCard: {
    backgroundColor: "#fff",
    padding: "24px",
    borderRadius: "16px"
  },
  gameImage: {
    width: "100%",
    height: "180px",
    borderRadius: "12px",
    objectFit: "cover" as const,
    marginBottom: "12px"
  },
  gameIcon: {
    height: "180px",
    borderRadius: "12px",
    background: "#667eea",
    color: "#fff",
    fontSize: "64px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "12px"
  },
  gameName: {
    fontSize: "18px",
    fontWeight: "700",
    marginBottom: "12px",
    color:"#080808"
  },
  buttonGroup: {
    display: "flex",
    gap: "10px"
  },
  editButton: {
    flex: 1,
    backgroundColor: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    padding: "10px",
    cursor: "pointer"
  },
  deleteButton: {
    flex: 1,
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    padding: "10px",
    cursor: "pointer"
  }
};

export default function Dashboard() {
  const [games, setGames] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
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
    const res = await fetch(`${API_URL}/games`);
    const data = await res.json();
    setGames(data);
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setSelectedImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const addOrUpdateGame = async () => {
    if (!name.trim()) return;

    if (editId) {
      await fetch(`${API_URL}/games/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, image: selectedImage })
      });
      setEditId(null);
    } else {
      await fetch(`${API_URL}/games`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, image: selectedImage })
      });
    }

    setName("");
    setSelectedImage(null);
    fetchGames();
  };

  const deleteGame = async (id: number) => {
    await fetch(`${API_URL}/games/${id}`, { method: "DELETE" });
    fetchGames();
  };

  const editGame = (game: any) => {
    setName(game.name);
    setEditId(game.id);
    setSelectedImage(game.image);
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.headerWrapper}>
          <div>
            <h1 style={styles.title}>🎮 Game Dashboard</h1>
            <p style={styles.subtitle}>Welcome, {userEmail}</p>
          </div>
          <button style={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div style={styles.inputSection}>
          <div style={styles.inputWrapper}>
            <input
              style={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter game name"
            />
            <button style={styles.addButton} onClick={addOrUpdateGame}>
              {editId ? "Update" : "Add"}
            </button>
          </div>

          <div style={styles.imageUploadWrapper}>
            <input type="file" onChange={handleImageChange} style={styles.fileInput} />
            {selectedImage && (
              <>
                <img src={selectedImage} style={styles.imagePreview} />
                <button style={styles.removeImageButton} onClick={() => setSelectedImage(null)}>
                  Remove
                </button>
              </>
            )}
          </div>
        </div>

        <div style={styles.gamesGrid}>
          {games.map((game) => (
            <div key={game.id} style={styles.gameCard}>
              {game.image ? (
                <img src={game.image} style={styles.gameImage} />
              ) : (
                <div style={styles.gameIcon}>🎮</div>
              )}
              <h3 style={styles.gameName}>{game.name}</h3>
              <div style={styles.buttonGroup}>
                <button style={styles.editButton} onClick={() => editGame(game)}>
                  Edit
                </button>
                <button style={styles.deleteButton} onClick={() => deleteGame(game.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
