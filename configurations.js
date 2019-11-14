let cashInConfig = {
    data: undefined,
    set write(information) {
        this.data = information;
        // console.log(information);
    },
    get read() {
        return this.data;
    },
};
let cashOutJuridicalConfig = {
    data: undefined,
    set write(information) {
        this.data = information;
        // console.log(information);
    },
    get read() {
        return this.data;
    },
};
let cashOutNaturalConfig = {
        data: undefined,
        set write(information) {
        this.data = information;
        // console.log(information);
    },
    get read() {
        return this.data;
    },
};



exports.cashInConfig = cashInConfig;
exports.cashOutJuridicalConfig = cashOutJuridicalConfig;
exports.cashOutNaturalConfig = cashOutNaturalConfig;