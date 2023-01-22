import { Product } from '../models/ObjectModel.js';

export const show = async (req, res) => {
    try {
        const products = await Product.select();
        if (products.length > 0) {
            res.json(200, {
                success: true,
                data: products,
            });
        } else {
            res.json(404, {
                success: false,
                message: 'Data tidak ditemukan!',
            });
        }
    } catch (err) {
        console.log(err);
        res.json(500, {
            success: false,
            message: 'Internal server error',
        });
    }
};

export const add = async (req, res) => {
    try {
        const data = req.body;
        const products = await Product.insert({
            name: data.name,
            price: data.price,
            stock: data.stock,
            category: data.category,
        });
        if (products.rowCount > 0) {
            res.json(200, {
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
        console.log(err);
        res.json(500, {
            success: false,
            message: 'Internal server error',
        });
    }
};

export const edit = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const products = await Product.update({
            id: id,
            name: data.name,
            price: data.price,
            stock: data.stock,
            category: data.category,
        });
        if (products.rowCount > 0) {
            res.json(200, {
                success: true,
                message: 'Data berhasil diubah!',
                data: {
                    name: data.name,
                    price: data.price,
                    stock: data.stock,
                    category: data.category,
                },
            });
        } else {
            console.log(products);
        }
    } catch (err) {
        console.log(err);
    }
};

export const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const products = await Product.delete(id);
        if (products.rowCount > 0) {
            res.json(200, {
                success: true,
                message: 'Data berhasil dihapus!',
            });
        } else {
            res.json(404, {
                success: false,
                message: 'Gagal menghapus, Data tidak ditemukan!',
            });
        }
    } catch (err) {
        console.log(err);
        res.json(500, {
            success: false,
            message: 'Internal server error',
        });
    }
};
