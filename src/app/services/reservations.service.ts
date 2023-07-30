import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  private ApiURL;

  constructor(private http: HttpClient) {
    this.ApiURL = environment.apiUrl;
   }

   getReservationsList(barId:string){
    const params = new HttpParams().set('barId', barId);
    return this.http.get<any>(`${this.ApiURL}/reservation/listar-reservaciones`,{ params: params }).pipe(
			retry(2)
		);
   }

}
