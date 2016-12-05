import User from '../controllers/user';
import Schedule from '../controllers/schedule';
import Obj from '../controllers/object';
import Day from '../controllers/day';
import Parameter from '../controllers/parameter';

export default class ControllersFactory {

    static create(name, object) {
        return new Promise((resolve, reject) => {
            switch (name) {
                case 'object':
                    resolve(new Obj(object));
                    break;
                case 'parameter':
                    resolve(new Parameter(object));
                    break;
                case 'day':
                    resolve(new Day(object));
                    break;
                case 'schedule':
                    resolve(new Schedule(object));
                    break;
                case 'user':
                    resolve(new User(object));
                    break;
                default:
                    reject(new Error("no such constructor"));
            }
        });
    }
}
