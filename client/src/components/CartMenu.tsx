import { ShoppingBag, Minus, Plus, X } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

interface CartMenuProps {
  onClose: () => void;
}

export function CartMenu({ onClose }: CartMenuProps) {
  const { items, updateQuantity, removeItem, subtotal, total, deliveryFee } =
    useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="p-4 text-center">
        <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-4 text-gray-500">Tu carrito está vacío</p>
      </div>
    );
  }

  const handleCheckout = () => {
    navigate("/cart");
    onClose();
  };

  return (
    <div className="flex flex-col h-full max-h-[80vh]">
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {items.map((item) => (
              <li key={`${item.id}-${item.size}`} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>{item.name}</h3>
                      <button
                        onClick={() => removeItem(item.id, item.size)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{item.size}</p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.size, item.quantity - 1)
                        }
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="font-medium">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.size, item.quantity + 1)
                        }
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>${subtotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-between text-base font-medium text-gray-900 mt-2">
          <p>Delivery</p>
          <p>${deliveryFee.toFixed(2)}</p>
        </div>
        <div className="flex justify-between text-base font-medium text-gray-900 mt-4">
          <p>Total</p>
          <p>${total.toFixed(2)}</p>
        </div>
        <div className="mt-6">
          <button
            onClick={handleCheckout}
            className="w-full bg-primary text-white rounded-md border border-transparent px-6 py-3 text-base font-medium shadow-sm hover:opacity-90"
          >
            COMPRAR
          </button>
        </div>
      </div>
    </div>
  );
}
