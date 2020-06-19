module.exports = (app) => {
    const owner = require('../controllers/owner.controller.js');

   
    app.post('/owner', owner.create);
    app.get('/owners', owner.findAll);
    app.get('/owner/:ownerId', owner.findOne);
    app.put('/owner/:ownerId', owner.update);
    app.delete('/owner/:ownerId', owner.delete);
    app.get('/findAllTaskForOwner/:ownerId', owner.findAllTaskForOwner)
}