const panel = document.getElementById('sell')
const productId = document.getElementById('No')
//Es para que pongas el No. de producto en el panel

const showPanel = () => {
    panel.classList.add('pedidoInfo__container')
    panel.classList.remove('hidden')
}

const hidePanel = () => {
    panel.classList.add('hidden')
    panel.classList.remove('pedidoInfo__container')
}



