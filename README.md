# str-similar
calculate similar between strings, support chinese.

### usage
`npm i str-similar --save`
```ts
import { StrSimilar } from 'str-similar';
const similarity = new StrSimilar().similarity('哈哈', '嘿嘿');
```

#### cli
`npm i str-similar -g`  `str-similar compare str1 str2`


### 支持中文字符串相似度检测
```text
yhn@yhnMBP % str-similar compare 太和 大和
similarity 0.92885
yhn@yhnMBP % str-similar compare 啥 哈    
similarity 0.92448
yhn@yhnMBP % str-similar compare 你 我
similarity 0.52308
```

### Refs
- https://houbb.github.io/2020/01/20/nlp-chinese-similar-char
- https://blog.csdn.net/LuoFan_A/article/details/126752054
