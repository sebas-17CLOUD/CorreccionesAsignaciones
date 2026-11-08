import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CharacterResponse, Character } from '../models/character';

@Injectable({
  providedIn: 'root'
})
export class DragonBallService {
  private http = inject(HttpClient);
  private apiUrl = 'https://dragonball-api.com/api/characters';

  getCharacters(page: number = 1, limit: number = 10): Observable<CharacterResponse> {
    return this.http.get<CharacterResponse>(`${this.apiUrl}?page=${page}&limit=${limit}`);
  }

  getCharacterById(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.apiUrl}/${id}`);
  }
}