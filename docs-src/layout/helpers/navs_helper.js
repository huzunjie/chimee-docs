const navs = require("../../tools/navs-data.js");

function render(_childs){
  let doms = '';
  navs.each((key, item, childs) => {
    let ltext = key;
    let fname = item.md_fname;
    if(fname){
      ltext = `<a href="${fname}.html">${ltext}</a>`;
    }
    const tag = _childs ? 'li' : 'h3';
    doms += `
      <${tag}>${ltext}</${tag}>`;

    if(childs){
      doms += `
      <ul>${render(childs)}
      </ul>`;
    }
  }, _childs);
  return doms;
}

module.exports = function(){
  return render();
};