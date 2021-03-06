const models = require('../../db/models');
const axios = require('axios');
const Promise = require('bluebird');
const bookshelf = require('../../db');
const throttledQueue = require('throttled-queue');

module.exports.getAll = (req, res) => {
  models.Folder
    .query('where', 'account_id', '=', req.session.accountId)
    .fetchAll()
    .then(folders => {
      if (folders.length === 0) {
        const getCount = folder => {
          axios
            .get(`https://api.nylas.com/messages?in=${folder.folder_id}&unread=true&view=count`, {
              headers: { Authorization: authString }
            })
            .then(response => {
              console.log(response.data);
              folder.count = response.data.count;
            });
        };
        const authString = 'Bearer ' + req.session.nylasToken;
        let arr = [];
        let colors = [ 'red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'
        ];

        axios.get('https://api.nylas.com/labels', {
            headers: { Authorization: authString }
          })
          .then(response => {
            for (var i = 0; i < response.data.length; i++) {
              response.data[i].color = colors[Math.floor(Math.random() * 12)];
              response.data[i].folder_id = response.data[i].id;
              delete response.data[i].id;
              delete response.data[i].object;
              delete response.data[i].name;
              arr.push(response.data[i]);
            }
          })
          .then(() => {
            let throttle = throttledQueue(3, 800);
            return Promise.each(arr, (folder, i) => {
              throttle(function() {
                getCount(folder);
              });
            }).then(() => {
              const Folders = bookshelf.Collection.extend({
                model: models.Folder
              });
              setTimeout(function() {
                folders = Folders.forge(arr);
                console.log(folders.models[0].attributes)
                return folders.invokeThen('save', null, { method: 'insert' });

              }, arr.length / 3 * 900);
            });
          })
          .catch(err => {
            res.send(err);
          });
      } else {
        return folders;
      }
    }).catch(err => {
    console.log(`Error retrieving folders for account ${req.session.accountId}!`);
    res.status(404).send('Message retrieval failed.');
  
  }).then(folders => {
    console.log(`Folders successfully retrieved for account ${req.session.accountId}. Rerouting!`);
    res.status(200).send(folders);// render to the page
  });
};

module.exports.filter = (req, res) => {
  const authString = 'Bearer ' + req.session.nylasToken;
  axios.get(`https://api.nylas.com/messages?in=${req.params.id}&limit=50`, {
    headers: { Authorization: authString }
  }).then(response => {
    console.log(response.data)
    res.status(200).send(response.data);
  }).catch(err => {
    res.send(err);
  });
};

module.exports.create = (req, res) => {
  console.log('Inside Folders Controller create()', req.body);
};