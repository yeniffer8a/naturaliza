import { useGetProductsQuery } from "../../services/api";
import { ProductCard } from "./ProductCard";

export function RelatedProducts() {
  const { data: products, isLoading, error } = useGetProductsQuery();

  if (isLoading) return <div>Cargando productos relacionados...</div>;
  if (error) return null;

  const relatedProducts = products?.slice(0, 3) || [];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">También te puede gustar</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedProducts.map((product) => (
          <ProductCard key={product.code} product={product} />
        ))}
      </div>
    </div>
  );
}
