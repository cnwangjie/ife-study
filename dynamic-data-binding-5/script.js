let Vue = function(obj) {
    this.el = document.getElementById(obj.el.substr(1))
    this.template = this.el.innerHTML
    this.data = obj.data
    this.watch = {}
    this.walk(obj.data)
    this.render()
}

let p = Vue.prototype

p.render = function(key) {
    let html = this.template
    if (key) {
        let re = new RegExp(`{{${key}}}`)
        if (!re.test(html)) {
            return
        }
    }
    while (/{{[a-zA-Z.]+}}/.test(html)) {
        let tmpkey = /{{([a-zA-Z.]+)}}/.exec(html)[1]
        tmpkey = tmpkey.split('.')
        let tmp = this.data[tmpkey.shift()]
        while (tmpkey.length) {
            tmp = tmp[tmpkey.shift()]
        }
        html = html.replace(/{{[a-zA-Z.]+}}/, tmp.toString())
    }
    this.el.innerHTML = html
    console.log('render!')
}

p.walk = function(obj, path) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            let selfPath = path
            if (!path) {
                selfPath = key
            } else {
                selfPath += key
            }
            let val = obj[key]
            if (typeof val === 'object') {
                selfPath += '.'
                this.walk(val, selfPath)
            }

            Object.defineProperty(obj, key, {
                configurable: true,
                enumerable: true,
                get: () => {
                    return val
                },
                set: (newVal) => {
                    if (newVal === val) {
                        return
                    }
                    val = newVal
                    this.broadcast(selfPath, newVal)
                    this.render(val)
                    if (typeof val === 'object') {
                        selfPath += '.'
                        this.walk(val, selfPath)
                    }
                }
            })
        }
    }
}

p.broadcast = function(path, newVal) {
    while(path) {
        if (path in this.watch) {
            this.watch[path](newVal)
        }
        path = path.substr(0, path.lastIndexOf('.'))
    }
}

p.$watch = function(key, cb) {
    this.watch[key] = cb
}
