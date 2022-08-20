using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Models;

namespace Template.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class IspitController : ControllerBase
    {
        IspitDbContext Context { get; set; }

        public IspitController(IspitDbContext context)
        {
            Context = context;
        }

        [Route("vratiSastojke/{idProdavnica}")]
        [HttpGet]
        public async Task<ActionResult> vratiSastojke(int idProdavnica)
        {
            try
            {
                var rez = await Context.Spojevi.Where(p=>p.SpojProdavnica.Id==idProdavnica)
                .Select(p=>new {
                    Id=p.SpojSastojak.Id,
                    Naziv=p.SpojSastojak.Naziv,
                    Cena=p.Cena,
                    Kolicina=p.Kolicina
                }).ToListAsync();
                return Ok(rez);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("vratiProdavnice")]
        [HttpGet]
        public async Task<ActionResult> vratiProdavnice()
        {
            try
            {
                return Ok(await Context.Prodavnice
                .Select(p=>new {
                    Id=p.Id,
                    Naziv=p.Naziv,
                    Mesta=p.Mesta
                }).ToListAsync());
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("kupiSendvic/{idProdavnica}/{idSastojak}/{kolicina}")]
        [HttpPost]
        public async Task<ActionResult> kupiSendvic(int idProdavnica, int idSastojak, int kolicina)
        {
            try
            {
                var spoj = await Context.Spojevi.Where(p=>p.SpojProdavnica.Id==idProdavnica && p.SpojSastojak.Id==idSastojak).FirstOrDefaultAsync();
                if(spoj==null)
                return BadRequest("Porudzbina nije validna");

                if(spoj.Kolicina<kolicina)
                throw new Exception("Nema dovoljno kolicine sastojka na stanju");

                spoj.Kolicina-=kolicina;
                await Context.SaveChangesAsync();
                return Ok("Sendvic je kupljen");
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
