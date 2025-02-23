import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingBag, UserCheck, UserX } from "lucide-react";
import logo from "../assets/logo.jpg";
import searchIcon from "../assets/search.jpg";
import { useCart } from "../contexts/CartContext";
import { CartMenu } from "./CartMenu";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items } = useCart();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-background shadow-sm text-outline relative">
      <nav className="container-section">
        <div className="flex items-center justify-between py-4">
          {/* Logo & Brand Name */}
          <div className="flex items-center space-x-3">
            <Link to="/">
              <img
                src={logo || "/placeholder.svg"}
                alt="Naturaliza Logo"
                className="h-12 w-auto"
              />
            </Link>
            <Link to="/" className="text-2xl font-prosto text-primary">
              Naturaliza
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 text-lg">
            <Link
              to="/products"
              className="hover:text-secondary transition-colors"
            >
              Productos
            </Link>
            <Link
              to="/accessories"
              className="hover:text-secondary transition-colors"
            >
              Accesorios
            </Link>
            <Link to="/blog" className="hover:text-secondary transition-colors">
              Blog
            </Link>
            <Link
              to="/contact"
              className="hover:text-secondary transition-colors"
            >
              Contacto
            </Link>
          </div>

          {/* Right Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <img
              src={searchIcon || "/placeholder.svg"}
              alt="Search"
              className="h-6 cursor-pointer"
            />
            <Link
              to="/login"
              className="text-lg hover:text-secondary transition-colors"
            >
              <UserCheck className="h-6 w-6" />
            </Link>
            <button
              className="relative"
              onClick={() => setIsCartOpen(!isCartOpen)}
            >
              <ShoppingBag className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col space-y-4 mt-4 text-lg">
            <Link
              to="/products"
              className="block hover:text-secondary transition-colors"
            >
              Productos
            </Link>
            <Link
              to="/accessories"
              className="block hover:text-secondary transition-colors"
            >
              Accesorios
            </Link>
            <Link
              to="/blog"
              className="block hover:text-secondary transition-colors"
            >
              Blog
            </Link>
            <Link
              to="/contact"
              className="block hover:text-secondary transition-colors"
            >
              Contacto
            </Link>
          </div>
        )}
      </nav>

      {/* Cart Menu */}
      {isCartOpen && (
        <div className="absolute top-full right-0 w-96 bg-white shadow-lg z-50">
          <CartMenu onClose={() => setIsCartOpen(false)} />
        </div>
      )}
    </header>
  );
}
