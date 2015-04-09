(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define('simditor-mark', ["jquery","simditor"], function (a0,b1) {
      return (root['SimditorMark'] = factory(a0,b1));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("jquery"),require("simditor"));
  } else {
    root['SimditorMark'] = factory(jQuery,Simditor);
  }
}(this, function ($, Simditor) {

var SimditorMark,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SimditorMark = (function(superClass) {
  extend(SimditorMark, superClass);

  function SimditorMark() {
    return SimditorMark.__super__.constructor.apply(this, arguments);
  }

  SimditorMark.prototype.name = 'mark';

  SimditorMark.prototype.icon = 'magic';

  SimditorMark.prototype.htmlTag = 'mark';

  SimditorMark.prototype.disableTag = 'pre, table';

  SimditorMark.prototype.command = function() {
    var $contents, $mark, range;
    range = this.editor.selection.getRange();
    if (range.collapsed) {
      return;
    }
    if ($(range.startContainer).is('mark')) {
      $mark = $(range.startContainer);
    }
    if (this.active) {
      $mark = $(range.commonAncestorContainer);
      if (!$mark.is('mark')) {
        $mark = $mark.parent();
      }
    }
    if ($mark) {
      this.editor.selection.save();
      $mark.children().unwrap();
      this.editor.selection.restore();
      this.editor.trigger('valuechanged');
      return;
    }
    this.editor.selection.save();
    $contents = $(range.extractContents());
    $(range.commonAncestorContainer).find('mark').each(function(index, ele) {
      if ($(ele).text() === '') {
        return $(ele).remove();
      }
    });
    $contents.find('mark').each(function(index, ele) {
      return $(ele).children().unwrap();
    });
    $mark = $('<mark>').append($contents);
    range.insertNode($mark[0]);
    this.editor.selection.restore();
    return this.editor.trigger('valuechanged');
  };

  return SimditorMark;

})(Simditor.Button);

Simditor.Toolbar.addButton(SimditorMark);

return SimditorMark;

}));
