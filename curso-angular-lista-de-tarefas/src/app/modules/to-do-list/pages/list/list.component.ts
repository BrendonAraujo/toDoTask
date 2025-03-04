import {Component, signal} from '@angular/core';
import {InputAddItemComponent} from '../../components/input-add-item/input-add-item.component';
import {IListItem} from '../../Interface/IListItem.interface';
import {JsonPipe, NgOptimizedImage} from '@angular/common';
import {InputListItemComponent} from '../../components/input-list-item/input-list-item.component';

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
    return JSON.parse(localStorage.getItem('@my-list') || '[]')
  }

  public getInputAndAddItem(item: IListItem) {
    console.log(item);
    localStorage.setItem(
      '@my-list',
      JSON.stringify([...this.setListItens(), item])
    );

    return this.setListItens.set(this.parseItems());
  }

  public deleteAllItens() {
    localStorage.removeItem('@my-list');
    return this.setListItens.set(this.parseItems());
  }
}
