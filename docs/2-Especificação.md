# Especificações Do Projeto

Esta seção apresenta as principais definições do sistema, descrevendo suas funcionalidades e características. Para isso, foram utilizadas técnicas como criação de personas, histórias de usuário e levantamento de requisitos.

Esses elementos ajudam a entender as necessidades dos usuários e servem como base para o desenvolvimento da plataforma.

## Personas

Persona 1 – Eduardo

Eduardo tem 29 anos, é empreendedor digital e trabalha de forma remota. Ele gosta de viajar com frequência, mas precisa de locais que ofereçam boa infraestrutura, especialmente internet de qualidade e espaços confortáveis para trabalhar. Valoriza praticidade, organização e informações confiáveis. Seu objetivo é conseguir conciliar trabalho e lazer durante suas viagens, mantendo produtividade sem abrir mão de conhecer novos lugares.

Persona 2 – Beatriz

Beatriz tem 35 anos, é casada e possui filhos. Ela costuma planejar viagens em família e busca locais que agradem tanto adultos quanto crianças. Enfrenta dificuldades na organização das viagens e na escolha de destinos que atendam a todos. Seu objetivo é proporcionar momentos agradáveis para sua família com segurança e praticidade.

Persona 3 – Helena

Helena tem 22 anos, é fisioterapeuta e gosta de conhecer novos lugares e pessoas. Possui o desejo de ser bem-sucedida e viajar pelo mundo. Durante suas viagens, busca conforto, segurança e praticidade, evitando situações problemáticas relacionadas à falta de infraestrutura nos destinos. Seu principal objetivo é facilitar o planejamento e garantir uma experiência de viagem tranquila e organizada por meio de uma plataforma digital.

Persona 4 – Carlos

Carlos tem 27 anos, é programador e aprecia visitar museus, geralmente viajando com sua namorada. Ele busca locais que ofereçam boa conexão com a internet, de modo que consiga conciliar lazer e trabalho. Seu objetivo é encontrar museus e destinos confiáveis, permitindo que aproveite novas experiências sem se desconectar de suas responsabilidades profissionais.

Persona 5 – Neiva

Neiva tem 63 anos, é aposentada e costuma viajar com seu marido. Prefere destinos turísticos mais calmos e que atendam às suas necessidades físicas. Possui certa dificuldade com o uso de tecnologias digitais, o que faz com que busque plataformas simples e de fácil utilização. Seu objetivo é organizar viagens de forma prática, segura e econômica, garantindo momentos agradáveis ao lado de seu companheiro.

Persona 6 – Heitor

Heitor tem 23 anos e possui deficiência auditiva. Ele gosta de viajar e deseja aproveitar os destinos turísticos sem enfrentar barreiras relacionadas à falta de acessibilidade. Busca locais que ofereçam estrutura adequada e comunicação inclusiva. Seu objetivo é sentir-se acolhido e respeitado, podendo vivenciar experiências completas e acessíveis durante suas viagens.


## Histórias de Usuários

| EU COMO... | QUERO/PRECISO...                     | PARA...                     |
| ---------- | ------------------------------------ | --------------------------- |
| Eduardo    | Encontrar locais com boa internet    | Trabalhar remotamente       |
| Eduardo    | Encontrar espaços confortáveis       | Manter produtividade        |
| Eduardo    | Ver avaliações sobre infraestrutura  | Escolher locais adequados   |
| Eduardo    | Planejar viagens com praticidade     | Economizar tempo            |
| Eduardo    | Utilizar mapa interativo             | Encontrar locais próximos   |
| Eduardo    | Organizar roteiros                   | Equilibrar trabalho e lazer |
| Eduardo    | Ver recomendações de outros usuários | Tomar melhores decisões     |
| Eduardo    | Participar de equipes de viagem      | Compartilhar experiências   |


| EU COMO... | QUERO/PRECISO...                  | PARA...                   |
| ---------- | --------------------------------- | ------------------------- |
| Beatriz    | Planejar viagens em família       | Organizar melhor a viagem |
| Beatriz    | Encontrar locais para crianças    | Agradar toda a família    |
| Beatriz    | Ver avaliações de outros usuários | Tomar decisões seguras    |
| Beatriz    | Criar roteiros                    | Facilitar o planejamento  |
| Beatriz    | Economizar tempo                  | Reduzir esforço           |


