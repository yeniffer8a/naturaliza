import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.jpg";
import searchIcon from "../assets/search.jpg";
import cartIcon from "../assets/local_mall.jpg";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-background shadow-sm text-outline">
      <nav className="container-section">
        <div className="flex items-center justify-between py-4">
          {/* Logo & Brand Name */}
          <div className="flex items-center space-x-3">
            <Link to="/">
              <img src={logo} alt="Naturaliza Logo" className="h-12 w-auto" />
            </Link>
            <Link to="/" className="text-2xl font-prosto text-primary">
              Naturaliza
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 text-lg">
            <Link to="/products" className="hover:text-secondary transition-colors">
              Productos
            </Link>
            <Link to="/accessories" className="hover:text-secondary transition-colors">
              Accesorios
            </Link>
            <Link to="/blog" className="hover:text-secondary transition-colors">
              Blog
            </Link>
            <Link to="/contact" className="hover:text-secondary transition-colors">
              Contacto
            </Link>
          </div>

          {/* Right Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <img src={searchIcon} alt="Search" className="h-6 cursor-pointer" />
            <Link to="/login" className="text-lg hover:text-secondary transition-colors">👤</Link>
            <img src={cartIcon} alt="Cart" className="h-6 cursor-pointer" />
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col space-y-4 mt-4 text-lg">
            <Link to="/products" className="block hover:text-secondary transition-colors">
              Productos
            </Link>
            <Link to="/accessories" className="block hover:text-secondary transition-colors">
              Accesorios
            </Link>
            <Link to="/blog" className="block hover:text-secondary transition-colors">
              Blog
            </Link>
            <Link to="/contact" className="block hover:text-secondary transition-colors">
              Contacto
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
