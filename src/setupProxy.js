const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://api.notion.com',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '', // /api로 시작하는 경로를 빈 문자열로 대체
            },
        })
    );
};
