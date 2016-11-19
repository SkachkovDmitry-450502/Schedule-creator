import ObjectDB from '../db/objectDB';

export default class Obj {

    constructor(object){
        this.object = object;
    }

    save() {
        return new Promise((resolve, reject) => {
            this._checkExist()
                .then(isExist => {
                    isExist ? resolve(false) : resolve(ObjectDB.insert(this.object));
                })
                .catch(error => reject(error));
        });
    }

    static get(email, name) {
        return new Promise((resolve, reject) => {
            ObjectDB.getObjects(email, name)
                .then(
                    objects => resolve(objects),
                    error => reject(error)
                );
        });
    }

    _checkExist() {
        return new Promise((resovle, reject) => {
            ObjectDB.get(this.object)
                .then(
                    info => resolve(!!info),
                    error => reject(error)
                );
        });
    }
}

//
// exports.saveObject = function (object, saveObjectCallback) {
//     async.waterfall([
//         async.apply(objectDB.getByName, object['email'], object['scheduleName'], object['name']),
//         addParametersInformation,
//         function (scheduleObjects, callback) {
//             if (scheduleObjects.length > 0) {
//                 checkEqualParameters(scheduleObjects, object, callback);
//             } else {
//                 callback(null, false);
//             }
//         },
//         function (isEqualParameters, callback) {
//             if (isEqualParameters) {
//                 callback(null, false);
//             } else {
//                 async.waterfall([
//                     async.apply(objectDB.insert, object),
//                     async.apply(saveParameters, object['parameters'])
//                 ], callback);
//             }
//         }
//     ], saveObjectCallback);
// };
//
// function saveParameters(parameters, idObject, callback) {
//     console.log(idObject, parameters);
//     async.eachOf(parameters, function (value, key, callback) {
//         console.log(idObject, value, key);
//         parameterDB.insert(idObject, value, key, callback);
//     }, function (err) {
//         if (err) {
//             callback(err);
//         } else {
//             callback(null, true);
//         }
//     });
// }