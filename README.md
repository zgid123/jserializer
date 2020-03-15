# Introduction

Simple package to serialize data to response to client for Node.js (e.g. Express.js).

# Installation

    $ npm install jserializer

# Usage

```ts
// product.ts
class Product {
  id!: string;
  name!: string;
  stock!: number;
  isDeleted!: boolean;

  constructor(id: string, name: string, stock: number, isDeleted: boolean) {
    this.id = id;
    this.name = name;
    this.stock = stock;
    this.isDeleted = isDeleted;
  }
}

// productSerializer.ts
import { attr, Serializer } from 'jserializer';

class ProductSerializer extends Serializer<Product> {
  @attr('id')
  static id: string;

  @attr({
    name: 'name',
    inverseColumn: 'name',
  })
  static productName: string;

  @attr()
  static stock: number;

  @attr((resource: Product) => resource.isDeleted ? 'yes' : 'no')
  static isDeleted: boolean;
}

// productsController.ts
import { Request, Response } from 'express';
import express = require('express');
import app = express();

app.get('/', (req: Request, res: Response) => {
  const product = new Product('001', 'Fire Emblem', 20);

  res.send({
    products: new ProductSerializer([product]) // product is called resource
  })
})

// will get response
// {
//   products: [
//     {
//       id: '001',
//       name: 'Fire Emblem',
//       stock: 20
//     }
//   ]
// }

// or serialize one object only

app.get('/', (req: Request, res: Response) => {
  const product = new Product('001', 'Fire Emblem', 20);

  res.send({
    product: new ProductSerializer(product) // product is called resource
  })
})

// will get response
// {
//   product: {
//     id: '001',
//     name: 'Fire Emblem',
//     stock: 20
//   }
// }
```

# Decorators

## @attr

Defines serialier's attribute. Example:

```ts
class ProductSerializer extends Serializer<Product> {
  @attr('id')
  static id: string;

  @attr({
    name: 'name',
    inverseColumn: 'name',
  })
  static productName: string;

  @attr()
  static stock: number;
}
```

`@attr` has some usage:

### Without parameter
Will get static attribute's name as serialized data attribute's name and get data from attribute of resource with the same name.

```ts
class ProductSerializer extends Serializer<Product> {
  @attr()
  static id: string; // will get data from attribute id of resource
}
```

### With string parameter
Will get static attribute's name as serialized data attribute's name and get data from attribute of resource with the same name as given string.

```ts
class ProductSerializer extends Serializer<Product> {
  @attr('name')
  static id: string; // will get data from attribute name of resource and response with attribute id
}
```

### With function parameter
Will get static attribute's name as serialized data attribute's name and pass the resource into function parameter to get data.

```ts
class ProductSerializer extends Serializer<Product> {
  @attr((resource: Product) => resource.isDeleted ? 'Yes' : 'No')
  // will get data from resource like the function parameter
  // means will return 'Yes' if isDeleted === true
  // else will return 'No'
  static isDeleted: string;
}
```

### With object parameter
Sometime, the static attribute's name is the same as default attribute of the class. You must change the static attribute's name or else javascript will raise error. But you still want to response the data with key's name like that one (e.g. name), you can use this option.

```ts
class ProductSerializer extends Serializer<Product> {
  @attr()
  static name: string; // this will raise error
}

// you can change into this

class ProductSerializer extends Serializer<Product> {
  @attr({
    name: 'name',
    inverseColumn: 'name'
  })
  static productName: string;
}
```

This option has some options:
  - `name`: the name of response attribute
  - `inverseColumn`: the name of resource's attribute to get data
  - `op`: the function to convert data from resource to response data (you do not need to use `inverseColumn` if you use this option)

If `inverseColumn` is not provided, the data will get from the resource's attribute with the same name as static attribute's name.
