import fs from 'fs';
import { ProjUtil } from './common/projUtil';


export class StrSimilar {
  dics;
  rates;

  constructor(rates = {
    hanzijiegou: 10,
    sijiaobianma: 8,
    pianpangbushou: 6,
    bihuashu: 2
  }) {
    this.rates = rates;
    this.dics = this.initDic();
  }

  /**
   * 初始化字典
   */
  private initDic() {
    const dics = [
      'bihuashu',
      'hanzijiegou',
      'pianpangbushou',
      'sijiaobianma'
    ];
    const maps: {
      bihuashu: any;
      hanzijiegou: any;
      pianpangbushou: any;
      sijiaobianma: any;
    } = {
      bihuashu: {},
      hanzijiegou: {},
      pianpangbushou: {},
      sijiaobianma: {}
    };
    for (const dic of dics) {
      const kvs = fs.readFileSync(`${ProjUtil.getResourcePath()}/${dic}.txt`, 'utf-8').toString().trim()
        .split('\n');
      for (const kv of kvs) {
        const key = kv.split(' ')[0];
        maps[dic][key] = kv.split(' ')[1];
        if (dic === 'bihuashu') {
          maps[dic][key] = Number.parseInt(maps[dic][key]);
        }
      }
    }
    return maps;
  }

  private bihuashuSimilar(char1: string, char2: string) {
    const v1 = this.dics.bihuashu[char1];
    const v2 = this.dics.bihuashu[char2];
    const diff = 1 - Math.abs((v1 - v2) / Math.max(v1, v2));
    return this.rates.bihuashu * diff;
  }

  private hanzijiegouSimilar(char1: string, char2: string) {
    const v1 = this.dics.hanzijiegou[char1];
    const v2 = this.dics.hanzijiegou[char2];
    return v1 === v2 ? this.rates.hanzijiegou : 0;
  }

  private pianpangbushouSimilar(char1: string, char2: string) {
    const v1 = this.dics.pianpangbushou[char1];
    const v2 = this.dics.pianpangbushou[char2];
    return v1 === v2 ? this.rates.pianpangbushou : 0;
  }

  private sijiaobianmaSimilar(char1: string, char2: string) {
    const v1 = this.dics.sijiaobianma[char1];
    const v2 = this.dics.sijiaobianma[char2];
    let score = 0;
    if (v1 && v2) {
      if (v1.length === v2.length) {
        for (let i = 0; i < v1.length; i++) {
          if (v1[i] === v2[i]) {
            score++;
          }
        }
        return (score / v1.length) * this.rates.sijiaobianma;
      }
    }
    return 0;
  }

  /**
   * 中文字 相似度
   */
  private charSimilar(char1: string, char2: string) {
    if (char1.length !== 1 || char2.length !== 1) {
      console.error('param must be char!');
      return;
    }
    if (char1 === char2) {
      return 1;
    }
    // 不全是中文
    if (!/^[\u4e00-\u9fa5]+$/.test(`${char1}${char2}`)) {
      return 0;
    }
    const v1 = this.pianpangbushouSimilar(char1, char2);
    const v2 = this.bihuashuSimilar(char1, char2);
    const v3 = this.sijiaobianmaSimilar(char1, char2);
    const v4 = this.hanzijiegouSimilar(char1, char2);
    return ((v1 + v2 + v3 + v4) / (this.rates.bihuashu + this.rates.pianpangbushou + this.rates.hanzijiegou + this.rates.sijiaobianma));
  }

  /**
   * 计算编辑距离
   * @param str1
   * @param str2
   */
  private distance(str1: string, str2: string): number {
    const insert_cost = 1;
    const delete_cost = 1;
    if (str1 === str2) {
      return 0;
    }
    const chars1 = str1.split('');
    const chars2 = str2.split('');
    if (chars1.length === 0) {
      return chars2.length * insert_cost;
    }
    if (chars2.length === 0) {
      return chars1.length * delete_cost;
    }
    // 按字符求相似值
    let arr1 = [ 0 ];
    let arr2 = [];
    // 长短不一，补齐编辑距离
    for (let i = 1; i < (str2.length + 1); i++) {
      arr1[i] = arr1[i - 1] + insert_cost;
    }
    for (let i = 0; i < str1.length; i++) {
      arr2[0] = arr1[0] + delete_cost;
      for (let j = 0; j < str2.length; j++) {
        let subCost = 0;
        if (str1[i] !== str2[j]) {
          subCost = 1 - this.charSimilar(str1[i], str2[j]);
        }
        arr2[j + 1] = Math.min(arr2[j] + insert_cost, arr1[j + 1] + delete_cost, arr1[j] + subCost);
      }
      // 互换一下
      const arr3 = arr1;
      arr1 = arr2;
      arr2 = arr3;
    }
    return arr1[str2.length];
  }

  /**
   * Calculate similarity between two strings
   * @param str1
   * @param str2
   * @param caseSensitive
   */
  similarity(str1: string, str2: string, caseSensitive: boolean = false): number {
    if (!caseSensitive) {
      str1 = str1.toLowerCase();
      str2 = str2.toLowerCase();
    }
    const distance = this.distance(str1, str2);
    return Number.parseFloat((1 - (distance / (Math.max(str1.length, str2.length)))).toFixed(5));
  }
}
