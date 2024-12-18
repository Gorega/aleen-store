import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns:[
      {
        protocol:"https",
        hostname:"storage.googleapis.com",
        port:"",
        pathname:"/aleen-store/**"
      }
    ]
  },
  env:{
    API_BASE_URL: "https://aleen-store.vercel.app/", // Example environment variable
  }
};

export default nextConfig;
