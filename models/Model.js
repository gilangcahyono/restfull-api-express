import pool from '../db/db.config.js';
import moment from 'moment';

export class Model {
    constructor(tableName) {
        this.tableName = tableName;
    }

    select() {
        const sql = `SELECT * FROM ${this.tableName}`;
        return pool.query(sql).then((res) => res.rows);
    }

    insert(data) {
        const sql = `INSERT INTO ${this.tableName}
                        (name, price, stock, category) 
                    VALUES (
                        '${data.name}', 
                        ${data.price}, 
                        ${data.stock}, 
                        '${data.category}'
                    )`;
        return pool.query(sql).then((res) => res);
    }

    update(data) {
        const sql = `UPDATE products 
                    SET
                        name = '${data.name}',
                        price = ${data.price},
                        stock = ${data.stock},
                        category = '${data.category}',
                        updated_at = '${moment().format('YYYY-MM-DD HH:mm:ss')}'
                    WHERE 
                        id = ${data.id}`;

        return pool.query(sql).then((res) => res);
    }

    delete(id) {
        const sql = `DELETE FROM ${this.tableName} WHERE id = ${id}`;
        return pool.query(sql).then((res) => res);
    }
}
