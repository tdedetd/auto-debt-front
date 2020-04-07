import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ad-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() width: string;

  constructor() { }

  ngOnInit() {
  }

}
