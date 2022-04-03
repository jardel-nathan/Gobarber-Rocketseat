# Gobarber-Rocketseat

<div align="center" >
<img align="center" src="https://gobarberjardev.s3.amazonaws.com/logo-gobarber.svg" alt="GoBarber Logo" width="300" />

  
</div>

<hr/>
<br/>


## 💻 Getting started

<br>

### Requirements
- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/) or [npm](https://www.npmjs.com/)

**Clone the project and access the folder**

```bash
$ git clone https://github.com/Jardel-Nathan/Gobarber-Rocketseat.git . && cd backend
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