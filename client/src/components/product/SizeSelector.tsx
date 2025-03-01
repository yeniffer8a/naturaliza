interface SizeOption {
  size: string;
  label: string;
  price: number;
}

interface SizeSelectorProps {
  options: SizeOption[] | undefined;
  selectedSize: string;
  onSelect: (size: string) => void;
}

export function SizeSelector({
  options,
  selectedSize,
  onSelect,
}: SizeSelectorProps) {
  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
      {options?.map((option) => (
        <button
          key={option.size}
          onClick={() => onSelect(option.size)}
          className={`flex flex-col items-center p-4 border rounded-lg transition-colors ${
            selectedSize === option.size
              ? "border-primary bg-primary/5"
              : "border-gray-200 hover:border-primary"
          }`}
        >
          <div className="w-12 h-12 mb-2  flex items-center justify-center">
            <img
              src={`/icons/size-${option.size}.svg`}
              alt={option.label}
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-sm text-center">{option.label}</span>
        </button>
      ))}
    </div>
  );
}
