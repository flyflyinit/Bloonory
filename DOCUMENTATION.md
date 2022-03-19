# Documentation

## Folder Hierarchy

```
Bloonory/
│
├── config/
│   └── database.js
│
├── package.json
├── package-lock.json
│
├── public/
│   └── assets/
│       └── styles.css
│
├── node_modules/
│   └── ...
│
├── README.md
│
├── script/
│   └── sql/
│       ├── create.sql
│       ├── delete.sql
│       └── insert.sql
│
├── server.js
│
└── views/
    └── pages/
        ├── about_us.ejs
        ├── comments.ejs
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