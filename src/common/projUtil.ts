
const path = require('path');

export class ProjUtil {

  static getResourcePath(): string {
    return path.resolve(__dirname, '../../resource');
  }

}
