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
    'deductibleReduction': false,
    'deductibleamount': 0
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
    'deductibleReduction': true,
    'deductibleamount': 0
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
    'deductibleReduction': true,
    'deductibleamount': 0
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
  'deliveryId': '65203b0a-a864-4dea-81e2-e389515752a8',
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
  'deliveryId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
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



function calculshippingprice (){
  for (var i=0; i<truckers.length;i++){
    for (var j=0; j<deliveries.length;j++){
      if (truckers[i].id == deliveries[j].truckerId){
        reduction(i,j);
        shippingprice(i,j);
        commission(i,j);
        deductible(i,j);
        billactors(i);
      }
    }
  }
};

function reduction(i,j){
  if (deliveries[j].volume>=5 && deliveries[j].volume<10 ){
    truckers[i].pricePerKm = truckers[i].pricePerKm - (truckers[i].pricePerKm*10/100);
  } else if (deliveries[j].volume>=10 && deliveries[j].volume<25){
    truckers[i].pricePerKm = truckers[i].pricePerKm - (truckers[i].pricePerKm*30/100);
  } else if (deliveries[j].volume>=25){
    truckers[i].pricePerKm = truckers[i].pricePerKm - (truckers[i].pricePerKm*50/100);
  }
};

function shippingprice(i,j){
  var shipping_price = (deliveries[j].distance * truckers[i].pricePerKm) + (deliveries[j].volume * truckers[i].pricePerVolume);
  deliveries[j].price = shipping_price;
};

function commission(i,j){
  var newcommission = deliveries[j].price*30/100;
  deliveries[j].commission.insurance = newcommission /2;
  var newdistance = deliveries[j].distance;
  while (newdistance>500){
    deliveries[j].commission.treasury=deliveries[j].commission.treasury+1;
    newdistance = newdistance - 500;
  }
  deliveries[j].commission.convargo = newcommission - deliveries[j].commission.insurance - deliveries[j].commission.treasury;
};

function deductible(i,j){
    if(deliveries[j].options.deductibleReduction==true){
      deliveries[j].options.deductibleamount=200;
      deliveries[j].price=deliveries[i].price+deliveries[j].options.deductibleamount;
      deliveries[j].commission.convargo= deliveries[j].commission.convargo + deliveries[j].volume;
    }else{
      deliveries[j].options.deductibleamount=1000;
      deliveries[j].price=deliveries[j].price+deliveries[j].options.deductibleamount;
    }
};

function billactors(i){
    for(var j=0;j<actors.length;j++){
      if (deliveries[i].id==actors[j].deliveryId){
        for (var k=0; k<actors[j].payment.length;k++){
          if(actors[j].payment[k].who=="shipper"){
            actors[j].payment[k].amount=deliveries[i].price;
          }else if (actors[j].payment[k].who=="owner"){
            actors[j].payment[k].amount = deliveries[i].price - deliveries[i].price*30/100;
          }else if (actors[j].payment[k].who=="treasury"){
            actors[j].payment[k].amount = deliveries[i].commission.treasury;
          }else if (actors[j].payment[k].who=="insurance"){
            actors[j].payment[k].amount = deliveries[i].commission.insurance;
          }else if (actors[j].payment[k].who=="convargo"){
            actors[j].payment[k].amount = deliveries[i].commission.convargo;
          }
        }
      }
    }
}


calculshippingprice();
// Ex
console.log(truckers);
console.log(deliveries);
console.log(actors);
