const filtrosIniciais = {
  busca: "",
  tipo: "Todos",
  regiao: "Todas",
  preco: "900",
  avaliacao: "0",
  ordem: "relevancia"
};

let filtrosAplicados = { ...filtrosIniciais };
let rascunhoFiltros = { ...filtrosIniciais };

const novosDestinos = [
  { id: 1, nome: "Praia do Forte", localizacao: "Bahia, Brasil", descricao: "Uma praia paradisíaca com águas cristalinas.", tipo: "Praia", regiao: "Nordeste", imagens: ["url_imagem1", "url_imagem2"], avaliacao: 4.8, totalAvaliacoes: 150, precoMin: 200, precoMax: 600, tags: ["relaxamento", "família", "natureza"] },
  { id: 2, nome: "Chapada Diamantina", localizacao: "Bahia, Brasil", descricao: "Parque nacional com trilhas e cachoeiras.", tipo: "Natureza", regiao: "Nordeste", imagens: ["url_imagem3", "url_imagem4"], avaliacao: 4.9, totalAvaliacoes: 200, precoMin: 150, precoMax: 400, tags: ["aventura", "trilhas"] },
  { id: 3, nome: "Fernando de Noronha", localizacao: "Pernambuco, Brasil", descricao: "Ilha famosa por suas belezas naturais e mergulho.", tipo: "Praia", regiao: "Nordeste", imagens: ["url_imagem5", "url_imagem6"], avaliacao: 5.0, totalAvaliacoes: 300, precoMin: 500, precoMax: 1200, tags: ["ecoturismo", "mergulhos"] },
  { id: 4, nome: "Gramado", localizacao: "Rio Grande do Sul, Brasil", descricao: "Cidade charmosa com clima europeu.", tipo: "Inverno", regiao: "Sul", imagens: ["url_imagem7", "url_imagem8"], avaliacao: 4.7, totalAvaliacoes: 180, precoMin: 250, precoMax: 700, tags: ["família", "romântico"] },
  { id: 5, nome: "Aparecida", localizacao: "São Paulo, Brasil", descricao: "Famosa pela Basílica de Aparecida.", tipo: "Cultural", regiao: "Sudeste", imagens: ["url_imagem9", "url_imagem10"], avaliacao: 4.6, totalAvaliacoes: 90, precoMin: 100, precoMax: 300, tags: ["religioso", "histórico"] },
  { id: 6, nome: "Jericoacoara", localizacao: "Ceará, Brasil", descricao: "Praia famosa por suas dunas e lagoas.", tipo: "Praia", regiao: "Nordeste", imagens: ["url_imagem11", "url_imagem12"], avaliacao: 4.8, totalAvaliacoes: 220, precoMin: 300, precoMax: 800, tags: ["aventura", "natureza"] },
  { id: 7, nome: "Bonito", localizacao: "Mato Grosso do Sul, Brasil", descricao: "Destino ecoturístico com rios de água cristalina.", tipo: "Natureza", regiao: "Centro-Oeste", imagens: ["url_imagem13", "url_imagem14"], avaliacao: 5.0, totalAvaliacoes: 250, precoMin: 400, precoMax: 900, tags: ["mergulhos", "natureza"] },
  { id: 8, nome: "Foz do Iguaçu", localizacao: "Paraná, Brasil", descricao: "Famosa pelas Cataratas do Iguaçu.", tipo: "Natureza", regiao: "Sul", imagens: ["url_imagem15", "url_imagem16"], avaliacao: 4.9, totalAvaliacoes: 300, precoMin: 250, precoMax: 700, tags: ["aventura", "natureza"] },
  { id: 9, nome: "Porto de Galinhas", localizacao: "Pernambuco, Brasil", descricao: "Praia com piscinas naturais e coqueirais.", tipo: "Praia", regiao: "Nordeste", imagens: ["url_imagem17", "url_imagem18"], avaliacao: 4.8, totalAvaliacoes: 270, precoMin: 220, precoMax: 650, tags: ["família", "relaxamento"] },
  { id: 10, nome: "Campos do Jordão", localizacao: "São Paulo, Brasil", descricao: "Cidade montanhosa conhecida como a Suíça Brasileira.", tipo: "Inverno", regiao: "Sudeste", imagens: ["url_imagem19", "url_imagem20"], avaliacao: 4.7, totalAvaliacoes: 150, precoMin: 300, precoMax: 800, tags: ["romântico", "família"] },
  { id: 11, nome: "Olinda", localizacao: "Pernambuco, Brasil", descricao: "Cidade histórica com arquitetura colonial.", tipo: "Cultural", regiao: "Nordeste", imagens: ["url_imagem21", "url_imagem22"], avaliacao: 4.6, totalAvaliacoes: 130, precoMin: 100, precoMax: 250, tags: ["histórico", "cultural"] },
  { id: 12, nome: "Natal", localizacao: "Rio Grande do Norte, Brasil", descricao: "Famosa pelas suas dunas e praias.", tipo: "Praia", regiao: "Nordeste", imagens: ["url_imagem23", "url_imagem24"], avaliacao: 4.5, totalAvaliacoes: 180, precoMin: 200, precoMax: 600, tags: ["aventura", "natureza"] },
  { id: 13, nome: "Petrópolis", localizacao: "Rio de Janeiro, Brasil", descricao: "Cidade histórica com palácios e museus.", tipo: "Cultural", regiao: "Sudeste", imagens: ["url_imagem25", "url_imagem26"], avaliacao: 4.5, totalAvaliacoes: 150, precoMin: 150, precoMax: 350, tags: ["histórico", "cultural"] },
  { id: 14, nome: "Tiradentes", localizacao: "Minas Gerais, Brasil", descricao: "Cidade colonial charmosa com ruas de paralelepípedo.", tipo: "Cultural", regiao: "Sudeste", imagens: ["url_imagem27", "url_imagem28"], avaliacao: 4.6, totalAvaliacoes: 120, precoMin: 100, precoMax: 300, tags: ["histórico", "gastronomia"] },
  { id: 15, nome: "São Miguel dos Milagres", localizacao: "Alagoas, Brasil", descricao: "Praias tranquilas e natureza exuberante.", tipo: "Praia", regiao: "Nordeste", imagens: ["url_imagem29", "url_imagem30"], avaliacao: 4.8, totalAvaliacoes: 140, precoMin: 250, precoMax: 550, tags: ["relaxamento", "natureza"] },
  { id: 16, nome: "Jericoacoara", localizacao: "Ceará, Brasil", descricao: "Praia famosa por suas dunas e lagoas.", tipo: "Praia", regiao: "Nordeste", imagens: ["url_imagem31", "url_imagem32"], avaliacao: 4.9, totalAvaliacoes: 200, precoMin: 300, precoMax: 800, tags: ["aventura", "natureza"] },
  { id: 17, nome: "Arraial do Cabo", localizacao: "Rio de Janeiro, Brasil", descricao: "Praias de águas cristalinas e natureza exuberante.", tipo: "Praia", regiao: "Sudeste", imagens: ["url_imagem33", "url_imagem34"], avaliacao: 4.6, totalAvaliacoes: 160, precoMin: 200, precoMax: 500, tags: ["mergulhos", "natureza"] },
  { id: 18, nome: "Ilhabela", localizacao: "São Paulo, Brasil", descricao: "Ilha com praias e trilhas em meio à natureza.", tipo: "Praia", regiao: "Sudeste", imagens: ["url_imagem35", "url_imagem36"], avaliacao: 4.7, totalAvaliacoes: 180, precoMin: 250, precoMax: 600, tags: ["aventura", "natureza"] },
  { id: 19, nome: "Buzios", localizacao: "Rio de Janeiro, Brasil", descricao: "Famosa por suas praias e vida noturna.", tipo: "Praia", regiao: "Sudeste", imagens: ["url_imagem37", "url_imagem38"], avaliacao: 4.5, totalAvaliacoes: 200, precoMin: 300, precoMax: 700, tags: ["vida noturna", "relaxamento"] },
  { id: 20, nome: "Caldas Novas", localizacao: "Goiás, Brasil", descricao: "Cidade famosa por suas águas termais.", tipo: "Relaxamento", regiao: "Centro-Oeste", imagens: ["url_imagem39", "url_imagem40"], avaliacao: 4.5, totalAvaliacoes: 170, precoMin: 150, precoMax: 400, tags: ["relaxamento", "família"] },
  { id: 21, nome: "Maragogi", localizacao: "Alagoas, Brasil", descricao: "Praia com águas cristalinas e recifes de corais.", tipo: "Praia", regiao: "Nordeste", imagens: ["url_imagem41", "url_imagem42"], avaliacao: 4.8, totalAvaliacoes: 220, precoMin: 300, precoMax: 800, tags: ["mergulhos", "natureza"] },
  { id: 22, nome: "Morretes", localizacao: "Paraná, Brasil", descricao: "Cidade histórica com belas paisagens naturais.", tipo: "Cultural", regiao: "Sul", imagens: ["url_imagem43", "url_imagem44"], avaliacao: 4.5, totalAvaliacoes: 130, precoMin: 100, precoMax: 250, tags: ["histórico", "gastronomia"] },
  { id: 23, nome: "Cunha", localizacao: "São Paulo, Brasil", descricao: "Cidade conhecida por suas cerâmicas e natureza.", tipo: "Natureza", regiao: "Sudeste", imagens: ["url_imagem45", "url_imagem46"], avaliacao: 4.5, totalAvaliacoes: 110, precoMin: 150, precoMax: 300, tags: ["natureza", "cultural"] },
  { id: 24, nome: "Punta del Este", localizacao: "Uruguai", descricao: "Praia famosa com vida noturna vibrante.", tipo: "Praia", regiao: "Internacional", imagens: ["url_imagem47", "url_imagem48"], avaliacao: 4.6, totalAvaliacoes: 200, precoMin: 400, precoMax: 900, tags: ["vida noturna", "luxo"] },
  { id: 25, nome: "Buenos Aires", localizacao: "Argentina", descricao: "Capital argentina conhecida por sua cultura vibrante.", tipo: "Cultural", regiao: "Internacional", imagens: ["url_imagem49", "url_imagem50"], avaliacao: 4.7, totalAvaliacoes: 250, precoMin: 300, precoMax: 700, tags: ["cultura", "gastronomia"] },
  { id: 26, nome: "Cartagena", localizacao: "Colômbia", descricao: "Cidade histórica com belos centros culturais.", tipo: "Cultural", regiao: "Internacional", imagens: ["url_imagem51", "url_imagem52"], avaliacao: 4.8, totalAvaliacoes: 300, precoMin: 350, precoMax: 800, tags: ["histórico", "cultura"] },
  { id: 27, nome: "Cancún", localizacao: "México", descricao: "Destino turístico famoso por suas praias e resorts.", tipo: "Praia", regiao: "Internacional", imagens: ["url_imagem53", "url_imagem54"], avaliacao: 4.5, totalAvaliacoes: 400, precoMin: 500, precoMax: 1000, tags: ["luxo", "relaxamento"] },
  { id: 28, nome: "Machu Picchu", localizacao: "Peru", descricao: "Antiga cidade inca localizada nas montanhas.", tipo: "Cultural", regiao: "Internacional", imagens: ["url_imagem55", "url_imagem56"], avaliacao: 5.0, totalAvaliacoes: 500, precoMin: 700, precoMax: 1500, tags: ["histórico", "aventura"] },
  { id: 29, nome: "Tulum", localizacao: "México", descricao: "Praia e ruínas maias em um só lugar.", tipo: "Praia", regiao: "Internacional", imagens: ["url_imagem57", "url_imagem58"], avaliacao: 4.8, totalAvaliacoes: 220, precoMin: 400, precoMax: 800, tags: ["histórico", "natureza"] },
  { id: 30, nome: "Rio de Janeiro", localizacao: "Brasil", descricao: "Cidade famosa por suas praias e o Cristo Redentor.", tipo: "Cultural", regiao: "Sudeste", imagens: ["url_imagem59", "url_imagem60"], avaliacao: 4.7, totalAvaliacoes: 500, precoMin: 200, precoMax: 700, tags: ["cultura", "natureza"] },
  { id: 31, nome: "São Paulo", localizacao: "Brasil", descricao: "Maior cidade do Brasil, conhecida por sua vida cultural.", tipo: "Cultural", regiao: "Sudeste", imagens: ["url_imagem61", "url_imagem62"], avaliacao: 4.6, totalAvaliacoes: 400, precoMin: 150, precoMax: 500, tags: ["cultura", "gastronomia"] },
  { id: 32, nome: "Florianópolis", localizacao: "Santa Catarina, Brasil", descricao: "Ilha conhecida por suas belas praias.", tipo: "Praia", regiao: "Sul", imagens: ["url_imagem63", "url_imagem64"], avaliacao: 4.8, totalAvaliacoes: 300, precoMin: 250, precoMax: 600, tags: ["natureza", "aventura"] },
  { id: 33, nome: "Cataratas do Iguaçu", localizacao: "Paraná, Brasil", descricao: "Uma das maiores quedas d'água do mundo.", tipo: "Natureza", regiao: "Sul", imagens: ["url_imagem65", "url_imagem66"], avaliacao: 4.9, totalAvaliacoes: 400, precoMin: 200, precoMax: 500, tags: ["aventura", "natureza"] },
  { id: 34, nome: "Serra Gaúcha", localizacao: "Rio Grande do Sul, Brasil", descricao: "Região montanhosa com clima europeu.", tipo: "Inverno", regiao: "Sul", imagens: ["url_imagem67", "url_imagem68"], avaliacao: 4.7, totalAvaliacoes: 250, precoMin: 300, precoMax: 700, tags: ["família", "gastronomia"] },
  { id: 35, nome: "Lençóis Maranhenses", localizacao: "Maranhão, Brasil", descricao: "Parque nacional com dunas e lagoas.", tipo: "Natureza", regiao: "Nordeste", imagens: ["url_imagem69", "url_imagem70"], avaliacao: 4.8, totalAvaliacoes: 180, precoMin: 300, precoMax: 800, tags: ["aventura", "natureza"] },
  { id: 36, nome: "Paraty", localizacao: "Rio de Janeiro, Brasil", descricao: "Cidade colonial com belas praias e cultura rica.", tipo: "Cultural", regiao: "Sudeste", imagens: ["url_imagem71", "url_imagem72"], avaliacao: 4.6, totalAvaliacoes: 160, precoMin: 150, precoMax: 400, tags: ["histórico", "gastronomia"] },
  { id: 37, nome: "Belo Horizonte", localizacao: "Minas Gerais, Brasil", descricao: "Cidade conhecida por sua culinária e cultura.", tipo: "Cultural", regiao: "Sudeste", imagens: ["url_imagem73", "url_imagem74"], avaliacao: 4.5, totalAvaliacoes: 150, precoMin: 100, precoMax: 300, tags: ["gastronomia", "cultura"] },
  { id: 38, nome: "Natal", localizacao: "Rio Grande do Norte, Brasil", descricao: "Famosa por suas dunas e praias.", tipo: "Praia", regiao: "Nordeste", imagens: ["url_imagem75", "url_imagem76"], avaliacao: 4.6, totalAvaliacoes: 200, precoMin: 200, precoMax: 600, tags: ["aventura", "natureza"] },
  { id: 39, nome: "Cabo Frio", localizacao: "Rio de Janeiro, Brasil", descricao: "Praia famosa por suas águas cristalinas.", tipo: "Praia", regiao: "Sudeste", imagens: ["url_imagem77", "url_imagem78"], avaliacao: 4.6, totalAvaliacoes: 160, precoMin: 200, precoMax: 500, tags: ["relaxamento", "natureza"] },
  { id: 40, nome: "Ilha Grande", localizacao: "Rio de Janeiro, Brasil", descricao: "Ilha com praias e trilhas em meio à natureza.", tipo: "Praia", regiao: "Sudeste", imagens: ["url_imagem79", "url_imagem80"], avaliacao: 4.8, totalAvaliacoes: 220, precoMin: 300, precoMax: 700, tags: ["aventura", "natureza"] },
  { id: 41, nome: "Vitória", localizacao: "Espírito Santo, Brasil", descricao: "Cidade com belas praias e cultura rica.", tipo: "Cultural", regiao: "Sudeste", imagens: ["url_imagem81", "url_imagem82"], avaliacao: 4.5, totalAvaliacoes: 140, precoMin: 150, precoMax: 350, tags: ["cultura", "gastronomia"] },
  { id: 42, nome: "Petrópolis", localizacao: "Rio de Janeiro, Brasil", descricao: "Cidade histórica com palácios e museus.", tipo: "Cultural", regiao: "Sudeste", imagens: ["url_imagem83", "url_imagem84"], avaliacao: 4.7, totalAvaliacoes: 160, precoMin: 100, precoMax: 300, tags: ["histórico", "cultural"] },
  { id: 43, nome: "Maceió", localizacao: "Alagoas, Brasil", descricao: "Praia com águas claras e coqueirais.", tipo: "Praia", regiao: "Nordeste", imagens: ["url_imagem85", "url_imagem86"], avaliacao: 4.7, totalAvaliacoes: 250, precoMin: 200, precoMax: 600, tags: ["natureza", "relaxamento"] },
  { id: 44, nome: "Cabo de Santo Agostinho", localizacao: "Pernambuco, Brasil", descricao: "Praias com belezas naturais e história.", tipo: "Praia", regiao: "Nordeste", imagens: ["url_imagem87", "url_imagem88"], avaliacao: 4.4, totalAvaliacoes: 120, precoMin: 150, precoMax: 400, tags: ["histórico", "natureza"] },
  { id: 45, nome: "Santa Teresa", localizacao: "Rio de Janeiro, Brasil", descricao: "Bairro boêmio com arte e cultura.", tipo: "Cultural", regiao: "Sudeste", imagens: ["url_imagem89", "url_imagem90"], avaliacao: 4.6, totalAvaliacoes: 110, precoMin: 100, precoMax: 250, tags: ["cultura", "gastronomia"] },
  { id: 46, nome: "Serra do Cipó", localizacao: "Minas Gerais, Brasil", descricao: "Parque nacional com cachoeiras e trilhas.", tipo: "Natureza", regiao: "Sudeste", imagens: ["url_imagem91", "url_imagem92"], avaliacao: 4.8, totalAvaliacoes: 130, precoMin: 150, precoMax: 350, tags: ["aventura", "natureza"] },
  { id: 47, nome: "Ilha do Cardoso", localizacao: "São Paulo, Brasil", descricao: "Ilha com praias e natureza preservada.", tipo: "Praia", regiao: "Sudeste", imagens: ["url_imagem93", "url_imagem94"], avaliacao: 4.5, totalAvaliacoes: 120, precoMin: 200, precoMax: 500, tags: ["natureza", "relaxamento"] },
  { id: 48, nome: "Caminho dos Nativos", localizacao: "Bahia, Brasil", descricao: "Caminho histórico com natureza exuberante.", tipo: "Cultural", regiao: "Nordeste", imagens: ["url_imagem95", "url_imagem96"], avaliacao: 4.6, totalAvaliacoes: 130, precoMin: 150, precoMax: 350, tags: ["histórico", "natureza"] },
  { id: 49, nome: "Trancoso", localizacao: "Bahia, Brasil", descricao: "Praia famosa pela tranquilidade e beleza.", tipo: "Praia", regiao: "Nordeste", imagens: ["url_imagem97", "url_imagem98"], avaliacao: 4.7, totalAvaliacoes: 200, precoMin: 300, precoMax: 600, tags: ["relaxamento", "natureza"] },
  { id: 50, nome: "Jericoacoara", localizacao: "Ceará, Brasil", descricao: "Praia famosa por suas dunas e lagoas.", tipo: "Praia", regiao: "Nordeste", imagens: ["url_imagem99", "url_imagem100"], avaliacao: 4.9, totalAvaliacoes: 220, precoMin: 300, precoMax: 800, tags: ["aventura", "natureza"] },
  { id: 51, nome: "Teresópolis", localizacao: "Rio de Janeiro, Brasil", descricao: "Cidade montanhosa com natureza exuberante.", tipo: "Natureza", regiao: "Sudeste", imagens: ["url_imagem101", "url_imagem102"], avaliacao: 4.6, totalAvaliacoes: 120, precoMin: 150, precoMax: 350, tags: ["natureza", "aventura"] },
  { id: 52, nome: "Petrópolis", localizacao: "Rio de Janeiro, Brasil", descricao: "Cidade histórica com palácios e museus.", tipo: "Cultural", regiao: "Sudeste", imagens: ["url_imagem103", "url_imagem104"], avaliacao: 4.7, totalAvaliacoes: 160, precoMin: 100, precoMax: 300, tags: ["histórico", "cultural"] },
  { id: 53, nome: "Caconde", localizacao: "São Paulo, Brasil", descricao: "Cidade conhecida por suas cachoeiras e natureza.", tipo: "Natureza", regiao: "Sudeste", imagens: ["url_imagem105", "url_imagem106"], avaliacao: 4.5, totalAvaliacoes: 110, precoMin: 100, precoMax: 250, tags: ["natureza", "aventura"] },
  { id: 54, nome: "Brotas", localizacao: "São Paulo, Brasil", descricao: "Destino de ecoturismo com atividades de aventura.", tipo: "Aventura", regiao: "Sudeste", imagens: ["url_imagem107", "url_imagem108"], avaliacao: 4.8, totalAvaliacoes: 180, precoMin: 200, precoMax: 450, tags: ["aventura", "natureza"] },
  { id: 55, nome: "São João del Rei", localizacao: "Minas Gerais, Brasil", descricao: "Cidade histórica com belas igrejas e cultura rica.", tipo: "Cultural", regiao: "Sudeste", imagens: ["url_imagem109", "url_imagem110"], avaliacao: 4.6, totalAvaliacoes: 130, precoMin: 100, precoMax: 300, tags: ["histórico", "cultural"] },
  { id: 56, nome: "Caldas Novas", localizacao: "Goiás, Brasil", descricao: "Cidade famosa por suas águas termais.", tipo: "Relaxamento", regiao: "Centro-Oeste", imagens: ["url_imagem111", "url_imagem112"], avaliacao: 4.5, totalAvaliacoes: 170, precoMin: 150, precoMax: 400, tags: ["relaxamento", "família"] },
  { id: 57, nome: "Chapada dos Veadeiros", localizacao: "Goiás, Brasil", descricao: "Parque nacional com cachoeiras e trilhas.", tipo: "Natureza", regiao: "Centro-Oeste", imagens: ["url_imagem113", "url_imagem114"], avaliacao: 4.9, totalAvaliacoes: 200, precoMin: 200, precoMax: 500, tags: ["aventura", "natureza"] },
  { id: 58, nome: "Cuiabá", localizacao: "Mato Grosso, Brasil", descricao: "Cidade que serve como porta de entrada para o Pantanal.", tipo: "Cultural", regiao: "Centro-Oeste", imagens: ["url_imagem115", "url_imagem116"], avaliacao: 4.4, totalAvaliacoes: 120, precoMin: 100, precoMax: 250, tags: ["cultura", "gastronomia"] },
  { id: 59, nome: "Lencóis Maranhenses", localizacao: "Maranhão, Brasil", descricao: "Parque nacional com dunas e lagoas de água doce.", tipo: "Natureza", regiao: "Nordeste", imagens: ["url_imagem117", "url_imagem118"], avaliacao: 5.0, totalAvaliacoes: 300, precoMin: 400, precoMax: 900, tags: ["aventura", "natureza"] },
  { id: 60, nome: "Ilha do Cardoso", localizacao: "São Paulo, Brasil", descricao: "Ilha com natureza preservada e praias tranquilas.", tipo: "Praia", regiao: "Sudeste", imagens: ["url_imagem119", "url_imagem120"], avaliacao: 4.5, totalAvaliacoes: 110, precoMin: 150, precoMax: 350, tags: ["natureza", "relaxamento"] },
  { id: 61, nome: "Petrópolis", localizacao: "Rio de Janeiro, Brasil", descricao: "Cidade histórica com palácios e museus.", tipo: "Cultural", regiao: "Sudeste", imagens: ["url_imagem121", "url_imagem122"], avaliacao: 4.7, totalAvaliacoes: 160, precoMin: 100, precoMax: 300, tags: ["histórico", "cultural"] },
  { id: 62, nome: "Ubatuba", localizacao: "São Paulo, Brasil", descricao: "Praias com natureza exuberante e opções de esportes.", tipo: "Praia", regiao: "Sudeste", imagens: ["url_imagem123", "url_imagem124"], avaliacao: 4.6, totalAvaliacoes: 180, precoMin: 200, precoMax: 500, tags: ["aventura", "natureza"] },
  { id: 63, nome: "Guarapari", localizacao: "Espírito Santo, Brasil", descricao: "Praia famosa por suas águas quentes e curativas.", tipo: "Praia", regiao: "Sudeste", imagens: ["url_imagem125", "url_imagem126"], avaliacao: 4.5, totalAvaliacoes: 150, precoMin: 200, precoMax: 450, tags: ["relaxamento", "natureza"] },
  { id: 64, nome: "Belo Horizonte", localizacao: "Minas Gerais, Brasil", descricao: "Cidade conhecida por sua culinária e cultura.", tipo: "Cultural", regiao: "Sudeste", imagens: ["url_imagem127", "url_imagem128"], avaliacao: 4.5, totalAvaliacoes: 140, precoMin: 100, precoMax: 250, tags: ["gastronomia", "cultura"] },
  { id: 65, nome: "Arraial do Cabo", localizacao: "Rio de Janeiro, Brasil", descricao: "Praias de águas cristalinas e natureza exuberante.", tipo: "Praia", regiao: "Sudeste", imagens: ["url_imagem129", "url_imagem130"], avaliacao: 4.6, totalAvaliacoes: 160, precoMin: 200, precoMax: 500, tags: ["mergulhos", "natureza"] },
  { id: 66, nome: "Jericoacoara", localizacao: "Ceará, Brasil", descricao: "Praia famosa por suas dunas e lagoas.", tipo: "Praia", regiao: "Nordeste", imagens: ["url_imagem131", "url_imagem132"], avaliacao: 4.9, totalAvaliacoes: 220, precoMin: 300, precoMax: 800, tags: ["aventura", "natureza"] },
  { id: 67, nome: "São Miguel dos Milagres", localizacao: "Alagoas, Brasil", descricao: "Praia tranquila e preservada.", tipo: "Praia", regiao: "Nordeste", imagens: ["url_imagem133", "url_imagem134"], avaliacao: 4.8, totalAvaliacoes: 200, precoMin: 250, precoMax: 600, tags: ["relaxamento", "natureza"] },
  { id: 68, nome: "Praia do Leste", localizacao: "Paraná, Brasil", descricao: "Praia com águas claras e natureza preservada.", tipo: "Praia", regiao: "Sul", imagens: ["url_imagem135", "url_imagem136"], avaliacao: 4.5, totalAvaliacoes: 120, precoMin: 100, precoMax: 250, tags: ["natureza", "relaxamento"] },
  { id: 69, nome: "Ilhéus", localizacao: "Bahia, Brasil", descricao: "Cidade com praias e rica história.", tipo: "Cultural", regiao: "Nordeste", imagens: ["url_imagem137", "url_imagem138"], avaliacao: 4.6, totalAvaliacoes: 130, precoMin: 150, precoMax: 350, tags: ["histórico", "gastronomia"] },
  { id: 70, nome: "Cabo Frio", localizacao: "Rio de Janeiro, Brasil", descricao: "Praia famosa por suas águas claras e tranquilas.", tipo: "Praia", regiao: "Sudeste", imagens: ["url_imagem139", "url_imagem140"], avaliacao: 4.7, totalAvaliacoes: 180, precoMin: 200, precoMax: 500, tags: ["relaxamento", "natureza"] },
  { id: 71, nome: "São Sebastião", localizacao: "São Paulo, Brasil", descricao: "Praias e natureza exuberante.", tipo: "Praia", regiao: "Sudeste", imagens: ["url_imagem141", "url_imagem142"], avaliacao: 4.5, totalAvaliacoes: 150, precoMin: 200, precoMax: 400, tags: ["natureza", "relaxamento"] },
  { id: 72, nome: "Cabo Verde", localizacao: "África", descricao: "Ilhas tropicais com belas praias.", tipo: "Praia", regiao: "Internacional", imagens: ["url_imagem143", "url_imagem144"], avaliacao: 4.7, totalAvaliacoes: 250, precoMin: 400, precoMax: 900, tags: ["relaxamento", "natureza"] },
  { id: 73, nome: "Bariloche", localizacao: "Argentina", descricao: "Cidade famosa por suas montanhas e lagos.", tipo: "Inverno", regiao: "Internacional", imagens: ["url_imagem145", "url_imagem146"], avaliacao: 4.8, totalAvaliacoes: 300, precoMin: 500, precoMax: 1000, tags: ["aventura", "natureza"] },
  { id: 74, nome: "Salvador", localizacao: "Bahia, Brasil", descricao: "Cidade com rica cultura e belas praias.", tipo: "Cultural", regiao: "Nordeste", imagens: ["url_imagem147", "url_imagem148"], avaliacao: 4.5, totalAvaliacoes: 200, precoMin: 200, precoMax: 500, tags: ["cultura", "gastronomia"] },
  { id: 75, nome: "Porto Alegre", localizacao: "Rio Grande do Sul, Brasil", descricao: "Capital do estado com vida cultural intensa.", tipo: "Cultural", regiao: "Sul", imagens: ["url_imagem149", "url_imagem150"], avaliacao: 4.4, totalAvaliacoes: 130, precoMin: 100, precoMax: 300, tags: ["cultura", "gastronomia"] },
  { id: 76, nome: "Passo Fundo", localizacao: "Rio Grande do Sul, Brasil", descricao: "Cidade conhecida por sua cultura e gastronomia.", tipo: "Cultural", regiao: "Sul", imagens: ["url_imagem151", "url_imagem152"], avaliacao: 4.5, totalAvaliacoes: 120, precoMin: 100, precoMax: 250, tags: ["cultura", "gastronomia"] },
  { id: 77, nome: "Santos", localizacao: "São Paulo, Brasil", descricao: "Cidade portuária com rica história e praias.", tipo: "Cultural", regiao: "Sudeste", imagens: ["url_imagem153", "url_imagem154"], avaliacao: 4.6, totalAvaliacoes: 150, precoMin: 150, precoMax: 350, tags: ["natureza", "relaxamento"]}

]

