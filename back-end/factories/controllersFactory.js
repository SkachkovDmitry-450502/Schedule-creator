import User from '../controllers/user';
import Schedule from '../controllers/schedule';
import Obj from '../controllers/object';

export default class ControllersFactory {
    // create(name, object) {
    //     let constructor = this[name];
    //     if (!(constructor instanceof Function)) {
    //         throw {
    //             name: 'Error',
    //             message: 'constructor "' + name + '" undefined'
    //         }
    //     }
    //     return new constructor(object);
    // }

    static create(name, object) {
        switch (name) {
            case 'schedule':
                return new Schedule(object);
            case 'object':
                return new Obj(object);
            case 'user':
                return new User(object);
            default:

        }
    }
}
