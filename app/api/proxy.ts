import { createProxyMiddleware, Filter, RequestHandler } from 'http-proxy-middleware';

export const config = {
  api: {
    bodyParser: false,
  },
};

const pexelsProxy: RequestHandler = createProxyMiddleware({
  target: 'https://www.pexels.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api/pexels': '/v1/curated',
  },
  onProxyReq: (proxyReq: { setHeader: (arg0: string, arg1: string | undefined) => void; }, req: any) => {
    const apiKey = process.env.PEXELS_API_KEY;
    proxyReq.setHeader('Authorization', apiKey);
  },
});

export default pexelsProxy;