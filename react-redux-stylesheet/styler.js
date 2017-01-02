const _ = require('lodash');

const variables = {};
const methods = {};
let stylesheets = {};
let classes = {};
let css = {};
// const medias = {};

let computedVariables = null;
let valueEvaluator = null;
let cache = {};


const registerMethods = (registerMethods) => {
  for (let methodName in registerMethods) {
    if (methodName in variables) throw new Error(`${methodName} is already defined as variable`);

    for (let key in cache) {
      if (key.indexOf(methodName) !== -1) delete cache[key];
    }

    methods[methodName] = registerMethods[methodName];
  };
};

const registerVariables = (registerVariables) => {
  for (let variableName in registerVariables) {
    if (variableName in methods) throw new Error(`${variableName} is already defined as method`);

    for (let key in cache) {
      if (key.indexOf(variableName) !== -1) delete cache[key];
    }

    variables[variableName] = new StylesheetVariable(registerVariables[variableName]);
  };
};

const process = (obj, parentSelector) => {
  computedVariables = {};
  for (let selector in obj) {
    const objValue = obj[selector];

    selector.split(',').forEach(key => {
      if (objValue.constructor === Object) {
        const nextSelector = key.indexOf('&') !== -1
          ? key.replace('&', parentSelector)
          : `${parentSelector} ${key}`;

        process(objValue, nextSelector);
      } else {
        if (!(parentSelector in classes)) {
          classes[parentSelector] = {};
        }

        classes[parentSelector][key] = objValue;
      }
    });
  }
};

const buildStylesheet = () => {
  let ret = '';

  for (let cssSelector in classes) {
    ret += `${cssSelector} { `;

    for (let cssProperty in classes[cssSelector]) {
      const value = classes[cssSelector][cssProperty];
      ret += `\n  ${_.kebabCase(cssProperty)}: `;

      if (value instanceof Function) {
        ret += value();
      } else {
        ret += value;
      }

      ret += ';';
    }

    ret += '\n}\n';
  }

  return ret.replace(/\{\{(.+?)\}\}/g, (all, matched) => {
    let printUnit = '';

    matched
      .split(/[^\w\d_\-]/)
      .forEach(part => {
        const variable = variables[part];
        if (variable) {
          if (variable.type === StylesheetVariableTypes.UNIT) {
            printUnit = variable.unit;
          }

          matched = matched.replace(part, `${part}.value`);
        }
      });

    return `{{${matched}}}${printUnit}`;
  });
};

const fillCssWithVars = () => {
  return css.replace(/\{\{(.+?)\}\}/g, (all, matched) => {
    return valueEvaluator(matched);
  });
};

const registerStylesheet = (stylesheet = {}) => {
  stylesheets = Object.assign({}, stylesheets, stylesheet);
  process(stylesheets, '');
  css = buildStylesheet();

  valueEvaluator = (expr) => {
    if (expr in computedVariables) {
      return computedVariables[expr];
    }

    return computedVariables[expr] = valueEvaluator.eval(expr, variables, methods);
  };

  valueEvaluator.eval = new Function(
    'expr',
    `{${Object.keys(variables).join(',')}}`,
    `{${Object.keys(methods).join(',')}}`,
    'return eval(expr)'
  );

  computedVariables = {};

  fillCssWithVars();
};

// registerMethods({
//   lighten: (color, scale) => 'red',
// });
//
// registerVariables({
//   globalPadding: '24em',
//   mainDivider: '3px',
//   mainColor: 'red',
//
//   one: 'rgb(0,0,0)',
//   two: 'rgb(1,0,0)',
//   three: 'rgb(2,0,0)',
//   four: 'rgb(3,0,0)',
// });
//
//
// registerStylesheet({
//   '.InputContainer': {
//     border: '1px solid blue',
//
//     input: {
//       color: 'red',
//       width: 'calc(100% - {{mainDivider / globalPadding}})',
//
//       '&::hover': {
//         background: '{{lighten(mainColor, 1.2)}}',
//         paddingTop: () => '3px'
//       },
//
//       '.ie &': {
//         width: '100%',
//         marginLeft: '{{globalPadding / 2}}',
//         marginRight: '{{globalPadding / 2}}',
//       }
//     }
//   },
// });
