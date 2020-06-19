const Owner = require('../models/owner.model.js');
const Note = require('../models/note.model.js');

exports.create = (req, res) => {
 
    if (!req.body.name) {
        return res.status(400).send({
            message: "Owner name can not be empty"
        });
    }


    const owner = new Owner({
        name: req.body.name,
        lastName: req.body.lastName
    });


    owner.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message 
            });
        });
};


exports.findAll = (req, res) => {
    Owner.find()
        .then(owners => {
            res.send(owners);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};


exports.findOne = (req, res) => {
    Owner.findById(req.params.ownerId)
        .then(owner => {
            if (!owner) {
                return res.status(404).send({
                    message: "Owner not found with id " + req.params.ownerId
                });
            }
            res.send(owner);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Owner not found with id " + req.params.ownerId
                });
            }
            return res.status(500).send({
                message: "Error retrieving owner with id " + req.params.ownerId
            });
        });
};


exports.update = (req, res) => {

    if (!req.body.name) {
        return res.status(400).send({
            message: "Owner name can not be empty"
        });
    }

    Owner.findByIdAndUpdate(req.params.ownerId, {
        name: req.body.name,
        lastName: req.body.lastName
    }, { new: true })
        .then(owner => {
            if (!owner) {
                return res.status(404).send({
                    message: "Owner not found with id " + req.params.ownerId
                });
            }
            res.send(owner);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Owner not found with id " + req.params.ownerId
                });
            }
            return res.status(500).send({
                message: "Error updating owner with id " + req.params.ownerId
            });
        });
};


exports.delete = (req, res) => {
    Owner.findByIdAndRemove(req.params.ownerId)
        .then(owner => {
            if (!owner) {
                return res.status(404).send({
                    message: "Owner not found with id " + req.params.ownerId
                });
            }
            res.send({ message: "Owner deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Owner not found with id " + req.params.ownerId
                });
            }
            return res.status(500).send({
                message: "Could not delete owner with id " + req.params.ownerId
            });
        });
};

exports.findAllTaskForOwner = async (req, res) => {
    await Owner.findById(req.params.ownerId)
    .catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Owner not found with id " + req.params.ownerId
            });
        }
        return res.status(500).send({
            message: "Error retrieving owner with id " + req.params.ownerId
        });
    });


    await Note.find({ownerId: req.params.ownerId})
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};