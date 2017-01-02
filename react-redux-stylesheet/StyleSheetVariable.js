const d3ColorHex = Object.freeze(/^#([0-9a-f]{3})$/i);
const d6ColorHex = Object.freeze(/^#([0-9a-f]{6})$/i);
const rgbaColor = Object.freeze(/^rgba?\((.*?)\)$/);
const numValue = Object.freeze(/^(\d+(\.\d+)?)([^\d\s]+)?$/);

const StylesheetVariableColors = Object.freeze({
  'red': '#ff0000',
});

const StylesheetVariableTypes = Object.freeze({
  UNIT: 'UNIT',
  COLOR: 'COLOR',
  NON_UNIT: 'NON_UNIT',
  OTHER: 'OTHER',
});

class StylesheetVariable {
  constructor (value) {
    this.setValue(value);
  }

  setMatched3dHexColor(matched) {
    this.type = StylesheetVariableTypes.COLOR;
    this.value = matched[1]
      .split('')
      .map(v => v === '0' ? 0 : (parseInt(v, 16) + 1) * 16 - 1);
  }

  setMatched6dHexColor(matched) {
    this.type = StylesheetVariableTypes.COLOR;
    this.value = [
      matched[0].substr(1, 2),
      matched[0].substr(3, 2),
      matched[0].substr(5, 2),
    ]
      .map(v => parseInt(v, 16));
  }

  setMatchedRGBAColor(matched) {
    this.type = StylesheetVariableTypes.COLOR;
    const colorParts = matched[1].split(',').map(v => v.trim());
    let i = 3;

    if (colorParts.length < 3) throw new Error('Too small color parts');
    if (colorParts.length > 4) throw new Error('Too munch color parts');

    while (i-- > 0) {
      colorParts[i] = parseInt(colorParts[i], 10);
    }

    if (colorParts.length === 4) {
      colorParts[3] = parseFloat(colorParts[3], 10);
    }

    this.value = colorParts;
  }

  setMatchedNum(matched) {
    this.value = parseFloat(matched[1], 10);

    if (matched[3]) {
      this.type = StylesheetVariableTypes.UNIT;
      this.unit = matched[3];
    }
    else {
      this.type = StylesheetVariableTypes.NON_UNIT;
    }
  }

  setValue(value) {
    const trimed = String(value).trim();
    let matched;

    if (matched = trimed.match(d3ColorHex)) {
      this.setMatched3dHexColor(matched);
    }
    else if (matched = trimed.match(d6ColorHex)) {
      this.setMatched6dHexColor(matched);
    }
    else if (matched = trimed.match(rgbaColor)) {
      this.setMatchedRGBAColor(matched);
    }
    else if (trimed in StylesheetVariableColors) {
      this.setMatched6dHexColor(StylesheetVariableColors[trimed].match(d6ColorHex));
    }
    else if (matched = trimed.match(numValue)) {
      this.setMatchedNum(matched);
    }
    else {
      this.type = StylesheetVariableTypes.OTHER;
      this.value = trimed;
    }
  }

  setOnlyValue(value) {
    this.value = value;
  }

  toString() {
    switch (this.type) {
      case StylesheetVariableTypes.UNIT:
        return `${this.value}${this.unit}`;

      case StylesheetVariableTypes.COLOR:
        if (this.value[3]) {
          return `rgba(${this.value.join(',')})`;
        }

        return `rgb(${this.value.join(',')})`;

      // case StylesheetVariableTypes.NON_UNIT:
      // case StylesheetVariableTypes.OTHER:
      default:
        return this.value;
    }
  }
}

module.exports = StylesheetVariable;