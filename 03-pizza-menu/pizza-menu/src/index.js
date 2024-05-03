import React from "react";
import ReactDOM from "react-dom/client"
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


function App()
{
  return (
  <div className="container">
    <Header />
    <Menu />
    <Footer />
  </div>
  );
}

function Header()
{
  return <header className="header"><h1 style={{}}> Fast React Pizza Co. </h1> </header>
}

function Menu()
{
  const amountOfDishes = pizzaData.length;

  return( 
    <main className="menu"> 
      {amountOfDishes > 0 ? 
      (
        <React.Fragment>
          <h2> Our menu </h2>
          <p> Authentic Italian cuisine. Creative dishes to choose from. All from our stone oven, all organic, all delicious. </p>
          <ul className="pizzas">
            {
              pizzaData.map(pizza => 
              <Pizza pizzaObj={pizza} key={pizza.name}/>)
            }
          </ul>
        </React.Fragment>
      ) 
      : 
      (
        <p> We are still working on our menu...</p>
      )}
      {
      /*<Pizza 
        name ="Pizza Name" 
        ingredients="These are the ingredients" 
        photoName="pizzas/spinaci.jpg"
        price={12}
      />*/
      }
    </main>
  )
}

function Pizza({pizzaObj})
{
  return (
  <li className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}>
    <img src= {pizzaObj.photoName} alt= {pizzaObj.name} />
    <div>
      <h2> 
        {pizzaObj.name} 
      </h2>
      <p> 
        {pizzaObj.ingredients} 
      </p>
      <span> 
      {pizzaObj.soldOut ? "SOLD OUT" : `$ ${pizzaObj.price}`}
      </span>
    </div>
  </li>) 
}

function Footer()
{
  return (
  <div className="order">
    <footer className="footer"> 
      <p> We're open from 10:00am to 10:00pm </p>
    </footer>
    <button className="btn"> Order </button>
  </div>)
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode> 
    <App /> 
  </React.StrictMode> 
);