SKY JUMP (Relatório)

*Imagem Bonita que iria meter num documento Word até mudar de ideias e escrever tudo aqui*

Trabalho realizado por: David Santos Oliveira, 1ºP

OFICINA - Escola Profissional do INA

Introdução ao jogo:

O que é o Sky Jump:
Sky Jump é um jogo de plataformas vertical onde o jogador controla uma personagem
que tem como objetivo subir o mais alto possível. À medida que a personagem salta
automaticamente ao tocar nas plataformas, o jogador deve movimentá-la lateralmente
utilizando as teclas A e D ou as setas direcionais, tentando mantê-la sempre em cima
de novas plataformas e evitando quedas.

Objetivo do Jogo:
O principal objetivo do Sky Jump é alcançar a maior altura possível sem cair.
A pontuação é baseada na altura atingida e, quanto mais alto se vai, maior é a
pontuação final. Algumas plataformas têm trampolins que fazem a personagem saltar
ainda mais alto, ajudando a chegar a alturas maiores.

Desafio e Competição:
Caso a personagem caia para fora do ecrã, o jogo termina e a pontuação é registada.
Os jogadores podem competir entre si para ver quem consegue atingir a maior pontuação,
o que torna o Sky Jump em não só um teste de reflexos e coordenação, mas também uma
experiência competitiva.



Implementações feitas:

Prevenção de Zoom com Ctrl + Scroll e Ctrl + +/-:
Notei que, com um maior ou menor zoom, o jogo poderia tornar-se mais fácil ou difícil
porque haveria mais/menos espaço para as plataformas, por isso, bloqueei qualquer forma
de zoom através de atalhos de teclado, para ninguém usar o zoom máximo para ter uma pontuação
extremamente alta.

Controlo de Música de Fundo e Mute/Unmute:
Adicionei uma música de fundo relaxante para tornar as viagens até ao céu menos entediantes,
mas se não quiser, é só clicar no botão presente no canto superior direito. O botão mostra
ícones diferentes conforme a música esteja ativa ou não, adicionei um fade-in e fade-out da
música para a transição ser mais suave. (Já agora, o nome da música é "Cities" e foi feita
por Throttle (acho que deixei isso claro pelo nome do ficheiro da música), a música usada
tem apenas o instrumental).

Configurações do Jogo:
Foram adicionadas imagens para todos os elementos do jogo, tornando-o visualmente mais atrativo,
foram criadas variáveis para a gravidade, a força do salto e a velocidade horizontal da personagem,
por exemplo. Foram também criados trampolins, que são raros de encontrar, e quando a personagem
salta para cima de um, o salto é 2.5 vezes mais forte, dando um imenso aumento de altura.

Controlo da personagem:
Foram adicionados botões para controlar os movimentos horizontais da personagem, é possível mover
para a esquerda com a tecla "a" ou a seta para a esquerda, é possível mover para a direita com a
tecla "d" e a seta para a direita. A personagem não pode sair dos limites da esquerda e direita da
janela.

Geração de plataformas:
As plataformas são geradas aleatoriamente, mas existem limites mínimos e máximos de distância
entre plataformas, para que não haja plataformas que estejam umas em cima das outras ou plataformas
inalcançáveis. Também havia um problema em que, como todas as plataformas eram recicladas, a
plataforma inicial, que é muito maior, também era reciclada, então fiz com que a primeira plataforma
não se movesse e apenas as outras de tamanho normal podiam ser recicladas.

Sistema de pontuação:
Foi adicionado um sistema de pontuação, para registar os resultados do jogo. A pontuação é calculada
através da altura do jogador, utilizando o deslocamento da câmara. A pontuação pode parecer muito alta,
mesmo com pouco tempo de jogo, mas é só para evitar que haja pontuações iguais. Se a pontuação fosse
calculada em unidades de medida muito maiores, a hipótese de haver duas pontuações iguais era maior.

Menus:
Foram feitos painéis para o menu principal, onde é possível começar o jogo, alterar a personagem
e ver a leaderboard, um painel de seleção de personagens, onde estarão o sapo e outras quatro
personagens que o criador do jogo achou que faziam lembrar bem as aulas de programação, um menu
para ver a leaderboard, com as 10 pontuações mais altas, que são guardadas em uma API, um painel
de pausa, que é ativado quando o jogador clica no botão "Esc" no teclado, quepergunta se o jogador
deseja voltar ao ecrã inicial ou se deseja continuar, e por último, um painelde Game Over, que
serve apenas para dar a indicação de que o jogador perdeu e para fazer a conexãoentre perder no jogo
e a entrada no menu principal. Estes painéis tornam o jogo mais organizado e acho que todos os
painéis desempenham bem a sua respetiva função.

Seleção de personagem:
Das coisas que deram mais dores de cabeça ao criador, porque o ChatGPT parecia que tinha tirado
um dia de folga e o criador foi obrigado a usar o cérebro para colocar tudo a funcionar. Foram
criadas funções para que, quando se clica num botão que corresponde a certa personagem, todos os
outros botões sejam desbloqueados e desmarcados como a personagem selecionada, sempre que uma
personagem é selecionada, o texto de todos os botões passa a ser "Select" (Selecionar) para indicar
que estãopor selecionar exceto o botão que foi clicado, que passa a dizer "Selected" (Selecionado) e
é bloqueado para não poder ser clicado outra vez até que seja desbloqueado. Depois tive a brilhante
ideia de dar características únicas à personagem "Fred", que agora faz um barulho sempre que toca
numa plataforma ou trampolim, e também ativa um efeito de screen shake (tudo com consentimento
do aluno Frederico Fonseca, do 1ºP, que foi a inspiração para esta personagem (mas se não tivesse,
fazia na mesma)).

Agradecimentos:
Queria agradecer ao stor por nos ter dado esta tarefa, estou honestamente grato e muito feliz porque
não só diverti-me imenso, mas também sinto que aprendi a "desenrascar-me" mais. Acho que este trabalho 
mais autónomo deu-nos mais liberade para sermos criativos e fazer as implementações que achamos
que fazem sentido, ou que simplesmente tornam o jogo mais diferente e único.

Queria também agradecer a todo o apoio que nos deu ao longo do ano, não só na questão da programação,
mas também a nível pessoal. Sinto que o seu ponto de vista sobre tudo na vida é muito interessante.

É isso stor, vejo-o para o ano. Boas Férias! (Embora eu saiba que você a trabalhar)

(Não, o ChatGPT não escreveu nada disto, eu escrevi este texto "de escova" sozinho (e o texto do
relatório também))

________ __________  ________    ____________________________ __________ 
\_____  \\______   \/  _____/   /   _____/\__    ___/\_____  \\______   \
 /   |   \|    |  _/   \  ___   \_____  \   |    |    /   |   \|       _/
/    |    \    |   \    \_\  \  /        \  |    |   /    |    \    |   \
\_______  /______  /\______  / /_______  /  |____|   \_______  /____|_  /
        \/       \/        \/          \/                    \/       \/ 