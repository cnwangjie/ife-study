function genGiantImage(width = 19200, height = 10800, n = 10000) {
    let cvs = document.createElement('canvas')
    cvs.width = width
    cvs.height = height
    let ctx = cvs.getContext('2d')
    ctx.fillStyle = '#333'
    ctx.fillRect(0, 0, width, height)
    for (let i = 0; i < n; i += 1) {
        ctx.fillStyle = '#' + (16 * Math.random() << 0).toString(16) + (16 * Math.random() << 0).toString(16) + (16 * Math.random() << 0).toString(16)
        ctx.font = (200 * Math.random() << 0) +'px Arial'
        ctx.fillText('★', (width * Math.random() << 0), (height * Math.random() << 0))
    }
    return {
        cvs: cvs,
        ctx: ctx
    }
}

function preview(img, x = 0, y = 0) {
    let cvs = document.getElementById('preview')
    let ctx = cvs.getContext('2d')
    cvs.width = cvs.width
    ctx.drawImage(img.cvs, 0, 0, 1080, 600)
    ctx.strokeStyle = '#f00'
    ctx.strokeRect(x * 1080 / 19200 << 0, y * 600 / 10800 << 0, 1080 / 19200 * 480, 600 / 10800 * 270)
}

function initCanvas() {
    let cvs = document.getElementById('cvs')
    let ctx = cvs.getContext('2d')
    let img = genGiantImage()
    preview(img)
    let current = {
        x: 0,
        y: 0
    }
    ctx.drawImage(img.cvs, current.x, current.y, current.x + 1080, current.y + 600, 0, 0, 1080, 600)
    let press = {
        x: 0,
        y: 0
    }
    cvs.onmousedown = (e) => {
        if (e.button == 0) {
            press.x = e.offsetX
            press.y = e.offsetY
        }
    }

    cvs.onmouseup = (e) => {
        if (e.button != 0) {
            return
        }

        let move = {
            x: e.offsetX - press.x,
            y: e.offsetY - press.y
        }

        current.x -= move.x
        if (current.x < 0) {
            current.x = 0
        } else if (current.x > 19200 - 1080) {
            current.x = 19200 - 1080
        }
        current.y -= move.y
        if (current.y < 0) {
            current.y = 0
        } else if (current.y > 10800 - 600) {
            current.y = 10800 - 600
        }

        ctx.drawImage(img.cvs, current.x, current.y, current.x + 1080, current.y + 600, 0, 0, 1080, 600)
        preview(img, current.x, current.y)
    }

    let edit = document.getElementById('box')
    cvs.onclick = (e) => {
        if (edit.checked) {
          console.log('!!!')
            img.ctx.fillStyle = '#' + (16 * Math.random() << 0).toString(16) + (16 * Math.random() << 0).toString(16) + (16 * Math.random() << 0).toString(16)
            img.ctx.font = (200 * Math.random() << 0) +'px Arial'
            img.ctx.fillText('★', current.x + e.offsetX, current.y + e.offsetY)
        }
    }
}
