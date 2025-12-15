/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,ts}"],
    corePlugins: {
        preflight: false,  // ← Desactiva el reset de Tailwind
    },
    theme: {
        extend: {},
    },
    plugins: [],
}