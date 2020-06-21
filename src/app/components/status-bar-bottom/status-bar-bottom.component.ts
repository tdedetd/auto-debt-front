import { Component, OnInit, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface Action {
  label: string;
  icon: IconDefinition;
  callback: Function;
}

@Component({
  selector: 'ad-status-bar-bottom',
  templateUrl: './status-bar-bottom.component.html',
  styleUrls: ['./status-bar-bottom.component.css']
})
export class StatusBarBottomComponent implements OnInit {

  @Input() actions: Action[];

  @Input() showCopyright = false;

  constructor() { }

  ngOnInit() {
  }

  onActionClick(action: Action) {
    action.callback();
  }

}
