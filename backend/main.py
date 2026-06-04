from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def start_servidor():
    return {"mensagem": "servidor rodando"}