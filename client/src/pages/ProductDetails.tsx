import { useParams } from "react-router-dom";
import { Breadcrumb } from "../components/Breadcrumb";
import { useGetProductByCodeQuery } from "../services/api";
import { ProductCharacteristics } from "../components/product/ProductCharacteristics";
import { useState } from "react";
import toast from "react-hot-toast";
import { SizeSelector } from "../components/product/SizeSelector";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "../components/Button";
import { PreparationInstructions } from "../components/product/PreparationInstructions";
import { ProductTabs } from "../components/product/ProductTabs";
import { RelatedProducts } from "../components/product/RelatedProducts";
import { Loader } from "../components/Loader";
import { ErrorMessage } from "../components/ErrorMessage";

export function ProductDetail() {
  const { code } = useParams<{ code: string }>();
  const { data: product, error, isLoading } = useGetProductByCodeQuery(code!);
  const [selectedSize, setSelectedSize] = useState("50g");
  const [quantity, setQuantity] = useState(1);

  if (isLoading) return <Loader />;
  if (error)
    return (
      <ErrorMessage message="Error al cargar el producto. Por favor, intente nuevamente." />
    );
  if (!product) return <ErrorMessage message="Producto no encontrado." />;

  const breadcrumbItems = [
    { label: "INICIO", href: "/" },
    { label: "PRODUCTO", href: "/products" },
    // { label: product.name.toUpperCase(), href: "#" },
  ];

  const handleAddToCart = () => {
    toast.success(
      `${quantity} ${product?.name} (${selectedSize}) añadido al carrito`
    );
  };

  const characteristics = [
    { label: "SABOR", value: product?.characteristics.flavor },
    { label: "PROPIEDADES", value: product?.characteristics.properties },
    { label: "CAFEÍNA", value: product?.characteristics.caffeineContent },
    { label: "ALÉRGENOS", value: product?.characteristics.allergens },
  ];

  return (
    <div className="bg-onPrimary">
      <div className="container-section  py-8">
        <Breadcrumb items={breadcrumbItems} />
        {/* Product Image */}
        <div>
          <img
            src={product?.image || "/placeholder.svg"}
            alt={product?.name}
            className="w-full rounded-lg object-cover"
          />
        </div>
        {/* Product Details */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product?.name}</h1>
          <p className="text-gray-600">{product?.description}</p>

          <ProductCharacteristics
            origin={product?.characteristics.origin}
            isOrganic={product?.characteristics.organicCertification}
            isVegan={true} // Assuming all products are vegan, adjust if necessary
          />

          <div className="text-3xl font-bold">
            ${product?.presentations[0].price.toFixed(2)}
          </div>

          <div>
            <h3 className="text-sm text-gray-600 mb-2">
              Presentaciones disponibles
            </h3>
            <SizeSelector
              options={product?.presentations.map((p) => ({
                size: p.size,
                label: `Bolsa de ${p.size}`,
                price: p.price,
              }))}
              selectedSize={selectedSize}
              onSelect={setSelectedSize}
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center border rounded-md">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:bg-gray-100"
              >
                <Minus className="h-5 w-5" />
              </button>
              <span className="px-4 py-2 border-x">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(5, quantity + 1))}
                className="p-2 hover:bg-gray-100"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
            <Button
              onClick={handleAddToCart}
              className="flex items-center space-x-2"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>AÑADIR AL CARRITO</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-16 grid md:grid-cols-2 gap-12">
        {/* <PreparationInstructions
            portion={product?.preparationInstructions.recommendedPortion}
            temperature={product?.preparationInstructions.waterTemperature}
            time={product?.preparationInstructions.infusionTime}
            note="Se intensifica después de 3 minutos"
          /> */}

        <ProductTabs tabs={characteristics} />
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Ingredientes</h2>
        <p>{product?.ingredients}</p>
      </div>

      <div className="mt-16">
        <RelatedProducts />
      </div>
    </div>
  );
}
