using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjetoFinal_API.Data;
using ProjetoFinal_API.Models;

namespace ProjetoFinal_API.Controllers {

    [Route("api/[controller]")]
    [ApiController]
    public class ReceitaController : ControllerBase {

        private ReceitaContext _context;
        public ReceitaController (ReceitaContext context) {
            // construtor
            _context = context;
        }

        [HttpGet] // pega os dados da api e transforma numa lista
        public ActionResult<List<Receita>> GetAll() {
            return _context.Receita.ToList();
        }


        [HttpGet("{ReceitaId}")] // acessa a receita pelo id
        public ActionResult<List<Receita>> Get(int ReceitaId) {
            try {
                var result = _context.Receita.Find(ReceitaId); // acha o id da receita
                if (result == null) { // se for nulo, retorna que não encontrou
                    return NotFound();
                }
                return Ok(result); // senão, retorna o resultado
            }
            catch { // trata o erro de acesso ao BD
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }


        [HttpPost] // adiciona novas receitas 
        public async Task<ActionResult> post(Receita model) {
            try
            {
                _context.Receita.Add(model);
                if (await _context.SaveChangesAsync() == 1) {
                    //return Ok();
                    return Created($"/api/receita/{model.id}",model);
                }
            }
            catch {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
            // retorna BadRequest se não conseguiu incluir
            return BadRequest();
        }


        [HttpDelete("{ReceitaId}")] // deletando a receita pelo id
        public async Task<ActionResult> delete(int ReceitaId) {

            try {
            //verifica se existe receita a ser excluída
            var receita = await _context.Receita.FindAsync(ReceitaId);
            if (receita == null) {
                //método do EF
                return NotFound();
            }
            _context.Remove(receita);
            await _context.SaveChangesAsync();
            return NoContent();
            }

            catch {
                return this.StatusCode(StatusCodes.Status500InternalServerError,"Falha no acesso ao banco de dados.");
            }
        }


        [HttpPut("{ReceitaId}")]
        public async Task<IActionResult> put(int ReceitaId, Receita dadosReceitaAlt) {
            try {
            // verifica se existe receita a ser alterada
            var result = await _context.Receita.FindAsync(ReceitaId);
            if (ReceitaId != result.id) {
                return BadRequest();
            }
            // então pega os dados novos 
            result.nome = dadosReceitaAlt.nome;
            result.ingredientes = dadosReceitaAlt.ingredientes;
            result.preparo = dadosReceitaAlt.preparo;
            await _context.SaveChangesAsync();
            return Created($"/api/aluno/{dadosReceitaAlt.nome}", dadosReceitaAlt);
            }
            catch {
                return this.StatusCode(StatusCodes.Status500InternalServerError,"Falha no acesso ao banco de dados.");
            }
        }


    }
}