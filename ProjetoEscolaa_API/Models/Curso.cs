using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace ProjetoEscola_API.Models
{
    public class Curso
    {

        public int id { get; set; }
        [Required(ErrorMessage = "O campo CodCurso é obrigatório.")]
        [Range(1, 99, ErrorMessage = "Digite o {0} sendo um número entre {1}-{2}.")]
        public int codCurso { get; set; }
        [Required(ErrorMessage = "O campo Nome é obrigatório.", AllowEmptyStrings = false)]
        [StringLength(30, ErrorMessage = "O campo Nome não pode ultrapassar {1} caracteres")]
        public string? nomeCurso { get; set; }
        [Required(ErrorMessage = "O campo {0} é obrigatório.", AllowEmptyStrings = false)]
        [StringLength(1, MinimumLength = 1, ErrorMessage = "O campo {0} não respeita o formato de Periodo: X")]
        public string? periodo { get; set; }
    }
}

/*
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace ProjetoEscola_API.Models
{
    public class Curso
    {
        public int id { get; set; }
        
        public int codCurso { get; set; }
        [Required]

        public string? nomeCurso { get; set; }
        [Required]
        public string? periodo { get; set; }
    }
}
*/