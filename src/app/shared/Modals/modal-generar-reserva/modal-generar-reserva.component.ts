import { Component } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ReservationsService } from 'src/app/services/reservations.service';
import { ReservationDto } from 'src/app/interfaces/ReservationDto';

@Component({
  selector: 'app-modal-generar-reserva',
  templateUrl: './modal-generar-reserva.component.html',
  styleUrls: ['./modal-generar-reserva.component.css']
})
export class ModalGenerarReservaComponent {

  public barId = '';
  formGenerarReserva: FormGroup ;
  showInput:boolean=false;
  code=""
  selectedListaCuando: string = "default";
  disabled =false

  constructor(private formBuilder: FormBuilder,
	private reservationsService:ReservationsService,
	){

    this.formGenerarReserva = this.formBuilder.group({
			listaCuando: [null, Validators.required],
			fechaReserva: [null],
			horaReserva:[null],
			tiempoEspera: new FormControl({value:null,disabled:false}, [Validators.required,Validators.maxLength(6)]),
			numPersonas: new FormControl({value:null,disabled:false}, [Validators.required,Validators.maxLength(6)]),
			numCelular: [null, Validators.required],
			codigoReserva: new FormControl({value:null,disabled:false}, [Validators.required,Validators.maxLength(6)]),
		});

  }

  onChange(){
	if(this.selectedListaCuando =="later"){
		this.showInput=true
	}else{
		this.showInput=false
	}	
  }
  submitForm() {
    
  }

  performSearch() {
	this.code= this.generarCodigo(6);
	//this.formGenerarReserva.get('codigoReserva')?.disable();
	
  }

  generarCodigo(length: number): string {
	const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let codigo = '';
  
	for (let i = 0; i < length; i++) {
	  const randomIndex = Math.floor(Math.random() * caracteres.length);
	  codigo += caracteres.charAt(randomIndex);
	}
  
	return codigo;
  }

  crearReserva(){
	const reserva = new ReservationDto(
		{
		  zoneUTC: 'America/Bogota',
		  numberOfPeople: this.formGenerarReserva.get('numPersonas')?.value
		},
		{
		  id: this.barId
		},
		this.code,
		this.formGenerarReserva.get('tiempoEspera')?.value
	  );

	this.reservationsService.createReservation(reserva)

	console.log(reserva)

  }

  
}
