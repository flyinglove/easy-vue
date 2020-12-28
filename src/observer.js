class Observer {
    constructor(data) {
        this.data = data
        this.walk(data)
    }
    walk(data) {
        if (!data || typeof data !== 'object') return
        Object.keys(data).forEach((key) => {
            this.defineReactive(data, key, data[key])
        })

    }
    defineReactive(obj, key, val) {
        if (typeof val === 'object') {
            this.walk(val)
        }
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get() {
                return val
            },
            set(newVal) {
                if (val === newVal) return
                val = newVal
                this.walk(val)
            }
        })
    }
}

export default Observer