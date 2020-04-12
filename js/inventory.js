const form = document.getElementById('inventory-form');

const mostrarForm = () => {
    form.classList.add('inventory__main--form')
    form.classList.remove('hidden')
}

const ocultarForm = () => {
    form.classList.add('hidden')
    form.classList.remove('inventory__main--form')
}

