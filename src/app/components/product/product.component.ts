import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
const camel = require('camelcase-keys');

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productModel: Product[] = [];
  productModelBackup: Product[] = [];

  search = '';

  public alert = {
    success: {
      status: false,
      msg: ''
    },
    danger: {
      status: false,
      msg: ''
    },
    warning: {
      status: false,
      msg: ''
    }
  };

  spinnerProgress = true;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadProduct();
  }

  searchProduct() {
    console.log('Search product', this.search);
    if (this.search.length > 0) {
      const s = this.search.toUpperCase();
      this.productModel = this.productModelBackup.filter(p => (p.name.toUpperCase().includes(s) ||
        p.productCode.toUpperCase().includes(s) || p.price === Number(s)));
    } else {
      this.productModel = this.productModelBackup;
    }
  }

  loadProduct() {
    this.productService.findAll().subscribe(
      data => {
        this.productModelBackup = camel(data.datas, {deep: true});
        this.productModel = this.productModelBackup;
        this.toggleSpinnerProgress();
      },
      err => {
        this.alert.danger = {
          status: true,
          msg: err.error.message
        };
        this.toggleSpinnerProgress();
      }
    );
  }

  toggleSpinnerProgress() {
    this.spinnerProgress = this.spinnerProgress ? false : true;
  }

  onDelete(productId: number) {
    if (confirm(`Please confirm to delete this item?`)) {
      this.toggleSpinnerProgress()
      this.productService.deleteById(productId)
        .subscribe(
          data => {
            console.log('Delete success', data);
            this.productModelBackup = this.productModelBackup.filter(p => p.id !== productId);
            this.productModel = this.productModelBackup;
            this.toggleSpinnerProgress();
          },
          err => {
            this.alert.danger = {
              status: true,
              msg: err.error.message
            };
            this.toggleSpinnerProgress();
          }
        );
    }
  }

  onSeeDetails(productId: number) {
    this.router.navigate([productId], {relativeTo: this.route});
  }

}
