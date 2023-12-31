const mysql = require('mysql');


// Connexion
const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})


// Register a new user

const createUser = (req, res) => {
    // Utilise req.body de body-parser
    const { email, password } = req.body;
    // Vérifier si les champs sont remplis
    if (!email || !password) {
        return res.status(400).json({
            error : 'Email ou mot de passe manquant',
        })
    }
    const query = 'INSERT INTO user (email, password) VALUES (?, ?)';
    conn.query(query, [email, password], (err) => {
        if (err) {
            console.error('Erreur lors de l\'insetion des données')
            res.status(500).json({error: 'Erreur lors de l\'insetion des données'});
        } else {
            res.status(200).json({ message: 'Utilisateur enregistré'});
        }
    }
    )
}


// get all users

const getAllUsers = (req, res) => {
const query = 'SELECT * FROM user';
conn.query(query, (err, result) => {
    if (err) {
        console.error("Erreur lors de la récupération des données :" + err);
        res.status(500).json({error : "Erreur lors de la récupération des données"});
    } else {
        res.status(200).json(result)
    } 
})
}

const getEmailUser = (req, res) => {
    const query = 'SELECT email FROM user';
    conn.query(query, (err,result) => {
        if (err) {
            console.error("Erreur lors de la récupération des données :" + err);
            res.status(500).json({error : "Erreur lors de la récupération des données"});
        } else {
            res.status(200).json(result)
        } 
    })
}

module.exports = {
    createUser, getAllUsers, getEmailUser,
}