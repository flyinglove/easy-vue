// import Compiler from './compiler'
// import Observer from './observer'

class Vue {
    constructor(options) {
        this.$options = options
        this.$data = options.data || {}
        this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el
        this._proxyData(this.$data)
        new Observer(this.$data)
        new Compiler(this)
    }
    _proxyData(data) {
        let that = this
        Object.keys(data).forEach(key => {
            let value = data[key]
            Object.defineProperty(that, key, {
                configurable: true,
                enumerable: true,
                get() {
                    return data[key]
                },
                set(newVal) {
                    if (newVal === value) return
                    data[key] = newVal
                }
            })
        })
    }
}


// window.Vue = Vue
// export default Vue