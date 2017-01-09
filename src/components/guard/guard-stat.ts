import { Component, ElementRef, Input } from '@angular/core';


@Component({
  selector: 'guard-stat',
  template: `<div id="guardAssociation"  style="height:100%;width:100%;position:relative;">
        <i class="mdi mdi mdi-refresh"  style="position:absolute;left:50%;transform: translateX(-50%);-webkit-transform: translateX(-50%);font-size: 250px;color: lightgrey;"></i> 
         
      </div>`
})
export class GuardStat {
  isLogged: boolean = false;
  constructor(private element: ElementRef) {}
  
  @Input()
  set logingStat(stat: boolean) {
   // this.element.nativeElement.style.backgroundColor = this.colorGenerator.getColor(txt);

  }


}