const imagensPadraoDestinos = [
  ["../assets/imagem/noronha-1.jpg", "../assets/imagem/noronha-2.jpg", "../assets/imagem/noronha-3.jpg"],
  ["../assets/imagem/bonito-1.jpg", "../assets/imagem/bonito-2.jpg", "../assets/imagem/bonito-3.jpg"],
  ["../assets/imagem/gramado-1.jpg", "../assets/imagem/gramado-2.jpg", "../assets/imagem/gramado-3.jpg"],
  ["../assets/imagem/jeri-1.jpg", "../assets/imagem/jeri-2.jpg", "../assets/imagem/jeri-3.jpg"],
  ["../assets/imagem/foz-1.jpg", "../assets/imagem/foz-2.jpg", "../assets/imagem/foz-3.jpg"],
  ["../assets/imagem/maragogi-1.jpg", "../assets/imagem/maragogi-2.jpg", "../assets/imagem/maragogi-3.jpg"],
  ["../assets/imagem/lencois-1.jpg", "../assets/imagem/lencois-2.jpg", "../assets/imagem/lencois-3.jpg"],
  ["../assets/imagem/porto-1.jpg", "../assets/imagem/porto-2.jpg", "../assets/imagem/porto-3.jpg"],
  ["../assets/imagem/campos-1.jpg", "../assets/imagem/campos-2.jpg", "../assets/imagem/campos-3.jpg"]
];

