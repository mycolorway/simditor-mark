# simditor-mark

[![Circle CI](https://circleci.com/gh/mycolorway/simditor-mark.png?circle-token=3c093222beaf3c0a591da280aef618efb906ec65)](https://circleci.com/gh/mycolorway/simditor-mark)

Simditor的一个官方扩展，为工具栏添加一个荧光笔按钮，用于高亮所选内容。

## 如何使用

在 Simditor 的基础上额外引入 simditor-mark 的脚本

````
<script src="/path/to/simditor-mark.js"></script>
````

在初始化simditor的时候，在`toolbar`选项中加入`mark`即可，如：

````
var simditor = new Simditor({
  textarea: '#textarea',
  toolbar: ['mark', 'title', 'bold', 'italic', 'underline', 'strikethrough', 'color', '|', 'ol', 'ul', 'blockquote', 'code', 'table', ]
});

````