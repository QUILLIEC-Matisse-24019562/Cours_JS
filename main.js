import { TemperatureHistory, Temperature, TabsManual } from './brain_class.js';

window.addEventListener('load', function () {
  var tablists = document.querySelectorAll('[role=tablist].manual');
  for (var i = 0; i < tablists.length; i++) {
    new TabsManual(tablists[i]);
  }
});

var temp_hist = new TemperatureHistory('myChart');

var temp = new Temperature(-10, 40, "case", "funny_sentence", temp_hist);
temp.newRandomArray();

//setInterval(temp.change_value, 200);
setInterval(() => temp.change_value(), 2);
