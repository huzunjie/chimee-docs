const navs_conf = require("../config.js");

function each(fun = (key, val, childs, navs)=>{ }, navs = navs_conf){
  for(let key in navs){
    const val = navs[key];
    fun(key, val, val.childs, navs);
  }
}

function flattening(fun = (key, val, fnavs, depth)=>{ }, fnavs = navs_conf, depth = 0){
  depth ++;
  each((key, val, childs)=>{
    fun(key, val, fnavs, depth);
    childs && flattening(fun, childs, depth);
  }, fnavs)
}

module.exports = {
  data: navs_conf,
  each,
  flattening
}