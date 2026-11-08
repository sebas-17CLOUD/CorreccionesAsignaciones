import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-libro',
  standalone: true,
  templateUrl: './libro.html',
  styleUrl: './libro.css'
})
export class LibroComponent {
  @Input() id: number = 0;
  @Input() titulo: string = '';
  @Input() autor: string = '';
  @Input() anio: number = 0;
}