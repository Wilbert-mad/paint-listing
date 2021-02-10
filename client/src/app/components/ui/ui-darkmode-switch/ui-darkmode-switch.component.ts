import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ui-darkmode-switch',
  templateUrl: './ui-darkmode-switch.component.html',
  styleUrls: ['./ui-darkmode-switch.component.scss'],
})
export class UiDarkmodeSwitchComponent implements OnInit {
  darkMode: boolean | string | null = localStorage.getItem('dark-mode');
  mode = this.darkMode == 'true' ? true : false;
  constructor() {}

  ngOnInit() {
    if (localStorage.getItem('dark-mode') == 'true' ? true : false) {
      document.getElementsByTagName('body')[0].classList.add('dark');
      this.mode = true;
    } else {
      this.mode = false;
    }
  }

  click() {
    const body = document.getElementsByTagName('body')[0].classList;
    this.darkMode = !this.darkMode;
    localStorage.setItem('dark-mode', String(this.darkMode));
    if (this.darkMode) {
      body.add('dark');
      this.mode = true;
    } else {
      body.remove('dark');
      this.mode = false;
    }
  }
}
