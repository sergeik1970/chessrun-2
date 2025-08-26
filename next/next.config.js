/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ["images.unsplash.com", "localhost"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "http",
                hostname: "localhost",
                port: "3001",
                pathname: "/api/news/**",
            },
        ],
    },
};

module.exports = nextConfig;
