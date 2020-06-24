import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPlus, faTrash, faTimesCircle, faSave, faCheck } from '@fortawesome/free-solid-svg-icons';

import { Action } from 'src/app/components/status-bar-bottom/status-bar-bottom.component';

@Component({
  selector: 'ad-edit-debt',
  templateUrl: './edit-debt.component.html',
  styleUrls: ['./edit-debt.component.css']
})
export class EditDebtComponent implements OnInit {

  actions: Action[] = [
    {
      label: 'Очистить',
      icon: faTimesCircle,
      callback: () => {}
    },
    {
      label: 'Сохранить',
      icon: faSave,
      callback: () => {}
    },
    {
      label: 'Подтвердить чек',
      icon: faCheck,
      callback: () => {}
    },
    {
      label: 'Отменить чек',
      icon: faTrash,
      callback: () => {}
    }
  ];

  checkId: number;

  colors = ['#B7ADEF', '#FAB0B0', '#FACD85', '#75DE91', '#EE8AF2', '#74D9CE'];

  edit = true;

  faPlus = faPlus;

  faTrash = faTrash;

  participants: any = [
    { name: 'Дмитрий', sum: 259.66 },
    { name: 'Алексей', sum: 24.82 },
    { name: 'Сергей', sum: 62.57 },
    { name: 'Александр', sum: 74.81 }
  ];

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.checkId = +this.activatedRoute.snapshot.params.checkId;

    this.participants.forEach((user, i) => {
      user.color = this.colors[i % this.colors.length];
    });
  }

}
