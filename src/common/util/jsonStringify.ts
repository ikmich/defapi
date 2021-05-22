type Obj = {
  [k in number | string]: any;
};

function jsonStringify(ob: any, startDepth = 0) {
  function buildString(ob: Obj | any[], output: string, depth = 0) {
    const _depth = depth;

    function indent(depth: number) {
      let s = '';
      if (depth > 0) {
        for (let i = 1; i <= depth; i++) {
          s += '  ';
        }
      }
      return s;
    }

    if (ob.constructor === Object) {
      let result = `{\n`;

      const entries = Object.entries(ob);
      ++depth;
      for (let [k, v] of entries) {
        result += `${indent(depth)}${k}: `;
        if (typeof v === 'object') {
          result += `${buildString(v, result, depth)},\n`;
        } else if (typeof v === 'string') {
          result += `"${v}",\n`;
        } else {
          result += `${v}`;
        }
      }

      // Remove trailing comma
      result = result.trimEnd();
      if (result.endsWith(',')) {
        result = result.substring(0, result.length - 1);
      }

      result += `\n${indent(_depth)}}`;
      return result;
    } else if (Array.isArray(ob)) {
      let result = `[`;
      for (let item of ob) {
        if (typeof item === 'object') {
          result += `${buildString(item, result, depth)}, `;
        } else if (typeof item === 'string') {
          result += `"${item}", `;
        } else {
          result += `${item}, `;
        }
      }

      // Remove trailing comma
      result = result.trimEnd();
      if (result.endsWith(',')) {
        result = result.substring(0, result.length - 1);
      }

      result += `]`;
      return result;
    }

    return String(ob);
  }

  if (typeof ob === 'object') {
    return buildString(ob, '', startDepth);
  }

  return ob;
}

export default jsonStringify;
