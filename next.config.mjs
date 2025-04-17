/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cloud.appwrite.io",
                pathname: "/v1/storage/buckets/**/files/**/view",
            }
        ]
    }
};

export default nextConfig;
