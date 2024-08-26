import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'products.json');

const readProductsData = (): any[] => {
  const fileData = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileData);
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const products = readProductsData();

      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: 'Đã xảy ra lỗi khi đọc danh sách sản phẩm.' });
    }
  } else if (req.method === 'POST') {
    const { id, product_name, price } = req.body;

    if (!id || !product_name || !price) {
      return res.status(400).json({ error: 'Vui lòng cung cấp đầy đủ thông tin sản phẩm (id, product_name, price).' });
    }

    try {
      const products = readProductsData();
      const newProduct = { id, product_name, price };
      products.push(newProduct);
      fs.writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf8');

      res.status(201).json({ message: 'Thêm mới sản phẩm thành công', product: newProduct });
    } catch (error) {
      res.status(500).json({ error: 'Đã xảy ra lỗi khi thêm sản phẩm mới.' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
