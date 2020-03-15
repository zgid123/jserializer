import Product from './Product';
import { Serializer, attr } from '../../src';

class ProductSerializer extends Serializer<Product> {
  @attr('id')
  static id: string;

  @attr({
    name: 'name',
    inverseColumn: 'name',
  })
  static productName: string;

  @attr({
    name: 'anotherName',
    inverseColumn: 'name',
  })
  static anotherProductName: string;

  @attr()
  static stock: number;

  @attr({
    name: 'region',
  })
  static country: string;

  @attr((r: Product) => r.isDeleted ? 'yes' : 'no')
  static isDeleted: string;

  @attr({
    name: 'anotherIsDeleted',
    op: (r: Product) => r.isDeleted ? 'yes' : 'no',
  })
  static anotherIsDeleted: string;

  @attr('name')
  static anotherId: string;
}

export default ProductSerializer;
