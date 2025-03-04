import {Component, EventEmitter, Input, Output, output} from '@angular/core';
import {IListItem} from '../../Interface/IListItem.interface';

@Component({
  selector: 'app-input-list-item',
  standalone: true,
  imports: [],
  templateUrl: './input-list-item.component.html',
  styleUrl: './input-list-item.component.scss'
})

export class InputListItemComponent {
  @Input({required: true}) public inputListItens: IListItem[] = [];

  @Output() public outPutUpdateItemCheckbox = new EventEmitter<{
    id: string;
    checked : boolean
  }>();

  public updateItemCheckbox(id:string, checked:boolean){
    return this.outPutUpdateItemCheckbox.emit({id, checked});
  }

  @Output() public outPutUpdateItemValue = new EventEmitter<{
    id: string;
    value : string
  }>();

  public updateItemValue(id:string, value:string){
    return this.outPutUpdateItemValue.emit({id, value});
  }
}
