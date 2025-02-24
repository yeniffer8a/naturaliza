import { Globe, Leaf, Wheat } from "lucide-react";

interface ProductCharacteristicsProps {
  origin: string | undefined;
  isOrganic: boolean | undefined;
  isVegan: boolean | undefined;
}

export function ProductCharacteristics({
  origin,
  isOrganic,
  isVegan,
}: ProductCharacteristicsProps) {
  return (
    <div className="flex flex-wrap gap-6">
      <div className="flex items-center gap-2">
        <Globe className="h-5 w-5 text-gray-600" />
        <span>Origen: {origin}</span>
      </div>
      {isOrganic && (
        <div className="flex items-center gap-2">
          <Leaf className="h-5 w-5 text-gray-600" />
          <span>Orgánico</span>
        </div>
      )}
      {isVegan && (
        <div className="flex items-center gap-2">
          <Wheat className="h-5 w-5 text-gray-600" />
          <span>Vegano</span>
        </div>
      )}
    </div>
  );
}
