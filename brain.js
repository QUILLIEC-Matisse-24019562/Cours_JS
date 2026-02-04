
var A_fish = {} ; 
let A_value_history = [];
var I_val_min = -10;
var I_val_max = 40;

const ctx = document.getElementById('myChart');

const chart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [],        // start empty
    datasets: [{
      label: 'History of Temperature',
      data: [],
    }]
  }
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

A_fish = Array.from({length: 20}, () => getRandomInt(I_val_min, I_val_max));

function check_color(){
    let I_value = A_fish[I_caramel];
    if (I_value <= 0){
        O_element.setAttribute("class", "un");
        O_element2.textContent = "Brrrrrrr, un peu froid ce matin, mets ta cagoule !";
    }
    else if (I_value <= 20){
        O_element.setAttribute("class", "deux");
        O_element2.textContent = "ㅤ";
    }
    else if (I_value <= 30){
        O_element.setAttribute("class", "tres");
        O_element2.textContent = "ㅤ";
    }
    else if (I_value <= 40){
        O_element.setAttribute("class", "four");
        O_element2.textContent = "Caliente ! Vamos a la playa, ho hoho hoho !!";
    }
}

let O_element = document.getElementById("case");
var I_caramel = 0;
let O_element2 = document.getElementById("funny_sentence");

function change_value(){
  add_to_history();
  refreshChart(A_value_history.slice(Math.max(A_value_history.length - 1000, 1)));
  O_element.textContent = A_fish[I_caramel];
  check_color();
  if (I_caramel >= 19){
    A_fish = Array.from({length: 20}, () => getRandomInt(I_val_min, I_val_max));
  }
  I_caramel = (I_caramel + 1) % 20;
}

function refreshChart(value_history) {
  chart.data.labels = value_history.map((_, i) => i + 1); // or timestampsh
  chart.data.datasets[0].data = value_history;
  chart.data.datasets[0].backgroundColor =
    value_history.map(v => getBarColor(v));
  chart.update();
}

function getBarColor(value) {
  if (value <= 0) return '#4FC3F7';      // cold (blue)
  if (value <= 20) return '#81C784';     // mild (green)
  if (value <= 30) return '#FFB74D';     // warm (orange)
  return '#E57373';                      // hot (red)
}

function add_to_history(){
    let I_value = A_fish[(I_caramel - 1 + 20) % 20];
    A_value_history.push(I_value);
}

setInterval(change_value, 2);

/*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 *   File:   tabs-manual.js
 *
 *   Desc:   Tablist widget that implements ARIA Authoring Practices
 */

'use strict';

class TabsManual {
  constructor(groupNode) {
    this.tablistNode = groupNode;

    this.tabs = [];

    this.firstTab = null;
    this.lastTab = null;

    this.tabs = Array.from(this.tablistNode.querySelectorAll('[role=tab]'));
    this.tabpanels = [];

    for (var i = 0; i < this.tabs.length; i += 1) {
      var tab = this.tabs[i];
      var tabpanel = document.getElementById(tab.getAttribute('aria-controls'));

      tab.tabIndex = -1;
      tab.setAttribute('aria-selected', 'false');
      this.tabpanels.push(tabpanel);

      tab.addEventListener('keydown', this.onKeydown.bind(this));
      tab.addEventListener('click', this.onClick.bind(this));

      if (!this.firstTab) {
        this.firstTab = tab;
      }
      this.lastTab = tab;
    }

    this.setSelectedTab(this.firstTab);
  }

  setSelectedTab(currentTab) {
    for (var i = 0; i < this.tabs.length; i += 1) {
      var tab = this.tabs[i];
      if (currentTab === tab) {
        tab.setAttribute('aria-selected', 'true');
        tab.removeAttribute('tabindex');
        this.tabpanels[i].classList.remove('is-hidden');
      } else {
        tab.setAttribute('aria-selected', 'false');
        tab.tabIndex = -1;
        this.tabpanels[i].classList.add('is-hidden');
      }
    }
  }

  moveFocusToTab(currentTab) {
    currentTab.focus();
  }

  moveFocusToPreviousTab(currentTab) {
    var index;

    if (currentTab === this.firstTab) {
      this.moveFocusToTab(this.lastTab);
    } else {
      index = this.tabs.indexOf(currentTab);
      this.moveFocusToTab(this.tabs[index - 1]);
    }
  }

  moveFocusToNextTab(currentTab) {
    var index;

    if (currentTab === this.lastTab) {
      this.moveFocusToTab(this.firstTab);
    } else {
      index = this.tabs.indexOf(currentTab);
      this.moveFocusToTab(this.tabs[index + 1]);
    }
  }

  /* EVENT HANDLERS */

  onKeydown(event) {
    var tgt = event.currentTarget,
      flag = false;

    switch (event.key) {
      case 'ArrowLeft':
        this.moveFocusToPreviousTab(tgt);
        flag = true;
        break;

      case 'ArrowRight':
        this.moveFocusToNextTab(tgt);
        flag = true;
        break;

      case 'Home':
        this.moveFocusToTab(this.firstTab);
        flag = true;
        break;

      case 'End':
        this.moveFocusToTab(this.lastTab);
        flag = true;
        break;

      default:
        break;
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  onClick(event) {
    this.setSelectedTab(event.currentTarget);
  }
}

window.addEventListener('load', function () {
  var tablists = document.querySelectorAll('[role=tablist].manual');
  for (var i = 0; i < tablists.length; i++) {
    new TabsManual(tablists[i]);
  }
});
