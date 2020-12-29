class Compiler {
    constructor(vm) {
        this.$vm = vm
        this.$el = vm.$el
        this.compile(this.$el)
    }
    compile(node) {
        const childNodes = node.childNodes
        console.log(childNodes)
        childNodes.forEach(node => {
            if (this.isElementNode(node)) {
                this.compileElementNode(node)
            } else if (this.isTextNode(node)) {
                this.compileTextNode(node)
            }
            this.compile(node)
        })
    }
    compileElementNode(node) {
        const attributes = Array.from(node.attributes)
        attributes.forEach(attribute => {
            console.dir(attribute)
            const { name, value } = attribute
            name = name.substr(2)
            this.update(node, key, name)
        })
    }
    update(node, key, attrName) {
        let updateFn = this[attrName + 'Updater']
        updateFn && updateFn(node, this.vm[key])

    }
    textUpdater(node, value) {
        node.textContent = value
    }
    htmlUpdater(node, value) {
        node.innerHTML = value
    }
    modelUpdater(node, value) {
        node.value = value
    }
    compileTextNode(node) {
        let reg = /\{\{(.+?)\}\}/
        const textContent = node.textContent
        if (reg.test(textContent)) {
            const key = RegExp.$1.trim()
            node.textContent = this.$vm[key]
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
export default Compiler