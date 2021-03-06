import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IncomeComponent } from './income.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { IncomeService } from 'src/app/services/income/income.service';
import { Income } from 'src/app/models/income';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IncomeGroup } from 'src/app/models/income-group';
import { IncomeRequest } from 'src/app/models/income-request';

describe('IncomeComponent', () => {
  let component: IncomeComponent;
  let fixture: ComponentFixture<IncomeComponent>;
  let incomeService: IncomeService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IncomeComponent],
      imports: [ModalModule.forRoot(),
        HttpClientTestingModule,
        ReactiveFormsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    incomeService = TestBed.inject(IncomeService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe('getIncomeByUserId service', () => {
    let expected: Income[];
    beforeEach(() => {
      expected = [{
        id: 1,
        incomeGroupId: 1,
        incomeGroupName: 'งานประจำ',
        amount: 100000,
        date: '1/31/2019'
      }
      ];
      spyOn(incomeService, 'getIncomeByUserId').and.returnValue(of(expected));
    });

    it('should call getIncomeByUserId service when call ngOnInit', () => {
      component.ngOnInit();
      expect(incomeService.getIncomeByUserId).toHaveBeenCalled();
    });
    it('should set incomes when call getIdcomeByUserId is success', () => {
      component.ngOnInit();
      expect(component.incomes).toBe(expected);

    });
  })


  describe('create reactive form', () => {
    it('should set empty in date of form', () => {
      component.ngOnInit();
      expect(component.incomeForm.controls.date.value).toBe('');
    });

    it('should set empty in income group id of form', () => {
      component.ngOnInit();
      expect(component.incomeForm.controls.incomeGroupId.value).toBe('');
    });
    it('should set empty in amount of form', () => {
      component.ngOnInit();
      expect(component.incomeForm.controls.amount.value).toBe('');
    });
    it('should call method getIncomeGroup when call ngOnInit', () => {
      spyOn(incomeService, 'getIncomeGroup').and.returnValue(of([]));
      component.ngOnInit();
      expect(incomeService.getIncomeGroup).toHaveBeenCalled();
    });
    it('should set data in incomeGroup when call getIncomeGroup api is success', () => {
      const expected = [
        {
          "id": 1,
          "name": "เงินเดือน"
        },
        {
          "id": 2,
          "name": "รายได้เสริม"
        }
      ] as IncomeGroup[];
      spyOn(incomeService, 'getIncomeGroup').and.returnValue(of(expected));
      component.ngOnInit();
      expect(component.incomeGroup).toBe(expected);
    });
    it('should call method save income when click submit', () => {
      component.incomeForm.get('date').setValue('15/11/2019');
      component.incomeForm.get('amount').setValue('50000');
      component.incomeForm.get('incomeGroupId').setValue('3');

      spyOn(incomeService, 'saveIncome').and.returnValue(of());
      spyOn(component, 'getDateISOString').and.returnValue('2019-11-15T17:58:17.318Z');
      const expected = {
        amount: 50000,
        date: '2019-11-15T17:58:17.318Z',
        incomeGroupId: 3
      } as IncomeRequest;

      component.onSubmit();
      expect(incomeService.saveIncome).toHaveBeenCalledWith(expected);
    });
    it('should call get income by userID when called sav income success', () => {
      component.incomeForm.get('date').setValue('15/11/2019');
      component.incomeForm.get('amount').setValue('50000');
      component.incomeForm.get('incomeGroupId').setValue('3');

      spyOn(incomeService, 'saveIncome').and.returnValue(of([]));
      spyOn(component, 'getDateISOString').and.returnValue('2019-11-15T17:58:17.318Z');
      spyOn(component, 'getIncomeByUserId');

      component.onSubmit();
      expect(component.getIncomeByUserId).toHaveBeenCalled();
    });
  });
});

