export class TemperatureHistory{

    chart;
    value_history = [];
    ctx;

    constructor(ElementID){
        this.ctx = document.getElementById(ElementID);
        this.chart = new Chart(this.ctx, {
          type: 'bar',
          data: {
            labels: [],
            datasets: [{
              label: 'History of Temperature',
              data: [],
            }]
          }
        });
    }

    add_to_history(A_fish, I_caramel){
        let I_value = A_fish[(I_caramel - 1 + 20) % 20];
        this.value_history.push(I_value);
    }

    refreshChart() {
      let val = this.value_history.slice(Math.max(this.value_history.length - 1000, 1));
      this.chart.data.labels = val.map((_, i) => i + 1);
      this.chart.data.datasets[0].data = val;
      this.chart.data.datasets[0].backgroundColor =
        val.map(v => this.getBarColor(v));
      this.chart.update();
    }

    getBarColor(value) {
      if (value <= 0) return '#4FC3F7';
      if (value <= 20) return '#81C784';
      if (value <= 30) return '#FFB74D';
      return '#E57373';
    }
}

export class Temperature{
    A_fish = []; 
    A_value_history = [];
    I_val_min;
    I_val_max;
    O_element;
    I_caramel = 0;
    O_element2;
    hist_temp;

    constructor(min, max, temp_box, alert_box, history_temp){
        this.I_val_min = min;
        this.I_val_max = max;
        this.O_element = document.getElementById(temp_box);
        this.O_element2 = document.getElementById(alert_box);
        this.hist_temp = history_temp;

    }

    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }

    newRandomArray(){
        this.A_fish = Array.from({length: 20}, () => this.getRandomInt(this.I_val_min, this.I_val_max));
    }

    check_color(){
        let I_value = this.A_fish[this.I_caramel];
        if (I_value <= 0){
            this.O_element.setAttribute("class", "un");
            this.O_element2.textContent = "Brrrrrrr, un peu froid ce matin, mets ta cagoule !";
        }
        else if (I_value <= 20){
            this.O_element.setAttribute("class", "deux");
            this.O_element2.textContent = "ㅤ";
        }
        else if (I_value <= 30){
            this.O_element.setAttribute("class", "tres");
            this.O_element2.textContent = "ㅤ";
        }
        else if (I_value <= 40){
            this.O_element.setAttribute("class", "four");
            this.O_element2.textContent = "Caliente ! Vamos a la playa, ho hoho hoho !!";
        }
    }

    change_value(){
      if (this.hist_temp != null){
        this.hist_temp.add_to_history(this.A_fish, this.I_caramel);
        this.hist_temp.refreshChart();
      }
      this.O_element.textContent = this.A_fish[this.I_caramel];
      this.check_color();
      if (this.I_caramel >= 19){
        this.newRandomArray();
      }
      this.I_caramel = (this.I_caramel + 1) % 20;
    }
}

export class TabsManual {
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