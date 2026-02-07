"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

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
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    router.push("/");
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>🎮 Game Dashboard</h1>
      <p>Welcome, {userEmail}</p>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Game name"
      />
      <button onClick={addOrUpdateGame}>
        {editId ? "Update" : "Add"}
      </button>

      <ul>
        {games.map((g) => (
          <li key={g.id}>
            {g.name}
            <button onClick={() => editGame(g)}>Edit</button>
            <button onClick={() => deleteGame(g.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
