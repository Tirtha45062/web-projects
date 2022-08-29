import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ContainerComponent } from './container/container.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ImagePageComponent } from './image-page/image-page.component';
import { AuthGuard } from './auth/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'gallery',
    canActivate: [AuthGuard],
    component: ContainerComponent,
    children: [
      {
        path: '',
        redirectTo:'dashboard',
        pathMatch:'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'image',
        component: ImagePageComponent,
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
      {
        path: 'about',
        component: AboutComponent,
      },
    ],
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
