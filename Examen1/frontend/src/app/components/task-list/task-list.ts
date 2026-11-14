import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoModel, TaskListService } from '../../services/task-list.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList implements OnInit {
  private taskListService = inject(TaskListService);
  
  tareas = signal<TodoModel[]>([]);

  tituloInput = '';
  descripcionInput = '';
  prioridadInput: string = '1'; 
  completadaInput = false;
  tareaEditandoId: string | null = null;

  filtroBusqueda = '';
  filtroCompletada: string = '';
  filtroOrdenar = '';

  ngOnInit() {
    this.cargarTareas();
  }

  cargarTareas() {
    let estado: boolean | undefined = undefined;
    if (this.filtroCompletada === 'true') estado = true;
    if (this.filtroCompletada === 'false') estado = false;

    this.taskListService.getTareas(estado, this.filtroBusqueda, this.filtroOrdenar).subscribe({
      next: (data) => this.tareas.set(data),
      error: (err) => console.error('Error al cargar tareas', err)
    });
  }

  guardarTarea() {
    if (!this.tituloInput.trim()) return;

    const nuevaTarea: TodoModel = {
      titulo: this.tituloInput,
      descripcion: this.descripcionInput,
      completada: this.completadaInput,
      prioridad: this.prioridadInput
    };

    if (this.tareaEditandoId) {
      this.taskListService.actualizarTarea(this.tareaEditandoId, nuevaTarea).subscribe(() => {
        this.resetForm();
        this.cargarTareas();
      });
    } else {
      this.taskListService.crearTarea(nuevaTarea).subscribe(() => {
        this.resetForm();
        this.cargarTareas();
      });
    }
  }

  editar(tarea: TodoModel) {
    this.tareaEditandoId = tarea.Id || tarea.id || null; 
    this.tituloInput = tarea.titulo;
    this.descripcionInput = tarea.descripcion;
    this.prioridadInput = tarea.prioridad;
    this.completadaInput = tarea.completada;
  }

  eliminar(id?: string) {
    if (!id) {
      console.error('El ID de la tarea es nulo o indefinido');
      return;
    }
    
    if (confirm('¿Deseas eliminar esta tarea?')) {
      this.taskListService.eliminarTarea(id).subscribe({
        next: () => {
          this.cargarTareas();
        },
        error: (err) => console.error('Error al eliminar la tarea:', err)
      });
    }
  }

  cambiarEstado(tarea: TodoModel) {
    const tareaActualizada = { ...tarea, completada: !tarea.completada };
    const idTarea = tarea.Id || tarea.id;
    if (idTarea) {
      this.taskListService.actualizarTarea(idTarea, tareaActualizada).subscribe(() => {
        this.cargarTareas();
      });
    }
  }

  resetForm() {
    this.tareaEditandoId = null;
    this.tituloInput = '';
    this.descripcionInput = '';
    this.prioridadInput = '1';
    this.completadaInput = false;
  }
}