import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-producto',
  standalone: true,
  templateUrl: './producto.html',
  styleUrl: './producto.css'
})
export class ProductoComponent {
  @Input() id: number = 0;
  @Input() nombre: string = '';
  @Input() precio: number = 0;
  @Input() categoria: string = '';
}