function prepararDestinoExtra(destino, index) {
  const imagensDoCadastro = destino.imagens || [];
  const imagensValidas = imagensDoCadastro.filter((imagem) => imagem && !imagem.startsWith("url_imagem"));
  const imagens = imagensValidas.length ? imagensValidas : imagensPadraoDestinos[index % imagensPadraoDestinos.length];
  const precoMin = Number(destino.precoMin || 120);
  const precoMax = Number(destino.precoMax || precoMin + 280);
  const avaliacao = Number(destino.avaliacao || 4.5);

  return {
    ...destino,
    id: 1000 + Number(destino.id || index + 1),
    imagens,
    tags: destino.tags && destino.tags.length ? destino.tags : [destino.tipo || "Destino"],
    totalAvaliacoes: Number(destino.totalAvaliacoes || 80),
    avaliacao,
    precoMin,
    precoMax,
    duracao: destino.duracao || "3 a 5 dias",
    detalhes: destino.detalhes || {
      localizacaoCurta: destino.localizacao,
      clima: destino.tipo === "Inverno" ? "Frio" : "Tropical",
      temperatura: destino.tipo === "Inverno" ? "8C - 22C" : "22C - 31C",
      melhorEpoca: "Durante o ano",
      custoMedio: `R$ ${precoMin} - R$ ${precoMax} por dia`,
      sobre: destino.descricao,
      comoChegar: "Consulte rotas, voos e traslados disponiveis para montar o melhor roteiro."
    },
    atracoes: destino.atracoes || ["Pontos turisticos locais", "Passeios guiados", "Gastronomia regional"],
    dicas: destino.dicas || ["Pesquise a melhor epoca antes da viagem.", "Compare hospedagens e passeios.", "Salve o destino nos favoritos para consultar depois."],
    avaliacoes: destino.avaliacoes || [
      { nome: "Visitante TravelSync", nota: avaliacao, texto: "Destino interessante para incluir no planejamento." }
    ]
  };
}

