export class ReservationDto {
  reservation: {
    zoneUTC: string;
    numberOfpeople: number;
  };
  bar: {
    id: string;
  };
  code: string;
  timeWaitUserInSeconds: number;
  isToday: boolean;
  fecha_reserva: string;
  phone: string;

  constructor(data: any) {
    this.reservation = {
      zoneUTC: data.reservation.zoneUTC,
      numberOfpeople: data.reservation.numberOfpeople
    };
    this.bar = {
      id: data.bar.id
    };
    this.code = data.code;
    this.timeWaitUserInSeconds = data.timeWaitUserInSeconds;
    this.isToday = data.isToday;
    this.fecha_reserva = data.fecha_reserva;
    this.phone = data.phone;
  }
}