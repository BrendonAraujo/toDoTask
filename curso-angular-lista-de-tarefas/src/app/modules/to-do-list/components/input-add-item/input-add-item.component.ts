import {ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild} from '@angular/core';
import {IListItem} from '../../Interface/IListItem.interface';
import {JsonPipe, NgClass} from '@angular/common';

@Component({
  selector: 'app-input-add-item',
  standalone: true,
  imports: [
    JsonPipe,
    NgClass
  ],
  templateUrl: './input-add-item.component.html',
  styleUrl: './input-add-item.component.scss'
})
export class InputAddItemComponent {
  #cdr = inject(ChangeDetectorRef);

  @ViewChild("inputText") public inputText!: ElementRef;

  @Input({required: true}) public  inputListItens: Array<IListItem> = [];
  @Output() public outPutListItem = new EventEmitter<IListItem>();

  public focsAndAddItem(value: string){
    if(value){
      this.#cdr.detectChanges();
      this.inputText.nativeElement.value = "";

      const currentDate = new Date();
      const id = `ID ${currentDate.getFullYear()}`;

      this.outPutListItem.emit({
        id,
        checked: false,
        value
      });
      return this.inputText.nativeElement.focus();
    }
  }
}
