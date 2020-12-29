// import Dep from "./dep"

class Observer {
    constructor(data) {
        this.walk(data)
    }
    walk(data) {
        if (!data || typeof data !== 'object') return
        Object.keys(data).forEach((key) => {
            this.defineReactive(data, key, data[key])
        })

    }
    defineReactive(obj, key, val) {
        let that = this
        let dep = new Dep()
        this.walk(val)
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get() {
                // 收集依赖
                Dep.target && dep.addSub(Dep.target)
                return val
            },
            set(newVal) {
                if (val === newVal) return
                val = newVal
                that.walk(val)
                // 
                dep.notify()
            }
        })
    }
}

// export default Observer