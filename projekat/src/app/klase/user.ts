export class User {

    public id_korisnika:number;
    public name:string;
    public password:string;
    public email:string;
    public password_confirmation:string;

    public static FromJSON(objekat:any):User
    {  
        let korisnik=new User();
        korisnik.id_korisnika = objekat.id_korisnika;
        korisnik.name=objekat.name;
        korisnik.password=objekat.password;
        korisnik.email=objekat.email;
        korisnik.password_confirmation=objekat.password_confirmation;
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
