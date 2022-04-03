# Gobarber-Rocketseat

<div align="center" >
<img align="center" src="https://gobarberjardev.s3.amazonaws.com/logo.png" alt="GoBarber Logo" width="500" />

![GitHub last commit](https://img.shields.io/github/last-commit/Jardel-Nathan/Gobarber-Rocketseat?color=green&style=flat-square)
![GitHub top language](https://img.shields.io/github/languages/top/Jardel-Nathan/Gobarber-Rocketseat?style=flat-square)
  
  
</div>

<hr/>
<br/>

<div style="display:flex">
<div style="width:50%" >
<p align="center">
<br><br>
 <img title="Typescript" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-plain.svg" alt="typescript" width="60" height="60" style="padding:10px"/><img title="react" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" alt="react" width="60" height="60" style="padding:10px"/><img title="nodejs" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-plain.svg" alt="nodejs" width="60" height="60" style="padding:10px"/><img title="express" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg" alt="express" width="60" height="60" style="padding:10px"/><br/><img title="postgresql" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" alt="postgresql" width="60" height="60" style="padding:10px"/><img title="jest" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/jest/jest-plain.svg" alt="jest" width="60" height="60" style="padding:10px"/><img title="redis" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-plain.svg" alt="redis" width="60" height="60" style="padding:10px"/><img title="typeorm" src="https://avatars.githubusercontent.com/u/20165699?s=200&v=4" alt="typeorm" width="60" height="60" style="padding:10px"/><img title="mongodb" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="60" height="60" style="padding:10px"/>
</p>
</div>
 <div style="width:50% ">
<img src="https://gobarberjardev.s3.amazonaws.com/Screenshot+2022-04-02+212609.png" style="width:100%" />
</div>

</div>
<div>

## 💻 Getting started



<br>

### Requirements
- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/) or [npm](https://www.npmjs.com/)



**Clone the project and access the folder**

```bash
$ git clone https://github.com/Jardel-Nathan/Gobarber-Rocketseat.git
```

## First setup the API application

```bash
$ cd backend
```

**Install the dependencies**
```bash
$ yarn
```

**Run docker compose file**
```bash
# Install Postgresql - Redis - MongoDB
$ docker compose up
```

**Create .env file**
```bash
# Make a copy of '.env.example' to '.env'
# and set with YOUR environment variables.
$ cp .env.example .env
```

**Once the services are running, run the migrations**
```bash
$ yarn typeorm migration:run
```

**Start the server**
```bash
$ yarn dev:server
# Well done, project is started!
```

## Setup web client

```bash
$ cd frontend
```

**Install the dependencies**
```bash
$ yarn
```

**Start the aplication**
```bash
$ yarn start
```


</div>