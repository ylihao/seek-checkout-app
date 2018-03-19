const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

app.use(express.static( __dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// ad prices
const price = { classic: 269.99, standout: 322.99, premium: 394.99, standout_apple: 299.99, premium_nike: 379.99, standout_ford: 309.99, premium_ford: 389.99 };

function get_adtype_breakdown(adtypes) {
  let breakdown = { classic: 0, standout: 0, premium: 0 };

  for (i in adtypes) {
      breakdown[adtypes[i]]++;
  }

  return breakdown;
}

function get_default_total(adtypes) {
  let breakdown = get_adtype_breakdown(adtypes);
  return (breakdown.classic * price.classic) + (breakdown.standout * price.standout) + (breakdown.premium * price.premium);
}

// Gets a 3 for 2 deals on Classic Ads
function get_unilever_total(adtypes) {
  let breakdown = get_adtype_breakdown(adtypes);
  
  if (breakdown.classic > 0) {
    breakdown.classic = (Math.floor(breakdown.classic / 3) * 2) + (breakdown.classic % 3);
  }

  return (breakdown.classic * price.classic) + (breakdown.standout * price.standout) + (breakdown.premium * price.premium);
}

// Gets a discount on Standout Ads where the price drops to $299.99 per ad
function get_apple_total(adtypes) {
  let breakdown = get_adtype_breakdown(adtypes);
  return (breakdown.classic * price.classic) + (breakdown.standout * price.standout_apple) + (breakdown.premium * price.premium);
}

// Gets a discount on Premium Ads where 4 or more are purchased. The price drops to $379.99 per ad
function get_nike_total(adtypes) {
  let breakdown = get_adtype_breakdown(adtypes);

  if (breakdown.premium >= 4)
    return (breakdown.classic * price.classic) + (breakdown.standout * price.standout) + (breakdown.premium * price.premium_nike);
  else 
    return (breakdown.classic * price.classic) + (breakdown.standout * price.standout) + (breakdown.premium * price.premium);
}

// Gets a 5 for 4 deal on Classic Ads
// Gets a discount on Standout Ads where the price drops to $309.99 per ad
// Gets a discount on Premium Ads when 3 or more are purchased. The price drops to $389.99 per ad
function get_ford_total(adtypes) {
  let breakdown = get_adtype_breakdown(adtypes);
  let total = 0;

  if (breakdown.classic > 0) {
    breakdown.classic = (Math.floor(breakdown.classic / 5) * 4) + (breakdown.classic % 5);
  }

  total += breakdown.classic * price.classic;
  total += breakdown.standout * price.standout_ford;

  if (breakdown.premium >= 3) 
    total += breakdown.premium * price.premium_ford;
  else 
    total += breakdown.premium * price.premium;

  return total;
}

function get_total(customer, adtypes) {
  switch(customer) {
    case 'Unilever':
      return get_unilever_total(adtypes);
    case 'Apple':
      return get_apple_total(adtypes);
    case 'Nike':
      return get_nike_total(adtypes);
    case 'Ford':
      return get_ford_total(adtypes);
    default:
      return get_default_total(adtypes);
  }
}

app.get('/', function (req, res) {
  res.render('index', { total: "Select customer and ad type…", error: null });
});

app.post('/', function (req, res) {

  // console.log(req.body);

  let customer = req.body.customer;
  let adtypes = req.body.adtype;
  let adtypes_text = '';

  for (var i in adtypes) {
    adtypes_text += adtypes[i];
    if (i < Object.keys(adtypes).length - 1)
      adtypes_text += ', ';
  }

  let total = get_total(customer, adtypes);
  total = total.toFixed(2);
  let output_text = `<b>Customer:</b> ${customer}<br><b>Items:</b> ${adtypes_text}<br><b>Total:</b> $${total}`;
  res.render('index', { total: output_text, error: null });
  
});

app.listen(3000, function () {
  console.log(`SEEK Jobs Ad Checkout app listening on port 3000. Open 'http://localhost:3000/' on your web browser.`);
});
