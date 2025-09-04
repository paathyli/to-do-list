const localStorageKey = 'to-do-list-gn'

function validateIfExistsNewTask() {
    let values     = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let inputValue = document.getElementById('caixa-texto').value
    let exists     = values.find(x => x.name == inputValue)
    return !exists ? false : true
}

function newTask() {
    let input = document.getElementById('caixa-texto')
    input.style.border = ''

    // validação
    if (!input.value) {
        input.style.border = '1px solid red'
        alert('Digite algo para inserir em sua lista')
    }
    else if (validateIfExistsNewTask()) {
        alert('Já existe uma task com essa descrição')
    }
    else {
        // incrementa no localStorage
        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
        values.push({
            name: input.value
        })
        localStorage.setItem(localStorageKey, JSON.stringify(values))
        showValues()
    }
    input.value = ''
}

function showValues() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let list = document.getElementById('lista')  // corrigido: é "lista" do seu HTML
    list.innerHTML = ''
    for (let i = 0; i < values.length; i++) {
        list.innerHTML += `
            <li>
                ${values[i]['name']}
                <button onclick='removeItem("${values[i]['name']}")'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
                         class="bi bi-check-lg" viewBox="0 0 16 16">
                         <path d="M12.736 3.97a.733.733 0 0 1 1.047 0
                                  c.286.289.29.756.01 1.05L7.88 12.01a.733.733 
                                  0 0 1-1.065.02L3.217 8.384a.757.757 
                                  0 0 1 0-1.06.733.733 0 0 1 
                                  1.047 0l3.052 3.093 5.4-6.425
                                  a.247.247 0 0 1 .02-.022Z"/>
                    </svg>
                </button>
            </li>`
    }
}

function removeItem(data) {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let index = values.findIndex(x => x.name == data)
    values.splice(index, 1)
    localStorage.setItem(localStorageKey, JSON.stringify(values))
    showValues()
}

showValues()
