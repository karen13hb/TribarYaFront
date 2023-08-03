export class reservationsDto {

    code: string;
    idBar: string;
    confirmated:boolean;
    expireAt:Date;
    zoneUTC:string;
    numberOfpeople:number;
    isDelete:boolean;
    createDate:Date;
    _id:string;

    
    constructor() {
        this.code="";
        this.idBar="";
        this.confirmated=false;
        this.expireAt=new Date();
        this.zoneUTC="";
        this.numberOfpeople=0;
        this.isDelete=false;
        this.createDate=new Date();
        this._id="";      
    }

}