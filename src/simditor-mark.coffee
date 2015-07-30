class SimditorMark extends Simditor.Button

  name: 'mark'

  icon: 'mark'

  htmlTag: 'mark'

  disableTag: 'pre, table'

  command: ->
    range = @editor.selection.range()

    if @active
      @editor.selection.save()
      @unmark(range)
      @editor.selection.restore()
      @editor.trigger 'valuechanged'
      return

    return if range.collapsed

    @editor.selection.save()

    $start = $(range.startContainer)
    $end = $(range.endContainer)

    if $start.closest('mark').length
      range.setStartBefore($start.closest('mark')[0])
    if $end.closest('mark').length
      range.setEndAfter($end.closest('mark')[0])

    @mark(range)

    @editor.selection.restore()
    @editor.trigger 'valuechanged'
    @editor.trigger 'selectionchanged' if @editor.util.support.onselectionchange

  mark: (range = @editor.selection.range()) ->
    $contents = $(range.extractContents())
    $contents.find('mark').each (index, ele) ->
      $(ele).replaceWith($(ele).html())

    $mark = $('<mark>').append $contents
    range.insertNode $mark[0]

  unmark: (range = @editor.selection.range())->
    if (range.collapsed)
      $mark = $(range.commonAncestorContainer)
      $mark = $mark.parent() unless $mark.is 'mark'
    else if $(range.startContainer).closest('mark').length
      $mark = $(range.startContainer).closest('mark')
    else if $(range.endContainer).closest('mark').length
      $mark = $(range.endContainer).closest('mark')

    $mark.replaceWith($mark.html())

Simditor.Toolbar.addButton SimditorMark
