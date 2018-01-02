const logger = (element) =>
{
    console.log(element)
}

export default logger

import { $query } from './variables'

export const blocker = () =>
{
    const $div = document.createElement('div')
    $div.style.backgroundColor = '#008800'
    $div.style.position = 'absolute'
    $div.style.left = '25%'
    $div.style.top = '25%'
    $div.style.width = '50%'
    $div.style.height = '50%'
    $query.body.appendChild($div)
}