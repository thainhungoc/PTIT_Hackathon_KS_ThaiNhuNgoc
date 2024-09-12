import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), './src/app/data/data.json');

//danh sách sản phẩm
export async function GET() {
    try {
        const products = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        return NextResponse.json(products);
    } catch (error) {
        console.error('Error reading products:', error);
        return NextResponse.json({ error: 'Failed to load products' }, { status: 500 });
    }
}

