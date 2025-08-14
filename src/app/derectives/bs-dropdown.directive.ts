import { Directive, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Dropdown } from 'bootstrap';

@Directive({
  // Aplica automaticamente em todo elemento com esse atributo
  selector: '[data-bs-toggle="dropdown"]',
  standalone: true,
})
export class BsDropdownDirective implements AfterViewInit, OnDestroy {
  private instance?: Dropdown;
  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit() {
    // Evita duplicar instâncias se já houver
    this.instance = Dropdown.getOrCreateInstance(this.el.nativeElement);
  }

  ngOnDestroy() {
    this.instance?.dispose();
  }
}
