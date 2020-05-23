import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
const camel = require('camelcase-keys');
const snake = require('snakecase-keys');
const $ = require('jquery');


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productId: number;

  productModel: Product = new Product();
  productModelBackup: Product = new Product();

  editMode = false;

  readonlyStatus = '';

  spinnerProgress = false;

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

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.toggleSpinnerProgress();
    this.route.paramMap.subscribe(obs => {
      this.productId = Number(obs.get('productId'));
      this.productService.findById(this.productId)
        .subscribe(
          data => {
            this.productModelBackup = camel(data.datas[0], {deep: true});
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
    });
  }

  toggleSpinnerProgress() {
    this.spinnerProgress = this.spinnerProgress ? false : true;
  }

  toggleEditMode(isTurnOn: boolean = false) {
    this.editMode = isTurnOn;
    if (isTurnOn) {
      $('.form-control').prop('readonly', false);
    } else {
      $('.form-control').prop('readonly', true);
      this.productModel = this.productModelBackup;
    }
  }

  onSave() {
    if (confirm('Please confirm to edit this item!')) {
      this.toggleSpinnerProgress();
      const product: Product = snake(this.productModel, {deep: true});
      this.productService.updateById(this.productId, product)
      .subscribe(
        data => {
          console.log('Update success', data);
          this.toggleSpinnerProgress();
          this.toggleEditMode(false);
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

}
