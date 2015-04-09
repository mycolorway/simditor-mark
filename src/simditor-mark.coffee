class SimditorMark extends Simditor.Button

  name: 'mark'

  icon: 'magic'

  htmlTag: 'mark'

  disableTag: 'pre, table'

  command: ->
    range = @editor.selection.getRange()
    return if range.collapsed

    $mark = $(range.startContainer) if $(range.startContainer).is 'mark'
    if @active
      $mark = $(range.commonAncestorContainer)
      $mark = $mark.parent() unless $mark.is 'mark'

    if $mark
      @editor.selection.save()
      $mark.children().unwrap()
      @editor.selection.restore()
      @editor.trigger 'valuechanged'
      return

    #if not marked, mark!
    @editor.selection.save()
    $contents = $(range.extractContents())

    #remove extra mark tag
    $(range.commonAncestorContainer).find('mark').each (index, ele) ->
      $(ele).remove() if $(ele).text() is ''
    $contents.find('mark').each (index, ele) ->
      $(ele).children().unwrap()

    $mark = $('<mark>').append $contents
    range.insertNode $mark[0]

    @editor.selection.restore()
    @editor.trigger 'valuechanged'

Simditor.Toolbar.addButton SimditorMark