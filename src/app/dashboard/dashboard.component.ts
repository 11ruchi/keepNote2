import { Component, OnInit } from '@angular/core';
// import { Note } from 'app/note';
import { NotesService } from '../services/notes.service';
import { Note } from '../note';
// import { NotesService } from 'app/services/notes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  errMessage: string;
  public note: Note;
  notes: Note[];

  constructor(private notesService: NotesService) {
    this.note = new Note();
    this.notes = [];
  }
  ngOnInit() {
    this.notesService.getNotes().subscribe(data => {
      this.notes = data;
    },
      error => {
        this.errMessage = error.message;
      });
  }

  addNote() {
    if (this.note.title === undefined || this.note.text === undefined) {
      this.errMessage = 'Title and Text both are required fields';
      return;
    }

    this.errMessage = '';

    this.notes.push(this.note);

    this.notesService.addNote(this.note).subscribe(data => {

    },
      error => {
        this.notes.pop();
        this.errMessage = error.message;
        console.log('err', error);
      });
    this.note = new Note();
  }
}
