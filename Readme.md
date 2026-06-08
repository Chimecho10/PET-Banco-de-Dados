# Como Rodar o Projeto

### Pré-requisitos
* **Docker** e **Docker Compose** instalados e rodando na máquina.
* **Git** instalado.

---

## 1. Clonar o Repositório

Abra o terminal na pasta onde deseja salvar o projeto e execute o comando abaixo:

```bash
git clone <https://github.com/Chimecho10/PET-Banco-de-Dados.git>

cd <PET-Banco-de-Dados.git>
```
## 2. Inicializar o projeto com Docker

```bash
docker compose up --build
```

## 3. Acessar o Projeto

Após a inicialização dos containers, o projeto estará disponível nos seguintes endereços locais:

    Frontend (React): http://localhost:5173

    Backend (FastAPI): http://localhost:8000

    Documentação da API (Swagger): http://localhost:8000/docs

## 4. Parar o Projeto

Para encerrar a execução dos serviços, pressione Ctrl + C no terminal ou execute o comando abaixo na pasta do projeto:

```bash
docker compose down
```