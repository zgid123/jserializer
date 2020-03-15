import Product from './fixtures/Product';
import ProductSerializer from './fixtures/ProductSerializer';

const record = new Product('001', 'Fire Emblem', 20, false, 'VN');
const secondRecord = new Product('002', 'Dragon Quest', 20, true, 'VN');

test('serialize object', () => {
  expect(
    new ProductSerializer(record).toJSON(),
  ).toEqual({
    id: '001',
    stock: 20,
    region: 'VN',
    isDeleted: 'no',
    name: 'Fire Emblem',
    anotherIsDeleted: 'no',
    anotherId: 'Fire Emblem',
    anotherName: 'Fire Emblem',
  });
});

test('serialize array objects', () => {
  expect(
    new ProductSerializer([record, secondRecord]).toJSON(),
  ).toEqual([
    {
      id: '001',
      stock: 20,
      region: 'VN',
      isDeleted: 'no',
      name: 'Fire Emblem',
      anotherIsDeleted: 'no',
      anotherId: 'Fire Emblem',
      anotherName: 'Fire Emblem',
    },
    {
      id: '002',
      stock: 20,
      region: 'VN',
      isDeleted: 'yes',
      name: 'Dragon Quest',
      anotherIsDeleted: 'yes',
      anotherId: 'Dragon Quest',
      anotherName: 'Dragon Quest',
    },
  ]);
});
