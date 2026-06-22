/** @type {import('next').NextConfig} */
const isExport = process.env.NEXT_EXPORT === "true";

const nextConfig = {
  // Modo export para GitHub Pages; standalone para Docker
  output: isExport ? "export" : "standalone",
  // Ruta base del repo en GitHub Pages (solo aplica en modo export)
  basePath: isExport ? "/TaskManager" : "",
  // Las imágenes deben desactivar optimización en export estático
  images: {
    unoptimized: isExport,
  },
};

export default nextConfig;
