import { Directive, ElementRef, Input } from '@angular/core';
import { ColorGenerator } from './colorGenerator.services'
/*
  Generated class for the TextAvatar directive.

  See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
  for more info on Angular 2 Directives.
*/


@Directive({
  selector: '[text-avatar]',
  providers: [ColorGenerator]
})
export class TextAvatar {

  constructor(private element: ElementRef, private colorGenerator: ColorGenerator) { console.log("txt"); }

  @Input()
  set text(txt: string) {
    console.log("txt", txt);
    this.element.nativeElement.style.backgroundColor = this.colorGenerator.getColor(txt);
    this.element.nativeElement.textContent = txt.charAt(0).toUpperCase();

    console.log("color", this.element.nativeElement.style.backgroundColor);
    console.log("value", this.element.nativeElement)
  }
  @Input()
  set srcColor(txt: string) {
    this.element.nativeElement.setAttribute("src", "https://dummyimage.com/350x350/"
      + this.colorGenerator.getColor(txt) + "/" + this.colorGenerator.getColor(txt) + "&text=++d")
  }

}

