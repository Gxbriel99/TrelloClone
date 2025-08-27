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
      idCard: 1,
      title: 'Card 1',
      task: [
        { idTask: 1, date: new Date(), text: 'Fare la spesa', completed: true },
        { idTask: 2, date: new Date(), text: 'Andare in lavanderia', completed: false },
        { idTask: 3, date: new Date(), text: 'prendere i bambini', completed: true }
      ],
      creationDate: new Date(),
      showTaskForm: false,
      hideTaskForm: false,
      editCardName: false,
      cardColor: null
    },
    {
      idCard: 2,
      title: 'Card 2',
      task: [],
      creationDate: new Date(),
      showTaskForm: false,
      hideTaskForm: false,
      editCardName: false,
      cardColor: null
    },
  ];


  selectedCardId: number | null = null;   

  //Logica di visualizzazione dei form

  /**
   * Questa funzione gestisce la visualizzazione del form per aggiungere una task 
   * @param e evento che scatenato la funzione
   * @param cardId id della card su cui si vuole aggiungere la task
   * Return il form per aggiungere una task alla card viene mostrato
   */
  protected showForm(cardId: number) {
    //console.log('cardId', cardId);

    this.cards.find(card => {
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
    this.cards.find(card => {
      if (card.idCard === cardId) {
        //form di aggiunta task
        if (card.showTaskForm) card.showTaskForm = false; 
        //form di modifica nome card
        else if (this.editCardNameForm === cardId) this.editCardNameForm = null; 
       
      }
    });
  }

  editCardNameForm: number | null = null;  // card in cui mostrare il form

  protected renameCardNameForm() {
    //console.log('selectedID:', this.selectedCardId);
    if (this.selectedCardId !== null) {
      this.editCardNameForm = this.selectedCardId;   // imposto quale card deve mostrare il form
      // Aggiorno solo la card selezionata
      const card = this.cards.find(card => card.idCard === this.selectedCardId);

      if (card) card.editCardName = true;
      else card!.editCardName = false;

    }
  }

  //-----------------------------------//
  //Logica dei form

  /**
   * Questa funzione gestisce l'inserimento di una nuova task nell'array TASK[] della card selezionata
   * @param e evento
   * @param idCard id della card in cui voglio inserire la task
   * @param taskText task da aggiungere
   * 
   * Return la task viene aggiunta all' array TASK[] della card selezionata(con id inventato)
   */

  protected addTask(e: Event, idCard: number, taskText: string): void {
    e.preventDefault();

    let idIncrement: number = 0; // contatore interno(Sto simulando solo FE tramite un array)

    const task = taskText.trim();
    //console.log('task:', task)

    const card:Card= this.cards.find(card => card.idCard === this.selectedCardId)!

    //console.log('card',card)


    const newTask: Task = {
      idTask: idIncrement++,
      text: task,
      date: new Date(),
      completed: false
    };

    if (card) card.task.push(newTask);  // Aggiungi la task all'array della card se esiste

    // Svuota il campo input
    (e.target as HTMLFormElement).reset();

    //console.log(this.cards);
  }

  /**
   * Questa funzione aggiorna il nome della card selezionata
   * @param e evento
   * @param idCard id della card da rinominare
   * @param newTitle nuovo nome della card
   * 
   * return la card con il nome aggiornato nell'array cards(da aggiungere la logica degli errori)
   */
  protected editCardTitle(e: Event, idCard: number, newTitle: string): void {
    e.preventDefault();
    const newName = newTitle;

    const card: Card = this.cards.find(card => card.idCard === this.selectedCardId)!

    if (card) card.title = newName
    this.hideForm(idCard)
  }
  
  //-----------------------------------//
  //Logica dei modal

  protected duplicateCard(): void {
     let nextCardId:number = 3; // contatore interno(parto da 3 perche in questa versione sto simulando le card dal frontend)
    if (this.selectedCardId !== null) {
      const card: Card = this.cards.find(card => card.idCard === this.selectedCardId)!
      if (card) {
        const newCard = {
          ...card,                           // copia tutte le proprietà
          idCard: nextCardId++,             // nuovo id 
          showTaskForm: false,
          hideTaskForm: false, 
          editCardName: false
        };

        this.cards.push(newCard);
        console.log(this.cards)
      }
    }
  }

  protected deleteCard(): void {
    if (this.selectedCardId === null) return;

    console.log('idCard:', this.selectedCardId);

    // Rimuovo la card selezionata
    this.cards = this.cards.filter(card => card.idCard !== this.selectedCardId);

    console.log('cards aggiornate:', this.cards);

    // Reset del selectedCardId
    this.selectedCardId = null;
  }

  
  protected changeColor(color: string|null) {
    //console.log('colore:', color);
    const card = this.cards.find(card => card.idCard === this.selectedCardId);
    if (card) card.cardColor = color; 
    else card!.cardColor=null
  }

  //-----------------------------------//
  //Logica dei Checked 

  //funzione per assegnare la task come completata
  protected checkTask(task: Task): void {
    task.completed = !task.completed;
  }
  
}
