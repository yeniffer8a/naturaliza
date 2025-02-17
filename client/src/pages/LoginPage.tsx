import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonLogin } from "../components/ButtonLogin.tsx";
import type { LoginFormData } from "../types/auth";
import { Loader2 } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import { useLoginMutation } from "../services/authApi";

export function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    remember: false,
  });
  // const [isLoading, setIsLoading] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  //const [setError] = useState<string | null>(null);

  // const handleSubmit = async (e: FormEvent) => {
  //   e.preventDefault();
  //   //setIsLoading(true);

  //   try {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_API_URL}/api/token`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           email: formData.email,
  //           password: formData.password,
  //         }),
  //       }
  //     );

  //     const data = (await response.json()) as LoginResponse | ApiError;

  //     if (!response.ok) {
  //       throw new Error(
  //         (data as ApiError).message || "Error al iniciar sesión"
  //       );
  //     }

  //     const { token } = data as LoginResponse;
  //     sessionStorage.setItem("token", token);

  //     if (formData.remember) {
  //       localStorage.setItem("userEmail", formData.email);
  //     }

  //     toast.success("Inicio de sesión exitoso");
  //     navigate("/");
  //   } catch (err) {
  //     toast.error(
  //       err instanceof Error ? err.message : "Error al iniciar sesión"
  //     );
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const { email, password } = formData;

      const response = await login({ email, password }).unwrap(); // Usar el hook de Redux para hacer login

      // Guardar token y datos en sessionStorage o localStorage
      sessionStorage.setItem("token", response.token);

      if (formData.remember) {
        localStorage.setItem("userEmail", formData.email);
      }

      toast.success("Inicio de sesión exitoso");
      navigate("/");
    } catch (err: any) {
      // Manejo de errores
      console.error("Error en el login:", err);
      // setError(err.message || "Error al iniciar sesión");
      toast.error(err.message || "Error al iniciar sesión");
    }
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <Toaster position="top-right" />
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-sm">
          <h1 className="text-2xl font-semibold text-center mb-6 text-primary">
            BIENVENIDO
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Inicia sesión para un proceso de compra más rápido.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="email"
                placeholder="Correo Electrónico"
                className="input-field"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Contraseña"
                className="input-field"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={formData.remember}
                  onChange={(e) =>
                    setFormData({ ...formData, remember: e.target.checked })
                  }
                />
                <span className="text-sm text-gray-600">Recuerdame</span>
              </label>
              <a
                href="/forgot-password"
                className="text-sm text-secondary hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <ButtonLogin type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Cargando...
                </>
              ) : (
                "INICIAR SESIÓN"
              )}
            </ButtonLogin>
          </form>
        </div>
      </div>
    </>
  );
}
