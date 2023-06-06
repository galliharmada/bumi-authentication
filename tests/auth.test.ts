import request from 'supertest';
import app from '../server'

describe('Authentication', () => {
    it('Register new user', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                username : 'email2',
                email : 'email2@gmail.com',
                password : 'Password123'
            })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('message', 'User created successfully')
    })

    it('Login using JWT token', async() => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email : 'emailku@gmail.com',
                password : 'Password123'
            })
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('token')

    });
})