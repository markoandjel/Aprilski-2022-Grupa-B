import { Prodavnica } from "./Prodavnica.js";

let forma = document.createElement("div");
forma.className="forma";
document.body.appendChild(forma);

fetch("https://localhost:5001/Ispit/vratiProdavnice",
    {
        method:"GET"
    })
.then(p=>{
    p.json().then(data=>{
        data.forEach(prod => {
            var pom = new Prodavnica(prod.id,prod.mesta,prod.naziv);
            pom.crtajProdavnicu(forma);
        });
        
    })
})



