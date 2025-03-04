// função que é executada quando a página é carregada
window.onload = async function () {
    // recupera o id do curso que será editado da URL
    const urlParams = new URLSearchParams(window.location.search);
    const cursoId = urlParams.get("id");

    // faz uma requisição ao backend para buscar o curso pelo id
    const response = await fetch(`/api/cursos/${cursoId}`);
    const curso = await response.json();

    // preenche os campos do formulário com as informações do curso
    document.getElementById("nome").value = curso.nome;
    document.getElementById("ch").value = curso.cargaHoraria;
};

// função que é executada quando o formulário é enviado
async function handleSubmit(event) {
    event.preventDefault(); // previne o comportamento padrão de submissão do formulário

    const urlParams = new URLSearchParams(window.location.search);
    const cursoId = urlParams.get("id");

    // obtém os valores dos campos do formulário
    const nome = document.getElementById("nome").value;
    const cargaHoraria = document.getElementById("ch").value;

    // faz uma requisição ao backend para atualizar o curso
    const response = await fetch(`/api/cursos/update/${cursoId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, cargaHoraria }),
    });

    // exibe uma mensagem de sucesso
    alert("Curso atualizado com sucesso");

    // redireciona para a página inicial
    window.location.href = "./index.html";
}

// adiciona o listener de evento para o formulário
document.getElementById("curso-form").addEventListener("submit", handleSubmit);
