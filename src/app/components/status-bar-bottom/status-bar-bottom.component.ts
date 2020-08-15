import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface Action {
  label: string;
  icon: IconDefinition;
  callback: Function;
}

@Component({
  selector: 'ad-status-bar-bottom',
  templateUrl: './status-bar-bottom.component.html',
  styleUrls: ['./status-bar-bottom.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StatusBarBottomComponent implements OnInit {

  @Input() actions: Action[];

  @Input() showCopyright = false;

  year: number;

  constructor() { }

  ngOnInit() {
    this.year = new Date().getFullYear();
  }

  onActionClick(action: Action) {
    action.callback();
  }

}
