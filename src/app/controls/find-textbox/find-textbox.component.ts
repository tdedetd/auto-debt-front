import { Component, OnInit, Input, EventEmitter, Output, ViewEncapsulation, HostListener, OnDestroy, OnChanges } from '@angular/core';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';

export interface DropdownItem {
  label: string;
  value: any;
  picture: string;
}

export type DropdownItemsFunc = (query: string) => Observable<DropdownItem[]>;

@Component({
  selector: 'ad-find-textbox',
  templateUrl: './find-textbox.component.html',
  styleUrls: ['./find-textbox.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FindTextboxComponent implements OnInit, OnChanges, OnDestroy {

  @Input() items: DropdownItem[];

  @Input() itemsFunc: DropdownItemsFunc;

  @Input() placeholder: string;

  @Input() value: DropdownItem;

  inputText: string;

  items$: Observable<DropdownItem[]>;

  listId: string;

  listVisible = false;

  inputKeydown$: Subject<string> = new Subject();

  inputKeydownSubscription$: Subscription;

  textboxId: string;

  @Output() valueChange: EventEmitter<DropdownItem> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.listId = String(Math.random()).split('.')[1];
    this.textboxId = String(Math.random()).split('.')[1];

    this.inputKeydownSubscription$ = this.inputKeydown$
      .pipe(
        debounceTime(500),
        filter(query => {
          if (query.length < 3) {
            this.items$ = null;
            this.listVisible = false;
            this.valueChange.emit(null);
            return false;
          }
          return true;
        })
      )
      .subscribe(query => {
        this.items$ = this.itemsFunc ? this.itemsFunc(query) : of(this.items);
        this.listVisible = true;
      });
  }

  ngOnChanges(changes) {
    if (changes.value && !changes.value.currentValue) {
      this.inputText = '';
    }
  }

  ngOnDestroy() {
    this.inputKeydownSubscription$.unsubscribe();
  }

  onInputClick() {
    this.listVisible = true;
  }

  onInputValueInput(inputText: string) {
    this.updateItems(inputText);
  }

  onItemClick(item: DropdownItem) {
    this.listVisible = false;
    this.inputText = item.label;
    this.valueChange.emit(item);
  }

  @HostListener('document:click', ['$event.target'])
  private onClick(target: Element) {
    let elem: Element = target;
    do {
      if (elem.id === this.listId || elem.id === this.textboxId) return;
    } while (elem = elem.parentElement);

    this.listVisible = false;
  }

  private updateItems(query: string) {
    this.inputKeydown$.next(query);
  }

}
