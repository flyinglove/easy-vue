import Observer from './observer'

class Vue {
    constructor(options) {
        this.$options = options
        new Observer(options.data)
    }
}

const vm = new Vue({
    el: '#app',
    data: {
        msg: 'hello',
        test: {
            testMsg: 'msg'
        }
    }
})
// window.Vue = Vue
// export default Vue