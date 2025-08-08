import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'menuCustom',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  ngOnInit(): void {
    
    
  }

  /**
   *  1) Passo l'evento tramite Change nella checkbox e la stampo in console
   *  2) verifico lo stato della checkbox ricevuta
   *  3) definisco il tema in base alla risposta 
   *  4) assegno la classe al documento
   * @param event 
   * @returns La classe selezionata
   */
  darkMode(event: Event) {
    console.log('event',event)
    const checked = (event.target as HTMLInputElement).checked;
    const theme = checked ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
  }

}

