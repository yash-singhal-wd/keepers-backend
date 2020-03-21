function checkAccountAndDelete(arr, account) {
    let flag = 1;
    let index = -1;
    let delIndex = -Infinity;
    for (let val of arr) {
        index++;
        if (val.account === account) {
            val = 0;
            flag = 0;
            delIndex = index;
            break;
        }
    }
    if (flag === 1) return { isAccExist: false, newArray: null };
    else {
        arr.splice(delIndex, 1);
        return { isAccExist: true, newArray: arr };
    }
}

module.exports = { checkAccountAndDelete };