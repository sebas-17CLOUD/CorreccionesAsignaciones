import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-estudiante',
  standalone: true,
  templateUrl: './estudiante.html',
  styleUrl: './estudiante.css'
})
export class EstudianteComponent {
  @Input() id: number = 0;
  @Input() nombre: string = '';
  @Input() carrera: string = '';
  @Input() promedio: number = 0;
}