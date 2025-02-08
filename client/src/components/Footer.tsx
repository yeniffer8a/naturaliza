import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-backgroundVariant text-primary py-12">
      <div className="container-section grid grid-cols-1 md:grid-cols-3  gap-8">
        <div>
          <h3 className="font-bold text-lg mb-4">PRODUCTOS</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/products/black-tea">Té negro</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/products/greeen-tea">Té verde</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/products/white-tea">Té blanco</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/products/herbs-tea">Té de hierbas</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/products/matcha">Matcha</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/products/chai">Chai</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/products/oolong">Oolong</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/products/rooibos">Rooibos</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/products/appliances">Accesorios</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4">CONOCE MÁS</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/about-us">Sobre nosotros</Link>
            </li>
            <li>
              <Link to="/about-tea">Sobre té</Link>
            </li>
            <li>
              <Link to="/client-service">Servicio al cliente</Link>
            </li>
            <li>
              <Link to="/order-payment">Pedido y pago</Link>
            </li>
            <li>
              <Link to="/delivery">Entrega</Link>
            </li>
            <li>
              <Link to="/privacy">Política de privacidad</Link>
            </li>
            <li>
              <Link to="/terms">Términos y condiciones</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4">CONTÁCTANOS</h3>
          <p>Jr. de la unión 565</p>
          <p>Email: natualiza@gmail.com</p>
          <p>Tel: +54 9173038406</p>
        </div>
      </div>
    </footer>
  );
}
