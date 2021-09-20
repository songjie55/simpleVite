console.log('main')
import add from './test.js'//本地自己的文件
let x = add(1)
console.log(x)
import Vue from 'vue'//来自第三方依赖包中的文件


new Vue({
    data: {
        age: 12
    }
}).$mount('#app')
