import { Task } from "../type/task.type";

export class Card {
    idCard: number;
    title: string;
    task: Task[];          
    preferiti?: boolean;
    creationDate: Date;
    editCardName: boolean = false;
    hideTaskForm: boolean = false;
    showTaskForm: boolean = false;
    cardColor:string|null

    constructor(idCard: number, title: string, task: Task[], preferiti: boolean, creationDate: Date, showTaskForm: boolean = false, hideTaskForm: boolean = false, editCardName: boolean = false,cardColor:string|null) {
        this.idCard = idCard;
        this.title = title;
        this.task = task;   
        this.preferiti = preferiti;
        this.creationDate = creationDate;
        this.showTaskForm = showTaskForm;
        this.hideTaskForm = hideTaskForm;
        this.editCardName = editCardName;
        this.cardColor=cardColor
    }
}
