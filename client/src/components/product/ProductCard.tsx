import { Link } from "react-router-dom";
import type { Product } from "../../types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const defaultPresentation = product.presentations[0];

  return (
    <Link to={`/products/${product.code}`} className="group block">
      <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity"
        />
      </div>
      <div className="mt-4 space-y-1">
        <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.characteristics.type}</p>
        <p className="text-sm font-medium text-gray-900">
          ${defaultPresentation.price.toFixed(2)} / {defaultPresentation.size}
        </p>
      </div>
    </Link>
  );
}
