function checkDuplicateAccount(arr, str) {
    for (let val of arr) {
        if (val.account === str) {
            return true;
        }
    }
    return false;
}

module.exports = { checkDuplicateAccount };