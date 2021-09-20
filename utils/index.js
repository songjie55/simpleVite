function rewriteImport (content) {
    //重写文件中的es module的引用语法 ,如 import vue from ''vue
    return content.replace(/ from ['|"]([^'"]+)['|"]/g, function (s0, s1) {
        // . ../ / 这3种开头的都是相对路径
        if (s1[0] !== '.' && s1[1] !== '/') {
            return `from '/@modules/${s1}'`
        } else {
            return s0
        }
    })
}

module.exports= rewriteImport
