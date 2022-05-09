export const setLocalStorageData = (key, value) => {
    const val = JSON.stringify(value);
    localStorage.setItem(key, val);
}

export const getLocalStorageData = (key) => {
    const val = JSON.parse(localStorage.getItem(key));
    return val;
}


