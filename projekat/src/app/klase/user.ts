export class User {

    public id_korisnika:number;
    public ime:string;
    public lozinka:string;
    public email:string;
    
    public static FromJSON(objekat:any):User
    {  
        let korisnik=new User();
        korisnik.id_korisnika = objekat.id_korisnika;
        korisnik.ime=objekat.ime;
        korisnik.lozinka=objekat.lozinka;
        korisnik.email=objekat.email;

        return korisnik;
    }


    public static FromJsonToArray(objekat:any):User[]
    {
        let n=objekat.length;
        let korisnici:User[]=[]; 

        for(let i=0;i<n;i++)
        {
            korisnici.push(this.FromJSON(objekat[i]));
        }

        return korisnici;
    }
}
