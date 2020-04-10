const express = require("express");
const cors = require("cors");
const {uuid} = require('uuidv4')

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const repository = request.body

  repository.id = uuid()

  repository.likes=0

  repositories.push(repository)
  
  return response.json(repository)
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params
  const {techs, url, title} = request.body
  const repositoryIndex = repositories.findIndex(repository=>repository.id===id)
  if (repositoryIndex<0){
    return response.status(400).json({error: 'Repository does not exist'})
  }
  const {likes} = repositories[repositoryIndex]
  const repository = {id,techs,url,title,likes}
  repositories[repositoryIndex] = repository
  return response.json(repository)
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params
  const repositoryIndex = repositories.findIndex(repository=>repository.id===id)
  if (repositoryIndex<0){
    return response.status(400).json({error: 'Repository does not exist'})
  }
  repositories.splice(repositoryIndex,1)
  return response.status(204).json()
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params
  const repositoryIndex = repositories.findIndex(repository=>repository.id===id)
  if (repositoryIndex<0){
    return response.status(400).json({error: 'Repository does not exist'})
  }
  repositories[repositoryIndex].likes++
  return response.json(repositories[repositoryIndex])
});

module.exports = app;
