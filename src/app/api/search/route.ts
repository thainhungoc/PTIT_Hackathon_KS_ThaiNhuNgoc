import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
    const filePath = path.join(process.cwd(), './src/app/data/data.json');
    
 
    const products = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get('name')?.toLowerCase();

    if (!searchQuery) {
        return NextResponse.json({ message: "Vui lòng nhập tên sản phẩm để tìm kiếm." }, { status: 400 });
    }

    const filteredProducts = products.filter((product: any) =>
        product.productName.toLowerCase().includes(searchQuery)
    );

    if (filteredProducts.length === 0) {
        return NextResponse.json({ message: "Không tìm thấy sản phẩm nào phù hợp." }, { status: 404 });
    }

    return NextResponse.json(filteredProducts);
}
