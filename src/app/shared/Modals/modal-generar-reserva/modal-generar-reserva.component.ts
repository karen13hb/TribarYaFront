import { Component, OnInit ,ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ReservationsService } from 'src/app/services/reservations.service';
import { ReservationDto } from 'src/app/interfaces/ReservationDto';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DateTime } from 'luxon';
import * as intlTelInput from 'intl-tel-input';



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

  private  segundos:number=60;
  public activeModal: NgbActiveModal;

  constructor(private formBuilder: FormBuilder,
	private reservationsService:ReservationsService,
	public activeModals: NgbActiveModal,
	private cdr: ChangeDetectorRef
	){
	this.activeModal = activeModals	
    this.formGenerarReserva = this.formBuilder.group({
			listaCuando: new FormControl({value:'default',disabled:false}, [Validators.required]),
			fechaReserva: [null],
			horaReserva:[null],
			tiempoEspera: new FormControl({value:null,disabled:false}, [Validators.required]),
			numPersonas: new FormControl({value:null,disabled:false}, [Validators.required]),
			numCelular:new FormControl({value:null,disabled:false}, [Validators.required]),
			codigoReserva: new FormControl({value:null,disabled:true}, [Validators.required]),
			phone: new FormControl({value:null,disabled:false}, [Validators.required]),
		});

		this.formGenerarReserva.get('listaCuando')?.valueChanges.subscribe(value => {
			this.onChange(value);
		});

		  //console.log('Initial form values and status:', this.formGenerarReserva.value, this.formGenerarReserva.status);
  }

  ngOnInit() {   
    this.performSearch()

	const inputElement = document.querySelector('#numCelular');

  }

  public toggleformGenerarReserva():void{

	const fechaReservaControl = this.formGenerarReserva.get('fechaReserva');
    const horaReservaControl = this.formGenerarReserva.get('horaReserva');

    if (this.isToday) {
		fechaReservaControl?.clearValidators();
		horaReservaControl?.clearValidators();
		fechaReservaControl?.setValue(null);
    	horaReservaControl?.setValue(null);
    } else {
	  fechaReservaControl?.setValidators([Validators.required]);
      horaReservaControl?.setValidators([Validators.required]);
    }
  }
  public onChange(value: string):void {

	if(value =="later"){
		this.showInput=true
		this.isToday=false
	}else if(value =="now"){
		this.showInput=false
		this.isToday=true
	}else{
		this.showInput=false
		this.isToday=false
	}
	
	this.toggleformGenerarReserva()
	this.cdr.detectChanges();
  }

  public performSearch():void {
	const newCode = this.generarCodigo(this.cantidadDigitos);
	const codigoReservaControl = this.formGenerarReserva.get('codigoReserva');
    if (codigoReservaControl) {
    
      codigoReservaControl.setValue(newCode);
    }
  }

  public generarCodigo(length: number): string {
	const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let codigo = '';
  
	for (let i = 0; i < length; i++) {
	  const randomIndex = Math.floor(Math.random() * caracteres.length);
	  codigo += caracteres.charAt(randomIndex);
	}
  
	return codigo;
  }

  public covertInputToDto():ReservationDto{
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
        code: this.formGenerarReserva.get('codigoReserva'),
        timeWaitUserInSeconds: timeToWait,
        isToday: this.isToday,
        fecha_reserva: utcDate,
        phone: this.formGenerarReserva.get('numCelular')?.value
      };

	const reservationDto = new ReservationDto(reservationData);
	return reservationDto

  }

  public crearReserva():void{

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
