import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../orders/schemas/order.schema';
import { Product } from '../products/schemas/product.schema';
import { Category } from '../categories/schemas/category.schema';


@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}

  async getSalesMetrics(filters: {
    categoryId?: string;
    productId?: string;
    startDate?: Date;
    endDate?: Date;
  }) {
    const { categoryId, productId, startDate, endDate } = filters;

    const match: Record<string, any> = {};
    if (categoryId) match['products.categoryIds'] = categoryId;
    if (productId) match['products._id'] = productId;
    if (startDate || endDate) {
      match.date = {};
      if (startDate) match.date.$gte = new Date(startDate);
      if (endDate) match.date.$lte = new Date(endDate);
    }

    const results = await this.orderModel.aggregate([
      { $unwind: '$productIds' },
      {
        $lookup: {
          from: 'products',
          localField: 'productIds',
          foreignField: '_id',
          as: 'products',
        },
      },
      { $unwind: '$products' },
      { $match: match },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalSales: { $sum: '$total' },
          averageOrderValue: { $avg: '$total' },
        },
      },
    ]);

    return results[0] || { totalOrders: 0, totalSales: 0, averageOrderValue: 0 };
  }
}