function chaveImagemDestino(destino) {
  return `destino-v5-${destino.id}-${destino.nome}`.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function lerCacheImagens() {
  return JSON.parse(localStorage.getItem("travelsync:imagensCommons") || "{}");
}

function salvarCacheImagens(cache) {
  localStorage.setItem("travelsync:imagensCommons", JSON.stringify(cache));
}

function textoParaComparar(texto) {
  return String(texto || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function montarTermoImagem(destino) {
  const lugar = destino.localizacao.replace(", Brasil", "").replace("Brasil", "").trim();
  return `${destino.nome} ${lugar} turismo`;
}

function imagemPreferidaDestino(destino) {
  const imagens = {
    "bonito": "../assets/imagem/bonito-1.jpg",
    "campos do jordao": "../assets/imagem/campos-1.jpg",
    "cancun": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80",
    "cabo verde": "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=900&q=80",
    "cataratas do iguacu": "../assets/imagem/foz-2.jpg",
    "fernando de noronha": "../assets/imagem/noronha-1.jpg",
    "foz do iguacu": "../assets/imagem/foz-1.jpg",
    "gramado": "../assets/imagem/gramado-1.jpg",
    "jericoacoara": "../assets/imagem/jeri-1.jpg",
    "lencois maranhenses": "../assets/imagem/lencois-1.jpg",
    "maragogi": "../assets/imagem/maragogi-1.jpg",
    "porto de galinhas": "../assets/imagem/porto-1.jpg",
    "tiradentes": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Tiradentes_MG.jpg/640px-Tiradentes_MG.jpg"
  };

  return imagens[textoParaComparar(destino.nome)] || null;
}

function nomeParaWikipedia(destino) {
  const nomes = {
    "Buzios": "Armação dos Búzios",
    "Cartagena": "Cartagena, Colombia",
    "Foz do Iguacu": "Foz do Iguaçu",
    "Cataratas do Iguacu": "Cataratas do Iguaçu",
    "Lencois Maranhenses": "Lençóis Maranhenses",
    "Campos do Jordao": "Campos do Jordão",
    "Sao Paulo": "São Paulo",
    "Maceio": "Maceió",
    "Vitoria": "Vitória"
  };

  return nomes[destino.nome] || destino.nome;
}

async function buscarImagemWikipedia(destino) {
  if (textoParaComparar(destino.nome) === "cancun") return null;

  const titulo = encodeURIComponent(nomeParaWikipedia(destino).replaceAll(" ", "_"));

  for (const idioma of ["pt", "en"]) {
    try {
      const resposta = await fetch(`https://${idioma}.wikipedia.org/api/rest_v1/page/summary/${titulo}`);
      if (!resposta.ok) continue;

      const dados = await resposta.json();
      const imagem = dados.thumbnail?.source || dados.originalimage?.source;
      if (imagemEhBoa(imagem)) return imagem;
    } catch (erro) {
      continue;
    }
  }

  return null;
}

async function buscarImagemLivre(destino, cache) {
  const chave = chaveImagemDestino(destino);
  if (cache[chave]) return cache[chave];

  const imagemPreferida = imagemPreferidaDestino(destino);
  if (imagemPreferida) {
    cache[chave] = imagemPreferida;
    salvarCacheImagens(cache);
    return imagemPreferida;
  }

  const imagemWikipedia = await buscarImagemWikipedia(destino);

  if (imagemWikipedia) {
    cache[chave] = imagemWikipedia;
    salvarCacheImagens(cache);
    return imagemWikipedia;
  }

  const parametros = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrnamespace: "6",
    gsrlimit: "4",
    gsrsearch: montarTermoImagem(destino),
    prop: "imageinfo",
    iiprop: "url",
    format: "json",
    origin: "*"
  });

  try {
    const resposta = await fetch(`https://commons.wikimedia.org/w/api.php?${parametros.toString()}`);
    const dados = await resposta.json();
    const paginas = Object.values(dados.query?.pages || {});
    const arquivo = paginas
      .map((pagina) => pagina.imageinfo?.[0]?.url)
      .find((url) => imagemEhBoa(url));

    if (arquivo) {
      cache[chave] = arquivo;
      salvarCacheImagens(cache);
      return arquivo;
    }
  } catch (erro) {
    return null;
  }

  return null;
}

function imagemEhBoa(url) {
  if (!url) return false;

  const caminho = decodeURIComponent(url).toLowerCase();
  const termosRuins = ["flag", "bandeira", "brasao", "brasão", "coat_of_arms", "map", "municip", "satellite", "orthographic", ".svg"];

  return /\.(jpg|jpeg|png|webp)$/i.test(url.split("?")[0]) && !termosRuins.some((termo) => caminho.includes(termo));
}

function trocarImagemDestino(destino, url) {
  if (!url) return;
  destino.imagens = [url, ...destino.imagens.filter((imagem) => imagem !== url)].slice(0, 3);

  document.querySelectorAll(`[data-destino-id="${destino.id}"] .imagem-cartao`).forEach((imagem) => {
    imagem.src = url;
  });
}

function tirarDestinosRepetidos(destinos) {
  const vistos = new Set();

  return destinos.filter((destino) => {
    const chave = `${textoParaComparar(destino.nome)}-${textoParaComparar(destino.localizacao)}`;
    if (vistos.has(chave)) return false;
    vistos.add(chave);
    return true;
  });
}

function tirarDestinosForaDaEntrega(destinos) {
  const removidos = new Set([
    "natal",
    "sao sebastiao",
    "tiradentes",
    "cabo de santo agostinho",
    "cunha"
  ]);

  return destinos.filter((destino) => !removidos.has(textoParaComparar(destino.nome)));
}

function prepararCatalogoDestinos(destinos) {
  return tirarDestinosForaDaEntrega(tirarDestinosRepetidos(destinos));
}

async function atualizarImagensDosDestinos() {
  const cache = lerCacheImagens();
  const bloco = 10;
  const imagensUsadas = new Map();

  for (let inicio = 0; inicio < catalogoDestinos.length; inicio += bloco) {
    const destinosDoBloco = catalogoDestinos.slice(inicio, inicio + bloco);
    const resultados = await Promise.all(destinosDoBloco.map(async (destino) => {
      const url = await buscarImagemLivre(destino, cache);
      return { destino, url };
    }));

    resultados.forEach(({ destino, url }) => {
      let imagem = url;
      if (imagem && imagensUsadas.has(imagem) && imagensUsadas.get(imagem) !== textoParaComparar(destino.nome)) {
        imagem = destino.imagens.find((foto) => !imagensUsadas.has(foto)) || imagem;
      }
      if (imagem) imagensUsadas.set(imagem, textoParaComparar(destino.nome));
      trocarImagemDestino(destino, imagem);
    });
  }
}

function usuarioLogado() {
  return JSON.parse(sessionStorage.getItem("usuarioLogado"));
}

function lerFavoritosSalvos() {
  const favoritosAtuais = localStorage.getItem("travelsync:favoritos");
  const favoritosAntigos = localStorage.getItem("travelsync:favoritosSalvos");
  return JSON.parse(favoritosAtuais || favoritosAntigos || "[]").map(String);
}

favoritos = lerFavoritosSalvos();

function atualizarResumoFavoritos() {
  localStorage.setItem("travelsync:favoritos", JSON.stringify(favoritos));

  if (typeof totalFavoritos !== "undefined" && totalFavoritos) {
    totalFavoritos.textContent = String(favoritos.length);
  }
}

function destinoFoiCurtido(id) {
  return favoritos.includes(String(id));
}

function alternarDestinoFavorito(id) {
  const idFavorito = String(id);

  if (destinoFoiCurtido(id)) {
    favoritos = favoritos.filter((item) => item !== idFavorito);
  } else {
    favoritos.push(idFavorito);
  }

  atualizarResumoFavoritos();

  if (typeof destinoEscolhido !== "undefined" && Number(destinoEscolhido) === Number(id)) {
    desenharDetalhesDestino();
    return;
  }

  if (typeof paginaAtual !== "undefined") {
    if (paginaAtual === "favoritos") mostrarFavoritos();
    if (paginaAtual === "destinos" || paginaAtual === "buscar") {
      abrirListagemDestinos(paginaAtual);
    }
  }
}

function guardarNoHistorico(id) {
  historico = [id, ...historico.filter((item) => item !== id)].slice(0, 5);
  localStorage.setItem("travelsync:historico", JSON.stringify(historico));
}

function fecharCamadasAbertas() {
  fecharMenuLateral();

  if (filtrosVisiveis && (paginaAtual === "destinos" || paginaAtual === "buscar")) {
    filtrosVisiveis = false;
    abrirListagemDestinos(paginaAtual);
  }
}

function desenharEstrelas(nota) {
  const quantidade = Math.round(nota);
  return "★".repeat(quantidade).padEnd(5, "☆");
}

function formatarPreco(destino) {
  return `R$ ${destino.precoMin} - R$ ${destino.precoMax}`;
}

function destinoAtual() {
  return catalogoDestinos.find((item) => item.id === destinoEscolhido) || catalogoDestinos[0];
}

function pegarCoordenadas(destino) {
  const mapa = {
    "Fernando de Noronha": [-3.8549, -32.4233],
    Bonito: [-21.1261, -56.4836],
    Gramado: [-29.3788, -50.8738],
    Jericoacoara: [-2.7975, -40.5124],
    "Foz do Iguacu": [-25.5163, -54.5854],
    Maragogi: [-9.0122, -35.2226],
    "Lencois Maranhenses": [-2.4854, -43.1289],
    "Porto de Galinhas": [-8.5046, -35.0044],
    "Campos do Jordao": [-22.7399, -45.5926]
  };

  return mapa[destino.nome] || [-14.235, -51.9253];
}

function lerReservas() {
  return JSON.parse(localStorage.getItem("travelsync:reservas") || "[]");
}

function salvarReservas(reservas) {
  localStorage.setItem("travelsync:reservas", JSON.stringify(reservas));
}

function buscarReservaUsuario(destinoId) {
  const usuario = usuarioLogado();
  if (!usuario) return null;
  return lerReservas().find((r) => r.destinoId === destinoId && r.usuarioId === usuario.id) || null;
}

function chaveMapa(destinoId) {
  return `travelsync:pontos-mapa:${destinoId}`;
}

function criarCoordenadaProxima(coordenadas, indice) {
  const volta = indice + 1;
  const sinalLat = volta % 2 === 0 ? 1 : -1;
  const sinalLng = volta % 3 === 0 ? -1 : 1;

  return [
    coordenadas[0] + sinalLat * (0.01 + volta * 0.003),
    coordenadas[1] + sinalLng * (0.012 + volta * 0.002)
  ];
}

function chaveComentarios(destinoId) {
  return `travelsync:comentarios:${destinoId}`;
}

function lerComentarios(destinoId) {
  return JSON.parse(localStorage.getItem(chaveComentarios(destinoId)) || "[]");
}

function salvarComentarios(destinoId, comentarios) {
  localStorage.setItem(chaveComentarios(destinoId), JSON.stringify(comentarios));
}

function criarComentario(comentario) {
  const inicial = comentario.nome.trim().charAt(0).toUpperCase() || "?";
  const respostas = comentario.respostas || [];
  const nota = Number(comentario.nota || 5);

  return `
    <article class="comentario-usuario" data-comentario-id="${comentario.id}">
      <div class="comentario-cabecalho">
        <div class="comentario-pessoa">
          <span class="comentario-avatar">${inicial}</span>
          <div>
            <strong>${comentario.nome}</strong>
            <span class="comentario-estrelas">${desenharEstrelas(nota)} ${nota.toFixed(1)}</span>
          </div>
        </div>
        <button class="comentario-coracao ${comentario.favorito ? "favoritado" : ""}" type="button" data-curtir-comentario="${comentario.id}" aria-label="Favoritar comentario">♥</button>
      </div>

      <p>${comentario.texto}</p>

      <button class="comentario-responder" type="button" data-responder-comentario="${comentario.id}">Responder</button>

      <div class="comentario-resposta-form" data-form-resposta="${comentario.id}" hidden>
        <input type="text" placeholder="Digite sua resposta" />
        <button type="button" data-enviar-resposta="${comentario.id}">Enviar</button>
      </div>

      <div class="comentario-respostas">
        ${respostas.map((resposta) => `<div class="comentario-resposta">${resposta.texto}</div>`).join("")}
      </div>
    </article>
  `;
}

function criarAreaComentarios(destino) {
  const comentarios = lerComentarios(destino.id);

  return `
    <section class="comentarios-destino">
      <h3>Compartilhe sua experiencia</h3>
      <form class="form-comentario" data-form-comentario>
        <input type="text" id="nomeComentario" placeholder="Seu nome" />
        <label class="campo-nota-comentario">
          <span>Sua nota</span>
          <select id="notaComentario">
            <option value="5">★★★★★ 5 estrelas</option>
            <option value="4">★★★★☆ 4 estrelas</option>
            <option value="3">★★★☆☆ 3 estrelas</option>
            <option value="2">★★☆☆☆ 2 estrelas</option>
            <option value="1">★☆☆☆☆ 1 estrela</option>
          </select>
        </label>
        <textarea id="textoComentario" placeholder="Compartilhe sua experiencia de viagem..."></textarea>
        <button class="btn-escrever" type="submit">+ Publicar comentario</button>
      </form>
      <p class="mensagem-comentario" data-mensagem-comentario></p>
      <div class="comentarios-lista">
        ${comentarios.length ? comentarios.map(criarComentario).join("") : `<p class="sem-comentarios">Ainda nao ha comentarios dos viajantes.</p>`}
      </div>
    </section>
  `;
}

function ligarComentariosDestino(destino) {
  const form = document.querySelector("[data-form-comentario]");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nome = document.querySelector("#nomeComentario").value.trim();
    const texto = document.querySelector("#textoComentario").value.trim();
    const nota = Number(document.querySelector("#notaComentario").value);
    const mensagem = document.querySelector("[data-mensagem-comentario]");

    if (!nome || !texto) {
      mensagem.textContent = "Preencha seu nome e comentario.";
      return;
    }

    const comentarios = lerComentarios(destino.id);
    comentarios.unshift({
      id: Date.now(),
      nome,
      texto,
      nota,
      favorito: false,
      respostas: []
    });

    salvarComentarios(destino.id, comentarios);
    mensagem.textContent = "Comentario enviado com sucesso!";
    setTimeout(desenharDetalhesDestino, 500);
  });

  document.querySelectorAll("[data-curtir-comentario]").forEach((botao) => {
    botao.addEventListener("click", () => {
      const id = Number(botao.dataset.curtirComentario);
      const comentarios = lerComentarios(destino.id).map((comentario) => {
        if (comentario.id === id) return { ...comentario, favorito: !comentario.favorito };
        return comentario;
      });

      salvarComentarios(destino.id, comentarios);
      desenharDetalhesDestino();
    });
  });

  document.querySelectorAll("[data-responder-comentario]").forEach((botao) => {
    botao.addEventListener("click", () => {
      const campo = document.querySelector(`[data-form-resposta="${botao.dataset.responderComentario}"]`);
      campo.hidden = !campo.hidden;
    });
  });

  document.querySelectorAll("[data-enviar-resposta]").forEach((botao) => {
    botao.addEventListener("click", () => {
      const id = Number(botao.dataset.enviarResposta);
      const campo = document.querySelector(`[data-form-resposta="${id}"] input`);
      const texto = campo.value.trim();

      if (!texto) return;

      const comentarios = lerComentarios(destino.id).map((comentario) => {
        if (comentario.id === id) {
          const respostas = comentario.respostas || [];
          return { ...comentario, respostas: [...respostas, { texto }] };
        }
        return comentario;
      });

      salvarComentarios(destino.id, comentarios);
      desenharDetalhesDestino();
    });
  });
}

