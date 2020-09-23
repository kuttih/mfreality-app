import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common'
import { AppRoutingModule } from './app-routing.module';
import { CloudinaryModule,CloudinaryConfiguration  } from '@cloudinary/angular-5.x';
import * as  Cloudinary from 'cloudinary-core';
import { AppComponent } from './app.component';


import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {  FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSquare, faCheckSquare, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { faSquare as farSquare, faCheckSquare as farCheckSquare } from '@fortawesome/free-regular-svg-icons';
import { faStackOverflow, faGithub, faMedium, faFacebook, faTwitter, faInstagram, faYoutube, faQuinscape } from '@fortawesome/free-brands-svg-icons';
import { ScenesComponent } from './modules/scenes/scenes.component';
import { LessonsComponent } from './modules/lessons/lessons.component';
import { HomeComponent } from './modules/home/home.component';
import { DefaultComponent } from './layouts/default/default.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { AboutComponent } from './modules/about/about.component';
import { ServicesComponent } from './modules/services/services.component';
import { ContactComponent } from './modules/contact/contact.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { EnvironmentComponent } from './layouts/environment/environment.component';
import { LheaderComponent } from './shared/components/lheader/lheader.component';
import {AddscenesComponent} from './modules/scenes/addscenes/addscenes.component';
import { TriggerimageComponent } from './modules/scenes/addscenes/triggerimage/triggerimage.component';
import { HttpInterceptorBasicService } from './services/http/http-interceptor-basic.service';
import {AppMaterialModule} from '../app/material/app-material/app-material.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { GeneratedimageComponent } from './modules/scenes/addscenes/generatedimage/generatedimage.component';
import { OverlaysComponent } from './modules/scenes/addscenes/overlays/overlays.component';
import { ScenecompletedComponent } from './modules/scenes/addscenes/scenecompleted/scenecompleted.component';
import { DataService } from 'src/app/services/data.service';
import { TokenStorageService } from './services/auth/token-storage.service';
import { ArComponent } from './modules/scenes/ar/ar.component';
import { NftComponent } from './modules/scenes/ar/nft/nft.component';
import { ScenepreviewComponent } from './modules/scenes/scenepreview/scenepreview.component';
import { CreateLessonComponent } from './modules/lessons/create-lesson/create-lesson.component';

@NgModule({
  declarations: [
    AppComponent,
    ScenesComponent,
    LessonsComponent,
    HomeComponent,
    DefaultComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    PrivacyComponent,
    TermsComponent,
    FAQComponent,
    ServicesComponent,
    ContactComponent,
    EnvironmentComponent,
    LheaderComponent,
    AddscenesComponent,
    TriggerimageComponent,
    GeneratedimageComponent,
    OverlaysComponent,
    ScenecompletedComponent,
    ArComponent,
    NftComponent,
    ScenepreviewComponent,
    CreateLessonComponent,
    

    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
    CloudinaryModule.forRoot(Cloudinary, { cloud_name: 'mfworkshop', upload_preset: 'fnvqwvcv'} as CloudinaryConfiguration),
    AppMaterialModule,
    MatProgressSpinnerModule
    
  

  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorBasicService, multi: true },
    DataService,TokenStorageService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { 
  constructor(private library: FaIconLibrary) {
    library.addIcons(faSquare, faCheckSquare, farSquare, farCheckSquare, faStackOverflow, faGithub, faMedium,faFacebook,faTwitter,faInstagram,faYoutube,faQuestion);
  }

}
