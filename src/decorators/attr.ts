export interface IOptProps {
  name: string;
  inverseColumn?: string;
  op?: string | Function;
}

export type TAttr = string | IOptProps | Function | undefined;

export function attr(): Function;
export function attr(inverseColumn: string): Function;
export function attr(opt: Function): Function;
export function attr(opt: IOptProps): Function;
export function attr(opt: TAttr = undefined): Function {
  return function (target: any, key: string) {
    target[key] = opt;
  };
}
