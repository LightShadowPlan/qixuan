### 开发一个移动端的web站点（M站）一

这一课的主要内容准备搭建一个web站点的开发环境，因为我们准备利用前端工程化来开发项目。

> 前端工程化就是我们利用一些gulp/node/webpack等构建工具开构建我们的开发环境，使得我们可以高效/快速的进行开发。

在搭建前先考虑好要使用的工具：

构建工具： gulp + webpack
 
包管理器： [yarn](https://yarn.bootcss.com/)  npm/cnpm install yarn -g

1. 我们创建好项目目录后，需要先去初始化项目：

yarn init -y

创建gulp file.js 用来创建任务等，src目录作为开发目录

安装本地的gulp，需要先全局安装

yarn add gulp global

yarn add gulp -D

D 代表开发依赖 devDependencices   S 代表生成依赖 dependencices

2. 实现输出html的任务

```
gulp.task('copy:html', () => {
    return gulp.src('./src/**/*.html')
            .pipe(gulp.dest('./dist/'));
})
```

3. 可以使用browser-sync工具来在dist文件夹开启一个热更新服务器

    npm install -g browser-sync

    yarn global add browser-sync

    browser-sync start --server --files "**/*.css, **/*.html, **/*.js"

4.  使用gulp-webserver工具来开启热更新开发服务器

    yarn add gulp-webserver -D

5. 配置快捷启动方式 npm scripts

    我们发现，其实很多环境启动的时候会执行这样的命令:

    npm run dev
    npm run build
    npm start

    其实就是因为可以在package.json中配置scripts来设置快速启动，配置的启动项为键值对模式，只需要npm run 键名,或者yarn 键名，就可以执行值所代表的命令了

    start 不需要run， 直接npm start。

6. 分离配置项

    准备在config目录中存放所有环境的配置，方便统一管理，准备使用模块化的方法进行模块导出与导入

    模块化： 将系统功能分离成独立的功能部分的方法

    模块化必须有规范，为了使分离的模块可以在组合起来，必须得定义模块如何导入和如何导出，这就是模块化的规范
    
    AMD CMD CommonJS ES6

    因为模块划分是要运行在gulp也就是运行在node中的，所以使用node自带的commonJS规范（同步）

    require(); module.exports


    在请求模块的时候，node_modules文件夹中的模块不用写路径

    当我们请求一个目录的时候其实相当于把这个目录看成一个包，我们是在请求这个包的入口文件，包的入口文件由package.json的main来指定，而main的默认值为index.js

7. 准备开发scss  需要安装gulp-sass （node-sass）

8. 处理js，准备在开发的时候使用模块化进行开发，所以需要利用工具进行模块化的打包

    webpack可以根据模块间的依赖关系将各个模块打包在一起...

    gulp中可以使用一个 gulp-webpack -> webpack-stream 的工具来简单的在gulp使用webpack的部分功能

    webpack的使用是基于配置的, 可以配置入口/出口/插件/loader等。。。

    引入模块的时候，模块的代码会在引入的位置执行一次

    模块可以不暴露东西

    模块的作用域是私有的

    webpack一切皆模块，我们可以把任何文件都当成模块引入到js中，但是需要使用loader来进行处理

9. MVC 

    在前端功能开发中融入MVC的思想， MVC是一种架构思想，主张将系统应用分为三层 Model(数据模型 提供数据/管理数据) View （视图 展示数据） Controller（控制层  将model的数据展示在view）


10. views更改，重新packjs
    // 改成所有文件变化
    gulp.watch('./src/javascripts/**/*', ['compile:js']);


    要实现static新增文件后能打包到dist中去，但是gulp.watch无法监听文件创建/删除。。。所以我们使用gulp-watch工具


    static新增，重新导出 gulp-watch
    // 输出静态文件
    gulp.task('copy:static', () => {
        return gulp.src('./src/static/**/*')
                .pipe(gulp.dest('./dist/static'));
    })
    watch('src/static', (v) => {
        if ( v.event === 'unlink' ) {
            let _path = v.history[0].replace('\src', '\dist');
            del(_path);// 需要使用del 模块来删除文件
        }else {
            gulp.start(['copy:static'])
        }
    })

搞搞字体图标

11. http-proxy-middleware 反向代理，  客户端不可见，服务端请求到目标数据再返回给我

    zepto-browserify (zepto 不支持commondJS规范的，这个支持 )

    制作zepto

    先克隆zepto git仓库

    cnpm install 

    mac:

    MODULES="zepto event data ajax form ie detect fx fx_methods assets deferred callbacks selector touch gesture stack ios3" npm run-script dist

    window:

    SET MODULES=zepto event data ajax form ie detect fx fx_methods assets deferred callbacks selector touch gesture stack ios3

    npm run-script dist




    利用async await 实现了数据层提供数据，控制层使用异步获取到的数据

12. handlebars
    
    let template = Handlebars.compile('<h1>{{title}}</h1>')

    let html = template({ title: 'Hello World' })

    o_div.innerHTML = html;

    {{#each datalist}}
        <div> {{this}} </div>
    {{/each}}
    
13. mock 数据 json-server 

    当我们开发项目的时候，没有接口的话需要去模拟一些数据 mock 数据 （后端还没有开发出真实接口）

    假设后端的接口文档是这样的：

    1. 获取list
    url： '/api/job/list'
    methods: get
    .....

    所以我们希望请求'/api/job/list' 能获取到mock的json文件的数据，这样的话有了真实接口也不用更改路径

    需要使用json-server工具，先去全局和本地安装json-server, 然后配置好mock.js 以及 route.json 执行命令就好，为了方便，我们配置了npm run mock

    json-server ./src/static/mock/mock.js -r ./src/static/mock/route.json


    我们想要同时执行npm run mock 和 npm run dev 因为这两个都是需要监听不能结束的，需要使用concurrently 

    "scripts": {
        "dev": "gulp",
        "start": "concurrently \"gulp\" \"json-server ./src/static/mock/mock.js -r ./src/static/mock/route.json\" ",
        "mock": "json-server ./src/static/mock/mock.js -r ./src/static/mock/route.json &"
    },

14. SPA路由

    我们的应用从跳转模式上来说一般分为两种： 多页面应用 （由多个完整html页面构建应用程序的功能模块） / 单页面应用

    单页面应用又叫SPA应用（single page application），整个项目只有一个页面，功能调整利用前端路由来实现

    单页面应用的好处就是，切换功能模块的时候不需要切换页面，浏览器不会刷新，不会出现白屏，用户体验好

    如何实现应用程序中功能模块的切换呢？

    我们可以控制需要切换的时候利用不同的控制器渲染不同的视图。

    准备实现一个前端的路由工具来完成这个事情，意思就是不直接控制控制器渲染，而是利用路由工具来根据地址栏变化去切换功能模块

    路由工具的原理： 根据地址栏的变化来渲染不同的视图。

    因为单页面应用不能跳转页面，所以我们控制地址栏变化为哈希值的变化，也可以使用H5 新增的historyapi进行切换。

    
