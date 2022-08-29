import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  headerFilter: string = '';

  constructor() {}
  public getFilter(): string {
    return this.headerFilter;
  }
  public setFilter(data: any): void {
    this.headerFilter = data;
    console.log(data);
  }

  public show() {
    var count: number = this.headerFilter.length;
    if (count == 0) {
      return true;
    } else {
      return false;
    }
    console.log(count);
  }
}