function ordenarCatalogo(lista) {
  return [...lista].sort((a, b) => {
    if (filtrosAplicados.ordem === "menor-preco") return a.precoMin - b.precoMin;
    if (filtrosAplicados.ordem === "maior-nota") return b.avaliacao - a.avaliacao;
    if (filtrosAplicados.ordem === "mais-avaliados") return b.totalAvaliacoes - a.totalAvaliacoes;
    return b.avaliacao * b.totalAvaliacoes - a.avaliacao * a.totalAvaliacoes;
  });
}

function listarDestinosFiltrados(listaBase = catalogoDestinos) {
  const termo = filtrosAplicados.busca.trim().toLowerCase();
  const precoMaximo = Number(filtrosAplicados.preco);
  const notaMinima = Number(filtrosAplicados.avaliacao);

  const lista = listaBase.filter((destino) => {
    const texto = `${destino.nome} ${destino.localizacao} ${destino.tags.join(" ")}`.toLowerCase();
    const bateBusca = !termo || texto.includes(termo);
    const bateTipo = filtrosAplicados.tipo === "Todos" || destino.tipo === filtrosAplicados.tipo || destino.tags.includes(filtrosAplicados.tipo);
    const bateRegiao = filtrosAplicados.regiao === "Todas" || destino.regiao === filtrosAplicados.regiao;
    const batePreco = destino.precoMin <= precoMaximo;
    const bateNota = destino.avaliacao >= notaMinima;

    return bateBusca && bateTipo && bateRegiao && batePreco && bateNota;
  });

  return ordenarCatalogo(lista);
}

function abrirListagemDestinos(tela = "destinos") {
  pararGaleriaAutomatica();
  destacarOpcaoMenu(tela);
  destinoEscolhido = null;

  const lista = listarDestinosFiltrados();
  const estaBuscando = tela === "buscar";

  areaConteudo.innerHTML = `
    <section class="titulo-pagina titulo-menor">
      <span class="rotulo-secao">${estaBuscando ? "Busca inteligente" : "Destinos"}</span>
      <h1>${estaBuscando ? "Encontre o destino ideal" : "Todos os destinos"}</h1>
      <p>Use os filtros para combinar estilo de viagem, regiao, preco e avaliacao.</p>
    </section>

    <section class="barra-lista">
      <strong>${lista.length} destino${lista.length === 1 ? "" : "s"} encontrado${lista.length === 1 ? "" : "s"}</strong>
      <button class="botao-filtros ${filtrosVisiveis ? "ativo" : ""}" type="button" data-abrir-filtros>
        ☰ Filtros
      </button>
      <span>Ordem: ${nomeOrdenacao(filtrosAplicados.ordem)}</span>
    </section>

    ${montarPainelFiltros()}

    ${
      lista.length
        ? `<section class="grade-destinos" aria-label="Lista de destinos">${lista.map(criarCartaoDestino).join("")}</section>`
        : `<section class="mensagem-vazia">Nenhum destino encontrado. Ajuste os filtros para ver mais opcoes.</section>`
    }
  `;

  ligarPainelFiltros();
  ligarCartoesDestino();

  document.querySelector("[data-abrir-filtros]").addEventListener("click", () => {
    filtrosVisiveis = !filtrosVisiveis;
    if (filtrosVisiveis) rascunhoFiltros = { ...filtrosAplicados };
    abrirListagemDestinos(paginaAtual);
  });

  const elementoAtivo = document.activeElement;
const estaDigitando = elementoAtivo && ["INPUT", "TEXTAREA", "SELECT"].includes(elementoAtivo.tagName);
if (!estaDigitando) {
  areaConteudo.focus();
}
}

function montarPainelFiltros() {
  const form = filtrosVisiveis ? rascunhoFiltros : filtrosAplicados;

  return `
    <section class="painel-filtros ${filtrosVisiveis ? "aberto" : "fechado"}" aria-label="Filtros de destinos">
      <label class="campo-busca-filtro">
        <span>⌕</span>
        <input id="buscaDestino" type="search" placeholder="Buscar por destino, tag ou estado" value="${form.busca}" />
      </label>

      <label class="campo-filtro">
        <span>Tipo</span>
        <select id="tipoDestino" class="seletor">
          ${montarOpcao("Todos", form.tipo)}
          ${montarOpcao("Praia", form.tipo)}
          ${montarOpcao("Natureza", form.tipo)}
          ${montarOpcao("Aventura", form.tipo)}
          ${montarOpcao("Inverno", form.tipo)}
          ${montarOpcao("Familia", form.tipo)}
        </select>
      </label>

      <label class="campo-filtro">
        <span>Regiao</span>
        <select id="regiaoDestino" class="seletor">
          ${montarOpcao("Todas", form.regiao)}
          ${montarOpcao("Nordeste", form.regiao)}
          ${montarOpcao("Sul", form.regiao)}
          ${montarOpcao("Sudeste", form.regiao)}
          ${montarOpcao("Centro-Oeste", form.regiao)}
        </select>
      </label>

      <label class="campo-filtro">
        <span>Preco ate R$ <b id="precoValor">${form.preco}</b></span>
        <input id="precoDestino" class="barra-preco" type="range" min="150" max="900" step="10" value="${form.preco}" />
      </label>

      <label class="campo-filtro">
        <span>Nota minima</span>
        <select id="avaliacaoDestino" class="seletor">
          ${montarOpcao("0", form.avaliacao, "Todas")}
          ${montarOpcao("4.5", form.avaliacao, "4.5+")}
          ${montarOpcao("4.7", form.avaliacao, "4.7+")}
          ${montarOpcao("4.8", form.avaliacao, "4.8+")}
        </select>
      </label>

      <label class="campo-filtro">
        <span>Ordenar</span>
        <select id="ordemDestino" class="seletor">
          ${montarOpcao("relevancia", form.ordem, "Relevancia")}
          ${montarOpcao("menor-preco", form.ordem, "Menor preco")}
          ${montarOpcao("maior-nota", form.ordem, "Maior nota")}
          ${montarOpcao("mais-avaliados", form.ordem, "Mais avaliados")}
        </select>
      </label>

      <div class="botoes-filtro">
        <button class="aplicar-filtros" type="button" data-aplicar-filtros>Aplicar filtros</button>
        <button class="limpar-filtros" type="button" data-limpar-filtros>Limpar</button>
      </div>
    </section>
  `;
}

function montarOpcao(valor, valorAtual, texto = valor) {
  return `<option value="${valor}" ${valorAtual === valor ? "selected" : ""}>${texto}</option>`;
}

function nomeOrdenacao(valor) {
  const nomes = {
    relevancia: "relevancia",
    "menor-preco": "menor preco",
    "maior-nota": "maior nota",
    "mais-avaliados": "mais avaliados"
  };
  return nomes[valor] || valor;
}

function criarCartaoDestino(destino) {
  return `
    <article class="cartao-destino" data-destino-id="${destino.id}" tabindex="0">
      <img class="imagem-cartao" src="${destino.imagens[0]}" alt="${destino.nome}" loading="lazy" />
      <button class="botao-curtir ${destinoFoiCurtido(destino.id) ? "ativo" : ""}" type="button" data-favorito="${destino.id}" aria-label="Favoritar ${destino.nome}">
        ${destinoFoiCurtido(destino.id) ? "♥" : "♡"}
      </button>
      <div class="corpo-cartao">
        <div class="topo-cartao">
          <h2 class="nome-cartao">${destino.nome}</h2>
          <span class="categoria">${destino.tipo}</span>
        </div>
        <p class="local-cartao">⌖ ${destino.localizacao}</p>
        <p class="texto-cartao">${destino.descricao}</p>
        <div class="rodape-cartao">
          <span class="nota">★ ${destino.avaliacao.toFixed(1)} (${destino.totalAvaliacoes})</span>
          <span class="preco">${formatarPreco(destino)}</span>
        </div>
      </div>
    </article>
  `;
}