| EU COMO... | QUERO/PRECISO...                          | PARA...                      |
| ---------- | ----------------------------------------- | ---------------------------- |
| Helena     | Encontrar destinos seguros e estruturados | Ter uma viagem tranquila     |
| Helena     | Ter informações claras sobre os locais    | Evitar imprevistos           |
| Helena     | Planejar viagens com facilidade           | Reduzir ansiedade            |
| Helena     | Usar mapa interativo                      | Localizar pontos importantes |
| Helena     | Interagir com outros viajantes            | Fazer novas conexões         |


| EU COMO... | QUERO/PRECISO...                  | PARA...                    |
| ---------- | --------------------------------- | -------------------------- |
| Carlos     | Encontrar locais com boa internet | Conciliar trabalho e lazer |
| Carlos     | Ver informações confiáveis        | Evitar experiências ruins  |
| Carlos     | Encontrar museus e eventos        | Aproveitar o passeio       |
| Carlos     | Avaliar locais visitados          | Compartilhar experiências  |
| Carlos     | Acessar links oficiais            | Ter informações seguras    |

| EU COMO... | QUERO/PRECISO...                | PARA...                          |
| ---------- | ------------------------------- | -------------------------------- |
| Neiva      | Encontrar destinos tranquilos   | Viajar com conforto              |
| Neiva      | Utilizar um site simples        | Evitar dificuldades tecnológicas |
| Neiva      | Ver informações claras          | Entender melhor os locais        |
| Neiva      | Planejar viagens com facilidade | Organizar o passeio              |
| Neiva      | Garantir segurança              | Viajar sem preocupações          |


| EU COMO... | QUERO/PRECISO...                        | PARA...                  |
| ---------- | --------------------------------------- | ------------------------ |
| Heitor     | Encontrar locais acessíveis             | Não enfrentar barreiras  |
| Heitor     | Ter informações inclusivas              | Se sentir respeitado     |
| Heitor     | Saber se os locais têm suporte adequado | Planejar melhor a visita |
| Heitor     | Avaliar acessibilidade dos locais       | Ajudar outros usuários   |
| Heitor     | Participar de grupos                    | Se sentir incluído       |



## Requisitos

| ID     | Descrição do Requisito              | Prioridade |
| ------ | ----------------------------------- | ---------- |
| RF-001 | Permitir cadastro de usuários       | ALTA       |
| RF-002 | Permitir login e logout             | ALTA       |
| RF-003 | Permitir edição de perfil           | MÉDIA      |
| RF-004 | Permitir criação de equipes         | ALTA       |
| RF-005 | Permitir entrada em equipes         | ALTA       |
| RF-006 | Permitir gerenciamento de membros   | MÉDIA      |
| RF-007 | Exibir mapa interativo              | ALTA       |
| RF-008 | Permitir visualização de destinos   | ALTA       |
| RF-009 | Permitir criação de roteiros        | MÉDIA      |
| RF-010 | Permitir envio de fotos             | ALTA       |
| RF-011 | Permitir avaliação de locais        | ALTA       |
| RF-012 | Permitir visualização de avaliações | ALTA       |
| RF-013 | Permitir busca de destinos          | MÉDIA      |


### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| Permitir que o usuário cadastre tarefas | ALTA | 
|RF-002| Emitir um relatório de tarefas no mês   | MÉDIA |


### Requisitos não Funcionais

| ID      | Descrição do Requisito                              | Prioridade |
| ------- | --------------------------------------------------- | ---------- |
| RNF-001 | O sistema deve ser responsivo (mobile e desktop)    | ALTA       |
| RNF-002 | O sistema deve responder em até 3 segundos          | MÉDIA      |
| RNF-003 | O sistema deve garantir segurança no login          | ALTA       |
| RNF-004 | O sistema deve proteger dados dos usuários          | ALTA       |
| RNF-005 | O sistema deve ser fácil de usar                    | ALTA       |
| RNF-006 | O sistema deve funcionar nos principais navegadores | MÉDIA      |


## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

| ID | Restrição                                                           |
| -- | ------------------------------------------------------------------- |
| 01 | O projeto deverá ser entregue até o final do semestre               |
| 02 | O sistema será desenvolvido como aplicação web                      |
| 03 | O desenvolvimento será realizado com recursos limitados             |
| 04 | O sistema não utilizará tecnologias muito complexas devido ao prazo |


