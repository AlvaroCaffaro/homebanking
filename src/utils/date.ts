
export class Datetime {

    private date:Date;

    constructor(dateString:string){

        this.date = new Date();
    }

    public static compareDates(date1: Date, date2: Date): boolean {
    
        if (date1.getFullYear() < date2.getFullYear()) {
            return true;
        }
        if (date1.getFullYear() === date2.getFullYear()) {
            if (date1.getMonth() < date2.getMonth()) {
                return true;
            }
            if (date1.getMonth() === date2.getMonth()) {
                return date1.getDate() <= date2.getDate();
            }
        }
        
        return false;
    }







}