const Buffer = function (string) {
    // Source: https://stackoverflow.com/a/63406339
    const buf = new ArrayBuffer(string.length);
    const ar = new BigUint64Array(buf);
  
    for (var i = 0; i < ar.length; i++) {
      ar[i] = string.charCodeAt(i);
    }
  
    return buf;
  }
  
  const trim = function (string, char) {
    let text = string;
  
    for (i = 0; i < text.length; i++) {
      if (string[i] === char) {
        text = text.slice(1);
      } else {
        break;
      }
    }
  
    text = text.split("").reverse().join("");
  
    for (j = 0; j < text.length; j++) {
      if (text[j] === char){
        text = text.slice(1);
      } else {
        break;
      }
    }
  
    text = text.split("").reverse().join("");
  
    return text;
  }
  
  const mod = function (n, m) {
    // Source: https://stackoverflow.com/a/17323608
    return ((n % m) + m) % m;
  }
  
  const objectIsEmpty = function(object) {
    if (typeof object === "object" && Object.keys(object).length === 0) {
      return true;
    } else return false;
  }
  
  const createJSONOutput = function(json) {
    let JSONString = JSON.stringify(json);
    let JSONOutput = ContentService.createTextOutput(JSONString);
    JSONOutput.setMimeType(ContentService.MimeType.JSON);
    return JSONOutput;
  }
  
  // Thanks to @butthx
  // Source: https://github.com/gram-js/gramjs/blob/master/gramjs/Helpers.ts
  
  const bufferToBigInt = function(buffer, padding = 0) {
    let value = buffer.reverse().toString("hex");
  
    if (padding) {
      for (let i = 0; i < padding * 2; i++) {
        if (/^0/.test(value)) {
          value = value.replace(/^0/, '');
        }
      }
    }
  
    if (mod(value.length, 2)) value = '0' + value;
    return BigInt('0x' + value.trim());
  }
  
  const bigIntToBuffer = function(int, padding, little = true, signed = false) {
    const bigIntLength = int.toString(2).length;
    const bytes = Math.ceil(bigIntLength / 8);
    if (padding < bytes) {
      throw Error(`int too big to convert with padding ${padding}`);
    }
    if (!signed && int < BigInt(0)) {
      throw Error("int too small, set unsigned to true to convert it.");
    }
    let isBelow = false;
    if (int < BigInt(0)) {
      isBelow = true;
      int = int * BigInt(-1);
    }
    let hex = int.toString(16).padStart(padding * 2, '0');
  }
  