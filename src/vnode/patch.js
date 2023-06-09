export function patch(oldVnode, vnode) {
    let el = createEl(vnode)
    let parentEl = oldVnode.parentNode;
    parentEl.insertBefore(el, oldVnode.nextsibling)
    parentEl.removeChild(oldVnode)
    return el
}

export function createEl(vnode) {
    let { tag, children, key, data, text } = vnode;
    if (typeof tag === 'string') {
        vnode.el = document.createElement(tag)
        if (children.length > 0) {
            children.forEach(child => {
                vnode.el.appendChild(createEl(child))
            })
        }
    } else {
        vnode.el = document.createTextNode(text)
    }
    return vnode.el
}
