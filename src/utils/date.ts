
export class Datetime {

    private date:Date;

    constructor(date:{year:number,month:number,day:number} | null | string){

        if(!date){ 
            this.date = new Date();
            this.date.setMonth(this.date.getMonth() + 1);
            return;
        } 

        if(typeof date == 'string'){
         
            // formato yyyy-mm-dd
            let year = Number(date.substring(0, 4));  
            let month = Number(date.substring(5, 7));
            let day = Number(date.substring(8, 10));

            this.date = new Date(year,month,day);
            
            return;
        }


        this.date = new Date(Number(date.year),Number(date.month + 1),Number(date.day));

    }
    
    public getFullYear(){
        return this.date.getFullYear();
    }    
    
    public getMonth(){
        return this.date.getMonth();
    }    

    public getDate(){
        return this.date.getDate();
    }

    public older(date2: Datetime | Date ): boolean {
    
        if ( (this.date).getFullYear() < date2.getFullYear()) {
            return true;
        }
        if ((this.date).getFullYear() === date2.getFullYear()) {
            if ((this.date).getMonth() < date2.getMonth()) {
                return true;
            }
            if ((this.date).getMonth() === date2.getMonth()) {
                return (this.date).getDate() <= date2.getDate();
            }
        }
        
        return false;
    }

    public recent(date:Datetime | Date){
        return(!this.older(date));
    }


    toString(){
        let dateString = this.date.getFullYear() + '-' + this.date.getMonth() + '-' + this.getDate();
        return(dateString);
    }

    oneMonthAgo(){

        let monthAgo = new Datetime({
            year:this.date.getFullYear(),
            month:this.date.getMonth() - 1,
            day:this.date.getDate()
        });   

        return monthAgo;
    
    }
    







}