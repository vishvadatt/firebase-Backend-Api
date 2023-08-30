const router = require('express').Router();
const ctrl = require('../Controllers/user.controller');

const demoCtrl = require('../Controllers/realtime.controller');


router.route('/create-user').post(ctrl.addStudent);
router.route('/get-users').get(ctrl.getUsers);
router.route('/findone-user/:id').get(ctrl.findOneUsers);
router.route('/update-user/:id').put(ctrl.updateUser);
router.route('/delete-user/:id').delete(ctrl.deleteUser);


router.route('/create-demo').post(demoCtrl.createDemo);
router.route('/get-demos').get(demoCtrl.getDemoData);
router.route('/get-onedemo/:id').get(demoCtrl.getOneDemo);
router.route('/update-demo/:id').put(demoCtrl.updateDemo);
router.route('/remove-demo/:id').delete(demoCtrl.deleteDemo);



module.exports = router;