function Observer(obj) {
    this.data = {}
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            let val = obj[key]
            Object.defineProperty(this.data, key, {
                get: () => {
                    console.log(`你访问了 ${key}`)
                    return val
                },
                set: (v) => {
                    console.log(`你设置了 ${obj[key]}，新的值为 ${v}`)
                    val = v
                }
            })
        }
    }
}