function ligarPainelFiltros() {
  document.querySelector("#buscaDestino").addEventListener("input", (event) => {
    rascunhoFiltros.busca = event.target.value;
  });

  document.querySelector("#tipoDestino").addEventListener("change", (event) => {
    rascunhoFiltros.tipo = event.target.value;
  });

  document.querySelector("#regiaoDestino").addEventListener("change", (event) => {
    rascunhoFiltros.regiao = event.target.value;
  });

  document.querySelector("#precoDestino").addEventListener("input", (event) => {
    rascunhoFiltros.preco = event.target.value;
    document.querySelector("#precoValor").textContent = rascunhoFiltros.preco;
  });

  document.querySelector("#avaliacaoDestino").addEventListener("change", (event) => {
    rascunhoFiltros.avaliacao = event.target.value;
  });

  document.querySelector("#ordemDestino").addEventListener("change", (event) => {
    rascunhoFiltros.ordem = event.target.value;
  });

  document.querySelector("[data-aplicar-filtros]").addEventListener("click", () => {
    filtrosAplicados = { ...rascunhoFiltros };
    buscaTopo.value = filtrosAplicados.busca;
    abrirListagemDestinos(paginaAtual);
  });

  document.querySelector("[data-limpar-filtros]").addEventListener("click", () => {
    rascunhoFiltros = { ...filtrosIniciais };
    filtrosAplicados = { ...filtrosIniciais };
    buscaTopo.value = "";
    abrirListagemDestinos(paginaAtual);
  });
}

function ligarCartoesDestino() {
  document.querySelectorAll("[data-destino-id]").forEach((card) => {
    card.addEventListener("click", () => abrirDetalhesDestino(Number(card.dataset.destinoId)));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        abrirDetalhesDestino(Number(card.dataset.destinoId));
      }
    });
  });

  document.querySelectorAll("[data-favorito]").forEach((botao) => {
    botao.addEventListener("click", (event) => {
      event.stopPropagation();
      alternarDestinoFavorito(Number(botao.dataset.favorito));
    });
  });
}

function abrirDetalhesDestino(id) {
  pararGaleriaAutomatica();
  destacarOpcaoMenu("destinos");
  destinoEscolhido = id;
  fotoGaleria = 0;
  abaAtual = "sobre";
  guardarNoHistorico(id);
  desenharDetalhesDestino();
  iniciarGaleriaAutomatica();
}

function desenharDetalhesDestino() {
  const destino = catalogoDestinos.find((item) => item.id === destinoEscolhido) || catalogoDestinos[0];
  const imagem = destino.imagens[fotoGaleria % destino.imagens.length];

  areaConteudo.innerHTML = `
    <button class="voltar" type="button" data-voltar>← Voltar para destinos</button>

    <section class="destaque-detalhe">
      <div class="carrossel">
        <img src="${imagem}" alt="${destino.nome}" />
        <button class="botao-carrossel anterior" type="button" data-carrossel="-1" aria-label="Foto anterior">‹</button>
        <button class="botao-carrossel proximo" type="button" data-carrossel="1" aria-label="Proxima foto">›</button>
        <div class="pontos-carrossel" aria-label="Galeria de imagens">
          ${destino.imagens.map((_, index) => `<button class="${index === fotoGaleria ? "ativo" : ""}" type="button" data-foto="${index}" aria-label="Foto ${index + 1}"></button>`).join("")}
        </div>
      </div>

      <div class="resumo-detalhe">
        <button class="favorito ${destinoFoiCurtido(destino.id) ? "ativo" : ""}" type="button" data-favorito="${destino.id}" aria-label="Favoritar ${destino.nome}">
          ${destinoFoiCurtido(destino.id) ? "♥" : "♡"}
        </button>
        <span class="rotulo-secao">${destino.tipo} em ${destino.regiao}</span>
        <h1>${destino.nome}</h1>
        <div class="info-detalhe">
          <span>⌖ ${destino.localizacao}</span>
          <span class="estrelas">${desenharEstrelas(destino.avaliacao)} ${destino.avaliacao.toFixed(1)} (${destino.totalAvaliacoes} avaliacoes)</span>
          <span>${formatarPreco(destino)} por dia</span>
        </div>
        <p class="descricao-detalhe">${destino.descricao}</p>
        <div class="etiquetas">${destino.tags.map((tag) => `<span class="etiqueta">${tag}</span>`).join("")}</div>
      </div>
    </section>

    <section class="barra-acoes" aria-label="Acoes do destino">
      <button class="botao-acao" type="button" data-atalho-aba="mapa">⌖ Ver no mapa</button>
      <button class="botao-acao" type="button" data-atalho-aba="avaliacoes">☆ Avaliacoes</button>
      <button class="botao-acao principal" type="button" data-reservar-destino>▣ Reservar</button>
    </section>

    <section class="resumo-info" aria-label="Informacoes principais">
      ${criarBlocoResumo("⌖", "Localizacao", destino.detalhes.localizacaoCurta)}
      ${criarBlocoResumo("☼", "Clima", `${destino.detalhes.clima}<br>${destino.detalhes.temperatura}`)}
      ${criarBlocoResumo("◷", "Melhor epoca", destino.detalhes.melhorEpoca)}
      ${criarBlocoResumo("$", "Custo medio", destino.detalhes.custoMedio)}
    </section>

    <nav class="abas" aria-label="Conteudo do destino">
      ${criarBotaoAba("sobre", "Sobre o destino")}
      ${criarBotaoAba("atracoes", "Atracoes")}
      ${criarBotaoAba("fotos", "Fotos")}
      ${criarBotaoAba("dicas", "Dicas")}
      ${criarBotaoAba("avaliacoes", "Avaliacoes")}
    </nav>

    <section class="conteudo-detalhe">
      <article class="bloco-texto">${criarConteudoAba(destino)}</article>
      <aside class="painel-lateral">
        <article class="cartao-mapa" id="mapa">
          <h3>Localizacao</h3>
          <div class="previa-mapa">⌖</div>
          <button class="botao-mapa" type="button" data-ver-mapa>Ver no mapa ↗</button>
        </article>
        <article class="cartao-favorito">
          <p>${destinoFoiCurtido(destino.id) ? "Destino salvo nos favoritos." : "Este destino ainda nao esta nos favoritos."}</p>
          <button type="button" data-favorito="${destino.id}">${destinoFoiCurtido(destino.id) ? "Remover dos favoritos" : "Adicionar aos favoritos"}</button>
        </article>
      </aside>
    </section>
  `;

  document.querySelector("[data-voltar]").addEventListener("click", () => abrirListagemDestinos("destinos"));
  document.querySelector("[data-reservar-destino]").addEventListener("click", () => mostrarReservaDestino(destino));
  document.querySelector("[data-ver-mapa]").addEventListener("click", () => mostrarMapaDestino(destino));
  document.querySelectorAll("[data-favorito]").forEach((botao) => botao.addEventListener("click", () => alternarDestinoFavorito(destino.id)));
  document.querySelectorAll("[data-carrossel]").forEach((botao) => {
    botao.addEventListener("click", () => trocarFotoGaleria(Number(botao.dataset.carrossel)));
  });
  document.querySelectorAll("[data-foto]").forEach((botao) => {
    botao.addEventListener("click", () => {
      fotoGaleria = Number(botao.dataset.foto);
      desenharDetalhesDestino();
    });
  });
  document.querySelectorAll("[data-aba]").forEach((botao) => {
    botao.addEventListener("click", () => {
      abaAtual = botao.dataset.aba;
      desenharDetalhesDestino();
    });
  });
  document.querySelectorAll("[data-atalho-aba]").forEach((botao) => {
    botao.addEventListener("click", () => {
      if (botao.dataset.atalhoAba === "mapa") {
        mostrarMapaDestino(destino);
        return;
      }
      abaAtual = botao.dataset.atalhoAba;
      desenharDetalhesDestino();
      document.querySelector(".abas").scrollIntoView({ behavior: "smooth" });
    });
  });
  areaConteudo.querySelectorAll("[data-view]").forEach((botao) => {
    botao.addEventListener("click", () => navegar(botao.dataset.view));
  });

  ligarComentariosDestino(destino);
}

function criarBlocoResumo(icone, titulo, texto) {
  return `<article class="item-info"><span class="icone-info">${icone}</span><div><strong>${titulo}</strong><p>${texto}</p></div></article>`;
}

function criarBotaoAba(chave, texto) {
  return `<button class="aba ${abaAtual === chave ? "ativo" : ""}" type="button" data-aba="${chave}">${texto}</button>`;
}

function criarConteudoAba(destino) {
  if (abaAtual === "atracoes") {
    return `<h2>Atracoes</h2><div class="grade-info">${destino.atracoes.map((item) => `<article><strong>${item}</strong><p>Inclua no roteiro para aproveitar melhor ${destino.nome}.</p></article>`).join("")}</div>`;
  }
  if (abaAtual === "fotos") {
    return `<h2>Fotos</h2><div class="grade-fotos">${destino.imagens.map((src) => `<img src="${src}" alt="${destino.nome}" loading="lazy" />`).join("")}</div>`;
  }
  if (abaAtual === "dicas") {
    return `<h2>Dicas</h2><ul class="lista-dicas">${destino.dicas.map((item) => `<li>${item}</li>`).join("")}</ul>`;
  }
  if (abaAtual === "avaliacoes") {
    return `
      <h2>Avaliacoes</h2>
      <div class="avaliacoes-lista">
        ${destino.avaliacoes.map((item) => `<article><strong>${item.nome}</strong><span>${desenharEstrelas(item.nota)} ${item.nota}</span><p>${item.texto}</p></article>`).join("")}
      </div>
      ${criarAreaComentarios(destino)}
    `;
  }
  return `
    <h2>Sobre o destino</h2>
    <p>${destino.detalhes.sobre}</p>
    <h3>Como chegar</h3>
    <p>${destino.detalhes.comoChegar}</p>
    <button class="botao-planejar" type="button" data-view="planejar">Planejar minha viagem</button>
  `;
}

function trocarFotoGaleria(direcao) {
  const destino = catalogoDestinos.find((item) => item.id === destinoEscolhido);
  fotoGaleria = (fotoGaleria + direcao + destino.imagens.length) % destino.imagens.length;
  desenharDetalhesDestino();
}

function iniciarGaleriaAutomatica() {
  pararGaleriaAutomatica();
  timerGaleria = setInterval(() => {
    if (!destinoEscolhido) return;
    if (abaAtual !== "sobre") return;
    trocarFotoGaleria(1);
  }, 4500);
}

function pararGaleriaAutomatica() {
  if (timerGaleria) clearInterval(timerGaleria);
  timerGaleria = null;
}

