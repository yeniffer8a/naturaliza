import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonLogin } from "../components/ButtonLogin.tsx";
import type { LoginFormData, LoginResponse, ApiError } from "../types/auth";
import { Header } from "../components/Header.tsx";
import { Footer } from "../components/Footer.tsx";
import { Loader2 } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
// export function Login() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState<LoginFormData>({
//     email: "",
//     password: "",
//     remember: false,
//   });
//   const [error, setError] = useState<string>("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setIsLoading(true);

//     try {
//       const response = await fetch(`${import.meta.env.VITE_API_URL}/token`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: formData.email,
//           password: formData.password,
//         }),
//       });

//       const data = (await response.json()) as LoginResponse | ApiError;

//       if (!response.ok) {
//         throw new Error(
//           (data as ApiError).message || "Error al iniciar sesión"
//         );
//       }

//       const { token } = data as LoginResponse;
//       localStorage.setItem("token", token);

//       if (formData.remember) {
//         localStorage.setItem("userEmail", formData.email);
//       }

//       navigate("/");
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Error al iniciar sesión");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div className="min-h-screen flex items-center justify-center bg-background px-4">
//         <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-sm">
//           <h1 className="text-2xl font-semibold text-center mb-6 text-primary">
//             BIENVENIDO
//           </h1>
//           <p className="text-center text-gray-600 mb-8">
//             Inicia sesión para un proceso de compra más rápido.
//           </p>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <input
//                 type="email"
//                 placeholder="Correo Electrónico"
//                 className="input-field"
//                 value={formData.email}
//                 onChange={(e) =>
//                   setFormData({ ...formData, email: e.target.value })
//                 }
//                 required
//               />
//             </div>

//             <div>
//               <input
//                 type="password"
//                 placeholder="Contraseña"
//                 className="input-field"
//                 value={formData.password}
//                 onChange={(e) =>
//                   setFormData({ ...formData, password: e.target.value })
//                 }
//                 required
//               />
//             </div>

//             <div className="flex items-center justify-between">
//               <label className="flex items-center">
//                 <input
//                   type="checkbox"
//                   className="mr-2"
//                   checked={formData.remember}
//                   onChange={(e) =>
//                     setFormData({ ...formData, remember: e.target.checked })
//                   }
//                 />
//                 <span className="text-sm text-gray-600">Recuerdame</span>
//               </label>
//               <a
//                 href="/forgot-password"
//                 className="text-sm text-secondary hover:underline"
//               >
//                 ¿Olvidaste tu contraseña?
//               </a>
//             </div>

//             {error && (
//               <div className="text-red-500 text-sm text-center">{error}</div>
//             )}

//             <ButtonLogin type="submit" disabled={isLoading} className="w-full">
//               {isLoading ? "Iniciando sesión..." : "INICIAR SESIÓN"}
//             </ButtonLogin>
//           </form>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

export function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    remember: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = (await response.json()) as LoginResponse | ApiError;

      if (!response.ok) {
        throw new Error(
          (data as ApiError).message || "Error al iniciar sesión"
        );
      }

      const { token } = data as LoginResponse;
      sessionStorage.setItem("token", token);

      if (formData.remember) {
        localStorage.setItem("userEmail", formData.email);
      }

      toast.success("Inicio de sesión exitoso");
      navigate("/");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Error al iniciar sesión"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
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
      <Footer />
    </>
  );
}
