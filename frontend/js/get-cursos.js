const divCursos = document.querySelector("#cursos");

async function consultaCursos() {
    const response = await fetch("http://localhost:3000/cursos");
    const cursos = await response.json();
    preencheTela(cursos);
    console.log(cursos);
}

function preencheTela(cursos) {
    cursos.forEach((curso) => {
        const novoCursoHTML = `
      <div class="box">
        <div class="curso">
          <h3>${curso.nome}</h3>
          <p>Carga Horária: ${curso.ch} h</p>
        </div>
        <div class="buttons">
          <button class="button"> 
            <svg xmlns="http://www.w3.org/2000/svg" height="25" viewBox="0 96 960 960" width="25"><path d="M261 936q-24.75 0-42.375-17.625T201 876V306h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438V306ZM367 790h60V391h-60v399Zm166 0h60V391h-60v399ZM261 306v570-570Z"/></svg> 
          </button>
          <button class="button" onclick="window.location.href='editar_curso.html?id=${curso.id}'"> 
            <svg xmlns="http://www.w3.org/2000/svg" height="25" viewBox="0 96 960 960" width="25"><path d="M480 896q-133 0-226.5-93.5T160 576q0-133 93.5-226.5T480 256q85 0 149 34.5T740 385V256h60v254H546v-60h168q-38-60-97-97t-137-37q-109 0-184.5 75.5T220 576q0 109 75.5 184.5T480 836q83 0 152-47.5T728 663h62q-29 105-115 169t-195 64Z"/></svg> 
          </button>
        </div>
      </div>
    `;
        divCursos.innerHTML = divCursos.innerHTML + novoCursoHTML;
    });
}

consultaCursos();
