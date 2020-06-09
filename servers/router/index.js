module.exports = function (handle, pathname, callback) {
    console.log("request handler for " + pathname);
    let name = pathname.replace('/api/', '');
    console.log("request handler for " + name);
    if (typeof handle[name] === 'function') {
        return callback('Found', handle[name]);
    } else {
        return callback('notFound');
    }
};