function mostrarReservaDestino(destino = destinoAtual()) {
  pararGaleriaAutomatica();
  destacarOpcaoMenu("planejar");
  destinoEscolhido = destino.id;

 const usuario = usuarioLogado();
if (!usuario) {
  alert("Entre na sua conta para fazer uma reserva.");
  return;
}
const reservaSalva = buscarReservaUsuario(destino.id) || {};

  areaConteudo.innerHTML = `
    <button class="voltar" type="button" data-voltar-detalhes>← Voltar para detalhes</button>

    <section class="titulo-pagina titulo-menor">
      <span class="rotulo-secao">Reserva</span>
      <h1>${destino.nome}</h1>
      <p>Informe os dados principais para simular a reserva e conferir o valor estimado.</p>
    </section>

    <section class="tela-reserva">
      <form class="form-reserva" data-form-reserva>
        <label>
          <span>Data inicial</span>
          <input type="date" id="reservaInicio" value="${reservaSalva.inicio || ""}" required />
        </label>
        <label>
          <span>Data final</span>
          <input type="date" id="reservaFim" value="${reservaSalva.fim || ""}" required />
        </label>
        <label>
          <span>Nome</span>
          <input type="text" id="reservaNome" value="${reservaSalva.nome || ""}" required />
        </label>
        <label>
          <span>E-mail</span>
          <input type="email" id="reservaEmail" value="${reservaSalva.email || ""}" required />
        </label>
        <label>
          <span>Adultos</span>
          <input type="number" id="reservaAdultos" min="0" max="30" value="${reservaSalva.adultos || 1}" />
        </label>
        <label>
          <span>Crianças</span>
          <input type="number" id="reservaCriancas" min="0" max="30" value="${reservaSalva.criancas || 0}" />
        </label>
        <label>
          <span>Quartos</span>
          <input type="number" id="reservaQuartos" min="0" max="5" value="${reservaSalva.quartos || 1}" />
        </label>
        <label>
          <span>Ingressos</span>
          <input type="number" id="reservaIngressos" min="0" max="20" value="${reservaSalva.ingressos || 0}" />
        </label>

        <fieldset class="pagamento-reserva">
          <legend>Forma de pagamento</legend>
          <div class="opcoes-pagamento">
            ${["Cartao de credito", "Cartao de debito", "Pix", "Dinheiro", "Outros"].map((item, index) => `
              <label>
                <input type="radio" name="pagamentoReserva" value="${item}" ${reservaSalva.pagamento === item || (!reservaSalva.pagamento && index === 0) ? "checked" : ""} />
                <span>${item}</span>
              </label>
            `).join("")}
          </div>
        </fieldset>

        <button class="botao-planejar" type="submit">Finalizar reserva</button>
      </form>

      <aside class="resumo-reserva">
        <h2>Dados da reserva</h2>
        <p><strong>Nome:</strong> <span data-resumo="nome">-</span></p>
        <p><strong>Email:</strong> <span data-resumo="email">-</span></p>
        <p><strong>Adultos:</strong> <span data-resumo="adultos">0</span></p>
        <p><strong>Crianças:</strong> <span data-resumo="criancas">0</span></p>
        <p><strong>Quartos:</strong> <span data-resumo="quartos">0</span></p>
        <p><strong>Ingressos:</strong> <span data-resumo="ingressos">0</span></p>
        <p><strong>Dias:</strong> <span data-resumo="dias">1</span></p>
        <p><strong>Pagamento:</strong> <span data-resumo="pagamento">-</span></p>
        <hr />
        <h3>Total: R$ <span data-resumo="total">0.00</span></h3>
      </aside>
    </section>
  `;

  document.querySelector("[data-voltar-detalhes]").addEventListener("click", () => abrirDetalhesDestino(destino.id));
  ligarReservaDestino(destino);
}

function calcularReserva(destino) {
  const inicio = document.querySelector("#reservaInicio").value;
  const fim = document.querySelector("#reservaFim").value;
  const adultos = Number(document.querySelector("#reservaAdultos").value || 0);
  const criancas = Number(document.querySelector("#reservaCriancas").value || 0);
  const quartos = Number(document.querySelector("#reservaQuartos").value || 0);
  const ingressos = Number(document.querySelector("#reservaIngressos").value || 0);

  let dias = 1;
  if (inicio && fim) {
    dias = Math.ceil((new Date(fim) - new Date(inicio)) / (1000 * 60 * 60 * 24));
    if (dias <= 0) dias = 1;
  }

  const valorAdultos = adultos * destino.precoMax * dias;
  const valorCriancas = criancas * Math.round(destino.precoMin * 0.75) * dias;
  const valorQuartos = quartos * 120 * dias;
  const valorIngressos = ingressos * 80;

  return {
    dias,
    total: valorAdultos + valorCriancas + valorQuartos + valorIngressos
  };
}

function atualizarResumoReserva(destino) {
  const pagamento = document.querySelector("input[name='pagamentoReserva']:checked");
  const calculo = calcularReserva(destino);

  document.querySelector("[data-resumo='nome']").textContent = document.querySelector("#reservaNome").value || "-";
  document.querySelector("[data-resumo='email']").textContent = document.querySelector("#reservaEmail").value || "-";
  document.querySelector("[data-resumo='adultos']").textContent = document.querySelector("#reservaAdultos").value || "0";
  document.querySelector("[data-resumo='criancas']").textContent = document.querySelector("#reservaCriancas").value || "0";
  document.querySelector("[data-resumo='quartos']").textContent = document.querySelector("#reservaQuartos").value || "0";
  document.querySelector("[data-resumo='ingressos']").textContent = document.querySelector("#reservaIngressos").value || "0";
  document.querySelector("[data-resumo='dias']").textContent = calculo.dias;
  document.querySelector("[data-resumo='pagamento']").textContent = pagamento ? pagamento.value : "-";
  document.querySelector("[data-resumo='total']").textContent = calculo.total.toFixed(2);
}

function ligarReservaDestino(destino) {
  const form = document.querySelector("[data-form-reserva]");
  form.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", () => atualizarResumoReserva(destino));
    input.addEventListener("change", () => atualizarResumoReserva(destino));
  });
 form.addEventListener("submit", (event) => {
  event.preventDefault();

  const usuario = usuarioLogado();
  if (!usuario) {
    alert("Entre na sua conta para reservar.");
    return;
  }

  const pagamento = document.querySelector("input[name='pagamentoReserva']:checked");
  const calculo = calcularReserva(destino);
  const reservas = lerReservas();
  const existente = reservas.find((r) => r.destinoId === destino.id && r.usuarioId === usuario.id);

  const dadosReserva = {
    id: existente ? existente.id : Date.now(),
    usuarioId: usuario.id,
    destinoId: destino.id,
    destinoNome: destino.nome,
    destinoImagem: destino.imagens[0],
    inicio: document.querySelector("#reservaInicio").value,
    fim: document.querySelector("#reservaFim").value,
    nome: document.querySelector("#reservaNome").value,
    email: document.querySelector("#reservaEmail").value,
    adultos: document.querySelector("#reservaAdultos").value,
    criancas: document.querySelector("#reservaCriancas").value,
    quartos: document.querySelector("#reservaQuartos").value,
    ingressos: document.querySelector("#reservaIngressos").value,
    pagamento: pagamento ? pagamento.value : "",
    dias: calculo.dias,
    total: calculo.total.toFixed(2),
    criadaEm: existente ? existente.criadaEm : new Date().toISOString()
  };

  const novasReservas = existente
    ? reservas.map((r) => (r.id === existente.id ? dadosReserva : r))
    : [...reservas, dadosReserva];

  salvarReservas(novasReservas);
  alert(existente ? "Reserva atualizada com sucesso!" : "Reserva salva com sucesso!");
});

atualizarResumoReserva(destino);
}

   


function mostrarMapaDestino(destino = destinoAtual()) {
  pararGaleriaAutomatica();
  destacarOpcaoMenu("destinos");
  destinoEscolhido = destino.id;

  const coordenadas = pegarCoordenadas(destino);
  const pontos = JSON.parse(localStorage.getItem(chaveMapa(destino.id)) || "[]");
  const todosPontos = [{ nome: destino.nome, localizacao: destino.localizacao, coordenadas }, ...pontos];

  areaConteudo.innerHTML = `
    <button class="voltar" type="button" data-voltar-detalhes>← Voltar para detalhes</button>

    <section class="titulo-pagina titulo-menor">
      <span class="rotulo-secao">Mapa do destino</span>
      <h1>${destino.nome}</h1>
      <p>Veja a localização principal do destino e salve pontos pesquisados para consultar depois.</p>
    </section>

    <section class="tela-mapa-destino">
      <div class="mapa-area">
        <div class="mapa-busca">
          <input type="text" id="pesquisaMapa" placeholder="Pesquisar ponto no destino" />
          <button class="botao-mapa" type="button" data-pesquisar-mapa>Pesquisar</button>
          <button class="botao-acao" type="button" data-limpar-pontos>Limpar pontos</button>
        </div>
        <div class="mapa-visual" id="mapaDestino">
          <span class="pino-mapa">⌖</span>
          <strong>${destino.nome}</strong>
          <small>${coordenadas[0].toFixed(4)}, ${coordenadas[1].toFixed(4)}</small>
        </div>
        <p class="aviso-mapa" data-aviso-mapa>Carregando mapa de ${destino.nome}...</p>
      </div>

      <aside class="dicas-mapa">
        <h2>Pontos no mapa</h2>
        <div class="lista-pontos-mapa">
          ${todosPontos.map((ponto) => `
            <article>
              <strong>${ponto.nome}</strong>
              <p>${ponto.localizacao || "Ponto pesquisado no destino"}</p>
              ${ponto.coordenadas ? `<small>${ponto.coordenadas[0].toFixed(4)}, ${ponto.coordenadas[1].toFixed(4)}</small>` : ""}
            </article>
          `).join("")}
        </div>
      </aside>
    </section>
  `;

  document.querySelector("[data-voltar-detalhes]").addEventListener("click", () => abrirDetalhesDestino(destino.id));
  ligarMapaDestino(destino);
  montarMapaDestino(destino, pontos);
}

