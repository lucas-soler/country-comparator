import { starWarsAPI as api } from "./global-constants";
import axios from "axios";


export default class StarWarsAPI {


    async getLuke() {

        console.log(await api.get("people/1"));

    }

}