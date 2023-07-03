

import assert from 'assert';
import { StrSimilar } from '../src/similar';

describe('main.test.ts', () => {

  it('get similarity should ok test1', async function() {
    this.timeout(0);
    const res = new StrSimilar().similarity('天天向上', '夫天向上');
    console.log(res);
    assert.equal(res, 0.87308);
  });

  it('get similarity should ok test2', async function() {
    this.timeout(0);
    const res = new StrSimilar().similarity('天天向上', '夫夫向上');
    console.log(res);
    assert.equal(res, 0.74615);
  });

  it('get similarity should ok test3', async function() {
    this.timeout(0);
    const res = new StrSimilar().similarity('太和圩乡', '大和圩乡');
    console.log(res);
    assert.equal(res, 0.96442);
  });

  it('get similarity should ok test4', async function() {
    this.timeout(0);
    const res = new StrSimilar().similarity('太和圩', '大和圩乡');
    console.log(res);
    assert.equal(res, 0.71442);
  });

  it('get similarity should ok test5', async function() {
    this.timeout(0);
    const res = new StrSimilar().similarity('天天向上aab', '天天向上aac');
    console.log(res);
    assert.equal(res, 0.85714);
  });

  it('get english similarity should ok', async function() {
    this.timeout(0);
    const res = new StrSimilar().similarity('abc', 'abd');
    console.log(res);
    assert.equal(res, 0.66667);
  });

  it('get english similarity should ok2', async function() {
    this.timeout(0);
    const res = new StrSimilar().similarity('abc', 'cabc');
    console.log(res);
    assert.equal(res, 0.75);
  });

});
