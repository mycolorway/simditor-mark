(function() {
  describe('simditor-mark', function() {
    var destroySimditor, editor, generateSimditor, simditor;
    editor = null;
    simditor = null;
    generateSimditor = function() {
      var $textarea, content;
      content = '<p>Simditor 是团队协作工具 <a href="http://tower.im">Tower</a> 使用的富文本编辑器。</p>\n<p>相比传统的编辑器它的特点是：</p>\n<ul>\n  <li>功能精简，加载快速</li>\n  <li>输出格式化的标准 HTML</li>\n  <li>每一个功能都有非常优秀的使用体验</li>\n</ul>\n<p>兼容的浏览器：IE10+、Chrome、Firefox、Safari。</p>';
      $textarea = $('<textarea id="editor"></textarea>').val(content).appendTo('body');
      return simditor = new Simditor({
        textarea: $textarea,
        toolbar: ['mark', 'title', 'bold', 'italic', 'underline']
      });
    };
    destroySimditor = function() {
      var $textarea;
      $textarea = $('#editor');
      editor = $textarea.data('simditor');
      if (editor != null) {
        editor.destroy();
      }
      return $textarea.remove();
    };
    beforeEach(function() {
      return editor = generateSimditor();
    });
    afterEach(function() {
      destroySimditor();
      editor = null;
      return simditor = null;
    });
    it('should render button in simditor', function() {
      var $simditor;
      $simditor = $('.simditor');
      expect($simditor).toExist();
      return expect($simditor.find('.simditor-toolbar ul li a.toolbar-item-mark')).toExist();
    });
    it('should mark and unmark selected content', function() {
      var $body, $mark, $simditor, range;
      $simditor = $('.simditor');
      $body = $simditor.find('.simditor-body');
      range = document.createRange();
      range.setStart($body.find('p').eq(0)[0], 1);
      range.setEnd($body.find('p').eq(0)[0], 3);
      simditor.focus();
      simditor.selection.range(range);
      expect(range.toString()).toBe('Tower 使用的富文本编辑器。');
      $mark = $simditor.find('a.toolbar-item-mark');
      $mark.trigger('mousedown');
      expect($body.find('mark')).toExist();
      expect($body.find('mark').text()).toBe('Tower 使用的富文本编辑器。');
      range.setStart($body.find('mark')[0], 0);
      range.setEnd($body.find('mark')[0], 2);
      simditor.focus();
      simditor.selection.range(range);
      simditor.trigger('selectionchanged');
      $mark.trigger('mousedown');
      return expect($body.find('mark')).not.toExist();
    });
    return it('should mark content without extra mark tag', function() {
      var $body, $simditor;
      $simditor = $('simditor');
      return $body = $simditor.find('body');
    });
  });

}).call(this);
