import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Note } from '../shared/note.model';
import { NoteService } from '../shared/note.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {

  showValidationErros: boolean | any

  constructor(private noteService: NoteService,
     private router: Router,
     private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  onFormSubmit(form: NgForm) {
    console.log(form)

    if (form.invalid)
      return this.showValidationErros = true

    const { title, content } = form.value
    const note = new Note(title, content)

    this.noteService.addNote(note)
    this.router.navigateByUrl("/notes")
    this.notificationService.show('Nota Criada!')
    return this.showValidationErros = false
  }

}
