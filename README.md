# Crazee Burger (version Typescript en solo)

## 1. Pour installer le projet

```
yarn install
```

## 2. Pour connecter le projet au backend firebase, créer le fichier .env à la racine du projet avec les valeurs de ta base de données Firestore existante :

Si projet initilisé avec CRA (create-react-app) :

```
REACT_APP_API_KEY=
REACT_APP_AUTH_DOMAIN=
REACT_APP_PROJECT_ID=
REACT_APP_STORAGE_BUCKET=
REACT_APP_MESSAGING_SENDER_ID=
REACT_APP_APP_ID=
```

firebase-config.js > ces variables d'environnement seront consommés via process.env.REACT_APP_API_KEY

Si projet initilisé avec Vite.JS :

```
VITE_APP_API_KEY = ???
VITE_APP_AUTH_DOMAIN = ???
VITE_APP_PROJECT_ID = ???
VITE_APP_STORAGE_BUCKET = ???
VITE_APP_MESSAGING_SENDER_ID = ???
VITE_APP_APP_ID = ???
```

firebase-config.js > ces variables d'environnement seront consommés via import.meta.env.VITE_APP_API_KEY

P.S. Sans ça, tu ne pourras pas accéder à la page de commande avec les bonnes valeurs du compte client. Tu seras bloqué à la page de Login.

## 3. Pour lancer le projet :

```
yarn dev
```
