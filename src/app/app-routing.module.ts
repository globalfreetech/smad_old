import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'opening',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'opening',
    loadChildren: () => import('./opening/opening.module').then( m => m.OpeningPageModule)
  },
  {
    path: 'mainhome',
    loadChildren: () => import('./mainhome/mainhome.module').then( m => m.MainhomePageModule)
  },
  {
    path: 'mpaper',
    loadChildren: () => import('./mpaper/mpaper.module').then( m => m.MpaperPageModule)
  },
  {
    path: 'categorysearch',
    loadChildren: () => import('./categorysearch/categorysearch.module').then( m => m.CategorysearchPageModule)
  },
  {
    path: 'mp',
    loadChildren: () => import('./mp/mp.module').then( m => m.MpPageModule)
  },
  {
    path: 'socialshare',
    loadChildren: () => import('./socialshare/socialshare.module').then( m => m.SocialsharePageModule)
  },
  {
    path: 'guidemenu',
    loadChildren: () => import('./guidemenu/guidemenu.module').then( m => m.GuidemenuPageModule)
  },
  {
    path: 'cmtransactions',
    loadChildren: () => import('./cmtransactions/cmtransactions.module').then( m => m.CmtransactionsPageModule)
  },
  {
    path: 'clickwallet',
    loadChildren: () => import('./clickwallet/clickwallet.module').then( m => m.ClickwalletPageModule)
  },
  {
    path: 'myads',
    loadChildren: () => import('./myads/myads.module').then( m => m.MyadsPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'guide',
    loadChildren: () => import('./guide/guide.module').then( m => m.GuidePageModule)
  },
  {
    path: 'editprofile',
    loadChildren: () => import('./editprofile/editprofile.module').then( m => m.EditprofilePageModule)
  },
  {
    path: 'editprofile1',
    loadChildren: () => import('./editprofile1/editprofile1.module').then( m => m.Editprofile1PageModule)
  },
  {
    path: 'enquiry',
    loadChildren: () => import('./enquiry/enquiry.module').then( m => m.EnquiryPageModule)
  },
  {
    path: 'favouriteads',
    loadChildren: () => import('./favouriteads/favouriteads.module').then( m => m.FavouriteadsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
