export class ReservationDto {
  constructor(
    public reservation: {
      zoneUTC: string;
      numberOfPeople: number;
    },
    public bar: {
      id: string;
    },
    public code: string,
    public timeWaitUserInSeconds: number
  ) {}
}