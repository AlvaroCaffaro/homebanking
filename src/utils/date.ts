
export class Datetime extends Date {

    
    
    public older(date2: Datetime | Date ): boolean {
    
        if ( this.getFullYear() < date2.getFullYear()) {
            return true;
        }
        if (this.getFullYear() === date2.getFullYear()) {
            if (this.getMonth() < date2.getMonth()) {
                return true;
            }
            if (this.getMonth() === date2.getMonth()) {
                return this.getDate() <= date2.getDate();
            }
        }
        
        return false;
    }

    public recent(date:Datetime | Date){
        return(!this.older(date));
    }


    toLocalFullString(){
        return this.toLocaleString("es-AR", { timeZone: "America/Argentina/Buenos_Aires" });
    }

    oneMonthAgo(){

        let monthAgo = new Datetime(
            this.getFullYear(),
            this.getMonth() - 1,
            this.getDate()
        );   

        return monthAgo;
    
    }
    
}