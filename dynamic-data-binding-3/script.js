let Observer = function(obj) {
    this.data = obj
    this.watch = {}
    this.walk(obj)
}

let p = Observer.prototype

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
