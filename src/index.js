import Compiler from './compiler'
import Observer from './observer'

class Vue {
    constructor(options) {
        this.$options = options
        this.$data = options.data
        this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el
        this._proxyData(options.data)
        new Observer(options.data)
        new Compiler(this)
    }
    _proxyData(obj) {
        let that = this
        Object.keys(obj).forEach(key => {
            const value = obj[key]
            Object.defineProperty(that, key, {
                configurable: true,
                enumerable: true,
                get() {
                    return obj[key]
                },
                set(newVal) {
                    if (newVal === value) return
                    value = newVal
                    new Observer(newVal)
                }
            })
        })
    }
}

const vm = new Vue({
    el: '#app',
    data: {
        msg: 'hello',
        htmlMsg: "<h1>HtmlMsg</h1>",
        test: {
            testMsg: 'msg',
        }
    }
})
// window.Vue = Vue
// export default Vue