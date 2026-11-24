
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";

const items = [
    {id:1, name:"Sneakers", category:"Fashion", price:2499, emoji:"👟"},
    {id:2, name:"Smart Watch", category:"Electronics", price:3299, emoji:"⌚"},
    {id:3, name:"Backpack", category:"Accessories", price:1499, emoji:"🎒"},
    {id:4, name:"Headphones", category:"Electronics", price:1999, emoji:"🎧"},
    {id:5, name:"Sunglasses", category:"Fashion", price:899, emoji:"🕶️"},
    {id:6, name:"Coffee Mug", category:"Home", price:499, emoji:"☕"}
];

function Shop({category, addCart}) {
    const products = category === "All"
        ? items
        : items.filter(p => p.category === category);

    return (
        <>
            <div className="banner">
                <h1>Welcome to ShopEase</h1>
                <p>Shop your favorite products!</p>
            </div>

            <h2>Products</h2>

            <div className="products">
                {products.map(p => (
                    <article className="product" key={p.id}>
                        <div className="emoji">{p.emoji}</div>
                        <h3>{p.name}</h3>
                        <p>{p.category}</p>
                        <b>₹{p.price}</b>
                        <br />
                        <button onClick={() => addCart(p)}>
                            Add to Cart
                        </button>
                    </article>
                ))}
            </div>
        </>
    );
}

function Cart({cart}) {
    return (
        <>
            <h2>Your Cart</h2>

            {cart.length === 0 ? (
                <p>Cart is empty.</p>
            ) : (
                <>
                    <ul>
                        {cart.map((p, i) => (
                            <li key={i}>
                                {p.name} - ₹{p.price}
                            </li>
                        ))}
                    </ul>

                    <h3>
                        Total: ₹
                        {cart.reduce((s, p) => s + p.price, 0)}
                    </h3>
                </>
            )}
        </>
    );
}

function About() {
    return (
        <>
            <h2>About ShopEase</h2>
            <p>
                A simple e-commerce website built
                using React and React Router DOM.
            </p>
        </>
    );
}

function App() {
    const [cart, setCart] = useState([]);
    const [category, setCategory] = useState("All");

    const addCart = p => setCart(old => [...old, p]);

    return (
        <BrowserRouter>
            <header>
                <div className="logo">ShopEase</div>
                <div>Online Shopping</div>
                <Link to="/cart">🛒 Cart ({cart.length})</Link>
            </header>

            <nav>
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/about">About</Link>
                <Link to="/cart">Cart</Link>
            </nav>

            <div className="layout">
                <aside>
                    <h3>Categories</h3>

                    {["All", "Fashion", "Electronics", "Accessories", "Home"].map(c => (
                        <button
                            className={category === c ? "active" : ""}
                            key={c}
                            onClick={() => setCategory(c)}
                        >
                            {c}
                        </button>
                    ))}
                </aside>

                <main>
                    <Routes>
                        <Route
                            path="/"
                            element={<Shop category={category} addCart={addCart}/>}
                        />

                        <Route
                            path="/products"
                            element={<Shop category={category} addCart={addCart}/>}
                        />

                        <Route
                            path="/cart"
                            element={<Cart cart={cart}/>}
                        />

                        <Route
                            path="/about"
                            element={<About/>}
                        />
                    </Routes>
                </main>
            </div>

            <footer>
                © 2026 ShopEase | E-Commerce Demo
            </footer>
        </BrowserRouter>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
