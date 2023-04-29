export class CursoController {
    constructor(CursoModel) {
        this.curso = CursoModel;
    }

    async getAll() {
        try {
            const cursos = await this.curso.findAll();
            return cursos;
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            const curso = await this.curso.findByPk(id);
            return curso;
        } catch (error) {
            console.log(error);
        }
    }

    async adicionar(cursoDTO) {
        try {
            console.log(cursoDTO);
            await this.curso.create(cursoDTO);
        } catch (error) {
            console.log(error);
        }
    }

    async update(id, nome, ch) {
        try {
            await this.curso.update(
                { id, nome, ch },
                {
                    where: {
                        id: id,
                    },
                }
            );
        } catch (error) {
            console.log(error);
        }
    }

    async delete(id) {
        try {
            await this.curso.destroy({
                where: {
                    id,
                },
            });
        } catch (error) {
            console.log(error);
        }
    }
}
