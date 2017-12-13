import {Component, Input, Output, EventEmitter} from '@angular/core';

/**
 * Generated class for the HeaderComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class HeaderComponent {

  @Input() leftIcon: any;
  @Input() centerIcon: any;
  @Input() rightIcon: any;

  @Input() leftText: any;
  @Input() centerText: any;
  @Input() rightText: any;

  @Output() leftAction: EventEmitter<any>;
  @Output() centerAction: EventEmitter<any>;
  @Output() rightAction: EventEmitter<any>;


  constructor() {

    this.leftAction = new EventEmitter();
    this.centerAction = new EventEmitter();
    this.rightAction = new EventEmitter();

  }

  public onLeftItemClicked($event): void {
    this.leftAction.emit($event);
  }

  public onCenterItemClicked($event): void {
    this.centerAction.emit($event);
  }

  public onRightItemClicked($event): void {
    this.rightAction.emit($event);
  }

}
