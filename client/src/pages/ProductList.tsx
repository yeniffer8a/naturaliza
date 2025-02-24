import { useState } from "react";
import { Breadcrumb } from "../components/Breadcrumb";
import { ProductFilters } from "../types/product";
import { FilterSection } from "../components/product/FilterSection";
import { FilterCheckbox } from "../components/product/FilterCheckbox";
import { useGetProductsQuery } from "../services/api";
import { ProductCard } from "../components/product/ProductCard";

const sortOptions = [
  { value: "price-asc", label: "Precio: Menor a Mayor" },
  { value: "price-desc", label: "Precio: Mayor a Menor" },
  { value: "name-asc", label: "Nombre: A-Z" },
  { value: "name-desc", label: "Nombre: Z-A" },
];

export function ProductsPage() {
  const [filters, setFilters] = useState<ProductFilters>({});
  const [sortBy, setSortBy] = useState("price-asc");
  const { data: products, isLoading } = useGetProductsQuery();
  const breadcrumbItems = [
    { label: "INICIO", href: "/" },
    { label: "PRODUCTOS", href: "/productos" },
  ];

  const handleFilterChange = (
    category: keyof ProductFilters,
    value: string
  ) => {
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category] === value ? undefined : value,
    }));
  };

  const filteredProducts = products?.filter((product) => {
    if (filters.type && product.characteristics.type !== filters.type)
      return false;
    if (filters.origin && product.characteristics.origin !== filters.origin)
      return false;
    if (filters.flavor && product.characteristics.flavor !== filters.flavor)
      return false;
    if (
      filters.properties &&
      product.characteristics.properties !== filters.properties
    )
      return false;
    if (
      filters.caffeineContent &&
      product.characteristics.caffeineContent !== filters.caffeineContent
    )
      return false;
    if (
      filters.allergens &&
      product.characteristics.allergens !== filters.allergens
    )
      return false;
    if (
      filters.organic !== undefined &&
      product.characteristics.organicCertification !== filters.organic
    )
      return false;
    return true;
  });

  const sortedProducts = [...(filteredProducts || [])].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.presentations[0].price - b.presentations[0].price;
      case "price-desc":
        return b.presentations[0].price - a.presentations[0].price;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  return (
    <div className="bg-background">
      {/* Hero Banner */}
      <div className="relative h-[300px] overflow-hidden">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Productos.jpg-Rho3I1vw9TlC88NRu4ZgcmfM0tEg7d.jpeg"
          alt="Tea Collection"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container-section py-8">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/**Sort by */}
      <div className="mr-0 mb-6">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-primary focus:outline-none focus:ring-primary"
        >
          <option value="">Ordenar por</option>
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {/* Product grid */}
      <div className=" grid grid-cols-4">
        {/* Filters */}
        <div className="mt-8 ml-3 grid grid-cols-1 gap-x-8 gap-y-10 ">
          <FilterSection title="TIPOS" defaultExpanded>
            <div className="space-y-2">
              {[
                "Té negro",
                "Té verde",
                "Té blanco",
                "Infusiones",
                "Matcha",
                "Chai",
                "Oolong",
                "Rooibos",
              ].map((type) => (
                <FilterCheckbox
                  key={type}
                  id={`type-${type}`}
                  label={type}
                  checked={filters.type === type}
                  onChange={() => handleFilterChange("type", type)}
                />
              ))}
            </div>
          </FilterSection>
          <FilterSection title="ORIGEN" defaultExpanded>
            <div className="space-y-2">
              {["India", "Japón", "Irán", "Sur África"].map((origin) => (
                <FilterCheckbox
                  key={origin}
                  id={`origin-${origin}`}
                  label={origin}
                  checked={filters.origin === origin}
                  onChange={() => handleFilterChange("origin", origin)}
                />
              ))}
            </div>
          </FilterSection>

          <FilterSection title="SABOR" defaultExpanded>
            <div className="space-y-2">
              {[
                "Picante",
                "Dulce",
                "Cítrico",
                "Suave",
                "Afrutado",
                "Floral",
                "Herbal",
                "Mentolado",
                "Amargo",
                "Cremoso",
              ].map((flavor) => (
                <FilterCheckbox
                  key={flavor}
                  id={`flavor-${flavor}`}
                  label={flavor}
                  checked={filters.flavor === flavor}
                  onChange={() => handleFilterChange("flavor", flavor)}
                />
              ))}
            </div>
          </FilterSection>

          <FilterSection title="PROPIEDADES" defaultExpanded>
            <div className="space-y-2">
              {["Detox", "Energizante", "Relajante", "Digestión"].map(
                (property) => (
                  <FilterCheckbox
                    key={property}
                    id={`property-${property}`}
                    label={property}
                    checked={filters.properties === property}
                    onChange={() => handleFilterChange("properties", property)}
                  />
                )
              )}
            </div>
          </FilterSection>

          <FilterSection title="CAFEÍNA" defaultExpanded>
            <div className="space-y-2">
              {[
                "Sin cafeína",
                "Baja en cafeína",
                "Media en cafeína",
                "Alta en cafeína",
              ].map((caffeine) => (
                <FilterCheckbox
                  key={caffeine}
                  id={`caffeine-${caffeine}`}
                  label={caffeine}
                  checked={filters.caffeineContent === caffeine}
                  onChange={() =>
                    handleFilterChange("caffeineContent", caffeine)
                  }
                />
              ))}
            </div>
          </FilterSection>

          <FilterSection title="ALÉRGENOS" defaultExpanded>
            <div className="space-y-2">
              {[
                "Sin lactosa",
                "Sin Gluten",
                "Sin Frutos secos",
                "Sin soya",
              ].map((allergen) => (
                <FilterCheckbox
                  key={allergen}
                  id={`allergen-${allergen}`}
                  label={allergen}
                  checked={filters.allergens === allergen}
                  onChange={() => handleFilterChange("allergens", allergen)}
                />
              ))}
            </div>
          </FilterSection>

          <div className="py-4">
            <label className="">
              <span className="font-medium mr-4 ml-1">ORGÁNICO</span>
              <button
                onClick={() =>
                  handleFilterChange("organic", (!filters.organic).toString())
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  filters.organic ? "bg-primary" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    filters.organic ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </label>
          </div>
        </div>

        {isLoading ? (
          <div>Cargando productos...</div>
        ) : (
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {sortedProducts.map((product) => (
              <ProductCard key={product.code} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
