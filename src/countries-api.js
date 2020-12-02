import { countriesAPI as api } from "./global-constants";
import ValidationError from "./exceptions/validation-error";

export default class CountriesAPI {

    static PARTIAL_NAME = false;
    static FULL_NAME = true;

    searchByPartialName(name) {
        return this.searchByName(name, CountriesAPI.PARTIAL_NAME);
    }

    searchByFullName(name) {
        return this.searchByName(name, CountriesAPI.FULL_NAME);
    }

    async searchByName(name, searchMethod) {

        // it just allow to search with at least 3 characters
        if (name.length < 4)
            throw new ValidationError("You need to type at least 4 characters to search countries by name.");

        try {
            return await api.get(`name/${name}?fullText=${searchMethod}`);
        } catch (error) {
            throw new ValidationError("The country you are looking for doesn't exist.");
        }

    }

}