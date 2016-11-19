import PropertyDB from '../db/propertyDB';

export default class Property {

    static get(objects) {
        if(objects.length == 0) {
            return Promise.resolve([]);
        } else {
            return Promise.all(objects.map(this._addParameters));
        }
    }

    static _addParameters(object) {
        return new Promise((resolve, reject) => {
            PropertyDB.get(object.idObject)
                .then(propeties => {
                    object.properties = propeties;
                    resolve(object);
                })
                .catch(error => reject(error));
        })
    }
}
