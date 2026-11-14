import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface TodoModel {
  Id?: string;
  id?: string;
  titulo: string;
  descripcion: string;
  completada: boolean;
  prioridad: string;
  fechaCreacion?: string;
}

@Injectable({ providedIn: 'root' })
export class TaskListService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5062/api/todo';

  getTareas(completada?: boolean, busqueda?: string, ordenarPor?: string): Observable<TodoModel[]> {
    let params = new HttpParams();
    if (completada !== undefined && completada !== null) {
      params = params.set('completada', completada.toString());
    }
    if (busqueda && busqueda.trim() !== '') {
      params = params.set('busqueda', busqueda);
    }
    if (ordenarPor && ordenarPor.trim() !== '') {
      params = params.set('ordenarPor', ordenarPor);
    }
    return this.http.get<TodoModel[]>(`${this.apiUrl}/filtrar`, { params });
  }

  crearTarea(tarea: TodoModel): Observable<TodoModel> {
    return this.http.post<TodoModel>(this.apiUrl, tarea);
  }

  actualizarTarea(id: string, tarea: TodoModel): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, tarea);
  }

  eliminarTarea(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}