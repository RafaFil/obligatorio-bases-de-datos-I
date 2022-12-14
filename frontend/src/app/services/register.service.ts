import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPreguntas } from '../interfaces/iPreguntas';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  registerUser(user: Object): Observable<boolean> {
    return this.http.post<boolean>(url, user);
  }

  getAllQuestions(): Observable<IPreguntas[]> {
    return this.http.get<IPreguntas[]>(url);
  }

  ValidateID(id: string | null | undefined): boolean {
    if (!id) {
      return false;
    }
    else {
      const sevenDigitID = [1, 2, 3, 4, 7, 6];
      const eightDigitID = [8, 1, 2, 3, 4, 7, 6]
      const charID = id.split('');
      let sum = 0;

      if (charID.length == 7) {
        for (let index = 0; index <= charID.length - 2; index++) {
          let number = Number.parseInt(charID[index]);
          sum += number * sevenDigitID[index];
        };
        const lastDigit = sum % 10;
        if (lastDigit != Number.parseInt(charID[charID.length - 1])) {
          return false;
        }
        return true;
      }

      else if (charID.length == 8) {
        for (let index = 0; index <= charID.length - 2; index++) {
          let number = Number.parseInt(charID[index]);
          sum += number * eightDigitID[index];
        };
        const lastDigit = sum % 10;
        if (lastDigit != Number.parseInt(charID[charID.length - 1])) {
          return false;
        }
        return true;
      }

      else {
        return false
      }
    }
  };



}

const url = environment.backend_url + '/registrar';