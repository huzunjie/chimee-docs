const fs = require("fs");
const https = require("https");
const navs = require("./navs-data.js");
const colors = require('colors');  
colors.setTheme({  
    silly: 'rainbow',  
    input: 'grey',  
    verbose: 'cyan',  
    prompt: 'red',  
    info: 'green',  
    data: 'blue',  
    help: 'cyan',  
    warn: 'yellow',  
    debug: 'magenta',  
    error: 'red'  
});

/* 写本地文件 */
function writeFilePromise(file, data){
  //console.log(file, fs.existsSync(file))
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      err ? reject(err) : resolve(file);
    });
  });
}
/* 拉取url对应内容 */
function getContentPromise(url){
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      var chunks = [], size = 0;
      res.on("data" , chunk => {
        chunks.push(chunk);
        size += chunk.length;
      });
      res.on("end" , () => {
        if(res.statusCode !== 200){
          return reject({ code:res.statusCode, errorMessage:'HTTP Error' });
        }
        //拼接buffer
        var data = Buffer.concat(chunks , size).toString();
        resolve(data);
      })
    }).on('error' , reject);
  });
}

/* 获取内容并写入本地文件 */
function getAndWrite(url, filename){
  return new Promise((resolve, reject) => {
    getContentPromise(url)
    .then(data => writeFilePromise(`${__dirname}/../docs/${filename}.md`, data).then(resolve))
    .catch(reject)
  })
  .then(ret => console.log(`get ${url} done.`.info))
  .catch(err => console.log(`get ${url} failed!`.error, err))
}

console.log('开始同步GitHub文档到本地...');

// 扁平化navsConf，并执行读写
navs.flattening((key, val) => {
  // console.log('md_fname:', val.md_fname )
  val.md_url && getAndWrite(val.md_url, val.md_fname);
});

