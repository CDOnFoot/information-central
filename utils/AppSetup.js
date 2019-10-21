function setImtoken(imToken) {
    sessionStorage.setItem('imToken',imToken);
}
function imToken() {
    return sessionStorage.getItem('imToken');
}
function setPin(pin) {
    sessionStorage.setItem('pin',pin);
}
function pin() {
    return sessionStorage.getItem('pin');
}

export {
    setPin,
    pin,
    imToken,
    setImtoken
}
