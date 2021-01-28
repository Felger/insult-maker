fetch('./assets/js/json/dnd-racial-slurs.json')
  .then(response => response.json())
  .then(json => setSlurs(json));
fetch('./assets/js/json/insults.json')
  .then(response => response.json())
  .then(json => setInsults(json));

class Slurs {
  constructor(json) {
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
  getSlur(race) {
    console.log(this.list);
    if (race in this.list) {
      return getRandomElem(this.list[race]);  
    } else {
      return null;
    }
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
  getFullInsult() {
    return this.getFirst2() + ' ' + this.getInsult(2);
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
  for (slur in slurs.list) {
    console.log(slur);
    var race = $("<a></a>").text(slur);
    race.attr("href", "#");
    race.addClass('dropdown-item');
    $('#race-menu').append(race);
  }
}

function setInsults(json) {
  insults = new Insults(json);
  console.log(insults.getFullInsult());
}

function generateInsult() {
  var text = '';
  if (slurs === null || insults === null) {
    text = 'The developer is a churlish sodden-witted plaguesore.'
  } else {
    text = insults.getFirst2() + ' ' + slurs.getSlur()
  }
  $('#insult-text').val(text);
}
