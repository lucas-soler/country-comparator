export default class Matematica {

    soma(...params) {
        return params.reduce((total, next) => total + next);
    }

    sub(...params) {
        return params.reduce((total, next) => total - next);
    }
}

