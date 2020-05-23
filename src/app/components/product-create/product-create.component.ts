import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
const snake = require('snakecase-keys');

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  productModel: Product = new Product();

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
  }

  toggleSpinnerProgress() {
    this.spinnerProgress = this.spinnerProgress ? false : true;
  }

  onSubmit() {
    this.toggleSpinnerProgress();
    const prod = snake(this.productModel, {deep: true});
    this.productService.create(prod)
      .subscribe(
        data => {
          this.alert.success = {
            status: true,
            msg: `${data.message}, Please wait for a sec.`
          };
          setTimeout(() => {
            this.router.navigate(['..', data.datas[0].id], {relativeTo: this.route});
          }, 3000);
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
