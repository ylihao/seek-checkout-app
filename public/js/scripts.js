function add_adtype_group() {
  var i = document.querySelectorAll('.adtypes').length;

  var fs = document.createElement("FIELDSET");
  fs.className = "adtypes";

  // create classic radio button
  var legend = document.createElement("LEGEND");
  legend.innerHTML = "Item " + (i + 1);

  var classic_radio = document.createElement("INPUT");
  classic_radio.setAttribute("type", "radio");
  classic_radio.setAttribute("checked", "checkout");
  classic_radio.setAttribute("name", "adtype[" + i + "]");
  classic_radio.setAttribute("id", "classic" + i);
  classic_radio.setAttribute("value", "classic");

  var classic_label = document.createElement("label");
  classic_label.setAttribute("for", "classic" + i);
  classic_label.innerHTML = "Classic";

  // create standout radio button
  var standout_radio = document.createElement("INPUT");
  standout_radio.setAttribute("type", "radio");
  standout_radio.setAttribute("name", "adtype[" + i + "]");
  standout_radio.setAttribute("id", "standout" + i);
  standout_radio.setAttribute("value", "standout");

  var standout_label = document.createElement("label");
  standout_label.setAttribute("for", "standout" + i);
  standout_label.innerHTML = "Standout";

  // create premium radio button
  var premium_radio = document.createElement("INPUT");
  premium_radio.setAttribute("type", "radio");
  premium_radio.setAttribute("name", "adtype[" + i + "]");
  premium_radio.setAttribute("id", "premium" + i);
  premium_radio.setAttribute("value", "premium");

  var premium_label = document.createElement("label");
  premium_label.setAttribute("for", "premium" + i);
  premium_label.innerHTML = "Premium";

  fs.appendChild(legend);
  fs.appendChild(classic_radio);
  fs.appendChild(classic_label);
  fs.appendChild(standout_radio);
  fs.appendChild(standout_label);
  fs.appendChild(premium_radio);
  fs.appendChild(premium_label);

  var adtype_group = document.getElementById("adtype_group");
  adtype_group.appendChild(fs);
}