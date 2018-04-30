import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent }        from './home/home.component';
import { DatasetsComponent }    from './datasets/datasets.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'datasets', component: DatasetsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
