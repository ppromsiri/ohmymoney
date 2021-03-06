import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService,BsModalRef } from 'ngx-bootstrap/modal';
import { Income } from 'src/app/models/income';
import { IncomeService } from 'src/app/services/income/income.service';
import { FormGroup,FormBuilder } from '@angular/forms';
import { IncomeGroup } from 'src/app/models/income-group';
import { IncomeRequest } from 'src/app/models/income-request';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {

  constructor(
    private modalService: BsModalService,
    private incomeService: IncomeService,
    private fb: FormBuilder) { }
  modalRef: BsModalRef
  incomes: Income[];
  incomeForm: FormGroup;
  incomeGroup: IncomeGroup[];


  ngOnInit() {
    this.getIncomeByUserId(); 
    this.createForm();
    this.getIncomeGroup();
 
  }

  getIncomeGroup(){
    this.incomeService.getIncomeGroup().subscribe(incomeGroup => {
      this.incomeGroup = incomeGroup;
    });
  }

  createForm(){
    this.incomeForm = this.fb.group({
      date: '',
      incomeGroupId: '',
      amount: ''
    });
  }

  getIncomeByUserId() {
    this.incomeService.getIncomeByUserId().subscribe((incomes: Income[]) => {
      this.incomes = incomes;
    });
  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onSubmit(){
    const data ={
      amount: Number(this.incomeForm.get('amount').value),
      date: this.getDateISOString(this.incomeForm.get('date').value),
      incomeGroupId: Number(this.incomeForm.get('incomeGroupId').value)
    } as IncomeRequest;
    this.incomeService.saveIncome(data).subscribe(_=>{
     // this.modalRef.hide();
      this.getIncomeByUserId();
    });
  
  }

  getDateISOString(date: string): string {
    return new Date(date).toISOString();
  }
}
