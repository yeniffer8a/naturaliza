import { toast, Toaster } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { useState } from "react";
import { RegisterFormData } from "../types/auth";
import { useRegisterMutation } from "../services/api";
const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "El nombre debe tener al menos 1 caracter")
      .max(50, "El nombre no puede exceder 50 caracteres"),
    lastName: z
      .string()
      .min(1, "El apellido debe tener al menos 1 caracter")
      .max(50, "El apellido no puede exceder 50 caracteres"),
    email: z.string().email("El correo debe tener un formato válido"),
    address: z
      .string()
      .min(1, "La dirección debe tener al menos 1 caracter")
      .max(50, "La dirección no puede exceder 50 caracteres"),
    country: z.string().min(1).max(50),
    city: z.string().min(1).max(50),
    postCode: z.string().min(1).max(50),
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,50}$/,
        "La contraseña debe tener al menos una mayúscula, una minúscula, un número y un carácter especial"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export function Register() {
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postCode: "",
    country: "",
    password: "",
    confirmPassword: "",
  });

  const [register, { isLoading }] = useRegisterMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate form data
      registerSchema.parse(formData);

      // Call the register mutation
      const result = await register(formData).unwrap();

      toast.success(result.message || "Usuario registrado exitosamente");
      // Clear form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        city: "",
        postCode: "",
        country: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          toast.error(err.message);
        });
        // } else if (
        //   "data" in error &&
        //   typeof error.data === "object" &&
        //   error.data &&
        //   "message" in error.data
        // ) {
        //   toast.error(error.data.message as string);
      } else {
        toast.error("Error al registrar usuario");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-32 px-4">
      <Toaster position="top-right"></Toaster>
      <div className="bg-backgroundVariant px-10 py-10 rounded-lg shadow-lg w-full max-w-[566px] h-auto border border-gray-500">
        <h2 className="text-xl font-semibold text-center mb-4">
          REGÍSTRATE Y DESCUBRE MÁS
        </h2>
        <p className="text-center text-gray-600 mb-8 text-sm">
          Es fácil y rápido. ¡Empecemos!
        </p>

        <form onSubmit={handleSubmit} className="space-y-12">
          <div className="grid grid-cols-2 gap-6">
            <input
              type="text"
              name="firstName"
              placeholder="Nombre"
              className="input-field"
              value={formData.firstName}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="lastName"
              placeholder="Apellido"
              className="input-field"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Correo Eletrónico"
            className="input-field"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div className="grid grid-cols-2 gap-6">
            <input
              type="text"
              name="address"
              placeholder="Dirección"
              className="input-field"
              value={formData.address}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="city"
              placeholder="Ciudad"
              className="input-field"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <input
              type="text"
              name="postCode"
              placeholder="Código Postal"
              className="input-field"
              value={formData.postCode}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="country"
              placeholder="País"
              className="input-field"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            className="input-field"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar Contraseña"
            className="input-field"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-onSecondary text-onPrimary py-4 rounded-md text-lg flex items-center justify-center disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Registrando...
              </>
            ) : (
              "REGISTRARME"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
