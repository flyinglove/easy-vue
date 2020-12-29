// import { WatchIgnorePlugin } from "webpack"

class Compiler {
    constructor(vm) {
        this.vm = vm
        this.$el = vm.$el
        this.compile(this.$el)
    }
    compile(node) {
        const childNodes = node.childNodes
        childNodes.forEach(node => {
            if (this.isElementNode(node)) {
                this.compileElementNode(node)
            } else if (this.isTextNode(node)) {
                this.compileTextNode(node)
            }
            if(childNodes && childNodes.length) {
                this.compile(node)
            }
        })
    }
    compileElementNode(node) {
        const attributes = Array.from(node.attributes)
        attributes.forEach(attribute => {
            let { name, value } = attribute
            name = name.substr(2)
            this.update(node, value, name)
        })
    }
    update(node, key, attrName) {
        let updateFn = this[attrName + 'Updater']
        updateFn && updateFn.call(this, node, this.vm[key], key)

    }
    textUpdater(node, value, key) {
        node.textContent = value
        new Watcher(this.vm, key, (newValue) => {
            node.textContent = newValue
        })
    }
    htmlUpdater(node, value,  key) {
        node.innerHTML = value
        new Watcher(this.vm, key, (newValue) => {
            node.innerHTML = newValue
        })
    }
    modelUpdater(node, value, key) {
        node.value = value
        new Watcher(this.vm, key, (newValue) => {
            node.value = newValue
        })
        // 给表单元素注册input事件
        node.addEventListener('input', () => {
            this.vm[key] = node.value
        })
    }
    compileTextNode(node) {
        let reg = /\{\{(.+?)\}\}/
        const textContent = node.textContent
        if (reg.test(textContent)) {
            const key = RegExp.$1.trim()
            node.textContent = textContent.replace(reg, this.vm[key])
            // 创建watcher对象，当数据改变， 更新视图
            new Watcher(this.vm, key, (newValue) => {
                node.textContent = newValue
            })
        }
    }
    isDirective(attrName) {
        return attrName.startsWith('v-')
    }
    isElementNode(node) {
        return node.nodeType === 1
    }
    isTextNode(node){
        return node.nodeType === 3
    }
}
// export default Compiler