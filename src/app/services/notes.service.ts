import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import { Note } from 'app/note';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { AuthenticationService } from 'app/services/authentication.service';
import { Note } from '../note';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class NotesService {


  constructor(private httpClient: HttpClient,
    private authService: AuthenticationService) {
  }

  getNotes(): Observable<Array<Note>> {
    const token = this.authService.getBearerToken();
    return this.httpClient.get<Note[]>('http://localhost:3000/api/v1/notes', {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    });
  }

  addNote(note: Note): Observable<Note> {
    const token = this.authService.getBearerToken();
    return this.httpClient.post<Note>('http://localhost:3000/api/v1/notes', note, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    });
  }

}
