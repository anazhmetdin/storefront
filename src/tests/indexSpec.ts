import supertest from 'supertest'
import { app } from '../server'

const request = supertest(app)

describe('Test endpoint responses', () => {
    it('gets the api endpoint', async () => {
        const response = await request.get('/')
        expect(response.status).toEqual(200)
    })
})
