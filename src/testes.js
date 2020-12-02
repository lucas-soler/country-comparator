// testes com arrays

var array = [1, 2, 3];

var array2 = array.map(function (item) {
    return item * item
});
console.log(array2);

var total = array.reduce(function (total, next) {
    return total + next;
});

console.log(total);
console.log(array);

var array3 = array.filter(function (item) {
    if (item == 3)
        return true;
});

console.log(array3);

var array4 = array.find(function (item) {
    if (item % 2 != 0)
        return true;
});

console.log(array4);


// arrow functions

var array = [1, 2, 3];

// com parametro simples
var array2 = array.map(item => item * item);

console.log(array2);

var array = [5, 10, 15];

// com parametro composto
var array2 = array.map((item, index) => item * index);

console.log(array2);


// atribuição de valor em parâmetro de função

function soma(a, b = 2) {
    return a + b;
}

console.log(soma(2));

// desestruturação

const pessoa = {
    "nome": "Lucas",
    "idade": 34
};

const { nome, idade } = pessoa;

console.log(nome, idade);

function mostraNome({ nome }) {
    console.log(nome);
}

mostraNome(pessoa);

// exemplo do REST operator (...)
const pessoa = {
    "nome": "Lucas",
    "idade": 34,
    "nacionalidade": "brasileira"
};

// rest operator
const { nome, ...restante } = pessoa;

console.log(nome, restante);

// rest operator em um array
const arrayRest = [1, 2, 3, 4];

const [a, b, ...c] = arrayRest;

console.log(a);
console.log(b);
console.log(c);

// rest operator como parametro de função
function soma(...params) {
    return params.reduce((total, next) => total + next);
}

console.log(soma(4, 7, 8));

// SPREAD 

var arraySpread1 = [1, 2, 3];
var arraySpread2 = [4, 5, 6];

var arraySpreadResult = [...arraySpread1, ...arraySpread2];

console.log(arraySpreadResult);

// spread com objeto
var usuario = {
    nome: "Lucas",
    pais: "Brazil",
    cidade: "Blumenau"
};

var usuario2 = { ...usuario, pais: "USA", grau: "bacharel" };
console.log(usuario2);

// template literals
console.log(`O valor de usuário é ${usuario}`);


// object short syntax

var nome = "gato";
var peso = 4;

var animal = {
    nome,
    peso
};

console.log(animal);

// promises com async await

const minhaPromise = () => new Promise((resolve, reject) => {
    setTimeout(() => { resolve("TESTE") }, 2000);
});

const minhaPromise2 = () => new Promise((resolve, reject) => {
    setTimeout(() => { resolve("TESTE2") }, 2000);
});

//minhaPromise.then(response => { console.log(response) });

async function executePromise() {
    const response = await minhaPromise();

    console.log(await minhaPromise());
    console.log(await minhaPromise());
    console.log(await minhaPromise());

    console.log(response);
}

async function executePromise2() {
    const response = await minhaPromise2();

    console.log(await minhaPromise2());
    console.log(await minhaPromise2());
    console.log(await minhaPromise2());

    console.log(response);
}

executePromise();
executePromise2();