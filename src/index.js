import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  return (
    <div>
      {/* <h1>helllo bro</h1> */}
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  // const design = { color: "red", fontSize: "48px", textTransform: "uppercase" };
  const design = {};
  return (
    <>
      <header className="header">
        <h1 style={design}>Fast React Pizza Co.</h1>
      </header>
    </>
  );
}

function Menu() {
  const pizzas = pizzaData;
  // const pizzas = [];
  const numPizzas = pizzas.length;
  return (
    <>
      <main className="menu">
        <p>
          Authentic Italian cuisine. 6 creative dishes to choose from. All from
          our stone ovrn, all organic, all Delicious.
        </p>
        <h2>Our Menu</h2>
        {numPizzas > 0 ? (
          <ul className="pizzas">
            {pizzas.map((pizza) => (
              <Pizza pizzaObj={pizza} key={pizza.name} />
            ))}
          </ul>
        ) : (
          <p>We are still working on our emnu. Please come back lateer :)</p>
        )}
        {/* <Pizza
          photoName="pizzas/spinaci.jpg"
          ingredient="Tomato, mozarella, spinach, and ricotta cheese"
          name="Pizza Spinaci"
          price={10}
        />
        <Pizza
          photoName="pizzas/funghi.jpg"
          ingredient="Tomato, mozasotta cheese"
          name="Pizza Funghi"
          price={12}
        />
        <Pizza
          photoName="pizzas/spinaci.jpg"
          ingredient="Tomato, mozarella, spinach, and ricotta cheese"
          name="Pizza Spinaci"
          price={15}
        /> */}
      </main>
    </>
  );
}
function Pizza({ pizzaObj }) {
  // if (pizzaObj.soldOut) return null;
  console.log(pizzaObj);
  return (
    <li className={`pizza  ${pizzaObj.soldOut ? "sold-out" : ""}`}>
      <img src={pizzaObj.photoName} alt={pizzaObj.name} />
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>
        <span>{pizzaObj.soldOut ? "SOLD OUT" : pizzaObj.price}</span>
      </div>
    </li>
  );
}

function Footer() {
  const hour = new Date().getHours();
  console.log(hour);
  const open = 12;
  const close = 22;
  const isOpen = hour >= open && hour <= close;

  return (
    <>
      <footer className="footer">
        {isOpen ? (
          <Order close={close} open={open} />
        ) : (
          <p>
            We're happy to welcome you between {open}:00 and {close}:00
          </p>
        )}
      </footer>
    </>
  );
}

function Order(props) {
  return (
    <div className="order">
      <p>We're open until {props.close}:00. Come visit us online</p>
      <button className="btn">Order</button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
