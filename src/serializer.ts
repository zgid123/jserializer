import { IOptProps } from './decorators/attr';

type TSerializeResult = { [key: string]: string | number | boolean | object };

const parseData = (resource: any, attrName: string, parser: any) => {
  const parserType = typeof parser;

  switch (parserType) {
    case 'string':
      return resource[parser];
    case 'function':
      return parser(resource);
    default:
      return resource[attrName];
  }
};

class Serializer<T> {
  private _resources: T | T[];

  constructor(resources: T);
  constructor(resources: T[]);
  constructor(resources: T | T[]) {
    this._resources = resources;
  }

  toJSON<T>(): T;
  toJSON(): any {
    if (!this._resources) {
      return {};
    }

    if (Array.isArray(this._resources)) {
      return this._resources.map((r) => this._serialize(r));
    }

    return this._serialize(this._resources);
  }

  private _serialize(resource: any) {
    return Object.entries(this.constructor).reduce<TSerializeResult>((result, [attrName, parser]) => {
      const parserType = typeof parser;

      if (parserType !== 'object' || parser === undefined) {
        result[attrName] = parseData(resource, attrName, parser);
      } else {
        const { name, op, inverseColumn = attrName } = parser as IOptProps;

        result[name] = parseData(resource, inverseColumn, op);
      }

      return result;
    }, {});
  }
}

export default Serializer;
