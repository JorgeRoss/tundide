let express = require('express');
let mongoose = require('mongoose');
let router = express.Router();
let Appointment = require('../../models/appointment');
let shortid = require('shortid');
let session = require('../auth/session');
let appointmentResponse = require('../../config/response').appointment;
let httpstatus = require('../../config/response').httpstatus;
let Response = require('../shared/response.js');
let Email = require('../../lib/Message/Email.js');

/**
 * @api {post} / Save appointment
 * @apiName saveappointment
 * @apiGroup Appointment
 * 
 * @apiExample {json} Service Example
 * {
 *     "description": "Ejemplo de cita",
 *     "endDate": "2017-10-24T03:17:53.548Z",
 *     "startDate": "2017-10-24T02:17:53.548Z"
 * }
 * 
 * @apiSuccessExample {json} Success
 * HTTP/1.1 201 Created
 * 
 * {
 *     "data": {
 *         "__v": 0,
 *         "_id": "59eea2ddbb9bfb2cd4649bc4",
 *         "description": "Ejemplo de cita",
 *         "endDate": "2017-10-24T03:17:53.548Z",
 *         "shortId": "AP-ByUymm2TZ",
 *         "startDate": "2017-10-24T02:17:53.548Z",
 *         "status": 1,
 *         "user": "59851a6a12693920c86416ac"
 *     },
 *     "message": "Cita creada correctamente"
 * }
 * 
 * @apiErrorExample {json} Error
 * HTTP/1.1 500 Internal Server Error
 *
 * {
 *   "code": 3501,
 *   "error": "Mongoose error",
 *   "message": "Ocurrio un error de conexion con la base de datos"
 * }
 * 
 */
router.post('/', session.authorize(), function(req, res) {
    let app = new Appointment();
    app.subsidiary = req.body.subsidiary;
    app.user = req.user._id;
    app.client = req.body.contact;
    app.description = req.body.description;
    app.startDate = req.body.startDate;
    app.endDate = req.body.endDate;
    app.shortId = 'AP-' + shortid.generate();



    app.save().then(function(doc) {
            Appointment.populate(doc, [{ path: "client" }, { path: "subsidiary" }], function(err, appointment) {
                Email.appointmentNew({
                    id: doc._id.toString(),
                    contact: appointment.client.firstName + ' ' + appointment.client.lastName,
                    to: appointment.client.contact.email,
                    start: appointment.startDate,
                    end: appointment.endDate,
                    title: 'Usted tiene un turno asignado',
                    description: 'Turno Asignado',
                    location: appointment.subsidiary.description,
                    url: 'www.tundide.com'
                });
            });
            res.status(httpstatus.successcreated).json(
                new Response(appointmentResponse.successcreated.appointmentSuccessfully, doc)
            );
        },
        function(err) {
            res.status(httpstatus.internalservererror).json(
                new Response(appointmentResponse.internalservererror.database, err)
            );
        });
});

/**
 * @api {patch} /:id Update appointment
 * @apiName updateappointment
 * @apiGroup Appointment
 * @apiParam {string} id The id of the appointment
 * 
 * @apiExample {json} Service Example
 * {
 *     "_id": "59ee8f065c55242350fa5f42",
 *     "description": "Ejemplo de cita",
 *     "endDate": "2017-10-24T00:53:24.278Z",
 *     "startDate": "2017-10-23T23:53:24.278Z"
 * }
 * 
 * @apiSuccessExample {json} Success
 * HTTP/1.1 204 No Content
 * 
 * @apiErrorExample {json} Error
 * HTTP/1.1 500 Internal Server Error
 *
 * {
 *   "code": 3501,
 *   "error": "Mongoose error",
 *   "message": "Ocurrio un error de conexion con la base de datos"
 * }
 * 
 */
router.patch('/', session.authorize(), function(req, res) {
    let appointment = {
        endDate: Date.parse(req.body.endDate),
        startDate: Date.parse(req.body.startDate),
        description: req.body.description,
        status: 3 /*Approval pending*/ ,
        client: req.client._id,
        _id: req.body._id
    };

    Appointment.findOneAndUpdate({ _id: req.body._id }, appointment, { upsert: true }, function(err) {
        if (err) {
            res.status(httpstatus.internalservererror).json(
                new Response(appointmentResponse.internalservererror.database, err)
            );
        };

        return res.status(httpstatus.successnocontent).send();
    });
});

/**
 * @api {delete} /:id Delete appointment
 * @apiName deleteappointment
 * @apiGroup Appointment
 * @apiParam {string} id The id of the appointment
 * 
 * @apiSuccessExample {json} Success
 * HTTP/1.1 204 No Content
 * 
 * @apiErrorExample {json} Error
 * HTTP/1.1 500 Internal Server Error
 *
 * {
 *   "code": 3501,
 *   "error": "Mongoose error",
 *   "message": "Ocurrio un error de conexion con la base de datos"
 * }
 */
router.delete('/:id', session.authorize(), function(req, res) {
    let appointmentId = new mongoose.Types.ObjectId(req.params.id);

    Appointment.remove({ _id: appointmentId }, function(err) {
        if (err) {
            next(new Error('An unexpected error occurred'));
        };

        res.status(httpstatus.successcreated).send();
    });
});

/**
 * @api {get} /list List appointments
 * @apiName getappointments
 * @apiGroup Appointment
 * 
 * @apiSuccessExample {json} Success with result
 * HTTP/1.1 200 OK
 * 
 * {
 *     "data": [
 *         {
 *             "__v": 0,
 *             "_id": "59ee8f065c55242350fa5f42",
 *             "description": "Ejemplo de cita",
 *             "endDate": "2017-10-24T01:53:24.278Z",
 *             "shortId": "AP-BkA-yG2TW",
 *             "startDate": "2017-10-24T00:53:24.278Z",
 *             "status": 1,
 *             "user": "59851a6a12693920c86416ac"
 *         }
 *     ],
 *     "message": "Cita recuperada correctamente",
 * }
 *
 * @apiSuccessExample {json} Success without result
 * HTTP/1.1 204 No Content
 * 
 * @apiErrorExample {json} Error
 * HTTP/1.1 500 Internal Server Error
 *
 * {
 *   "code": 3501,
 *   "error": "Mongoose error",
 *   "message": "Ocurrio un error de conexion con la base de datos"
 * }
 */
router.get('/list', session.authorize(), function(req, res) {
    Appointment.find({ user: req.user._id }, function(err, appointments) {
        if (err) {
            next(new Error('An unexpected error occurred'));
        };
        if (appointments.length > 0) {
            return res.status(httpstatus.success).json(appointments);
        } else {
            return res.status(httpstatus.nocontent).send();
        }
    });
});

module.exports = router;