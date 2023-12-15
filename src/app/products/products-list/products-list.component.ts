import { Component, signal } from '@angular/core';
import { Product } from '../../interfaces/product';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent { 
  addForm    = signal <boolean>(false);
  editForm   = signal <boolean>(false);
  newProduct = signal<Product>({
    title : '',
    price : 0
  });
  products= signal<Product[]>([
    {
      id    : '1',
      title : 'Angular 17',
      price : 1508
    },
    {
      id    : '2',
      title : 'React Js',
      price : 53467
    },
    {
      id    : '3',
      title : 'Node Js',
      price : 6297
    }
  ])

 
  toggleForm(){
    this.editForm.set(false);
    this.addForm.update(etat => !etat)
    this.initForm()
  }

  toDelete(myproduct : Product) {
    // if(confirm()){
     this.products.update(product => product.filter((product) => product.id !== myproduct.id))
    // }
  }
  
  
  addNewProduct() {
    this.addForm.set(false);
    this.editForm.set(false);
    const product = {
      ...this.newProduct(),
      id : uuidv4()
    }
    this.products.update(products => [product, ...products]);
    this.initForm()
  }

  initForm() {
    this.newProduct.set({
      title : '',
      price : 0
    });
  }
  
  editProduct(product : Product) {
    this.addForm.set(true);
    this.editForm.set(true);
    this.newProduct.set(product)
    
  }
  
  updateProduct() {
    this.addForm.set(false);
    this.editForm.set(false);
    this.initForm()
  }
}




