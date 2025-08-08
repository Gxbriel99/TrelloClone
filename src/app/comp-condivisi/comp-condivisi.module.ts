import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { ToolBarComponent } from './tool-bar/tool-bar.component';



@NgModule({
  declarations: [
    MenuComponent,
    ToolBarComponent,
  ],
  imports: [
    CommonModule
  ],
  exports:[
    MenuComponent,
    ToolBarComponent,

  ]
})
export class CompCondivisiModule { }
