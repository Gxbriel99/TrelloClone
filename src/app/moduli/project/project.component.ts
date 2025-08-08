import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Card } from 'src/app/class/card.class';
import { Task } from 'src/app/type/task.type';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  private listenersAttached = false;

  ngOnInit(): void {
  }

  //------------------------------------//

  cards: Card[] = [
    {'idCard': 1, 'title': 'Card 1', 'task': [
      {'idTask': 1, 'date': new Date(), 'text': 'Fare la spesa', 'completed': false},
      {'idTask': 2, 'date': new Date(), 'text': 'Andare in lavanderia', 'completed': true}
    ], 'preferiti': false, 'creationDate': new Date()},
    {'idCard': 2, 'title': 'Card 2', 'task': [], 'preferiti': false, 'creationDate': new Date()},
  ]

  //-----------------------------------//
  //Logica di visualizzazione dei form
  addTaskForm:boolean= false;
  editCardNameForm:boolean= false;

  protected showTaskForm(e: Event, cardId: number) {
    const target = e.target as HTMLElement;

    if (target.id === 'addTask') this.addTaskForm = true;
    if (target.id === 'renameCard') this.editCardNameForm= true;
  }

  protected hideTaskForm(e: Event, cardId: number) {
    const target = e.currentTarget as HTMLElement;

    if (target.classList.contains('close')) this.addTaskForm = false;
    if (target.classList.contains('closeCardName')) this.editCardNameForm = false;

    if (this.newTitleInput?.nativeElement?.classList.contains('border-red-600')) {
      this.newTitleInput.nativeElement.classList.remove('border-red-600');
    }
  }

  //-----------------------------------//

  //Input per il testo del task
  @ViewChild('taskText') taskText!: ElementRef<HTMLInputElement>;

  taskArray: Task[] = []
  idIncrement: number = 0;

  protected addTask(e: Event): void {
    e.preventDefault();
    const task: string = this.taskText.nativeElement.value;
    if (task) {
      this.taskArray.push({
        idTask: this.idIncrement++,         // un id unico usando timestamp
        date: new Date(),       // data attuale
        text: task,             // il testo preso dall'input
        completed: false        // di default non completata
      });
      console.log(this.taskArray)
      this.taskText.nativeElement.value = '';
    }

  }

  //funzione per assegnare la task come completata
  protected checkTask(task: Task): void {
    task.completed = !task.completed;
  }
  //-----------------------------------//

  //Modale Della Card
  @ViewChild('cardModal') cardModal!: ElementRef<HTMLDialogElement>;

  protected renameCardName(e: Event): void {
    // Qui uso la proprietà, che Angular ha inizializzato, per chiudere il dialog
    this.cardModal.nativeElement.close();
    
  }

  // nome attuale della card (paragrafo)
  @ViewChild('cardName') cardName!: ElementRef<HTMLParagraphElement>;

  // input per il nuovo nome della card
  @ViewChild('newTitle') newTitleInput!: ElementRef<HTMLInputElement>;

  protected editCardTitle(e: Event): void {
    e.preventDefault();

    const oldName = this.cardName.nativeElement.textContent;
    const newName = this.newTitleInput.nativeElement.value;

    //console.log('Nome prima della modifica:', oldName);
   //console.log('Nuovo titolo inserito:', newName);

    if (newName) {
      this.cardName.nativeElement.textContent = newName; 
      //this.editCardNameForm = false; 
    } else {
      console.warn('Nessun nuovo nome inserito.');
      this.newTitleInput.nativeElement.classList.add('border-red-600')
    }
  }







}
