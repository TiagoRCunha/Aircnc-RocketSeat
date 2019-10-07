const express = require('express');

const multer = require('multer');
const uploadConfig = require('./config/upload');

const SessionController = require('./Controller/SessionController');
const SpotController = require('./Controller/SpotController');
const DashboardController = require('./Controller/DashboardController');
const BookingController = require('./Controller/BookingController');
const ApprovalController = require('./Controller/ApprovalController');
const RejectionController = require('./Controller/RejectionController');

const routes = express();
const upload = multer(uploadConfig);

routes.post('/sessions', SessionController.store );

routes.get('/spots', SpotController.index );
routes.post('/spots', upload.single('thumbnail'), SpotController.store );
routes.get('/dashboard', DashboardController.show );

routes.post('/spots/:spot_id/bookings', BookingController.store );

routes.post('/bookings/:booking_id/approvals', ApprovalController.store);

routes.post('/bookings/:booking_id/rejections', RejectionController.store);

module.exports = routes;