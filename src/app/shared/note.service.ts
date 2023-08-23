import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService implements OnDestroy {

  notes: Note[] = []

  storageListenSub: Subscription | any

  constructor() {
    this.loadState()

    /*Essa parte serve para mesmo se duas ou mais janelas estiverem abertas,
    ambas sejam atualizadas caso houver mudanças no localstorage*/
    this.storageListenSub = fromEvent(window, 'storage')
      .subscribe((event: StorageEvent | any) => {
        if (event.key === 'notes') this.loadState()
      })
  }

  ngOnDestroy() {
    if (this.storageListenSub) this.storageListenSub.unsubscribe()
  }

  getNotes() {
    return this.notes
  }

  getNote(id: string) {
    //Retorna True quando o n.id é igual ao id passado
    return this.notes.find(n => n.id === id)
  }

  addNote(note: Note) {
    this.notes.push(note)

    this.saveState()
  }

  updateNote(id: string, updateFields: Partial<Note>) {
    const note = this.getNote(id)
    Object.assign(note, updateFields)

    this.saveState()
  }

  deleteNote(id: string) {
    const noteIndex = this.notes.findIndex(n => n.id === id)
    if (noteIndex == -1) return
    this.notes.splice(noteIndex, 1)

    this.saveState()
  }

  /*Metodo para salvar no local storage, coverte o array em JSON*/
  saveState() {
    localStorage.setItem('notes', JSON.stringify(this.notes))
  }

  loadState() {
    try {
      const notesInStorage = JSON.parse(localStorage.getItem('notes') || '{}')

      /*o if é mais para impedir o erro de 'is not iterable(cannot read property null),
       mas como tem try catch nao é mais necessario'*/
      //if(!notesInStorage) return

      this.notes.length = 0 //limpado o array enquanto mantem a referencia
      this.notes.push(...notesInStorage);

    } catch (e) {
      console.log('Ocorreu um erro ao recuperar as notas do localStorage')
      console.log(e)
    }

  }
}
