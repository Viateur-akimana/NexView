import { hostname } from 'os';

/** @type {import('next').NextConfig} */
const nextConfig = {
    remotePattern:[{
        
            protocol:"https",
            hostname:"images.pexels.com",
            port:"",
            pathname:"/photos/**"
            
}]
};

export default nextConfig;
