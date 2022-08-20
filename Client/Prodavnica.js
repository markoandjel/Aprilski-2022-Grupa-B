import { Sastojak } from "./Sastojak.js";

export class Prodavnica{
    
    constructor(id,mesta,naziv)
    {
        this.id=id;
        this.mesta=mesta;
        this.naziv=naziv;
        this.kontejner=null;
        this.zarada=0;
        this.listaSastojaka=[];
        this.listaPriloga=[];
        this.cenaHleba = 30;
    }
    crtajProdavnicu(host)
    {
        this.kontejner=host;

        let divZaProdavnicu = document.createElement("div");
        divZaProdavnicu.className="divZaProdavnicu";
        this.kontejner.appendChild(divZaProdavnicu);

        let nazivProdavnice = document.createElement("header");
        nazivProdavnice.innerHTML=this.naziv+" - "+this.zarada+" din";
        nazivProdavnice.className="nazivProdavnice";
        divZaProdavnicu.appendChild(nazivProdavnice);

        var divGlavni = document.createElement("div");
        divGlavni.className="divGlavni";
        divZaProdavnicu.appendChild(divGlavni);

        var divZaFiltere = document.createElement("div");
        divZaFiltere.className="divZaFiltere"
        divGlavni.appendChild(divZaFiltere);

        let divZaPrikaz = document.createElement("div");
        divZaPrikaz.classList.add("divZaPrikaz");
        divZaPrikaz.classList.add(`divZaPrikaz${this.id}`);
        divGlavni.appendChild(divZaPrikaz);

        var divZaMesto = document.createElement("div");
        divZaMesto.className=`divZaMesto`;
        divZaFiltere.appendChild(divZaMesto);

        var divZaSastojak = document.createElement("div");
        divZaSastojak.className="divZaSastojak";
        divZaFiltere.appendChild(divZaSastojak);

        var divZaKolicinu = document.createElement("div");
        divZaKolicinu.className="divZaKolicinu";
        divZaFiltere.appendChild(divZaKolicinu);

        var dugmeDodaj = document.createElement("button");
        dugmeDodaj.className="dugmeDodaj";
        dugmeDodaj.innerHTML="Dodaj";
        dugmeDodaj.addEventListener("click",()=>this.dodajSastojak())
        divZaFiltere.appendChild(dugmeDodaj);
        
        var labelZaMesto = document.createElement("label");
        labelZaMesto.innerHTML="Sto"
        divZaMesto.appendChild(labelZaMesto);
        var selectZaMesto = document.createElement("select");
        selectZaMesto.classList.add(`selectZaMesto${this.id}`)
        divZaMesto.appendChild(selectZaMesto);

        for(var pom=1;pom<=this.mesta;pom++)
        {
            var izbor=document.createElement("option");
            izbor.innerHTML=pom;
            selectZaMesto.appendChild(izbor);
        }

        this.pribaviSastojke(divZaSastojak);//pribavljanje sastojaka

        var labelZaKolicinu = document.createElement("label");
        labelZaKolicinu.className="labelZaKolicinu";
        labelZaKolicinu.innerHTML="Kolicina"
        divZaKolicinu.appendChild(labelZaKolicinu);
        var inputKolicina = document.createElement("input");
        inputKolicina.type="number";
        inputKolicina.className=`inputKolicina${this.id}`
        divZaKolicinu.appendChild(inputKolicina);
        
    }

    pribaviSastojke(divZaSastojak)
    {
        fetch(`https://localhost:5001/Ispit/vratiSastojke/${this.id}`,{method:"GET"}).then(p=>{
            p.json().then(data=>{
                data.forEach(sastojak => {
                    var pom = new Sastojak(sastojak.id,sastojak.naziv,sastojak.cena,sastojak.kolicina)
                    this.listaSastojaka.push(pom);
                });
                this.izborSastojaka(divZaSastojak);
            })
        })
    }

    izborSastojaka(divZaSastojak)
    {
        var labelZaSastojak = document.createElement("label");
        labelZaSastojak.innerHTML="Sastojak"
        divZaSastojak.appendChild(labelZaSastojak);
        var selectZaSastojak = document.createElement("select");
        selectZaSastojak.classList=`selectZaSastojak${this.id}`
        divZaSastojak.appendChild(selectZaSastojak);
        
        this.listaSastojaka.forEach(p=>{
            var izbor=document.createElement("option");
            izbor.innerHTML=p.naziv;
            izbor.value=p.naziv;
            selectZaSastojak.appendChild(izbor);
        })

    }

