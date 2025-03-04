import {ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, Output, ViewChild} from '@angular/core';
import {IListItem} from '../../Interface/IListItem.interface';

@Component({
  selector: 'app-input-add-item',
  standalone: true,
  imports: [],
  templateUrl: './input-add-item.component.html',
  styleUrl: './input-add-item.component.scss'
})
export class InputAddItemComponent {
  #cdr = inject(ChangeDetectorRef);

  @ViewChild("inputText") public inputText!: ElementRef;

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
      })
      console.log("aa")
      return this.inputText.nativeElement.focus();
    }
  }
}
