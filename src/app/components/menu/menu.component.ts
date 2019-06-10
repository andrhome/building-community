import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'bc-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Output() onLinkActivated: EventEmitter<any> = new EventEmitter();
  @Input() menuItems: Array<any>;
  @Input() customClass: Array<any>;
  @Input() menuConfig: any = {
    width: '230px',
    top: '100%',
    bottom: 'inherit',
    right: 'inherit',
    left: '0'
  };
  @Input() triangleConfig: any = {
    top: '-10px',
    bottom: 'inherit',
    right: '0',
    left: '0',
    rotateDeg: 'inherit'
  };

  constructor() {
  }

  ngOnInit() {
  }

  onLinkClick(e) {
    e.stopImmediatePropagation();
    this.onLinkActivated.emit();
  }

}
