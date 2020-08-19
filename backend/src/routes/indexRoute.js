const { Router } = require('express');
const router = Router();

const User = require('../models/User');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) =>  res.send('Hello Word!'))

// cREACIÓN DE USUARIO
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    const newUser = new User({email, password});
    await newUser.save(); // Guarda el nuevo usuario

	const token = await jwt.sign({_id: newUser._id}, 'secretkey'); //Guarda el token
    res.status(200).json({token}); // Devuelve el token en formato json y con un estado 200
});

// LOGIN
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({email});
    if (!user) return res.status(401).send("The email doesn't exists");
    if (user.password !== password) return res.status(401).send('Wrong Password');

	const token = jwt.sign({_id: user._id}, 'secretkey');
    return res.status(200).json({token});
});

//ARREGLO DE TAREAS
router.get('/tasks', (req, res) => {
    res.json([
        {
            _id: '1',
            name: "task one",
            description: 'asdadasd',
            date: "2019-11-06T15:50:18.921Z"
        },
        {
            _id: '2',
            name: "task two",
            description: 'asdadasd',
            date: "2019-11-06T15:50:18.921Z"
        },
        {
            _id: '3',
            name: "task three",
            description: 'asdadasd',
            date: "2019-11-06T15:50:18.921Z"
        },
    ])
});

router.get('/private-tasks', verifyToken, (req, res) => {
    res.json([
        {
            _id: '4',
            name: "task four",
            description: 'privado zxda',
            date: "2019-11-06T15:50:18.921Z"
        },
        {
            _id: '5',
            name: "task five",
            description: 'hola bb',
            date: "2019-11-06T15:50:18.921Z"
        },
        {
            _id: '6',
            name: "task six",
            description: 'Sigue leyendo',
            date: "2019-11-06T15:50:18.921Z"
        },
    ])
});

// FUNCIÓN QUE VALIDA, SI EN LA CABECERA VIENE EL TOKEN DEL USUARIO LOGUEADO
async function verifyToken(req, res, next) {
	try {
		if (!req.headers.authorization) {
			return res.status(401).send('Unauhtorized Request');
		}
		let token = req.headers.authorization.split(' ')[1];
		if (token === 'null') {
			return res.status(401).send('Unauhtorized Request');
		}

		const payload = await jwt.verify(token, 'secretkey');
		if (!payload) {
			return res.status(401).send('Unauhtorized Request');
		}
		req.userId = payload._id;
		next();
	} catch(e) {
		//console.log(e)
		return res.status(401).send('Unauhtorized Request');
	}
}

module.exports = router;