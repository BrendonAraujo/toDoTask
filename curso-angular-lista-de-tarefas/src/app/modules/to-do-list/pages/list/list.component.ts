import {Component, signal} from '@angular/core';
import {InputAddItemComponent} from '../../components/input-add-item/input-add-item.component';
import {IListItem} from '../../Interface/IListItem.interface';
import {JsonPipe, NgOptimizedImage} from '@angular/common';
import {InputListItemComponent} from '../../components/input-list-item/input-list-item.component';
import {ELocalStorage} from '../../Enum/ELocalStorage.enum';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [InputAddItemComponent, InputListItemComponent, NgOptimizedImage],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  public addItem = signal(true)

  private setListItens = signal<IListItem[]>(this.parseItems());
  public getListItens = this.setListItens.asReadonly();

  private parseItems() {
    return JSON.parse(localStorage.getItem(ELocalStorage.MY_LIST) || '[]')
  }

  public getInputAndAddItem(item: IListItem) {
    console.log(item);
    localStorage.setItem(
      ELocalStorage.MY_LIST,
      JSON.stringify([...this.setListItens(), item])
    );

    return this.setListItens.set(this.parseItems());
  }

  public deleteAllItens() {
    localStorage.removeItem(ELocalStorage.MY_LIST);
    return this.setListItens.set(this.parseItems());
  }

  public listItensStage(value: 'pending' | 'completed'): IListItem[] {
    return this.getListItens().filter((res: IListItem) => {
      if(value === 'pending') {
        return !res.checked;
      }else if (value == 'completed'){
        return  res.checked;
      }
      return res;
    });
  }

  public updateItemCheckbox(newItem: { id: string; checked: boolean }) {
    this.setListItens.update((oldValue: IListItem[]) => {
      oldValue.filter(res => {
        if(res.id === newItem.id){
          res.checked = newItem.checked;
        }
        return res;
      })
      return oldValue;
    })

    this.updateLocalStorage();
  }

  public updateItemValue(newItem: { id: string; value: string }) {
    this.setListItens.update((oldValue: IListItem[]) => {
      oldValue.filter(res => {
        if(res.id === newItem.id){
          res.value = newItem.value;
        }
        return res;
      })
      return oldValue;
    })
    this.updateLocalStorage();
  }

  public deleteItem(id: string) {
    this.setListItens.update((oldValue: IListItem[]) => {
      return oldValue.filter((res) => res.id !== id);
    });
    return localStorage.setItem(ELocalStorage.MY_LIST, JSON.stringify(this.parseItems()));
  }

  private updateLocalStorage(){
    return localStorage.setItem(ELocalStorage.MY_LIST, JSON.stringify(this.setListItens()));
  }
}
