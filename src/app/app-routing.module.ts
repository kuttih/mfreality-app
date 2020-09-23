import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScenesComponent } from './modules/scenes/scenes.component';
import { HomeComponent } from './modules/home/home.component';
import { DefaultComponent } from './layouts/default/default.component';
import { AboutComponent } from './modules/about/about.component';
import { PrivacyComponent } from './modules/privacy/privacy.component';
import { TermsComponent } from './modules/terms/terms.component';
import { FAQComponent } from './modules/faq/faq.component';
import { ServicesComponent } from './modules/services/services.component';
import { ContactComponent } from './modules/contact/contact.component';
import { EnvironmentComponent } from './layouts/environment/environment.component';
import { LessonsComponent } from './modules/lessons/lessons.component';
import { AddscenesComponent } from './modules/scenes/addscenes/addscenes.component';
import { RouteGuardService } from './services/guard/route-guard.service';
import { TriggerimageComponent } from './modules/scenes/addscenes/triggerimage/triggerimage.component';
import { GeneratedimageComponent } from './modules/scenes/addscenes/generatedimage/generatedimage.component';
import { Overlay } from '@angular/cdk/overlay';
import { OverlaysComponent } from './modules/scenes/addscenes/overlays/overlays.component';
import { ScenecompletedComponent } from './modules/scenes/addscenes/scenecompleted/scenecompleted.component';
import { ArComponent } from './modules/scenes/ar/ar.component';
import { NftComponent } from './modules/scenes/ar/nft/nft.component';
import { ScenepreviewComponent } from './modules/scenes/scenepreview/scenepreview.component';
import { CreateLessonComponent } from './modules/lessons/create-lesson/create-lesson.component';


const routes: Routes = [
  {path:'',component:DefaultComponent,
  children:[
    {
    path:'',component:HomeComponent},
    {path:'about',component:AboutComponent},
    {path:'privacy',component:PrivacyComponent},
    {path:'terms',component:TermsComponent},
    {path:'faq',component:FAQComponent},
    {path:'services',component:ServicesComponent},
    {path:'contact',component:ContactComponent}
    
  ]},
  {path:'',component:EnvironmentComponent,
  children:[
    {path:'addscene',component:ScenesComponent, canActivate:[RouteGuardService]},
    {path:'lessons',component:LessonsComponent,canActivate:[RouteGuardService]},
    {path:'addscenes', component:AddscenesComponent,canActivate:[RouteGuardService]},
    {path:'uploadimage', component:TriggerimageComponent,canActivate:[RouteGuardService]},
    {path:'confirmedimage', component:GeneratedimageComponent,canActivate:[RouteGuardService]},
    {path:'overlays', component:OverlaysComponent,canActivate:[RouteGuardService]},
    {path:'sceneCompleted', component:ScenecompletedComponent,canActivate:[RouteGuardService]},
    {path:'create_a_lesson', component:CreateLessonComponent,canActivate:[RouteGuardService]},





    
    // {path:'profile', component:ProfileComponent}
  ]},
  {path:'preview', component:ArComponent,canActivate:[RouteGuardService]},
  {path:'nft-demo', component:NftComponent,canActivate:[RouteGuardService]},
  {path:'scenepreview/:id', component:ScenepreviewComponent,canActivate:[RouteGuardService]},


  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
