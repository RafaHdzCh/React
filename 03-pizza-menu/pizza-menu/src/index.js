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
  return( 
    <main className="menu"> 
      <h2> Our menu </h2>
      <ul className="pizzas">
        {
          pizzaData.map(pizza => 
          <Pizza pizzaObj={pizza} key={pizza.name}/>)
        }
      </ul>

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

function Pizza(props)
{
  return (
  <li className="pizza">
    <img src= {props.pizzaObj.photoName} alt= {props.pizzaObj.name} />
    <div>
      <h2> {props.pizzaObj.name} </h2>
      <p> {props.pizzaObj.ingredients} </p>
      <span> ${props.pizzaObj.price} </span>
    </div>
  </li>) 
}

function Footer()
{
  return <footer className="footer"> We're open from 10:00am to 10:00pm </footer>
}



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode> 
    <App /> 
  </React.StrictMode> 
);