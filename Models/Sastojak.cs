using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Sastojak
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(50)]
        public string Naziv { get; set; }
        public List<Spoj> SpojSastojak { get; set; }
    }
}