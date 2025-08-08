import { Task } from "../type/task.type";

export class Card {
    idCard: number;
    title: string;
    task: Task[];          
    preferiti: boolean;
    creationDate: Date;

    constructor(idCard: number, title: string, task: Task[], preferiti: boolean, creationDate: Date) {
        this.idCard = idCard;
        this.title = title;
        this.task = task;   
        this.preferiti = preferiti;
        this.creationDate = creationDate;
    }
}
