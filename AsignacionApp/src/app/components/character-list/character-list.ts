import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragonBallService } from '../../services/dragonball';
import { Character } from '../../models/character';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character-list.html',
  styleUrl: './character-list.css'
})
export class CharacterListComponent implements OnInit {
  private dbService = inject(DragonBallService);

  characters = signal<Character[]>([]);
  loading = signal<boolean>(true);

  ngOnInit(): void {
    this.dbService.getCharacters(1, 12).subscribe({
      next: (data) => {
        this.characters.set(data.items);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar personajes:', err);
        this.loading.set(false);
      }
    });
  }
}