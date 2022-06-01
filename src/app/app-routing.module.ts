import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentsComponent } from './core/components/documents/documents.component';
import { TirajirovanieComponent } from './core/components/documents/tirajirovanie/tirajirovanie.component';
import { HronologyComponent } from './core/components/hronology/hronology.component';
import { OrderSuccessfullComponent } from './core/components/order-successfull/order-successfull.component';
import { PixelComponent } from './core/components/pixel/pixel.component';

const routes: Routes = [
  {
    path: '',
    component: PixelComponent
  },
  {
    path: 'documents',
    component: DocumentsComponent
  },
  {
    path: 'documents/tirajirovanie',
    component: TirajirovanieComponent
  },
  {
    path: 'order-successfull',
    component: OrderSuccessfullComponent
  },
  {
    path: 'hronology',
    component: HronologyComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
