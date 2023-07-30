export class reservationsDto {

    code: string;
    idBar: string;
    confirmated:boolean;
    expireAt:Date;
    zoneUTC:string;
    numberPeople:number;
    isDelete:boolean;
    createDate:Date;
    idReserva:string;

    
    constructor() {
        this.code="";
        this.idBar="";
        this.confirmated=false;
        this.expireAt=new Date();
        this.zoneUTC="";
        this.numberPeople=0;
        this.isDelete=false;
        this.createDate=new Date();
        this.idReserva="";      
    }

}