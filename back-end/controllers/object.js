import ObjectDB from '../db/objectDB';
import PropertyDB from '../db/propertyDB';

export default class Obj {

    constructor(info) {
        this.properties = info.properties;
        delete info.properties;
        this.info = info;
    }

    static get(info) {
        return new Promise((resolve, reject) => {
            ObjectDB.get(info.email, info.name)
                .then(objects => {
                    objects.length > 0 ? resolve(Promise.all(objects.map(Obj._addProperties))) : resolve([]);
                })
                .catch(error => reject(error));
        });
    }

    static _addProperties(object) {
        return new Promise((resolve, reject) => {
            PropertyDB.get(object.idObject)
                .then(properties => {
                    console.log(properties);
                    object.properties = properties;
                    resolve(object);
                })
                .catch(error => reject(error));
        });
    }

    save() {
        return new Promise((resolve, reject) => {
            this._checkExist()
                .then(isExist => {
                    isExist ? resolve(false) : resolve(this._insert());
                })
                .catch(error => reject(error));
        });
    }

    _insert() {
        return new Promise((resolve, reject) => {
            ObjectDB.insert(this.info)
                .then(idObject => {
                    resolve(Promise.all(this.properties.map(function (item) {
                        item.idObject = idObject;
                        return PropertyDB.insert(item);
                    })));
                })
                .catch(error => reject(error));
        });
    }

    _checkExist() {
        return new Promise((resolve, reject) => {
            this._getByName()
                .then(objects => {
                    console.log(objects);
                    objects.length > 0 ? resolve(this._checkEqualProperties(objects)) : resolve(false);
                })
                .catch(error => reject(error));
        });
    }

    _getByName() {
        return new Promise((resolve, reject) => {
            ObjectDB.getByName(this.info)
                .then(objects => {
                    objects.length > 0 ? resolve(Promise.all(objects.map(Obj._addProperties))) : resolve([]);
                })
                .catch(error => reject(error));
        });
    }

    _checkEqualProperties(objectArray) {
        return new Promise((resolve, reject) => {
            let properties = this.properties;
            objectArray.forEach(function (object) {
                console.log(object);
                if (object.properties.length != properties.length) {
                    return false;
                }
                if (object.properties.every(function (item) {
                        return properties.some(function (property) {
                            return property.name == item.name && property.value == item.value;
                        });
                    })) {
                    resolve(object.idObject);
                }
            });
            resolve(false);
        });
        // //TODO need return idObject
        // return new Promise((resolve, reject) => {
        //     let properties = this.properties;
        //     let idObject;
        //     if ((objectArray.some(function (object) {
        //             if (object.properties.length != properties.length) {
        //                 return false;
        //             }
        //             object.properties.every(function (item) {
        //                 return properties.some(function (property) {
        //                     idObject = object.idObject;
        //                     return property.name == item.name && property.value == item.value;
        //                 })
        //             });
        //         }))) {
        //         resolve(idObject);
        //     } else {
        //         resolve(false);
        //     }
        // })
    }

    delete() {
        return new Promise((resolve, reject) => {
            this._checkExist()
                .then(idObject => {
                    console.log(idObject);
                    idObject ? resolve(ObjectDB.delete(idObject)) : resolve(false);
                })
                .catch(error => reject(error));
        });
    }
}