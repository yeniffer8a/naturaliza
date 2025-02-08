import { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    zipCode: "",
    country: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <>
      <Header />

      <div className="flex flex-col items-center justify-center min-h-screen py-32   px-4">
        {/* Form Container */}
        <div className="bg-[#F4F4F4] px-10 py-10 rounded-lg shadow-lg w-full  max-w-[566px] h-auto border border-gray-200">
          <h2 className="text-xl font-semibold text-center  mb-4">
            REGÍSTRATE Y DESCUBRE MÁS
          </h2>
          <p className="text-center text-gray-600 mb-8 text-sm">
            Es fácil y rápido. ¡Empecemos!
          </p>

          <form onSubmit={handleSubmit} className="space-y-12 ">
            {/* First Name & Last Name */}
            <div className="grid grid-cols-2 gap-6 ">
              <input
                type="text"
                name="firstName"
                placeholder="Nombre"
                className="input-field"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Apellido"
                className="input-field"
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Correo Electrónico"
              className="input-field"
              onChange={handleChange}
              required
            />

            {/* Street & City */}
            <div className="grid grid-cols-2 gap-6">
              <input
                type="text"
                name="street"
                placeholder="Calle"
                className="input-field"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="city"
                placeholder="Ciudad"
                className="input-field"
                onChange={handleChange}
                required
              />
            </div>

            {/* Zip Code & Country */}
            <div className="grid grid-cols-2 gap-6">
              <input
                type="text"
                name="zipCode"
                placeholder="Código"
                className="input-field"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="country"
                placeholder="País"
                className="input-field"
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              className="input-field"
              onChange={handleChange}
              required
            />

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm text-gray-600">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Recuérdame
              </label>
              <a href="#" className="text-yellow-500">¿Olvidaste tu contraseña?</a>
            </div>

            {/* Submit Button */}
            <button type="submit" className="w-full bg-black text-white py-4 rounded-md text-lg">
              REGISTRARME
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Register;
