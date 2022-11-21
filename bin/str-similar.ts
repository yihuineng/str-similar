#!/usr/bin/env ts-node

import { StrSimilar } from '../src/similar';

process.setMaxListeners(0);
process.on('uncaughtException', function(err) {
  console.log('Caught exception: ' + err);
  process.exit(1);
});

const { program } = require('commander');

program
  .version('1.0.0');

program
  .command('compare [str1] [str2]')
  .alias('cp')
  .description('比较两个字符串相似度，支持中文的相似度比较')
  .action(async (str1, str2) => {
    const res = new StrSimilar().similarity(str1, str2);
    console.log('similarity', res);
  });

program.parse(process.argv);
