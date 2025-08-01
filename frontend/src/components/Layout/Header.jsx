import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
  import { useSelector } from "react-redux";

import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { BiMenuAltLeft } from "react-icons/bi";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import styles from "../../styles/styles";
import { categoriesData, productData } from "../../static/data";
import DropDown from "./DropDown.jsx";
import Navbar from "./Navbar.jsx";
// import Cart from "../cart/Cart.jsx";
// import Wishlist from "../Wishlist/Wishlist.jsx";


const Header = ({ activeHeading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [active, setActive] = useState(false);
  const isSeller = false;
  const [dropDown, setDropDown] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
const { wishlist } = useSelector((state) => state.wishlist);
const { cart } = useSelector((state) => state.cart);
const { user, isAuthenticated } = useSelector((state) => state.user);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      productData &&
      productData.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };

  useEffect(() => {
    const onScroll = () => {
      setActive(window.scrollY > 70);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Header Top */}
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
          {/* Logo */}
         <div>
           <Link to="/">
            <img
              src="https://shopo.quomodothemes.website/assets/images/logo.svg"
              alt=""
            />
          </Link>
         </div>

          {/* Search */}
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleSearchChange}
 className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />

           {searchData && searchData.length !== 0 && (
  <div className="absolute min-h-[30vh] bg-white shadow-lg z-[50] w-full rounded-md mt-1">

                {searchData.map((i, index) => (
                  <Link to={`/product/${i._id || i.id}`} key={index}>
                        <div className="w-full flex items-start-py-3">
                    <img
  src={i.image_Url[0]?.url}
  alt={i.name || i.title}
                            className="w-[40px] h-[40px] mr-[10px]"
/>

                      <h1 className="text-sm text-black">{i.name || i.title}</h1>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Seller Button */}
          <div className={`${styles.button}`}>
            <Link to={`${isSeller ? "/dashboard" : "/shop-create"}`}>
              <h1 className="text-white flex items-center">
                {isSeller ? "Go Dashboard" : "Become Seller"}
                <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header - Responsive */}
            <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } transition hidden 800px:flex items-center justify-between w-full bg-[#3321c8] h-[70px]`}
      >
        <div
          className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
        >
          {/* Left - Logo & Category */}
          <div className="flex items-center">
            {/* Mobile Toggle */}
            <button
              onClick={() => setShowMobileNav(!showMobileNav)}
              className="text-white text-2xl md:hidden mr-3"
            >
              {showMobileNav ? <HiX /> : <HiMenuAlt3 />}
            </button>

            {/* Logo (mobile) */}
            <Link to="/" className="block md:hidden">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt=""
                className="w-[100px]"
              />
            </Link>

            {/* Categories - only on lg+ */}
            <div onClick={() => setDropDown(!dropDown)} className="hidden lg:block ml-4">
              <div className="relative h-[60px] w-[270px]">
                <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
                <button className="h-full w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md">
                  All Categories
                </button>
                <IoIosArrowDown
                  size={20}
                  className="absolute right-2 top-4 cursor-pointer"
                  onClick={() => setDropDown(!dropDown)}
                />
                {dropDown && (
                  <DropDown
                    categoriesData={categoriesData}
                    setDropDown={setDropDown}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Center - Navbar (mobile & desktop) */}
          <div
            className={`${
              showMobileNav ? "block" : "hidden"
            } absolute md:static top-[70px] left-0 w-full md:w-auto bg-[#3321c8] z-20 md:flex`}
          >
            <Navbar />
          </div>

          {/* Right - Icons */}
          <div className="flex items-center">
            {/* Wishlist */}
            <div className="flex">
            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishlist(true)}
              >
                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {wishlist && wishlist.length}
                </span>
              </div>
            </div>
            </div>

            {/* Cart */}
          <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {cart && cart.length}
                </span>
              </div>
            </div>

            {/* Profile */}
            <div className={`${styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img
                      src={`${user?.avatar?.url}`}
                      className="w-[35px] h-[35px] rounded-full"
                      alt=""
                    />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                  </Link>
                )}
              </div>
            </div>
             {/* cart popup */}
            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

            {/* wishlist popup */}
            {openWishlist ? (
              <Wishlist setOpenWishlist={setOpenWishlist} />
            ) : null}
          </div>
        </div>
        
      </div>
    </>
  )};

export default Header;
