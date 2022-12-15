import { User, UserList } from '../../models/users';
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()
const userList = new UserList()

describe("Users Model", () => {
  it('should have an index method', () => {
    expect(userList.index).toBeDefined();
  });

  it('should have a create method', () => {
    expect(userList.create).toBeDefined();
  });

  it('should have a show method', () => {
    expect(userList.show).toBeDefined();
  });

  it('create method should add a user', async () => {
    const result = await userList.create({
        id: -1,
        first_name: 'test',
        last_name: 'test',
        password_digest: 'password'
    });

    expect(result.id).toEqual(1);
    expect(result.first_name).toEqual('test');
    expect(result.last_name).toEqual('test');
    expect(bcrypt.compareSync('password'+(process.env.BCRYPT_PASSWORD as string), result.password_digest)).toEqual(true);
  });
  
  it('show method should returns the user', async () => {
    const result = await userList.show(1);

    expect(result.id).toEqual(1);
    expect(result.first_name).toEqual('test');
    expect(result.last_name).toEqual('test');
    expect(bcrypt.compareSync('password'+(process.env.BCRYPT_PASSWORD as string), result.password_digest)).toEqual(true);
  });

  it('index method should returns a list of all users without passwords', async () => {
    await userList.create({
        id: -1,
        first_name: 'test1',
        last_name: 'test1',
        password_digest: 'password1'
    });

    const result = await userList.index();

    expect(result.length).toEqual(2);
    expect(result[1].first_name).toEqual('test1');
    expect(result[0].password_digest).toBeUndefined();
  });
});