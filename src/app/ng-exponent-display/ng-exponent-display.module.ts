import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgExponentDisplayPipe } from './ng-exponent-display.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NgExponentDisplayPipe],
  exports: [NgExponentDisplayPipe]
})
export class NgExponentDisplayModule { }
