export function pathToBase64(path) {
    console.log(path);//图片的路径
    return new Promise(function(resolve, reject) {
        //浏览器
        if (typeof window === 'object' && 'document' in window) {

            var canvas = document.createElement('canvas')
            var c2x = canvas.getContext('2d')
            var img = new Image

            img.onload = function() {
                //console.log("ffffffffff");
                canvas.width = img.width
                canvas.height = img.height
                c2x.drawImage(img, 0, 0)
                resolve(canvas.toDataURL())
            }
            img.onerror = reject
            img.src = path
            return
        }
        //app
        if (typeof plus === 'object') {
            var bitmap = new plus.nativeObj.Bitmap('bitmap' + Date.now())
            bitmap.load(path, function() {
                try {
                    var base64 = bitmap.toBase64Data()
                } catch (error) {
                    reject(error)
                }
                bitmap.clear()
                resolve(base64)
            }, function(error) {
                bitmap.clear()
                reject(error)
            })
            return
        }
        //小程序--不是临时上传带域名的
        if (typeof wx === 'object' && /https?:\/\/(?:[^/]+\.)?([^./]+\.\w*.(?:cn|com|top|com\.tw))(?:$|\/)/.test(path)) {
            let objUrl = "http://" + path.split("://")[1];
            // let objUrl = "https://" + path.split("://")[1]; 根据后台配置是http还是https
            wx.request({
                url: objUrl,
                responseType: 'arraybuffer', //最关键的参数，设置返回的数据格式为arraybuffer
                success: res => {
                    //把arraybuffer转成base64
                    let base64 = wx.arrayBufferToBase64(res.data);
                    resolve('data:image/png;base64,' + base64);
                }
            })
            return
        }
        //小程序--临时上传
        if (typeof wx === 'object' && wx.canIUse('getFileSystemManager')) {
            wx.getFileSystemManager().readFile({
                filePath: path,
                encoding: 'base64',
                success: function(res) {
                    resolve('data:image/png;base64,' + res.data)
                },
                fail: function(error) {
                    reject(error)
                }
            })
            return
        }
        reject(new Error('not support'))
    })
}

export function base64ToPath(base64) {
    return new Promise(function(resolve, reject) {
        if (typeof window === 'object' && 'document' in window) {
            base64 = base64.split(',')
            var type = base64[0].match(/:(.*?);/)[1]
            var str = atob(base64[1])
            var n = str.length
            var array = new Uint8Array(n)
            while (n--) {
                array[n] = str.charCodeAt(n)
            }
            return resolve((window.URL || window.webkitURL).createObjectURL(new Blob([array], { type: type })))
        }
        var extName = base64.match(/data\:\S+\/(\S+);/)
        if (extName) {
            extName = extName[1]
        } else {
            reject(new Error('base64 error'))
        }
        var fileName = Date.now() + '.' + extName
        if (typeof plus === 'object') {
            var bitmap = new plus.nativeObj.Bitmap('bitmap' + Date.now())
            bitmap.loadBase64Data(base64, function() {
                var filePath = '_doc/uniapp_temp/' + fileName
                bitmap.save(filePath, {}, function() {
                    bitmap.clear()
                    resolve(filePath)
                }, function(error) {
                    bitmap.clear()
                    reject(error)
                })
            }, function(error) {
                bitmap.clear()
                reject(error)
            })
            return
        }
        if (typeof wx === 'object' && wx.canIUse('getFileSystemManager')) {
            var filePath = wx.env.USER_DATA_PATH + '/' + fileName
            wx.getFileSystemManager().writeFile({
                filePath: filePath,
                data: base64.replace(/^data:\S+\/\S+;base64,/, ''),
                encoding: 'base64',
                success: function() {
                    resolve(filePath)
                },
                fail: function(error) {
                    reject(error)
                }
            })
            return
        }
        reject(new Error('not support'))
    })
}