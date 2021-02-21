const usernameRegex = (username) => {
    return new RegExp('\\b' + username + '\\b', 'i');
};

module.exports = usernameRegex