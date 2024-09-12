import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const id = parseInt(params.id); 

    const products = JSON.parse(fs.readFileSync("./src/app/data/data.json", "utf-8"));
    
    // Tìm kiếm sản phẩm theo id
    const product = products.find((pro: any) => pro.id === id);

    if (!product) {
        return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
}
