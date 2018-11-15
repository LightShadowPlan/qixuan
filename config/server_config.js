const proxy = require('http-proxy-middleware');

// 开发服务器的配置
const server_config = {
    host: 'localhost',
    port: 9191,
    livereload: true,
    middleware: [
        proxy('/baidu', {
            target: 'https:baidu.com',
            changeOrigin: true
        })
    ]

}


module.exports = server_config;