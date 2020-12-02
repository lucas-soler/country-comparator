import NProgress from "nprogress";
import CountriesAPI from "./countries-api";
import {} from "./countries-api";



class App {


    constructor() {

        // it starts the class variables, which are the main HTML elements on the page
        this.setAttributes();

        this.inputCountry1.focus();

        // it creates the event listeners
        this.submitButton.onclick = event => this.searchForCountries(event);
        this.clearButton.onclick = event => {
            this.clearOldCountrysData();
            this.clearErrors();
            this.inputCountry1.value = "";
            this.inputCountry2.value = "";
            this.inputCountry1.focus();
        };
        this.inputCountry1.onkeypress = event => this.clearErrors();
        this.inputCountry2.onkeypress = event => this.clearErrors();
    }

    setAttributes() {
        this.submitButton = document.querySelector("input[type='submit']");
        this.clearButton = document.querySelector("input[type='button']");
        this.inputCountry1 = document.querySelector("input[name='country1']");
        this.inputCountry2 = document.querySelector("input[name='country2']");
        this.flagCountry1 = document.querySelector("img[id='country1_flag']");
        this.flagCountry2 = document.querySelector("img[id='country2_flag']");
        this.resultContainer1 = document.getElementById("country1_result");
        this.resultContainer2 = document.getElementById("country2_result");
        this.flagCountry2 = document.querySelector("img[id='country2_flag']");
        this.errorMessageContainer = document.querySelector(".error-message-row");
        this.errorMessage = document.querySelector(".error-message");

        this.countries = new CountriesAPI();
    }

    async searchForCountries(event) {

        event.preventDefault();

        this.clearOldCountrysData();

        if (!this.checkInputValues())
            return;


        this.buildResultOnScreen();
    }

    async buildResultOnScreen() {

        NProgress.start();

        let thereWasError = false;

        for (var i = 1; i <= 2; i++) {

            NProgress.inc(0.25);

            let inputCountry = document.getElementById(`country${i}`);
            let flagCountry = document.getElementById(`country${i}_flag`);
            let nameCountry = document.getElementById(`country${i}_name`);
            let capitalCountry = document.getElementById(`country${i}_capital`);
            let populationCountry = document.getElementById(`country${i}_population`);
            let languageCountry = document.getElementById(`country${i}_language`);

            let countriesResult;
            try {
                countriesResult = await this.countries.searchByPartialName(inputCountry.value);

                let { flag, name, capital, population, languages: [{ name: language }] } = countriesResult.data[0];

                flagCountry.setAttribute("src", flag);
                nameCountry.appendChild(document.createTextNode(`Name: ${name}`));
                capitalCountry.appendChild(document.createTextNode(`Capital: ${capital}`));
                populationCountry.appendChild(document.createTextNode(`Population: ${population.toLocaleString()}`));
                languageCountry.appendChild(document.createTextNode(`Language: ${language}`));

            } catch (error) {
                this.showError(error.message);
                inputCountry.style.borderColor = "red";

                // it avoids to set focus in the second input when there is error in the two fields
                if (!thereWasError) {
                    inputCountry.focus();
                    inputCountry.select();
                }

                thereWasError = true;
            }

        }

        if (!thereWasError) {
            this.resultContainer1.style.display = "block";
            this.resultContainer2.style.display = "block";

            this.inputCountry1.focus();
            this.inputCountry1.select();
        }

        NProgress.done();
    }

    checkInputValues() {
        let returnFlag = true;

        // it verifies if the fields are empty
        document.querySelectorAll("input[type='text']").forEach(inputCountry => {
            if (inputCountry.value.trim().length == 0) {
                inputCountry.style.borderColor = "red";
                // if it didn't enter in the first condition
                if (returnFlag) {
                    inputCountry.focus();
                    inputCountry.select();
                }
                returnFlag = false;
            }
        });

        if (returnFlag == false) {
            this.showError("You must inform two countries to compare.");
        } else {
            // it verifies if the fields contains more than four characteres
            document.querySelectorAll("input[type='text']").forEach(inputCountry => {
                if (inputCountry.value.trim().length < 4) {
                    inputCountry.style.borderColor = "red";
                    // if it didn't enter in the first condition
                    if (returnFlag) {
                        inputCountry.focus();
                        inputCountry.select();
                    }
                    returnFlag = false;
                }
            });

            if (returnFlag == false) {
                this.showError("You must inform at least 4 characters in each field.");
            } else {
                if (this.inputCountry1.value.trim() == this.inputCountry2.value.trim()) {
                    this.showError("The countries' name must be different.");
                    this.inputCountry1.focus();
                    this.inputCountry1.select();
                    returnFlag = false;
                }
            }


        }

        return returnFlag;
    }

    clearOldCountrysData() {

        this.resultContainer1.style.display = "none";
        this.resultContainer2.style.display = "none";

        for (var i = 1; i <= 2; i++) {
            let flagCountry = document.getElementById(`country${i}_flag`);
            let nameCountry = document.getElementById(`country${i}_name`);
            let capitalCountry = document.getElementById(`country${i}_capital`);
            let populationCountry = document.getElementById(`country${i}_population`);
            let languageCountry = document.getElementById(`country${i}_language`);

            flagCountry.setAttribute("src", "");
            nameCountry.innerHTML = "";
            capitalCountry.innerHTML = "";
            populationCountry.innerHTML = "";
            languageCountry.innerHTML = "";
        }

    }

    clearErrors() {

        this.inputCountry1.style.borderColor = "#ccc";
        this.inputCountry2.style.borderColor = "#ccc";

        if (this.errorMessageContainer.style.display === "block") {
            this.errorMessageContainer.style.display = "none";
            this.errorMessage.innerHTML = "";
        }
    }

    showError(message) {
        this.resultContainer1.style.display = "none";
        this.resultContainer2.style.display = "none";

        this.errorMessage.innerHTML = "";
        this.errorMessageContainer.style.display = "block";
        this.errorMessage.appendChild(document.createTextNode(message));

        NProgress.done();
    }

}


new App();