import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { reservationResponse } from '../interfaces/IListarReserva';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  private ApiURL;

  constructor(private http: HttpClient) {
    this.ApiURL = environment.apiUrl;
   }

   getReservationsList(barId:string){
    return this.http.get<reservationResponse>(`${this.ApiURL}/reservation/listar-reservaciones/${barId}`).pipe(
			retry(2)
		);
   }

   deleteReservation(query:any){

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: query
    };

    return this.http.delete<void>(`${this.ApiURL}/reservation`, httpOptions).pipe(
      retry(2)
      );

   }

}
