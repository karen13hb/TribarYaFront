import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ReservationsService } from 'src/app/services/reservations.service';
import { ReservationDto } from 'src/app/interfaces/ReservationDto';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DateTime } from 'luxon';


@Component({
  selector: 'app-modal-generar-reserva',
  templateUrl: './modal-generar-reserva.component.html',
  styleUrls: ['./modal-generar-reserva.component.css']
})
export class ModalGenerarReservaComponent implements OnInit{

  private cantidadDigitos =6;
  public barId = '';
  public zoneUTC="";
  private isToday=false;
  public  formGenerarReserva: FormGroup ;
  public showInput:boolean=false;
  public code=""
  public selectedListaCuando: string = "default";
  private  segundos:number=60;
  public activeModal: NgbActiveModal;

  constructor(private formBuilder: FormBuilder,
	private reservationsService:ReservationsService,
	public activeModals: NgbActiveModal
	){
	this.activeModal = activeModals	
    this.formGenerarReserva = this.formBuilder.group({
			listaCuando: [null, Validators.required],
			fechaReserva: [null],
			horaReserva:[null],
			tiempoEspera: new FormControl({value:null,disabled:false}, [Validators.required]),
			numPersonas: new FormControl({value:null,disabled:false}, [Validators.required]),
			numCelular: [null, Validators.required],
			codigoReserva: new FormControl({value:null,disabled:false}, [Validators.required]),
		});

  }

  ngOnInit() {   
    
  }

  onChange(){
	if(this.selectedListaCuando =="later"){
		this.showInput=true
		this.isToday=false
	}else if(this.selectedListaCuando =="now"){
		this.showInput=false
		this.isToday=true
	}else{
		this.showInput=false
		this.isToday=false
	}	
  }

  performSearch() {
	this.code= this.generarCodigo(this.cantidadDigitos);
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

  covertInputToDto():ReservationDto{
	let timeToWait= this.formGenerarReserva.get('tiempoEspera')?.value
	timeToWait = timeToWait*this.segundos;

	let utcDate: Date | undefined;
	if(this.isToday){
		utcDate = new Date();
	}else{
		const fechaReserva = this.formGenerarReserva.get('fechaReserva')?.value;
		const horaReserva = this.formGenerarReserva.get('horaReserva')?.value;
		const fechaUTC = (new Date(`${fechaReserva}T${horaReserva}`)).toISOString();
		utcDate = (DateTime.fromISO(fechaUTC, { zone: this.zoneUTC }).toUTC()).toJSDate();
	}
	
	
	const reservationData = {
        reservation: {
          zoneUTC: this.zoneUTC,
          numberOfpeople: this.formGenerarReserva.get('numPersonas')?.value
        },
        bar: {
          id: this.barId
        },
        code: this.code,
        timeWaitUserInSeconds: timeToWait,
        isToday: this.isToday,
        fecha_reserva: utcDate,
        phone: this.formGenerarReserva.get('numCelular')?.value
      };

	const reservationDto = new ReservationDto(reservationData);
	return reservationDto

  }

  crearReserva(){

	this.reservationsService.createReservation(this.covertInputToDto()).subscribe(
		(response) => {		  
		  console.log('Reserva creada con éxito', response);
		  this.activeModal.close('Reserva creada');
		},
		(error) => {
		  console.error('Error al crear la reserva', error);
		}
	  );

  }

  
}
