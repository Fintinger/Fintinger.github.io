
;
getSetAllResource([
    // {url:'https://jqf.oss-cn-beijing.aliyuncs.com/images/poster1.png',callBack:setBgImgCallBack},
    {url: 'https://jqf.oss-cn-beijing.aliyuncs.com/videos/7kgkoysahpw31.mp4', callBack: setBgvidCallBack},
])

//获取资源blob类型
function blobAjax(url) {
    return new Promise((reslove, reject) => {
        let x = new XMLHttpRequest()
        x.open("GET", url, true)
        x.responseType = 'blob';
        x.send()
        x.onreadystatechange = function () {
            if (x.readyState === 4) {
                if (x.status >= 200 && x.status < 300) {
                    reslove(x.response)
                } else {
                    reject("加载失败")
                }
            }
        }
        x.onerror = function () {
            reject("其它错误")
        }
    })
}

//发送get请求并将获取到的资源用回调处理
function getSetAllResource(resourceArr) {
    resourceArr.forEach(resource => {
        blobAjax(resource.url).then(data => resource.callBack(data))
    })
}

//处理背景视频的回调
function setBgvidCallBack(blobRes) {
    let vid = document.getElementById("liveBgBox");
    let profile = document.getElementsByClassName("profile")[0];
    if (profile) {
        vid.style.display = "block";
        window.document.body.setAttribute('style', "background:url(" + URL.createObjectURL(blobRes) + ") no-repeat  center/cover fixed")
    }
    vid.setAttribute("src", URL.createObjectURL(blobRes));
}

;
if (window.screen.width <= 640 && window.location.pathname === "/") {
    document.querySelector(".profile_inner").style.opacity = 1;
}
;
/*绘制随机线条*/
if (window.location.pathname !== "/" && window.screen.width > 640) {
    // document.getElementsByTagName("canvas")[0].remove();
    randomLine(300);
}

function randomLine(num) {
    function n(n, e, t) {
        return n.getAttribute(e) || t
    }
    function e(n) {
        return document.getElementsByTagName(n)
    }
    function t() {
        var t = e("script"), o = t.length, i = t[o - 1];
        return { l: o, z: n(i, "zIndex", -88), o: n(i, "opacity", .5), c: n(i, "color","0,0,0"), n: n(i, "count", num) }
    }
    function o() {
        a = m.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
            c = m.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    }
    function i() {
        r.clearRect(0, 0, a, c);
        var n, e, t, o, m, l;
        s.forEach(function (i, x) {
            for (i.x += i.xa, i.y += i.ya, i.xa *= i.x > a || i.x < 0 ? -1 : 1, i.ya *= i.y > c || i.y < 0 ? -1 : 1, r.fillRect(i.x - .5, i.y - .5, 1, 1), e = x + 1; e < u.length; e++)n = u[e],
            null !== n.x && null !== n.y && (o = i.x - n.x, m = i.y - n.y,
                l = o * o + m * m, l < n.max && (n === y && l >= n.max / 2 && (i.x -= .03 * o, i.y -= .03 * m),
                t = (n.max - l) / n.max, r.beginPath(), r.lineWidth = t / 2, r.strokeStyle = "rgba(" + d.c + "," + (t + .2) + ")", r.moveTo(i.x, i.y), r.lineTo(n.x, n.y), r.stroke()))
        }),
            x(i)
    }
    var a, c, u, m = document.createElement("canvas"),
        d = t(), l = "c_n" + d.l, r = m.getContext("2d"),
        x = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
            function (n) {
                window.setTimeout(n, 1e3 / 45)
            },
        w = Math.random, y = { x: null, y: null, max: 2e4 }; m.id = l, m.style.cssText = "position:fixed;top:0;left:0;z-index:" + d.z + ";opacity:" + d.o, e("body")[0].appendChild(m), o(), window.onresize = o,
        window.onmousemove = function (n) {
            n = n || window.event, y.x = n.clientX, y.y = n.clientY
        },
        window.onmouseout = function () {
            y.x = null, y.y = null
        };
    for (var s = [], f = 0; d.n > f; f++) {
        var h = w() * a, g = w() * c, v = 2 * w() - 1, p = 2 * w() - 1; s.push({ x: h, y: g, xa: v, ya: p, max: 6e3 })
    }
    u = s.concat([y]),
        setTimeout(function () { i() }, 100)
};

;
//图片下面的alt添加
document.querySelectorAll(".imgAlt").forEach(el => {
    console.dir();
    el.innerHTML = el.previousElementSibling.children[0].attributes.alt.value;
})

//toc固定按钮控制
const pinToc=document.querySelector("#pinToc");

pinToc.addEventListener("click",evt => {
    evt.target.parentElement.parentElement.parentElement.classList.toggle('pinned')
})