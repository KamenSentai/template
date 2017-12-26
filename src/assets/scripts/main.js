const test = new Test(0, 0, 0)
test.test()
console.log($body)

const $div = document.createElement('div')
$div.style.backgroundColor = 'grey'
$div.style.position = 'absolute'
$div.style.left = '25%'
$div.style.top = '25%'
$div.style.width = '50%'
$div.style.height = '50%'
$body.appendChild($div)