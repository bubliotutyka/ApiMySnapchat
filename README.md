# ApiMySnapchat

Pour démarrer l'api (dossier: ./Api):
- 1: installer les dépendances: "npm i"
- 2: lancer l'application: "npm run start"

### DOC API:

#### POST /api/user/login
```
Request:
  Header: {
            "Content-Type": "application/json"
          }
                  
  Body: {
          "email": "example@test.fr",
          "password": "***"
        }
      
Response:
  OK: {
        "token"
      }
      
  KO: {
        "error"
      }
```

#### POST /api/user
```
Request:
  Header: {
            "Content-Type": "application/json"
          }
                  
  Body: {
          "email": "example@test.fr",
          "username": "example"
          "password": "***",
          "cpassword": "***"
        }
      
Response:
  OK: {
        "result": true
      }
      
  KO: {
        "result": false,
        "error"
      }
```

#### GET /api/user/verify
```
Request:
  Header: {
            "token": "token string"
          }
      
Response:
  OK: {
        "result": true
      }
      
  KO: {
        "result": false,
      }
```

#### GET /api/user
```
Request:
  Header: {
            "token": "token string"
          }
      
Response:
  OK: [
        {
          "_id",
          "username",
          "email"
        },
        ...
      ]
      
  KO: {
        "error"
      }
```

#### GET /api/user/:id
```
Request:
  Header: {
            "token": "token string"
          }
      
Response:
  OK: {
        "_id",
        "username",
        "email"
      }
      
  KO: {
        "error"
      }
```

#### POST /api/snap
```
Request:
  Header: {
            "Content-Type": "multipart/form-data",
            "token": "token string"
          }
          
Body: {
        "to": "example",
        "duration: 42,
        "image": imagesFile
      }
      
Response:
  OK: {
        "result": true
      }

      
  KO: {
        "result": false,
        "error"
      }
```

#### GET /api/snap
```
Request:
  Header: {
            "Content-Type": "application/json",
            "token": "token string"
          }
      
Response:
  OK: [
        {
          "_id",
          "from",
          "duration",
          "url"
        },
        ...
      ]

      
  KO: {
        "error"
      }
```

#### GET /api/snap/:id
```
Request:
  Header: {
            "token": "token string"
          }
      
Response:
  OK
```

#### DELETE /api/snap/:id
```
Request:
  Header: {
            "token": "token string"
          }
      
Response:
  OK: {
        "result": true
      }

      
  KO: {
        "result": false,
      }
```
