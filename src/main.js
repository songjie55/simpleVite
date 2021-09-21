console.log('main')
import add from './test.js'//本地自己的文件
let x = add(1)
console.log(x)
import Vue from 'vue'//来自第三方依赖包中的文件


new Vue({
    render: function (h) {//这里引用的vue是不包含编译代码的，为了减少代码量，这里引用的是运行时代码runtime中的，如果在home中写模板编译，就会出错
        return h('p', this.age)
    },
    data: {
        age: 12
    }
}).$mount('#app')
