import ControllerFactory from '../factories/controllersFactory';
import Schedule from '../controllers/schedule';
import Obj from '../controllers/object';
import Parameter from '../controllers/parameter';
import Day from '../controllers/day';

import path from 'path';
import express from 'express';

const OK_STATUS = 200;
const FORBIDDEN_STATUS = 403;

let router = express.Router();

router.get('/', function (req, res, next) {
    res.sendFile(path.resolve(__dirname, '../../front-end/main/main.html'));
});

router.post('/save', function (req, res, next) {
    ControllerFactory.create(req.body.type, req.body.info)
        .then(controller => {
            return controller.save();
        })
        .then(isSaved => {
            isSaved ? res.sendStatus(OK_STATUS) : res.sendStatus(FORBIDDEN_STATUS);
        })
        .catch(error => {
            console.log(error);
            next(error)
        });
});

router.post('/delete', function (req, res, next) {
    console.log(req.body);
    ControllerFactory.create(req.body.type, req.body.info)
        .then(controller => {
            return controller.delete();
        })
        .then(isDeleted => {
            isDeleted ? res.sendStatus(OK_STATUS) : res.sendStatus(FORBIDDEN_STATUS);
        })
        .catch(error => {
            next(error)
        });
});

router.post('/update', function (req, res, next) {
    ControllerFactory.create(req.body.type, req.body.info)
        .then(controller => {
            return controller.update(req.body.newInfo);
        })
        .then(isUpdated => {
            console.log(isUpdated);
            isUpdated ? res.sendStatus(OK_STATUS) : res.sendStatus(FORBIDDEN_STATUS);
        })
        .catch(error => {console.log(error); next(error);});
});

router.post('/information', function (req, res, next) {
    if (req.body.type == 'names') {
        Schedule.getNames(req.body.info)
            .then(
                names => res.send(names),
                error => next(error));
    }

    if (req.body.type == 'schedule') {
        let tmp = {};
        console.log(req.body);
        Schedule.get(req.body.info)
            .then(schedule => {
                tmp = schedule;
                schedule.email = req.body.info.email;
                return Promise.all([
                    Day.get(schedule),
                    Parameter.get(schedule),
                    Obj.get(schedule)
                ]);
            })
            .then(result => {
                tmp.days = result[0];
                tmp.parameters = result[1];
                tmp.objects = result[2];
                res.send(tmp);
            })
            .catch(error => next(error));
    }
});

router.post('/generate', function (req, res, next) {

});

module.exports = router;