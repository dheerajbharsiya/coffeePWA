import { CoffeeComponent } from './coffee/coffee.component';
import { ListComponent } from './list/list.component';
import { HomeComponent } from './home/home.component';
import { ContactusComponent } from './aboutus/contactus/contactus.component';
import { TeamComponent } from './aboutus/team/team.component';
import { ProfileComponent } from './aboutus/profile/profile.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AppComponent } from './app.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { NgModule } from '@angular/core';
import { Routes, PreloadAllModules } from '@angular/router';
import { RouterModule } from '@angular/router';

const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
        path: 'home', component: ListComponent
    },
    {
        path: 'login', component: SigninComponent
    },
    {
        path: 'coffee', component: CoffeeComponent
    },
    {
        path: 'aboutus', component: AboutusComponent,
        children: [{
            path: '',
            redirectTo: 'profile',
            pathMatch: 'full'
        },
        {
            path: 'profile',
            component: ProfileComponent
        },
        {
            path: 'team',
            component: TeamComponent
        },
        {
            path: 'contactus',
            component: ContactusComponent
        }
        ]
    },
    {
        path: '**', component: HomeComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})

export class AppRoutingModule {

}