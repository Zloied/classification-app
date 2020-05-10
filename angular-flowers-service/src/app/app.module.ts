import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { FlowerService } from './services/flower.service';

import {Routes, RouterModule} from '@angular/router';
import { FlowerListComponent } from './components/flower-list/flower-list.component';
import { FlowerCategoryMenuComponent } from './components/flower-category-menu/flower-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { FlowerDetailsComponent } from './components/flower-details/flower-details.component'
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Base64UploadComponent } from './components/base64-upload/base64-upload.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {NgxImageCompressService} from 'ngx-image-compress';
import { DragDropeDirectiveDirective } from './drag-drope-directive.directive';

const routes: Routes = [
  {path: 'flowers/:id', component: FlowerDetailsComponent},
  {path: 'search/:keyword', component: FlowerListComponent},
  {path: 'base64-upload', component: Base64UploadComponent},
  {path: 'category/:id', component: FlowerListComponent},
  {path: 'category', component: FlowerListComponent},
  {path: 'flowers', component: FlowerListComponent},
  {path: '', redirectTo: '/flowers', pathMatch: 'full'},
  {path: '**',redirectTo: '/flowers', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    FlowerListComponent,
    FlowerCategoryMenuComponent,
    SearchComponent,
    FlowerDetailsComponent,
    Base64UploadComponent,
    DragDropeDirectiveDirective
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [FlowerService, NgxImageCompressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
