//vite 的开发服务器原理就是利用script标签type为module的特效，在遇到一个依赖包的时候会发起一个请求去获取依赖
//然后在kao中拦截所有的文件请求（下面是只做了js的文件请求拦截，还有css，html等等），然后在拼接上正确的地址在本地项目中找到静态文件返回给前端；
//如果遇到了其他类型的静态资源(如.vue,.less之类的)需要处理就需要用到和webpack一样的Load来处理了
const Koa = require('koa2')
const fs = require('fs');
const path = require('path')
const rewriteImport=require('./utils/index.js')
const app = new Koa()
app.use(async (ctx) => {
    const {url, query} = ctx
    if (url === '/') {
        ctx.type = 'text/html';
        let content = fs.readFileSync('./home.html', 'utf-8')
        ctx.body = content
    } else if (url.endsWith('.js')) {
        //js文件处理
        //第一步
        console.log(url)
        const p = path.resolve(__dirname, url.slice(1))
        // const p = path.join(__dirname, url.slice(0))
        const content = fs.readFileSync(p, 'utf-8');
        ctx.type = 'application/javascript';
        ctx.body = content;
        //1.main.js文件已经被拦截并处理成type为module的script文件返回给前端
        //2.在type已经是module的script脚本(main.js)中用es6模块语法import和export能发起请求到服务端拿取静态文件，再次触发上面的逻辑
        //3.所以被main或者他的子级用es module方式引用的的依赖包不需要其他处理了


        //上面只是处理简单的js文件还有项目中引用依赖包node_module的文件需要处理
        // 第二步
        //把 import vue from 'vue'给修改


    }
})
app.listen(3000, () => {
    console.log('start at http://localhost:3000')
})
