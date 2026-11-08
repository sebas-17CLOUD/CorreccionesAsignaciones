import { Routes } from '@angular/router';
import { CharacterListComponent } from './components/character-list/character-list';

export const routes: Routes = [
  // Redirige la ruta vacía ('') al componente de personajes
  { path: '', component: CharacterListComponent }
];