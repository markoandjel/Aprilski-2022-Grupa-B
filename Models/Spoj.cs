using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Spoj
    {
        [Key]
        public int Id { get; set; }
        public Prodavnica SpojProdavnica { get; set; }
        public Sastojak SpojSastojak { get; set; }

        [Range(0,10000)]
        public int Cena { get; set; }

        [Range(0,10000)]
        public int Kolicina { get; set; }
    }
}