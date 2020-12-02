import axios from "axios";

export const countriesAPI = axios.create({
    baseURL: "https://restcountries.eu/rest/v2/",
});

export const starWarsAPI = axios.create({
    baseURL: "https://swapi.dev/api/",
});
