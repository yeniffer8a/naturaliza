import { useState } from "react";
import { Button } from "./Button";
import { Product, Post } from "../types/api";
import { Link } from "react-router-dom";
export function Main() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  return (
    <main className="bg-background text-primary px-1 container-section ">
      {/*Hero Section */}
      {/* <div className="flex  flex-col items-center gap-1 "> */}
      <section className="h-[80vh] flex flex-col md:flex-row items-center justify-around gap-2">
        <div className="lg:w-1/2 md:w-full h-full">
          <img src="../assets/LandingMainImage.jpg" className=""></img>
        </div>

        <div className="lg:w-1/2 md:w-full h-full">
          <div className="flex flex-col items-center">
            <h1 className="font-prosto text-2x1 md:text-3xl text-primary mb-6">
              Cada día es único, al igual que nuestro té
            </h1>
            <p className="text-lg mb-8 mx-1 ">
              Cada día trae nuevas experiencias, y cada taza de té que ofrecemos
              está diseñada para acompañarte en esos momentos especiales.
              Descubre la calidad y el sabor inigualable de nuestros tés
              orgánicos, cuidadosamente seleccionados para ti.
            </p>

            <Button href="/products">Descubre más</Button>
          </div>
        </div>
      </section>
      {/* </div> */}

      {/*Features Section */}
      <section className="py-8 bg-backgroundVariant">
        <div className="container-section">
          <div className="grid lg:grid-rows-1 lg:grid-cols-4  md:grid-rows-2 md:grid-cols-2 gap-8 text-center ">
            <div>
              <h3 className="text-2xl font-bold mb-2">+450</h3>
              <p>TIPOS DE TÉ</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">100%</h3>
              <p>TÉS ORGÁNICOS CERTIFICADOS</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">GRATIS</h3>
              <p>ENTREGA GRATIS</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">PRUEBA</h3>
              <p>DISFRUTA TU MUESTRA GRATIS</p>
            </div>
          </div>
          <div className="text-center mt-12">
            <Button href="/productos">DESCUBRE MÁS</Button>
          </div>
        </div>
      </section>

      {/*Products Section */}
      <section className="py-16">
        <div className="container-section">
          <h2 className="text-3xl font-bold text-center mb-12">Productos</h2>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {products.map((product) => (
                <Link
                  key={product._id}
                  to={`/productos/${product._id}`}
                  className="group"
                >
                  <div className="relative aspect-square mb-4">
                    <img
                      src={
                        product.image ||
                        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Color%20Sheet-iSKzVaKGlkK0UOLq4vJGdqR7TOxZMd.png"
                      }
                      alt={product.name}
                      className="w-full h-full object-cover rounded-lg group-hover:opacity-90 transition-opacity"
                    />
                  </div>
                  <h3 className="font-bold mb-2">{product.name}</h3>
                  <p className="text-gray-600">${product.price}</p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center">
              No hay productos destacados disponibles en este momento.
            </p>
          )}
        </div>
      </section>

      {/*Blog Posts Section */}
      <section className="py-16">
        <div className="container-section bg-backgroundVariant">
          <h2 className="text-3x1 font-bold text-center mb-12">
            Últimos Posts del Blog
          </h2>
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grind-cols-2 gap-8">
              {posts.map((post) => (
                <Link key={post._id} to={`/blog/${post._id}`} className="group">
                  <div className="relative aspect-video mb-4">
                    <img
                      src={
                        post.image ||
                        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Color%20Sheet-iSKzVaKGlkK0UOLq4vJGdqR7TOxZMd.png"
                      }
                      alt={post.title}
                      className="w-full h-full object-cover rounded-lg group-hover:opacity-90 transition-opacity"
                    />
                  </div>
                  <h3 className="font-bold text-xl mb-2">{post.title}</h3>
                  <p className="text-gray-600 line-clamp-3">{post.content}</p>
                  <span className="text-secondary mt-4 inline-block">
                    Leer más
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center">
              No hay posts disponibles en este momento.
            </p>
          )}
        </div>
      </section>

      {/*Wholesale Section */}
      <section className="container-section ">
        <div className="py-16 h-[80vh] flex  items-center justify-between gap-2">
          <div className="md:w-1/2 py-14 h-full p-padding ">
            <h2 className="text-3xl font-bold mb-6 ">PARA MAYORISTAS</h2>
            <p className="max-w-2xl mx-auto mb-8 ">
              Ofrecemos hojas de té sueltas de la mejor calidadpara tu negocio.
              Con más de 450 tipos diferentes, creamos una selección
              personalizada que se adapta perfectamente a tu establecimiento.
            </p>
            <Button
              onClick={() =>
                window.open(
                  "https://wa.me/573128739574",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              Obtén una consulta gratuita
            </Button>
          </div>

          <div className="lg:w-1/2 md:w-full h-full">
            <img src="../assets/LandingMainImage.jpg" className=""></img>
          </div>
        </div>
      </section>
    </main>
  );
}
