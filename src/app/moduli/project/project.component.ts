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
    {
      'idCard': 1, 'title': 'Card 1', 'task': [
        { 'idTask': 1, 'date': new Date(), 'text': 'Fare la spesa', 'completed': false },
        { 'idTask': 2, 'date': new Date(), 'text': 'Andare in lavanderia', 'completed': true }
      ], 'preferiti': false, 'creationDate': new Date(), showTaskForm: false, hideTaskForm: false, editCardName: false
    },
    { 'idCard': 2, 'title': 'Card 2', 'task': [], 'preferiti': false, 'creationDate': new Date(), showTaskForm: false, hideTaskForm: false, editCardName: false },
  ]

  //-----------------------------------//
  //Logica di visualizzazione dei form

  /**
   * Questa funzione gestisce la visualizzazione del form per aggiungere una task 
   * @param e evento che scatenato la funzione
   * @param cardId id della card su cui si vuole aggiungere la task
   * Return il form per aggiungere una task alla card viene mostrato
   */
  protected showTaskForm(e: Event, cardId: number) {
    const target = e.target as HTMLElement;
    console.log('cardId', cardId);

    this.cards.forEach(card => {
      console.log('card', card);
      if (card.idCard === cardId) {
        card.showTaskForm = !card.showTaskForm;
        //console.log('la card :', card.idCard, 'è quella selezionata, quindi il form viene mostrato');

      } else {
        card.showTaskForm = false;
        //console.log('la card :', card.idCard, 'non è quella selezionata, quindi il form viene nascosto');
      }
    });


  }

  /**
   * questa funzione gestisce la chiusura del form per aggiungere una task
   * @param e evento che scatenato la funzione
   * @param cardId 
   * Return il form per aggiungere una task vine nascosto
   */
  protected hideTaskForm(e: Event, cardId: number) {
    const target = e.currentTarget as HTMLElement;

    this.cards.forEach(card => {
      if (card.idCard === cardId) {
        card.showTaskForm = false;
        console.log('la card :', card.idCard, 'è quella selezionata, quindi il form viene nascosto');
      }
    });

    // Rimuovo eventuale bordo rosso sull'input della card selezionata
    if (this.newTitleInput?.nativeElement?.classList.contains('border-red-600')) {
      this.newTitleInput.nativeElement.classList.remove('border-red-600');
    }
  }

  selectedCardId: number | null = null;    // card su cui ho aperto il modal
  editCardNameForm: number | null = null;  // card in cui mostrare il form

  showEditCardModal(idCard: number) {
    this.selectedCardId = idCard;
    console.log('Selected Card ID:', this.selectedCardId);
    const modal = document.getElementById("editCard") as HTMLDialogElement;
    modal.showModal();
  }

  renameCardNameForm() {
    console.log('selectedID:', this.selectedCardId);

    if (this.selectedCardId !== null) {
      console.log('id valido,procediamo con la modifica');
      this.editCardNameForm = this.selectedCardId;   // imposto quale card deve mostrare il form
      const modal = document.getElementById("editCard") as HTMLDialogElement;
      modal.close();

      // Aggiorno solo la card selezionata
      this.cards.forEach(card => {
        console.log('card:', card);
        if(card.idCard=== this.selectedCardId) {
          console.log('la card attivata è:', card);
          card.editCardName = true; 
        }else{
          card.editCardName = false; 
        }
      });
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


  //-----------------------------------//




}
