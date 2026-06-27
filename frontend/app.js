import './App.css';
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use environment variable or fallback to localhost
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    axios.get(`${API_URL}/api/products`)
      .then((res) => {  
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setError("Failed to load products. Check backend.");
        setLoading(false);
      });
  }, [API_URL]);

  return (
    <div className="App" style={{ padding: "20px" }}>
      <h1 style={{ margin: "20px", textAlign: "center" }}>🛒 CloudShop</h1>

      {loading && <h3 style={{ textAlign: "center" }}>Loading products...</h3>}
      {error && <h3 style={{ textAlign: "center", color: "red" }}>{error}</h3>}

      {!loading && !error && (
        <div style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          flexWrap: "wrap"
        }}>
          {products.map((p) => (
            <div key={p.id} style={{
              border: "1px solid #ddd",
              padding: "20px",
              borderRadius: "10px",
              width: "180px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              textAlign: "center"
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