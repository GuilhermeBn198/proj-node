const formCursos = document.querySelector("#form-cursos");

formCursos.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nome = document.querySelector("#nome").value;
    const ch = document.querySelector("#ch").value;

    try {
        const response = await fetch("http://localhost:3000/cursos/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, ch }),
        });
        const data = await response.json();
        console.log(data);
        alert("Curso criado com sucesso!");
        window.location.href = "index.html";
    } catch (error) {
        console.log(error);
        alert("Ocorreu um erro ao criar o curso.");
    }
});
