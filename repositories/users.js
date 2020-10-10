const fs = require('fs');
const crypto = require('crypto');
const util = require('util');
const scrypt = util.promisify(crypto.scrypt);
const Repository = require('./repository');

class UsersRepository extends Repository {

    async create(attrs) {
        attrs.id = this.randomId();

        // HASH + SALT PASSWORD METHOD

        const salt = crypto.randomBytes(8).toString('hex');
        const buf = await scrypt(attrs.password,salt, 64);

        const records = await this.getAll();
        const record = {
            ...attrs,
            password: `${buf.toString('hex')}.${salt}`
        }

        records.push(record);
        await this.writeAll(records);   
        return record;
    };

    async comparePasswords(saved,supplied) {
        // saved -> password saved in our database.
        // supplied -> password given to us by user trying to sign in 
        const [hashed, salt] = saved.split('.');
        const hashedSuppliedBuf = await scrypt(supplied,salt,64);
        return hashed === hashedSuppliedBuf.toString('hex');
    };
};

// const test = async () => {
//     const repo = new UsersRepository('users.json');
//     repo.create({email:'test@hotmail.com',password: 'password'});
//     const users = await repo.getAll();
//     console.log(users);
//     const user = await repo.getOne('e5d31a2c');
//     console.log(user)
//     await repo.delete("e5d31a2c");
//     await repo.update('1015facd',{superpower:'invisible',name:'stephen'});
//     const user = await repo.getOneby({email:"test@hotmail.com"});
//     console.log(user);

// }
// test();

module.exports = new UsersRepository('users.json');

//ANOTHER FILE ...
// const repo = require('./users');
// repo.getOne();
// repo.getAll();
// .....