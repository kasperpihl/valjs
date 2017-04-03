import { isValHandler, indentString } from './util';

export default function toString(resObj, indent = 0) {
  let addIndention = (level) => {
    return '\n\r' + indentString('s', level * 2, ' ').slice(0, -1);
  }
  let toString = (a, indent) => {
    let string = '';
    if(isValHandler(a)){
      string += a.toString(indent);
    }
    else if(Array.isArray(a)) {
      string += '[';
      a.forEach((item, i) => {
        if(i > 0){
          string += ',';
        }
        string += addIndention(indent + 1);
        string += toString(item, indent + 1);
        if(i === a.length - 1){
          string += addIndention(indent);
        }
      })
      string += ']';
    }
    else if(typeof a === 'object'){
      string += '{';
      const array = Object.entries(a)
      array.forEach(([k, v], i) => {
        if(i > 0){
          string += ',';
        }
        string += addIndention(indent + 1);
        string += `${k}: `;
        string += toString(v, indent + 1);
        if(i === array.length - 1){
          string += addIndention(indent);
        }
      });
      string += '}';
    }
    else {
      if(typeof a === 'string'){
        string += `"${a}"`;
      }
      else {
        string += a;
      }

    }
    return string;
  }
  let string = '';
  resObj.__chain.forEach(({ name, args }) => {
    if(name === '__typeChecker'){
      string += (resObj.__type || 'any');
    }
    else {
      string += '.' + name + '(';
      args.forEach((a, i) => {
        if(i > 0){
          string += ', ';
        }
        string += toString(a, indent);
      })

      string += ')';
    }
  });
  if(resObj.__required){
    string += '.require()';
  }
  return string;
}
