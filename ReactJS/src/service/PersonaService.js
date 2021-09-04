import axios from "axios";

export class PersonaService {
    baseUrl = "/persona/api/";

    getAll() {
        return axios.get(this.baseUrl + "all").then(res => res.data);
    }

    save(persona) {
        return axios.post(this.baseUrl + "save", persona).then(res => res.data);
    }

    delete(id) {
        return axios.post(this.baseUrl + "delete/"+id, null).then(res => res.data);
    }
}