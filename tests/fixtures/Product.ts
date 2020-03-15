class Product {
  id!: string;
  name!: string;
  stock!: number;
  country!: string;
  isDeleted!: boolean;

  constructor(id: string, name: string, stock: number, isDeleted: boolean, country: string) {
    this.id = id;
    this.name = name;
    this.stock = stock;
    this.country = country;
    this.isDeleted = isDeleted;
  }
}

export default Product;
