import express    from 'express';
import User       from '../models/userModel';
import {getToken} from '../util';

const router = express.Router();
router.post('/signin', async (req, res) => {
    try {
        const signInUser = await User.findOne({
            email: req.body.email,
            password: req.body.password
        });

        console.log(signInUser);
        if (signInUser) {
            console.log(req.body);

            return res.status(200).json({
                _id: signInUser.id,
                name: signInUser.name,
                email: signInUser.email,
                isAdmin: signInUser.isAdmin,
                token: getToken(signInUser)
            });
        }

        return res.status(404).json({error: 'Email or Password is incorrect.'});

    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.post('/register', async (req, res) => {
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            isAdmin: false
        });

        const newUser = await user.save();
        if (newUser) {
            return res.status(200).json({
                _id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                isAdmin: newUser.isAdmin,
                token: getToken(newUser)
            });
        }

        return res.status(404).json({error: 'You entered incorrect data!'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }

});


router.get('/createadmin', async (req, res) => {
    try {
        const user = new User({
            name: 'Andrew',
            email: 'some@mail.ru',
            password: '123456',
            isAdmin: true
        });

        const newUser = await user.save();
        res.status(200).json({user: newUser});
    } catch (error) {
        res.status(500).json({error: error.message});
    }

});

export default router;