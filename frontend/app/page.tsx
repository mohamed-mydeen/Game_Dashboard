"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  },
  loginBox: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
    width: "100%",
    maxWidth: "420px",
    border: "4px solid #020918"
  },
  header: {
    textAlign: "center" as const,
    marginBottom: "30px"
  },
  icon: {
    fontSize: "64px",
    marginBottom: "16px"
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: "8px"
  },
  subtitle: {
    fontSize: "14px",
    color: "#6b7280"
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "20px"
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "8px"
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151"
  },
  input: {
    padding: "14px 16px",
    borderRadius: "12px",
    border: "2px solid #e5e7eb",
    fontSize: "15px",
    outline: "none",
    transition: "all 0.2s",
    fontWeight: "500"
  },
  button: {
    padding: "16px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#fff",
    fontWeight: "700",
    fontSize: "16px",
    transition: "all 0.3s",
    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
    marginTop: "10px"
  },
  error: {
    backgroundColor: "#fee2e2",
    color: "#991b1b",
    padding: "12px 16px",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "500",
    border: "2px solid #fecaca"
  }
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userEmail", email);
        router.push("/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Cannot connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.loginBox}>
        <div style={styles.header}>
          <div style={styles.icon}>🎮</div>
          <h1 style={styles.title}>Game Dashboard</h1>
          <p style={styles.subtitle}>Login to manage your games</p>
        </div>

        <form style={styles.form} onSubmit={handleLogin}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@gmail.com"
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="123456"
              required
            />
          </div>

          {error && <div style={styles.error}>{error}</div>}

          <button
            type="submit"
            style={{
              ...styles.button,
              opacity: loading ? "0.7" : "1",
              cursor: loading ? "not-allowed" : "pointer"
            }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
