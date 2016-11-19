// import UserDB from '../db/userDB';
// import Factory from './factory';
//
// class DatabaseFactory extends Factory{
//     create(name){
//         return new Promise((resolve, reject) => {
//             let constructor = this[name];
//             if(!(constructor instanceof Function)){
//                 reject(new Error("there's no constructor for such key"));
//             }
//             resolve(new constructor());
//         });
//     }
// }
//
// let databaseFactory = new DatabaseFactory();
// databaseFactory.register('userDB', UserDB);
// export {databaseFactory};