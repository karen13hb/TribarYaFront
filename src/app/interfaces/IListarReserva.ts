export interface Reservation {
  _id: string;
  code: string;
  expireAt: Date;
  idBar: string;
  createDate: Date;
  confirmated: boolean;
  zoneUTC: string;
  numberOfpeople: number;
  isDelete: boolean;
  timeInSeconds:number;
  progressBar:number;
  timeWaitUserInSeconds:Date;

}

export interface reservationResponse {
  reservations: Reservation[];
  timeActual: Date;
}