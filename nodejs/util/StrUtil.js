function subStringMulti(text, begin, end) {
    var regex;
    if (end == '\\n')
        regex = new RegExp(begin + '(.+)', "g");
    else
        regex = new RegExp(begin + '([\\s\\S]+?)' + end, "g");
    try {
        var result;
        var blocks = [];
        while ((result = regex.exec(text)) != null) {
            blocks.push(result[1].trim());
        }
        return blocks;
        // return text.match(regex);
    } catch (err) {
        return null;
    }
};


function getStr(str, start, end) {
    let res = str.match(new RegExp(`${start}(.*?)${end}`))
    return res ? res[1] : null
}

function subStr(str,start,end1){

    var indexOf =str.indexOf(start);
    if(indexOf!=-1)var indexOf = indexOf +  start.length;

    var lastIndexOf = str.lastIndexOf(end1);
    if(lastIndexOf!=-1)
    return str.substr(indexOf,lastIndexOf - indexOf)
}

module.exports = {
    subStringMulti,
    subStr,
    getStr
}