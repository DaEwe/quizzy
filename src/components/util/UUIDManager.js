import { v4 as uuid4 } from "uuid";
export default class {
    constructor() {

        let storage = localStorage.getItem("quizuuids");
        if (storage) {
            this.ids = JSON.parse(storage);
        } else {
            this.ids = {};
        }

    }

    getUUID(quizId) {
        if (!(quizId in this.ids)) {
            this.ids[quizId] = uuid4();
            localStorage.setItem("quizuuids", JSON.stringify(this.ids));
        }
        return this.ids[quizId];
    }

}