import * as SqlLite from "expo-sqlite"

export default class Connection {
    static #connection = null;
    static async getConnection() {
        if (!this.#connection) {
            this.#connection = await SqlLite.openDatabaseAsync("splits.db");
            return this.#connection
        } else {
            return this.#connection
        }
    }

}