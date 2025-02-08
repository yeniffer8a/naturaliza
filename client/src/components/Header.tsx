import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-background py-4 shadow-sm text-outline">
      <nav className="container-section">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-prosto text-primary">
            Naturaliza
          </Link>
          <div className="hidden md:flex items-center space-x-8 ">
            <Link
              to="/products"
              className="hover:text-secondary transition-colors"
            >
              Productos
            </Link>
            <Link
              to="/appliances"
              className="hover:text-secondary transition-colors"
            >
              Accesorios
            </Link>
            <Link to="/blog" className="hover:text-secondary transition-colors">
              Blog
            </Link>
            <Link
              to="/touchUs"
              className="hover:text-secondary transition-colors"
            >
              Contacto
            </Link>
          </div>
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
        {isOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <Link
              to="/productos"
              className="block hover:text-secondary transition-colors"
            >
              Productos
            </Link>
            <Link
              to="/accesorios"
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
              to="/contacto"
              className="block hover:text-secondary transition-colors"
            >
              Contacto
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
