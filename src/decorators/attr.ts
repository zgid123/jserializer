export interface IOptProps {
  name: string;
  inverseColumn?: string;
  op?: string | Function;
}

export type TAttr = string | IOptProps | Function | undefined;

function attr(): Function;
function attr(inverseColumn: string): Function;
function attr(opt: Function): Function;
function attr(opt: IOptProps): Function;
function attr(opt: TAttr = undefined): Function {
  return function (target: any, key: string) {
    target[key] = opt;
  };
}

export default attr;
