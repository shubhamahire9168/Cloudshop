import './App.css';
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

   const API_URL = "http://13.203.196.145:5000";
  useEffect(() => {
    axios.get(`${API_URL}/api/products`)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setError("Failed to load products. Check backend API.");
        setLoading(false);
      });
  }, [API_URL]);

  return (
    <div className="App" style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>🛒 CloudShop</h1>
      {loading && <h3 style={{ textAlign: "center" }}>Loading products...</h3>}
      {error && <h3 style={{ textAlign: "center", color: "red" }}>{error}</h3>}
      {!loading && !error && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
          {products.map((p) => (
            <div key={p.id} style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              width: "180px",
              textAlign: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              backgroundColor: "#fff"
            }}>
              <h3>{p.name}</h3>
              <p>💰 ₹{p.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