function ligarMapaDestino(destino) {
  document.querySelector("[data-pesquisar-mapa]").addEventListener("click", async () => {
    const termo = document.querySelector("#pesquisaMapa").value.trim();
    if (!termo) {
      alert("Digite um local");
      return;
    }

    const pontos = JSON.parse(localStorage.getItem(chaveMapa(destino.id)) || "[]");
    const coordenadasDestino = pegarCoordenadas(destino);
    let coordenadas = criarCoordenadaProxima(coordenadasDestino, pontos.length);

    try {
      const busca = encodeURIComponent(`${termo}, ${destino.localizacao}, Brasil`);
      const resposta = await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${busca}`);
      const resultado = await resposta.json();

      if (resultado.length) {
        coordenadas = [Number(resultado[0].lat), Number(resultado[0].lon)];
      }
    } catch (erro) {
      console.warn("Nao foi possivel buscar o ponto no mapa", erro);
    }

    pontos.unshift({
      nome: termo,
      localizacao: `Pesquisa relacionada a ${destino.nome}`,
      coordenadas
    });

    localStorage.setItem(chaveMapa(destino.id), JSON.stringify(pontos.slice(0, 6)));
    mostrarMapaDestino(destino);
  });

  document.querySelector("[data-limpar-pontos]").addEventListener("click", () => {
    localStorage.removeItem(chaveMapa(destino.id));
    mostrarMapaDestino(destino);
  });
}

function montarMapaDestino(destino, pontos) {
  const aviso = document.querySelector("[data-aviso-mapa]");
  const elementoMapa = document.querySelector("#mapaDestino");
  const coordenadas = pegarCoordenadas(destino);

  if (!elementoMapa) return;

  if (mapaDestinoAberto) {
    mapaDestinoAberto.remove();
    mapaDestinoAberto = null;
  }

  elementoMapa.innerHTML = "";

  if (typeof L === "undefined") {
    aviso.textContent = "O mapa interativo precisa de internet para carregar. Os pontos pesquisados continuam salvos na lista.";
    elementoMapa.innerHTML = `
      <div class="mapa-sem-internet">
        <strong>${destino.nome}</strong>
        <span>${coordenadas[0].toFixed(4)}, ${coordenadas[1].toFixed(4)}</span>
      </div>
    `;
    return;
  }

  mapaDestinoAberto = L.map(elementoMapa, {
    scrollWheelZoom: false
  }).setView(coordenadas, 12);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap"
  }).addTo(mapaDestinoAberto);

  L.marker(coordenadas)
    .addTo(mapaDestinoAberto)
    .bindPopup(`<strong>${destino.nome}</strong><br>${destino.localizacao}`)
    .openPopup();

  pontos.forEach((ponto) => {
    if (!ponto.coordenadas) return;

    L.marker(ponto.coordenadas)
      .addTo(mapaDestinoAberto)
      .bindPopup(`<strong>${ponto.nome}</strong><br>${ponto.localizacao || "Ponto pesquisado"}`);
  });

  aviso.textContent = "Use o zoom, arraste o mapa ou pesquise pontos para montar seu roteiro.";
  setTimeout(() => mapaDestinoAberto.invalidateSize(), 100);
}

function mostrarFavoritos() {
  pararGaleriaAutomatica();
  destacarOpcaoMenu("favoritos");
  paginaAtual = "favoritos";
  destinoEscolhido = null;
  const listaFavoritos = catalogoDestinos.filter((destino) => destinoFoiCurtido(destino.id));

  areaConteudo.innerHTML = `
    <section class="titulo-pagina titulo-menor">
      <span class="rotulo-secao">Sua selecao</span>
      <h1>Favoritos</h1>
      <p>Destinos curtidos aparecem aqui para voce comparar e planejar depois.</p>
    </section>
    ${
      listaFavoritos.length
        ? `<section class="grade-destinos">${listaFavoritos.map(criarCartaoDestino).join("")}</section>`
        : `<section class="mensagem-vazia">Voce ainda nao favoritou nenhum destino. Curta um card para ele aparecer aqui.</section>`
    }
  `;
  ligarCartoesDestino();
}

function mostrarTelaSimples(tela) {
  if(tela === "inicio"){
    return mostrarInicio();
  }
  pararGaleriaAutomatica();
  destacarOpcaoMenu(tela);
  destinoEscolhido = null;
  const vistos = historico
    .map((id) => catalogoDestinos.find((destino) => destino.id === id))
    .filter(Boolean)
    .map((destino) => destino.nome);

  const paginas = {
    inicio: ["Painel", "Resumo da sua proxima viagem", "Veja destinos em alta, favoritos recentes e atalhos para planejar seu roteiro.", ["Destinos mais bem avaliados", "Promocoes por regiao", "Roteiros recomendados"]],
    grupo: ["Viagens em grupo", "Convide pessoas para viajar junto", "Monte grupos, compare destinos e acompanhe quem ja confirmou presenca.", ["Grupo Noronha 2026", "Amigos de inverno", "Familia no Nordeste"]],
    planejar: ["Planejamento", "Organize seu roteiro", "Defina datas, custos estimados, hospedagem e atividades principais.", ["Datas da viagem", "Orcamento diario", "Checklist de reservas"]],
    historico: ["Historico", "Ultimas buscas e visitas", "Acompanhe os destinos que voce visualizou recentemente.", vistos.length ? vistos : catalogoDestinos.slice(0, 3).map((destino) => destino.nome)],
    perfil: ["Perfil", "Preferencias da Izadora", "Ajuste seus interesses para receber sugestoes mais alinhadas.", ["Praias tranquilas", "Natureza", "Viagens de 5 a 7 dias"]],
    configuracoes: ["Configuracoes", "Ajustes da conta", "Controle notificacoes, privacidade e preferencias da plataforma.", ["Notificacoes", "Privacidade", "Idioma e moeda"]],
    sair: ["Sessao", "Tudo certo por aqui", "Esta tela representa a acao de sair no prototipo.", ["Salvar favoritos", "Limpar filtros", "Voltar para destinos"]]
  };

  const [rotulo, titulo, texto, cards] = paginas[tela] || paginas.inicio;

  areaConteudo.innerHTML = `
    <section class="titulo-pagina titulo-menor">
      <span class="rotulo-secao">${rotulo}</span>
      <h1>${titulo}</h1>
      <p>${texto}</p>
    </section>
    <section class="grade-info">
      ${cards.map((item) => `<article><strong>${item}</strong></article>`).join("")}
    </section>
  `;
}

function iniciarInicioEventos() {
  const searchInput = document.getElementById('searchInput');
  const searchSuggestions = document.getElementById('searchSuggestions');
  const btnSearch = document.getElementById('btnSearch');
  const dateFilter = document.getElementById('dateFilter');
  const cardsGrid = document.getElementById('cardsGrid');
  const noResults = document.getElementById('noResults');
  const resultsCount = document.getElementById('resultsCount');
  const btnLoadMore = document.getElementById('btnLoadMore');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  let activeCategory = '';
  let activeCity = '';
  let activeDate = '';

  function getCards() {
    return Array.from(cardsGrid.querySelectorAll('.card'));
  }

  function normalizeStr(str) {
    return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  function showSuggestions() {
    const query = normalizeStr(searchInput.value.trim());

    const suggestions = getCards().filter(card => {
      const name = normalizeStr(card.dataset.name || '');
      const city = normalizeStr(card.dataset.cidade || '');
      const category = normalizeStr(card.dataset.categoria || '');

      return !query || name.includes(query) || city.includes(query) || category.includes(query);
    });

    searchSuggestions.innerHTML = '';

    suggestions.forEach(card => {
      const name = card.dataset.name;
      const city = card.dataset.cidade;
      const category = card.dataset.categoria;
      const img = card.querySelector('img').src;

      const item = document.createElement('div');
      item.classList.add('suggestion-card');

      item.innerHTML = `
        <img src="${img}" alt="${name}">
        <div>
          <h4>${name}</h4>
          <p>${city}</p>
          <span>${category}</span>
        </div>
      `;

      item.addEventListener('click', () => {
        searchInput.value = name;
        searchSuggestions.classList.remove('open');
        filterCards();
      });

      searchSuggestions.appendChild(item);
    });

    searchSuggestions.classList.toggle('open', suggestions.length > 0);
  }

  function filterCards() {
    const query = normalizeStr(searchInput.value.trim());
    const cards = getCards();
    let visible = 0;

    cards.forEach(card => {
      const name = normalizeStr(card.dataset.name || '');
      const cat = card.dataset.categoria || '';
      const city = card.dataset.cidade || '';
      const cardDate = card.dataset.data || '';

      const matchSearch = !query || name.includes(query);
      const matchCat = !activeCategory || cat === activeCategory;
      const matchCity = !activeCity || city === activeCity;
      const matchDate = !activeDate || cardDate === activeDate;

      if (matchSearch && matchCat && matchCity && matchDate) {
        card.classList.remove('hidden');
        visible++;
      } else {
        card.classList.add('hidden');
      }
    });

    resultsCount.textContent = visible + (visible === 1 ? ' resultado' : ' resultados');
    noResults.style.display = visible === 0 ? 'block' : 'none';
  }

  searchInput.addEventListener('input', () => {
    showSuggestions();
    filterCards();
  });

  btnSearch.addEventListener('click', filterCards);

  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') filterCards();
  });

  searchInput.addEventListener('focus', showSuggestions);

  document.addEventListener('click', e => {
    if (!e.target.closest('.search-box')) {
      searchSuggestions.classList.remove('open');
    }
  });

  dateFilter.addEventListener('change', () => {
    activeDate = dateFilter.value;
    filterCards();
  });

  function setupDropdown(selectId, dropdownId, labelId, onSelect) {
    const select = document.getElementById(selectId);
    const dropdown = document.getElementById(dropdownId);
    const label = document.getElementById(labelId);

    select.addEventListener('click', e => {
      e.stopPropagation();
      dropdown.classList.toggle('open');
      select.classList.toggle('active');
    });

    dropdown.querySelectorAll('.dropdown-item').forEach(item => {
      item.addEventListener('click', () => {
        const value = item.dataset.value;
        label.textContent = item.textContent;

        dropdown.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('selected'));
        item.classList.add('selected');

        dropdown.classList.remove('open');
        select.classList.remove('active');

        onSelect(value);
        filterCards();
      });
    });
  }

  setupDropdown('catSelect', 'catDropdown', 'catLabel', val => {
    activeCategory = val;
  });

  setupDropdown('cidSelect', 'cidDropdown', 'cidLabel', val => {
    activeCity = val;
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
    document.querySelectorAll('.filter-select').forEach(s => s.classList.remove('active'));
  });

  document.querySelectorAll('.dropdown').forEach(d => {
    d.addEventListener('click', e => e.stopPropagation());
  });

  hamburger?.addEventListener('click', () => {
    mobileMenu?.classList.toggle('open');
  });

  btnLoadMore.addEventListener('click', () => {
    btnLoadMore.textContent = 'Carregando...';
    btnLoadMore.disabled = true;

    setTimeout(() => {
      btnLoadMore.textContent = 'Não há mais eventos';
      btnLoadMore.style.opacity = '0.5';
      btnLoadMore.style.cursor = 'default';
    }, 1200);
  });

  document.querySelectorAll('.btn-detalhes').forEach(btn => {
    btn.addEventListener('click', function () {
      const card = this.closest('.card');
      alert('Detalhes de: ' + card.dataset.name);
    });
  });

  filterCards();
}

function navegar(tela) {

  if (tela === "destinos") return abrirListagemDestinos("destinos");
  if (tela === "buscar") return abrirListagemDestinos("buscar");
  if (tela === "favoritos") return mostrarFavoritos();
  return mostrarTelaSimples(tela);
}

async function iniciar() {
  try {
    const resposta = await fetch("data.json");
    const dados = await resposta.json();
    const cadastradosPeloAdmin = JSON.parse(localStorage.getItem("travelsync:destinosAdmin") || "[]");
    const extrasDaEquipe = novosDestinos.map(prepararDestinoExtra);

    catalogoDestinos = prepararCatalogoDestinos([...dados.destinos, ...extrasDaEquipe, ...cadastradosPeloAdmin]);
    atualizarResumoFavoritos();
    abrirListagemDestinos("destinos");
    atualizarImagensDosDestinos();
  } catch (erro) {
    areaConteudo.innerHTML = `<section class="mensagem-vazia">Nao foi possivel carregar os dados dos destinos.</section>`;
  }
}

linksMenu.forEach((botao) => botao.addEventListener("click", () => navegar(botao.dataset.view)));

buscaTopo.addEventListener("input", (event) => {
  filtrosAplicados.busca = event.target.value;
  abrirListagemDestinos("buscar");
});

abrirMenu.addEventListener("click", abrirMenuLateral);
fecharMenu.addEventListener("click", fecharMenuLateral);
fundoMenu.addEventListener("click", fecharMenuLateral);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") fecharCamadasAbertas();
});

async function iniciar() {
  try {
    const resposta = await fetch("data.json");
    const dados = await resposta.json();
    const cadastradosPeloAdmin = JSON.parse(localStorage.getItem("travelsync:destinosAdmin") || "[]");
    const extrasDaEquipe = novosDestinos.map(prepararDestinoExtra);

    catalogoDestinos = prepararCatalogoDestinos([...dados.destinos, ...extrasDaEquipe, ...cadastradosPeloAdmin]);
    atualizarResumoFavoritos();

    const params = new URLSearchParams(window.location.search);
    const destinoParaReservar = params.get("reservar");

    if (destinoParaReservar) {
      const destino = catalogoDestinos.find((d) => d.id === Number(destinoParaReservar));
      if (destino) mostrarReservaDestino(destino);
    } else if (window.location.hash === "#favoritos") {
      mostrarFavoritos();
    } else {
      abrirListagemDestinos("destinos");
    }

    atualizarImagensDosDestinos();
  } catch (erro) {
    areaConteudo.innerHTML = `<section class="mensagem-vazia">Nao foi possivel carregar os dados dos destinos.</section>`;
  }
}
iniciar()


















