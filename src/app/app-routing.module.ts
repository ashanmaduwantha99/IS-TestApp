import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'dashboard',
    loadChildren:() =>
    import('./core/modules/dashboard/dashboard.module').then(
      (m) => m.DashboardModule
    ),
  },
  {
    path:'user',
    loadChildren:() =>
    import('./core/modules/user/user.module').then(
      (m) => m.UserModule
    ),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
