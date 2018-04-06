const ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
  const collection = db.collection('notes');
  const dbError = { "Error": "An error has occured." };
  
  // Create
  app.post('/notes', (req, res) => {
    const note = { title: req.body.title, body: req.body.body };
    collection.insert(note, (err, result) => {
      res.send((err) ? dbError : result.ops[0]);
    });
  });

  // Read
  app.get('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    collection.findOne(details, (err, item) => {
      res.send((err) ? dbError : item);
    });
  });

  // Update
  app.put('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = {'_id': new ObjectID(id) };
    const note = { title: req.body.title, body: req.body.body };
    collection.update(details, note, (err, result) => {
      res.send((err) ? dbError : note);
    });
  });

  // Delete
  app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { "_id": new ObjectID(id) };
    collection.remove(details, (err, item) => {
      res.send((err) ? dbError : "Note " + id + " has been deleted!");
    });
  });
};
