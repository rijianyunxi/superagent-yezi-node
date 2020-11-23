const request = require('superagent')
const cheerio = require('cheerio')
const { connect, createModel, add } = require('./mongodb/index')

//链接mongodb
connect();
//创建model
let model = createModel('movie', {
    name: String,
    pic: String,
    year: String,
    area: String,
    type: String,
    actor: String,
    detial: String,
    url: String,
    date: Number
});

// 获取视频的播放地址
function getMovieSource(playHref) {
    return new Promise((resolve, reject) => {
        request.get(playHref).end((err, res) => {
            if (err) { reject('err') }
            let url = /"url":"(.*?)",/.exec(res.text)[1];
            resolve(url || '');
        })
    })
}

// 获取爬取电影的信息
function getMovieData(herf) {
    return new Promise((resolve, reject) => {
        request.get(herf).end(async (err, res) => {
            if (err) {
                reject('爬取电影信息失败')
            } else {
                let $ = cheerio.load(res.text);
                let playHref = "http://www.tv331.com" + $('.numList a').eq(0).attr('href');
                await add(model, {
                    name: $('.ellipsis-1 a').text(),
                    pic: $('.list-pic').attr('data-original'),
                    year: $('.margin-r-15').eq(0).text(),
                    area: $('.margin-r-15').eq(2).text(),
                    type: $('.margin-r-15').eq(1).text(),
                    actor: $('.ellipsis-2').eq(0).text(),
                    detial: $('.ellipsis-2').eq(1).text(),
                    url: await getMovieSource(playHref),
                    date: new Date().getTime()
                })
                resolve($('.ellipsis-1 a').text() + '-----已抓取并加入数据库');
            }
        })
    })
}

// 获取视频详情页的href,并且调用抓取方法
function getHerf(page) {
    return new Promise((resolve, reject) => {
        request.get(`http://www.tv331.com/index.php/vod/type/id/1/page/${page}.html`).end(async (err, res) => {
            if (err) {
                reject('获取电影详情页href失败')
            } else {
                var $ = cheerio.load(res.text);
                for (let i = 0, len = $('.video-item').length; i < len; i++) {
                    let data = await getMovieData('http://www.tv331.com/' + $(".item-pic").eq(i).attr('href'));
                    console.log(data);
                }
                resolve(`第${page}页操作完毕！`);
            }
        })
    })
}


async function go() {
    for (let i = 1; i < 1000; i++) {
        let msg = await getHerf(i);
        console.log(msg)
    }
}
go();

