const filterFalsey = (obj) => {
    let res = Object.assign({}, obj);
    for (var key in res) {
        if (res.hasOwnProperty(key) && (!res[key] && res[key] !== 0)) {
            // If a key doesn't exist
            delete res[key];
        }
        else if (Array.isArray(res[key])) {
            res[key] = res[key].filter((e) => (e && e !== 0));
        }
        else if (res[key] instanceof Object) {
            res[key] = filterFalsey(res[key]);
        } 
    }
    return res
}

module.exports = filterFalsey;