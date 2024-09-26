import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children:[
      {path: "feeds", loadChildren: ()=> import('src/app/pages/feeds/feeds.module').then(res => res.FeedsPageModule)},
      {path: "profile", loadChildren: ()=> import('src/app/pages/profile/profile.module').then(res => res.ProfilePageModule)}
    ]
  },
  {
    path:"",
    redirectTo: "tabs/feeds",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
