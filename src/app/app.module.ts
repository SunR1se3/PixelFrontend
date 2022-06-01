import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './core/components/footer/footer.component';
import { PixelComponent } from './core/components/pixel/pixel.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DocumentsComponent } from './core/components/documents/documents.component';
import { TirajirovanieComponent } from './core/components/documents/tirajirovanie/tirajirovanie.component';
import { OrderSuccessfullComponent } from './core/components/order-successfull/order-successfull.component';
import { HronologyComponent } from './core/components/hronology/hronology.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PixelComponent,
    DocumentsComponent,
    TirajirovanieComponent,
    OrderSuccessfullComponent,
    HronologyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
