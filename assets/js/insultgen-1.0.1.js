fetch('./assets/js/json/dnd-racial-slurs.json')
  .then(response => response.json())
  .then(json => setSlurs(json));
fetch('./assets/js/json/insults.json')
  .then(response => response.json())
  .then(json => setInsults(json));

class Slurs {
  constructor(json) {
    this.race = "Generic Insult"
    this.list = {}
    for (var race in json) {
      race = json[race]
      if (race && 'title' in race){
        this.list[race.title] = race.list;
      } else if ('titles' in race) {
        for (var i in race.titles) {
          this.list[race.titles[i]] = race.list
        }
      }
    }
  }
  getSlur() {
    if (this.race in this.list) {
      return getRandomElem(this.list[this.race]);  
    } else {
      return null;
    }
  }
  setRace(race) {
    this.race = race;
  }
}

class Insults {
  constructor(json) {
    this.list = json;
  }
  getInsult(col) {
    return getRandomElem(this.list)[col];
  }
  getFirst2() {
    return this.getInsult(0) + ' ' + this.getInsult(1);
  }
  getFullInsult(lower=null) {
    var text = this.getFirst2() + ' ' + this.getInsult(2);
    if (lower !== null) {
      return text.toLowerCase();
    } else {
      return text;
    }
  }
}

function getRandomElem(list) {
  var idx = Math.floor(Math.random() * Math.floor(list.length));
  return list[idx];
}

var slurs = null;
var insults = null;
function setSlurs(json) {
  slurs = new Slurs(json);
  var keys = Object.keys(slurs.list)
  keys.sort();
  for (slur in keys) {
    slur = keys[slur];
    var race = $("<a></a>").text(slur);
    race.attr("href", "#");
    race.addClass('dropdown-item');
    race.attr("onclick", "setInsultRace('" + slur + "')");
    $('#race-menu').append(race);
  }
  if (insults !== null) {
    setWelcomeText()
  }
}

function setInsults(json) {
  insults = new Insults(json);
  if (slurs !== null) {
    setWelcomeText()
  }
}

function setWelcomeText() {
  text = "Welcome to the Fantasy Insult Maker, you ";
  text += insults.getFullInsult('lower') + ".";
  $("#welcome-text").text(text);
}
function setInsultRace(race) {
  $('#race-dropdown-button').text(race);
  slurs.setRace(race);
  generateInsult()
}

function generateInsult() {
  var text = '';
  if (slurs === null || insults === null) {
    text = 'The developer is a churlish sodden-witted plaguesore.'
  } else if (slurs.race == 'Items') {
    // These are standalone insults, don't need a prefix.
    text = slurs.getSlur()
  } else {
    text = insults.getFirst2() + ' ';
    var slur = slurs.getSlur()
    if (slur === null) {
      text += insults.getInsult(2);
    } else {
      text += slur;
    }
  }
  $('#insult-text').val(text);
}

function copyInsult() {
  /* Get the text field */
  var copyText = document.getElementById("insult-text");

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  document.execCommand("copy");
}