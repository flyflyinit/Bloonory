# Documentation

## Folder Hierarchy

```
Bloonory/
│
├── config/
│   ├── database_client.js
│   ├── database_pool.js
│   └── moments.js
│
├── DOCUMENTATION.md
├── .env
│
├── models/
│   ├── comments.js
│   ├── hospital.js
│   └── user.js
│
├── node_modules/
│   └── ...
│
├── package.json
├── package-lock.json
│
├── public/
│   └── assets/
│       └── styles.css
│
├── README.md
│
├── script/
│   ├── sql/
│   │   ├── create.sql
│   │   ├── delete.sql
│   │   └── insert.sql
│   └── js/
│       └── form_validation.js
│
├── server.js
│
└── views/
    └── pages/
        ├── about_us.ejs
        ├── beneficiary.ejs
        ├── comments.ejs
        ├── create_acount.ejs
        ├── donator.ejs
        ├── faq.ejs
        ├── footer.ejs
        ├── head.ejs
        ├── header.ejs
        ├── index.ejs
        ├── login.ejs
        └── partners.ejs
```

## Lancer le serveur 

Pour lancer le serveur utiliser la commande:
```sh
nodemon server.js
```

## Commande pour télécharger toutes les librairies nécessaire pour le projet

Commande à exécuter si les fichiers `package.json` et `package-lock.json` sont crées:
```sh
npm i
```

## Commande utilisées pour init le projet

Permet d'initialiser le projet:
```sh
npm init
```

Permet d'ajouter express au projet:
```sh
npm i --save express
```

Permet d'ajouter nodemon au projet pour lancer rapidement le serveur:
```sh
npm i --save nodemon
```

Permet d'ajouter EJS au projet:
```sh
npm i --save ejs
```

Permet d'ajouter node-postgreSQL au projet:
```sh
npm i --save pg
```

Permet d'ajouter express-session au projet:
```sh
npm i --save express-session
```

Permet d'ajouter dotenv au projet:
```sh
npm i --save dotenv
```

Permet d'ajouter bcryptjs au projet:
```sh
npm i --save bcryptjs
```

Permet d'ajouter connect-pg-simple au projet:
```sh
npm i --save connect-pg-simple
```

Permet d'ajouter moment au projet:
```sh
npm i --save moment
```
