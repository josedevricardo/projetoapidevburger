import * as Yup from 'yup';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

class SessionController {
    async store(request, response){
      const schema = Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required(),
        });


        const isValid = await schema.isValid(request.body);

        const emailOrPasswordIncorrect = () => 
             response
            .status(401)
            .json({ error: 'Make sure your email or passord are corect'});

        

        if (!isValid) {
            return emailOrPasswordIncorrect();
        }

        const { email, password } = request.body;

        const user = await User.findOne({
            where: {
                email,
            },
        });

        if (!user) {
            return emailOrPasswordIncorrect();
        }

        const isSamePassword = await user.checkPassword(password);

        if (!isSamePassword) {
            return emailOrPasswordIncorrect();
        }

        
        // Here you might want to generate and return a token
        // const token = user.generateToken();

        return response.status(201).json({ 
            id: user.id, 
            name: user.name, 
            email, 
            admin: user.admin, 
            Token: jwt.sign( {id: user.id}, authConfig.secret, {
              expiresIn: authConfig.expiresIn,  
            })
        });
    }
}

export default new SessionController();