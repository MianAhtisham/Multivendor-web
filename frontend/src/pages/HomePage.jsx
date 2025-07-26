import React from 'react'
import Header from "../components/Layout/Header.jsx"
import Hero from "../components/Route/Hero/Hero.jsx";
import Categories from "../components/Route/Categories/Categories.jsx";


const HomePage = () => {
  return (
    <div>
     <Header />
     <Hero />
     <Categories />
    </div>
  )
}

export default HomePage
