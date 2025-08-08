import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./moduli/homepage/homepage.module').then(m => m.HomepageModule) },
  { path: 'project', loadChildren: () => import('./moduli/project/project.module').then(m => m.ProjectModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
