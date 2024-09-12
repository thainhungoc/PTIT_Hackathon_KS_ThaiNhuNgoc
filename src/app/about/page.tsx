"use client";

import { Button } from "@/components/ui/button";
import {
    Table,
    TableHeader,
    TableCaption,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import React, { useEffect, useState } from 'react';

interface Product {
    id: number;
    productName: string;
    price: number;
    image: string;
    quantity: number;
}

export default function Page() {
    const [productList, setProductList] = useState<Product[]>([]);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [newProduct, setNewProduct] = useState({ productName: "", price: 0, image: "", quantity: 0 });

    useEffect(() => {
        fetchProducts(); // Lấy danh sách sản phẩm khi tải trang
    }, []);

    // Hàm fetch danh sách sản phẩm từ API
    const fetchProducts = () => {
        fetch('/api/products') // Gọi API lấy danh sách sản phẩm
            .then(response => response.json())
            .then(data => setProductList(data)) // Cập nhật state productList
            .catch(error => console.error('Error loading data:', error));
    };

    // Thêm sản phẩm mới
    const handleAddProduct = () => {
        fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        })
        .then(response => response.json())
        .then(() => {
            fetchProducts(); // Cập nhật lại danh sách sản phẩm sau khi thêm
            setNewProduct({ productName: "", price: 0, image: "", quantity: 0 }); // Xóa form sau khi thêm
        })
        .catch(error => console.error('Error adding product:', error));
    };

    // Bắt đầu sửa sản phẩm
    const handleEditProduct = (product: Product) => {
        setEditingProduct(product); // Cập nhật sản phẩm đang sửa vào state
    };

    // Cập nhật sản phẩm
    const handleUpdateProduct = () => {
        if (!editingProduct) return; // Nếu không có sản phẩm nào đang được chọn để sửa
        fetch(`/api/products/${editingProduct.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editingProduct),
        })
        .then(() => {
            fetchProducts(); // Cập nhật lại danh sách sản phẩm sau khi sửa
            setEditingProduct(null); // Xóa form sửa sau khi cập nhật
        })
        .catch(error => console.error('Error updating product:', error));
    };

    // Xóa sản phẩm
    const handleDeleteProduct = (id: number) => {
        fetch(`/api/products/${id}`, {
            method: 'DELETE',
        })
        .then(() => fetchProducts()) // Cập nhật lại danh sách sản phẩm sau khi xóa
        .catch(error => console.error('Error deleting product:', error));
    };

    return (
        <div>
            <div className="left-item">
                <h1>Quản lý sản phẩm</h1>
                <Table>
                    <TableCaption>Danh sách sản phẩm của bạn.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">STT</TableHead>
                            <TableHead>Tên sản phẩm</TableHead>
                            <TableHead>Hình ảnh</TableHead>
                            <TableHead className="text-right">Giá</TableHead>
                            <TableHead>Số lượng</TableHead>
                            <TableHead>Chức năng</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {productList.map((item: any, index: any) => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell>{item.productName}</TableCell>
                                <TableCell>
                                    {item.image ? (
                                        <img src={item.image} alt={item.productName} className="w-16 h-16" />
                                    ) : (
                                        <span>Hình ảnh không có</span>
                                    )}
                                </TableCell>
                                <TableCell className="text-right">{item.price.toLocaleString()} VND</TableCell>
                                <TableCell className="font-medium">{item.quantity}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleEditProduct(item)}>Sửa</Button>
                                    <Button onClick={() => handleDeleteProduct(item.id)}>Xóa</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="right-item">
                <h2>Thêm sản phẩm mới</h2>
                <input
                    type="text"
                    placeholder="Tên sản phẩm"
                    value={newProduct.productName}
                    onChange={(e) => setNewProduct({ ...newProduct, productName: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Giá"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                />
                <input
                    type="text"
                    placeholder="Hình ảnh"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Số lượng"
                    value={newProduct.quantity}
                    onChange={(e) => setNewProduct({ ...newProduct, quantity: Number(e.target.value) })}
                />
                <Button onClick={handleAddProduct}>Thêm</Button>

                {editingProduct && (
                    <div>
                        <h2>Chỉnh sửa sản phẩm</h2>
                        <input
                            type="text"
                            value={editingProduct.productName}
                            onChange={(e) => setEditingProduct({ ...editingProduct, productName: e.target.value })}
                        />
                        <input
                            type="number"
                            value={editingProduct.price}
                            onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                        />
                        <input
                            type="text"
                            value={editingProduct.image}
                            onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                        />
                        <input
                            type="number"
                            value={editingProduct.quantity}
                            onChange={(e) => setEditingProduct({ ...editingProduct, quantity: Number(e.target.value) })}
                        />
                        <Button onClick={handleUpdateProduct}>Cập nhật</Button>
                    </div>
                )}
            </div>
        </div>
    );
}
