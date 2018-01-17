'use strict';

//list of truckers
//useful for ALL 5 exercises
var truckers = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'les-routiers-bretons',
  'pricePerKm': 0.05,
  'pricePerVolume': 5
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'geodis',
  'pricePerKm': 0.1,
  'pricePerVolume': 8.5
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'xpo',
  'pricePerKm': 0.10,
  'pricePerVolume': 10
}];

//list of current shippings
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var deliveries = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'shipper': 'bio-gourmet',
  'truckerId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'distance': 100,
  'volume': 4,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury' : 0,
    'convargo': 0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'shipper': 'librairie-lu-cie',
  'truckerId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'distance': 650,
  'volume': 12,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury' : 0,
    'convargo': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'shipper': 'otacos',
  'truckerId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'distance': 1250,
  'volume': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury' : 0,
    'convargo': 0
  }
}];

//list of actors for payment
//useful from exercise 5
const actors = [{
  'deliveryId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}];



// Exercice 1

function calculshippingprice (){
  for (var i=0; i<truckers.length;i++){
    for (var j=0; j<deliveries.length;j++){
      if (truckers[i].id == deliveries[j].truckerId){
        var shipping_price = (deliveries[j].distance * truckers[i].pricePerKm) + (deliveries[j].volume * truckers[i].pricePerVolume);
        deliveries[j].price = shipping_price;
      }
    }
  }
};
//calculshippingprice();

// Exercise 2

function calculshippingprice (){
  for (var i=0; i<truckers.length;i++){
    for (var j=0; j<deliveries.length;j++){
      if (truckers[i].id == deliveries[j].truckerId){
        var shipping_price = (deliveries[j].distance * truckers[i].pricePerKm) + (deliveries[j].volume * truckers[i].pricePerVolume);
          if (deliveries[j].volume>=5 && deliveries[j].volume<10 ){
            shipping_price = shipping_price - (shipping_price*10/100);
          } else if (deliveries[j].volume>=10 && deliveries[j].volume<25){
            shipping_price = shipping_price - (shipping_price*30/100);
          } else if (deliveries[j].volume>=25){
            shipping_price = shipping_price - (shipping_price*50/100);
          }
        deliveries[j].price = shipping_price;

      }
    }
  }
};
//calculshippingprice();

//Exercice 3

function calculshippingprice (){
  for (var i=0; i<truckers.length;i++){
    for (var j=0; j<deliveries.length;j++){
      if (truckers[i].id == deliveries[j].truckerId){
        var shipping_price = (deliveries[j].distance * truckers[i].pricePerKm) + (deliveries[j].volume * truckers[i].pricePerVolume);
          if (deliveries[j].volume>=5 && deliveries[j].volume<10 ){
            shipping_price = shipping_price - (shipping_price*10/100);
          } else if (deliveries[j].volume>=10 && deliveries[j].volume<25){
            shipping_price = shipping_price - (shipping_price*30/100);
          } else if (deliveries[j].volume>=25){
            shipping_price = shipping_price - (shipping_price*50/100);
          }
        deliveries[j].price = shipping_price;
        var newcommission = shipping_price*30/100;
        deliveries[j].commission.insurance = newcommission /2;

        var newdistance = deliveries[j].distance;
        while (newdistance>500){
          deliveries[j].commission.treasury=deliveries[j].commission.treasury+1;
          newdistance = newdistance - 500;
        }
        deliveries[j].commission.convargo = newcommission - deliveries[j].commission.insurance - deliveries[j].commission.treasury;
      }
    }
  }
};
calculshippingprice();

// Ex
console.log(truckers);
console.log(deliveries);
console.log(actors);
