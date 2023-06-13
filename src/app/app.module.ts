import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DynamicModalsModule} from "./dynamic-modals/dynamic-modals.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DynamicModalsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
