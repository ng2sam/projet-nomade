import { Injectable, Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'directoryFilter'
})
// @Injectable()
export class DirectoryFilter implements PipeTransform {

    /*transform(value: IProduct[], filterBy: string): IProduct[] {
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return filterBy ? value.filter((product: IProduct) =>
            product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
  }*/
    transform(value: any[], filterBy: string): any[] {
        console.log(filterBy);
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return filterBy ? value.filter((contact: any) =>
            contact.name.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
  }
}
