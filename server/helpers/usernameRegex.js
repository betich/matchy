module.exports = {
    usernameRegex: (username) => {
        return new RegExp('\\b' + username + '\\b', 'i');
    }
}