import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Income } from 'src/app/models/income';
import { Observable } from 'rxjs';
import { IncomeGroup } from 'src/app/models/income-group';


@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(private http: HttpClient) { }

  getIncomeByUserId(): Observable<Income[]> {
    return this.http.get<Income[]>(
      'https://working-with-angular.herokuapp.com/income/id/1')
  }

  getIncomeGroup(): Observable<IncomeGroup[]> {
    return this.http.get<IncomeGroup[]>(
      'https://working-with-angular.herokuapp.com/income/group')
  }
}