    dodajSastojak()
    {
        var inputKolicina = document.querySelector(`.inputKolicina${this.id}`);
        var selectSastojak = document.querySelector(`.selectZaSastojak${this.id}`);
        var selectZaMesto = document.querySelector(`.selectZaMesto${this.id}`);
        var divZaPrikaz = document.querySelector(`.divZaPrikaz${this.id}`);

        if(inputKolicina.value==0)
        {
            alert("Niste uneli kolicinu sastojaka");
        }
        else
        {

            var proveraStola = divZaPrikaz.querySelector(`.divZaSto${selectZaMesto.value}`);
            if(proveraStola==null)
            {
                var divZaSto = document.createElement("div");
                divZaSto.classList.add("divZaSto");
                divZaSto.classList.add(`divZaSto${selectZaMesto.value}`);
                divZaPrikaz.appendChild(divZaSto);

                var brojStola=document.createElement("header");
                brojStola.classList.add("brojStola")
                brojStola.innerHTML=`Sto: ${selectZaMesto.value}`
                divZaSto.appendChild(brojStola);


                var divZaSendvic = document.createElement("div");
                divZaSendvic.className="divZaSendvic";
                divZaSto.appendChild(divZaSendvic);

                var divHlebGornji = document.createElement("div");
                divHlebGornji.className="divHlebGornji";
                divZaSendvic.appendChild(divHlebGornji);

                var divPrilozi = document.createElement("div");
                divPrilozi.className="divPrilozi";
                divZaSendvic.appendChild(divPrilozi);

                var divHlebDonji = document.createElement("div");
                divHlebDonji.className="divHlebDonji";
                divZaSendvic.appendChild(divHlebDonji);

                var labelCena= document.createElement("label");
                labelCena.classList.add("labelaCena");
                labelCena.innerHTML=this.cenaHleba;  
                divZaSto.appendChild(labelCena);

                var buttonKupi = document.createElement("button");
                buttonKupi.className="buttonKupi";
                buttonKupi.innerHTML="Isporuci";
                buttonKupi.value=this.id-1;
                buttonKupi.addEventListener("click",()=>this.kupiSendvic(labelCena,buttonKupi.value,divPrilozi))

                this.dodajPrilog(divPrilozi,labelCena,inputKolicina,selectSastojak)

                divZaSto.appendChild(buttonKupi);
            }
            else
            {
                var divPrilozi = proveraStola.querySelector(`.divPrilozi`);
                var labelaCena = proveraStola.querySelector(`.labelaCena`);
                //buttonKupi.addEventListener("click",()=>this.kupiSendvic(labelaCena))

                this.dodajPrilog(divPrilozi,labelaCena,inputKolicina,selectSastojak)
            }

        }
        
    }

    dodajPrilog(divPrilozi,labelCena,inputKolicina,selectSastojak)
    {
        var divSastojak = document.createElement("div");
        divSastojak.className="divSastojak";
        divSastojak.value=selectSastojak
        divPrilozi.appendChild(divSastojak);

        var prilog=inputKolicina.value*this.listaSastojaka.find(p=>p.naziv==selectSastojak.value).cena
        var prethodnaCena=parseInt(labelCena.innerHTML);
        labelCena.innerHTML=prethodnaCena+prilog;

        divSastojak.style.background='red';
        var visina=10*inputKolicina.value;
        divSastojak.style.border="1px solid black"
        divSastojak.style.height=`${visina}px`;

        
        var pom = new Sastojak(this.id,selectSastojak.value,inputKolicina.value)
        console.log(selectSastojak.value)
        console.log(this.listaSastojaka.find(p=>p.naziv==selectSastojak.value).id)
        this.listaPriloga.push(pom);

        
    }

    kupiSendvic(labelaCena,idProdavnice,divPrilozi)
    {
        var naslov = document.querySelectorAll('.nazivProdavnice');
        this.zarada+=parseInt(labelaCena.innerHTML);
        naslov[idProdavnice].innerHTML=this.naziv+" - "+this.zarada+" din";

        this.obrisiDecu(divPrilozi);

        console.log(this.listaPriloga);
        

        this.listaPriloga.forEach(p=>{
            var pom = this.listaSastojaka.find(s=>s.naziv===p.naziv);
            fetch(`https://localhost:5001/Ispit/kupiSendvic/${p.id}/${pom.id}/${p.cena}`,
            {method:'Post',headers: { 'Content-Type': 'application/json' }})
        })
    }

    obrisiDecu(parent)
    {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
}
