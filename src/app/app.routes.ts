import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { ClientComponent } from './components/client/client.component';
import { NfeComponent } from './components/nfe/nfe.component';
import { SettingsComponent } from './components/settings/settings.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'client', component: ClientComponent },
    { path: 'nfe', component: NfeComponent },
    { path: 'settings', component: SettingsComponent }
    
];
