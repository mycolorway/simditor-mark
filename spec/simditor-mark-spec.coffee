
describe 'simditor-mark', ->
  editor = null
  simditor = null


  generateSimditor = ->
    content = '''
      <p>Simditor 是团队协作工具 <a href="http://tower.im">Tower</a> 使用的富文本编辑器。</p>
      <p>相比传统的编辑器它的特点是：</p>
      <ul>
        <li>功能精简，加载快速</li>
        <li>输出格式化的标准 HTML</li>
        <li>每一个功能都有非常优秀的使用体验</li>
      </ul>
      <p>兼容的浏览器：IE10+、Chrome、Firefox、Safari。</p>
    '''

    $textarea = $('<textarea id="editor"></textarea>')
      .val(content)
      .appendTo 'body'
    simditor = new Simditor
      textarea: $textarea
      toolbar: [ 'mark', 'title', 'bold', 'italic', 'underline' ]

  destroySimditor = ->
    $textarea = $('#editor')
    editor = $textarea.data 'simditor'
    editor?.destroy()
    $textarea.remove()

  beforeEach ->
    editor = generateSimditor()

  afterEach ->
    destroySimditor()
    editor = null
    simditor = null

  it 'should render button in simditor', ->
    $simditor = $('.simditor')
    expect($simditor).toExist()
    expect($simditor.find('.simditor-toolbar ul li a.toolbar-item-mark')).toExist()

  it 'should mark and unmark selected content', ->
    $simditor = $('.simditor')
    $body = $simditor.find('.simditor-body')

    range = document.createRange()
    range.setStart($body.find('p').eq(0)[0], 1)
    range.setEnd($body.find('p').eq(0)[0], 3)
    simditor.focus()
    simditor.selection.range range
    expect(range.toString()).toBe('Tower 使用的富文本编辑器。')
    $mark = $simditor.find('a.toolbar-item-mark')
    $mark.trigger 'mousedown'

    expect($body.find('mark')).toExist()
    expect($body.find('mark').text()).toBe('Tower 使用的富文本编辑器。')

    range.setStart($body.find('mark')[0], 0)
    range.setEnd($body.find('mark')[0], 2)
    simditor.focus()
    simditor.selection.range range
    simditor.trigger 'selectionchanged'
    $mark.trigger 'mousedown'


    expect($body.find('mark')).not.toExist()

  it 'should mark content without extra mark tag', ->
    $simditor = $('simditor')
    $body = $simditor.find('body')
