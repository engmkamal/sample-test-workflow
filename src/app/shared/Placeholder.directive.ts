// import { Directive, ViewContainerRef } from '@angular/core';

// @Directive({
//   selector: '[appPlaceholder]'
// })
// export class PlaceholderDirective {
//   constructor(public ViewContainerRef: ViewContainerRef) {

//   }
// }

// import { Directive, ViewContainerRef } from '@angular/core';

// @Directive({
//   selector: '[adHost]',
// })
// export class AdDirective {
//   constructor(public viewContainerRef: ViewContainerRef) { }
// }


import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[adHost]'
})
export class PlaceholderDirective {  
  constructor(public viewContainerRef: ViewContainerRef) {}
}