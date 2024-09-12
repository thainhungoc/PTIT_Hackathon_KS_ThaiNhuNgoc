import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
    const filePath = path.join(process.cwd(), './src/app/data/data.json');
    let products = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const newProduct = await request.json();

    const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;
    
    // Thêm id mới 
    const productWithId = {
        id: newId,
        ...newProduct,
    };

    // Thêm sp mới vào danh sách 
    products.push(productWithId);
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
    return NextResponse.json({ message: "Thêm sản phẩm thành công", product: productWithId });
}
