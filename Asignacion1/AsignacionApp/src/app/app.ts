import { Component, signal } from '@angular/core';
import { CharacterListComponent } from './components/character-list/character-list'; 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CharacterListComponent], 
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('AsignacionApp');
}