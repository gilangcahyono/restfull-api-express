import db from './db.config.js';
import moment from 'moment';

export const show = async (req, res) => {
    try {
        const sql = 'SELECT * FROM products';
        const products = await db.query(sql);

        if (products.rows.length > 0) {
            return res.json(200, {
                success: true,
                data: products.rows,
            });
        } else {
            return res.json(404, {
                success: false,
                message: 'Data tidak ditemukan!',
            });
        }
    } catch (err) {
        console.log(err);
        return res.json(500, {
            success: false,
            message: 'Internal server error',
        });
    }
};

export const showOne = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = `SELECT * FROM products WHERE id = ${id}`;
        const products = await db.query(sql);

        if (products.rows.length > 0) {
            return res.json(200, products.rows[0]);
        } else {
            return res.json(404, {
                success: false,
                message: 'Data tidak ditemukan!',
            });
        }
    } catch (err) {
        console.log(err);
        return res.json(500, {
            success: false,
            message: 'Internal server error',
        });
    }
};

export const add = async (req, res) => {
    try {
        const data = req.body;
        const sql = `INSERT INTO products
            (name, price, stock, category) 
        VALUES 
            ('${data.name}', ${data.price}, ${data.stock}, '${data.category}')`;
        const products = await db.query(sql);

        console.log(products);
        if (products.rowCount > 0) {
            return res.json(200, {
                success: true,
                message: 'Data berhasil ditambahkan!',
                data: {
                    name: data.name,
                    price: data.price,
                    stock: data.stock,
                    category: data.category,
                },
            });
        }
    } catch (err) {
        if (err.code == 23505) {
            return res.json(400, {
                success: false,
                message: 'Data duplikat!, tambah data gagal',
            });
        }
        console.log(err);
    }
};

export const edit = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const sql = `UPDATE products 
        SET
            name = '${data.name}',
            price = ${data.price},
            stock = ${data.stock},
            category = '${data.category}',
            updated_at = '${moment().format('YYYY-MM-DD HH:mm:ss')}'
        WHERE 
            id = ${id}`;
        const products = await db.query(sql);

        if (products.rowCount > 0) {
            return res.json(200, {
                success: true,
                message: 'Data berhasil diubah!',
                data: {
                    name: data.name,
                    price: data.price,
                    stock: data.stock,
                    category: data.category,
                },
            });
        }
    } catch (err) {
        console.log(err);
        return res.json(500, {
            success: false,
            message: 'Internal server error',
        });
    }
};

export const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = `DELETE FROM products WHERE id = ${id}`;
        const products = await db.query(sql);

        if (products.rowCount > 0) {
            return res.json(200, {
                success: true,
                message: 'Data berhasil dihapus!',
            });
        } else {
            return res.json(404, {
                success: false,
                message: 'Gagal menghapus, Data tidak ditemukan!',
            });
        }
    } catch (err) {
        console.log(err);
        return res.json(500, {
            success: false,
            message: 'Internal server error',
        });
    }
};
