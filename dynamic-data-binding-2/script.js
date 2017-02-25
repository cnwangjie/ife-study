let Observer = function(obj) {
    this.data = obj
    this.watch = {}
    this.walk(obj)
}

let p = Observer.prototype

p.walk = function(obj) {
    let val
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            val = obj[key]
            if (typeof val === 'object') {
                new Observer(val)
            }
            this.convert(key, val)
        }
    }
}

p.convert = function(key, val) {
    let self = this
    Object.defineProperty(this.data, key, {
        get: () => {
            console.log(`你访问了 ${key}`)
            return val
        },
        set: (v) => {
            if (typeof v === 'object') {
                new Observer(v)
            }
            if (key in this.watch) {
                self.watch[key](v)
            }
            console.log(`你设置了 ${key}，新的值为 ${v}`)
            val = v
        }
    })
}

p.$watch = function (key, cb) {
    this.watch[key] = cb
}
