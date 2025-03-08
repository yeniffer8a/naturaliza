# Proyecto React con Vite y TypeScript

Este proyecto es una aplicación web construida con **React**, **Vite** y **TypeScript**.

## 🌐 Demo

Puedes ver el proyecto en funcionamiento aquí: [Naturaliza](https://naturaliza.netlify.app/)

## 📂 Estructura de Carpetas

```bash
📦 client
 ┣ 📂 node_modules
 ┣ 📂 public
 ┃ ┗ 📂 images # Imágenes y assets estáticos
 ┣ 📂 src
 ┃ ┣ 📂 assets # Recursos como imágenes, íconos, etc.
 ┃ ┣ 📂 components # Componentes reutilizables
 ┃ ┣ 📂 pages # Páginas de la aplicación
 ┃ ┣ 📂 services # Servicios y llamadas a APIs
 ┃ ┣ 📂 store # Gestión de estado con Redux
 ┃ ┣ 📂 slices # Slices de Redux
 ┃ ┣ 📂 types # Definiciones de tipos de TypeScript
 ┃ ┣ 📂 utils # Utilidades y funciones auxiliares
 ┃ ┗ main.tsx # Archivo principal de la aplicación
 ┣ 📜 package.json # Configuración del proyecto y dependencias
 ┣ 📜 tsconfig.json # Configuración de TypeScript
 ┣ 📜 vite.config.ts # Configuración de Vite
 ┗ 📜 README.md # Este archivo
```

## 🚀 Instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/yeniffer8a/naturaliza.git
cd client
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Iniciar el servidor de desarrollo**

```bash
npm run dev
```

## 📦 Dependencias Instaladas

### ⚙️ Dependencias principales

Estas son las principales librerías utilizadas en el proyecto y su propósito:

| Librería              | Uso                                       | Instalación                                    |
| --------------------- | ----------------------------------------- | ---------------------------------------------- |
| **React**             | Biblioteca principal para la UI           | `npm install react react-dom`                  |
| **Vite**              | Entorno de desarrollo rápido              | `npm install vite`                             |
| **TypeScript**        | Tipado estático para JavaScript           | `npm install typescript`                       |
| **React Router DOM**  | Manejo de rutas en la app                 | `npm install react-router-dom`                 |
| **Redux Toolkit**     | Gestión de estado global                  | `npm install @reduxjs/toolkit react-redux`     |
| **Axios**             | Cliente HTTP para consumir APIs           | `npm install axios`                            |
| **Tailwind CSS**      | Framework de estilos                      | `npm install tailwindcss postcss autoprefixer` |
| **ESLint y Prettier** | Linter y formateador de código            | `npm install eslint prettier`                  |
| **React Icons**       | Íconos para la interfaz                   | `npm install react-icons`                      |
| **Zustand**           | Alternativa ligera para gestión de estado | `npm install zustand`                          |

### 🛠️ Dependencias de Desarrollo

Estas librerías ayudan en el desarrollo, pero no son necesarias en producción.

| Librería              | Uso                                            | Instalación                                                          |
| --------------------- | ---------------------------------------------- | -------------------------------------------------------------------- |
| **Vite Plugin React** | Optimización de React con Vite                 | `npm install @vitejs/plugin-react`                                   |
| **ESLint**            | Herramienta para mejorar la calidad del código | `npm install eslint`                                                 |
| **Prettier**          | Formateador de código                          | `npm install prettier eslint-config-prettier eslint-plugin-prettier` |

## 📜 Scripts Disponibles

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "lint": "eslint . --ext .tsx,.ts"
}
```

- `npm run dev` - Inicia el servidor de desarrollo.
- `npm run build` - Genera los archivos de producción.
- `npm run preview` - Previsualiza la versión de producción.
- `npm run lint` - Ejecuta el linter para revisar errores en el código.

## 📌 Contribución

Si deseas contribuir, abre un **issue** o envía un **pull request**. 😊

---

### 📧 Contacto

Si tienes preguntas, puedes comunicarte conmigo. 🚀

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```
