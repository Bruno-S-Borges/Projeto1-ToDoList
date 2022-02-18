const elementoLista = document.querySelector("ul"); // Usamos querySelector para buscar o elemento no HTML
const elementoInput = document.querySelector("input");
const elementoBotao = document.querySelector("button");

const tarefas = JSON.parse(localStorage.getItem("lista_tarefas")) || [] // Usando o JSON para chamar os valores que estão no local Storage ou criar um array vazio
//const tarefas = [] // Array vazio

function mostraTarefas(){ //Função para mostrar as tarefas

    elementoLista.innerHTML = '' // Limpando o HTML para depois fazer o for e adicionar os valores do Array

    for (tarefa of tarefas){ // For para percorrer o Array 
        const elementoTarefa = document.createElement("li") //createElement para criar um elemento li
        const textoTarefa = document.createTextNode(tarefa) //createTextNode para criar o texto da tarefa, será o texto que está no Array

        const elementoLink = document.createElement("a") //createElement para criar um elemento a
        const pos = tarefas.indexOf(tarefa) // É um método do Array que pega o index daquele elemento (Neste caso ele está armazenando o index em que aquela tarefa naquele momento do for está)
        const linkText = document.createTextNode("X") // Colocando o texto "x" 

        elementoLink.setAttribute("onclick", `deletaTarefa(${pos})`) // Adicionando um atributo ao elementoLink para quando ser clicado, chamar a função para deletar ($ = template String)

        elementoTarefa.appendChild(textoTarefa) //appendChild adiciona o elemento de texto tarefa ao elemento Tarefa. Neste caso está adicionando o texto da tarefa dentro do li criado no elemento tarefa
        elementoLista.appendChild(elementoTarefa) // Aqui está adicionando o ElementoTarefa (<li>textoTarefa</li>) ao ul buscado na primeira linha
        elementoTarefa.appendChild(elementoLink) // Adicionando o elementoLink (tag a) dentro do elemento tarefa (tag li) 
        elementoLink.appendChild(linkText) // Adicionando o linkText (texto x) ao meu elementoLink (tag a)
    }
}

mostraTarefas()

//console.log(ul);

function addTarefa(){ // Função para adicionar as tarefas ao Array
    const textoTarefa1 = elementoInput.value // Pega o valor (por isso usamos o value) que o usuario digitou no input e coloca em textoTarefa1 (1 no final mais pra diferenciar as constantes mas como são escopos diferentes poderia ter o mesmo nome)
    tarefas.push(textoTarefa1) // push para adicionar o texto da tarefa no Array
    elementoInput.value = '' // Limpar campo input após adicionar a tarefa

    mostraTarefas()
    salvarNoLocalStorage()

    //onclick no tag button do HTML pra chamar essa função
    //Podemos inserir desta forma também
    // elementoBotao.setAttribute("onclick", "addTarefa()")
}

function deletaTarefa(pos){ // Função para deletar uma tarefa
    tarefas.splice(pos, 1) // Splice - altera o conteudo de um Array enquando adiciona outros (Neste caso só está removendo) - (pos = a posição do Array que ele se encontra, 1 = remover 1 elemento, no caso ele mesmo)

    mostraTarefas()
    salvarNoLocalStorage()
}

function deletaTudo(){ //Função para deletar tudo
    tarefas.splice(0, tarefas.length); // Utilizamos o Splice para percorrer todo o Array e deletar tudo (0 = começo do Array, a segunda posição é a exclusão, estamos falando pra excluir tudo do Array)

    mostraTarefas()
    salvarNoLocalStorage()
}

function salvarNoLocalStorage(){ // Função para salvar o elemento no local Storage
    localStorage.setItem("lista_tarefas",JSON.stringify(tarefas)) // Salvando o Array tarefas no localStorage
}
