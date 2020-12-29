// import Dep from "./dep"

class Watcher {
    constructor(vm,  key, cb) {
        this.vm = vm
        this.key = key // data炸的属性kwey
        this.cb = cb // 负责更新视图

        // 把watcher对象记录到Dep.target中， 并触发get方法，get会调用addSub
        Dep.target = this
        // 访问属性， 触发getter, 依赖收集
        this.oldValue = vm[key]
        Dep.target = null
    }
    // 数据发生变化，更新视图
    update() {
        let newValuie = this.vm[this.key]
        if (newValuie === this.oldValue) return
        this.cb(newValuie)
    }
} 