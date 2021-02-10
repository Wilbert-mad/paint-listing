import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageHomeComponent, PageAboutComponent } from './views';

const routes: Routes = [
  { path: '', component: PageHomeComponent },
  { path: 'about', component: PageAboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
