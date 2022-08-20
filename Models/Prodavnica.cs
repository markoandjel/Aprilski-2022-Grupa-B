using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Models
{
    [Table("Prodavnica")]
    public class Prodavnica
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        [MaxLength(50)]
        public string Naziv { get; set; }

        [Required]
        [Range(1,20)]
        public int Mesta { get; set; }

        public List<Spoj> SpojProdavnica { get; set; }


    }
}