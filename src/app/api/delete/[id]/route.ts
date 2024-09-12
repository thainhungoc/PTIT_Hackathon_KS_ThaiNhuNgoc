import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const id = parseInt(params.id); 
    const filePath = path.join(process.cwd(), './src/app/data/data.json');
    let products = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const filteredProducts = products.filter((product: any) => product.id !== id);
    fs.writeFileSync(filePath, JSON.stringify(filteredProducts, null, 2));
    return NextResponse.json({ message: "Xóa sản phẩm thành công" });
}
