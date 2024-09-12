import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const filePath = path.join(process.cwd(), './src/app/data/data.json');
    
    let products = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    const productId = parseInt(params.id);
    const productIndex = products.findIndex((product: any) => product.id === productId);

    if (productIndex === -1) {
        return NextResponse.json({ message: "Sản phẩm không tồn tại" }, { status: 404 });
    }
    const updatedProduct = await request.json();
    products[productIndex] = { ...products[productIndex], ...updatedProduct };

    fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
    return NextResponse.json({ message: "Cập nhật sản phẩm thành công", product: products[productIndex] });
}
