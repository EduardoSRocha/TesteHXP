import { connect, disconnect, model } from 'mongoose';
import { Product, ProductSchema } from '../src/products/schemas/product.schema';
import { Category, CategorySchema } from '../src/categories/schemas/category.schema';
import { Order, OrderSchema } from '../src/orders/schemas/order.schema';
import { faker } from '@faker-js/faker';

// Configuração de conexão com o banco de dados
const DATABASE_URI = 'mongodb://localhost:27017/my_database';

async function seedDatabase() {
  try {
    // Conectar ao MongoDB
    await connect(DATABASE_URI);
    console.log('Connected to MongoDB');

    // Criar modelos
    const CategoryModel = model('Category', CategorySchema);
    const ProductModel = model('Product', ProductSchema);
    const OrderModel = model('Order', OrderSchema);

    // Limpar coleções
    await CategoryModel.deleteMany({});
    await ProductModel.deleteMany({});
    await OrderModel.deleteMany({});
    console.log('Collections cleared');

    // Inserir Categorias (verificando duplicidade)
    const categories = Array.from({ length: 5 }, () => ({
      name: faker.commerce.department(),
    }));

    // Verificar se já existe a categoria antes de inserir
    const insertedCategories = [];
    for (const category of categories) {
      const existingCategory = await CategoryModel.findOne({ name: category.name });
      if (!existingCategory) {
        const newCategory = await CategoryModel.create(category);
        insertedCategories.push(newCategory);
      } else {
        insertedCategories.push(existingCategory);  // Se já existir, use a existente
      }
    }
    console.log('Categories created:', insertedCategories);

    // Inserir Produtos
    const products = Array.from({ length: 20 }, () => ({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price()),
      categoryIds: faker.helpers.shuffle(insertedCategories)
        .slice(0, Math.ceil(Math.random() * 3))
        .map((category) => category._id),
      imageUrl: faker.image.urlLoremFlickr(),
    }));
    const insertedProducts = await ProductModel.insertMany(products);
    console.log('Products created:', insertedProducts);

    // Inserir Pedidos
    const orders = Array.from({ length: 10 }, () => {
      const selectedProducts = faker.helpers.shuffle(insertedProducts).slice(0, Math.ceil(Math.random() * 5));
      return {
        date: faker.date.past(),
        productIds: selectedProducts.map((product) => product._id),
        total: selectedProducts.reduce((sum, product) => sum + product.price, 0),
      };
    });
    const insertedOrders = await OrderModel.insertMany(orders);
    console.log('Orders created:', insertedOrders);

    console.log('Database seeding completed');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Desconectar do MongoDB
    await disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Executar o script
seedDatabase();
