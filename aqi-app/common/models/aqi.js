'use strict';
const fs = require('fs');

var path = require('path');

var dataFile = path.join(__dirname, '..', '..', 'local-data');

module.exports = function(Aqi) {

  // Aqi.current = function(callback){
  //   Aqi.getDataSource().connector.connect(function(error,database){
  //     var collection = database.collection('AQI');
  //     var max = 0;
  //     var response;
  //     var mostRecent = Object.keys(collection).reduce(function(a,b){
  //       return collection[a] > collection[b] ? a : b
  //     });
  //
  //     if(mostRecent){
  //       response = "yes";
  //     } else {
  //       response = "no";
  //     }
  //
  //     callback(null,response);
  // 	});
  // };

  Aqi.current = function(callback){
    fs.readFile(dataFile, 'utf8', (err,data) => {
      if (err) throw err;

      var dataset = JSON.parse(data);
      var max = 0;
      var mostRecent = Object.keys(dataset.models.aqi).reduce(function(a,b){
        return dataset[a] > dataset[b] ? a : b
      });


      console.log(dataset.models.aqi[mostRecent]);
      return callback(null, dataset.models.aqi[mostRecent]);
    })



  };



  Aqi.remoteMethod(
    'current',{
      http: {
        path: '/current',
        verb: 'get'
      },
      returns: {
        arg: 'current',
        type: 'string'
      }
    }
  );

};
