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
  protected showForm(cardId: number) {
    //console.log('cardId', cardId);

    this.cards.forEach(card => {
      //console.log('card', card);
      if (card.idCard === cardId) {
        //form di aggiunta task
        if (!card.showTaskForm) card.showTaskForm = !card.showTaskForm;
        //console.log('la card :', card.idCard, 'è quella selezionata, quindi il form viene mostrato');

      }
    });


  }

  /**
   * questa funzione gestisce la chiusura del form per aggiungere una task
   * @param e evento che scatenato la funzione
   * @param cardId 
   * Return il form per aggiungere una task vine nascosto
   */
  protected hideForm(cardId: number) {
    this.cards.forEach(card => {
      if (card.idCard === cardId) {
        //form di aggiunta task
        if (card.showTaskForm) card.showTaskForm = false; 
        //form di modifica nome card
        else if (this.editCardNameForm === cardId) this.editCardNameForm = null; 
       
      }
    });
  }

  //-----------------------------------//
  //Logica dei form

  selectedCardId: number | null = null;    // card su cui ho aperto il modal
  editCardNameForm: number | null = null;  // card in cui mostrare il form

  showEditCardModal(idCard: number) {
    this.selectedCardId = idCard;
    //console.log('Selected Card ID:', this.selectedCardId);
    const modal = document.getElementById("editCard") as HTMLDialogElement;
    modal.showModal();
  }

  renameCardNameForm() {
    //console.log('selectedID:', this.selectedCardId);

    if (this.selectedCardId !== null) {
      //console.log('id valido,procediamo con la modifica');
      this.editCardNameForm = this.selectedCardId;   // imposto quale card deve mostrare il form
      const modal = document.getElementById("editCard") as HTMLDialogElement;
      modal.close();

      // Aggiorno solo la card selezionata
      this.cards.forEach(card => {
        //console.log('card:', card);
        if (card.idCard === this.selectedCardId) {
          //console.log('la card attivata è:', card);
          card.editCardName = true;
        } else {
          card.editCardName = false;
        }
      });
    }
  }


  //-----------------------------------//
  idIncrement: number = 0;

  protected addTask(e:Event,idCard:number,taskText:string): void {
    e.preventDefault();
    const task = taskText.trim()
    //console.log('idCard:',idCard)
    //console.log('task:',task)
    this.cards.forEach(card => {
      if (card.idCard === idCard) {
        // Creo la nuova task
        const newTask: Task = {
          idTask: this.idIncrement++,
          text: task,
          date: new Date(),
          completed: false
        };

        // Aggiungo la task alla card
        card.task.push(newTask);
        // Qui svuoto il campo input tramite TS
        (e.target as HTMLFormElement).reset();
      }
    });

    
  }


  //funzione per assegnare la task come completata
  protected checkTask(task: Task): void {
    task.completed = !task.completed;
  }
  //-----------------------------------//

  @ViewChild('oldTitle') oldTitle!: ElementRef<HTMLParagraphElement>;
  

  protected editCardTitle(e: Event, idCard:number ,newTitle:string): void {
    e.preventDefault();

    const oldName = this.oldTitle.nativeElement.textContent; 
    const newName = newTitle;

    console.log('Nome prima della modifica:', oldName);
    console.log('Nuovo titolo inserito:', newName);

    this.cards.forEach(card => {
      if(card.idCard===idCard){
        card.title = newName
        this.hideForm(idCard)
      }
    });
  }




  //-----------------------------------//




}
