import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/public_api';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Income } from 'src/app/models/income';
import { IncomeService } from 'src/app/services/income/income.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {

  constructor(private modalService: BsModalService,private incomeService: IncomeService) { }
  modalRef: BsModalRef
  incomes: Income[];

  ngOnInit() {
  this.incomeService.getIncomeByUserId();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
 