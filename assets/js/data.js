const CONFIG = {
    startDate: new Date(2025, 9, 17, 0, 0, 0),
    // Data da Cápsula (Ano, Mês - 1, Dia) -> Outubro é 9
    capsuleDate: new Date(2026, 9, 17, 0, 0, 0),

    // O conteúdo da Cápsula em formato HTML
    capsuleOpenText: `
        <p>Pois é, amor...bom, se você tá lendo isso, nada mais significa que o tempo fez exatamente o que eu esperava e precisava que ele fizesse.</p>

<p>Talvez você imagine que eu tenha planejado e acertado de primeira, que escrevi essas palavras rapidinho, no nosso primeiro ano juntos. Nadaaaaaa. Na verdade é que elas nasceram ao longos de semanas ainda. Nasceram de meses atrás, quando ainda era junho e eu estava sentado na frente do computador, tentando programar essa página. Mesmo que de pouquinho em pouquinho. Na real, até acho que ainda posso tá escrevendo no futuro. Até essa cápsula finalmente abrir.</p>

<p>Mas sendo honesto aqui, eu travei com minha ideia. Afinal, é uma cápsula do tempo. Que tem uma contagem regressiva para abrir. Então que tipo de coisas eu poderia escrever além do que já escrevi outras vezes e ainda outras nesse mesmo site?? Rapaz...complicado isso aí, viu?</p>

<p>Passei muuuuito tempo olhando para uma tela, escrevendo palavras, apagando frases, reescrevendo outras, procurando um jeito de resumir um ano inteiro em algumas linhas. Mas eu queria mesmo resumir? Eu tava sem ideias. Parecia impossível. Quanto mais eu tentava encontrar ideias e as palavras perfeitas, mais elas escapavam de mim. Ou melhor dizendo, sequer apareciam na minha mente.</p>

<p>Então eu percebi uma coisa. E aqui estou agora. Tentando escrever para um futuro que eu ainda não conheço. Um futuro onde eu sequer tenho certeza do amanhã.</p>

<p>Como eu posso descrever exatamente quem seríamos hoje? Como eu poderia adivinhar tudo o que viveríamos até chegar aqui?</p>

<p>Simples.</p>

<p>Eu não posso.</p>

<p>Mas tem uma única coisa da qual eu tenho absoluta certeza.</p>

<p>Com você eu não posso simplesmente ter pensamentos onde não enxergo um amanhã.</p>

<p>Com você, eu descobri que o amanhã não é um lugar para onde eu quero ir. É um lugar que eu preciso viver. Porque nele, espero encontrar você outra vez.</p>

<p>Eu almejo e quero continuar vendo seu sorriso todos os dias. Os mesmos olhos que dão brilhos aos meus. As mesmas preocupações e cuidados comigo. O mesmo amor. O mesmo carinho.</p>

<p>Eu quero viver os dias comuns com você.</p>

<p>Quero dividir os difíceis.</p>

<p>Quero comemorar os bons.</p>

<p>Quero aprender com os ruins.</p>

<p>E, acima de tudo...</p>

<p>Eu quero você.</p>

<p>E isso jamais vai mudar.</p>

<p>Não existe a possibilidade de eu enjoar ou desistir de você. Você é o amor da minha vida e eu tanto desejo quanto quero construir a minha vida com você. Crescer e construir a nossa vida juntos. O nosso lar. A nossa família.</p>

<p>E, hoje, no dia em que você abriu essa cápsula, eu não precisaria encontrar palavras melhores.</p>

<p>Eu só precisaria continuar sentindo e desejando o que já sentia.</p>

<p>Porque, independente do tempo, mesmo sem conhecer o nosso amanhã, o que importa é que eu conheço você.</p>

<p>E para onde eu for...</p>

<p>Eu vou ter levar comigo.</p>

<p>Eu conhecia a mulher que transformou meus dias comuns em paz. Que faz um dia cansativo terminar mais leve. Que consegue ser abrigo sem perceber.</p>

<p>Enquanto pensava e escrevia junto, foi então que entendi: esse texto nunca precisou ser perfeito.</p>

<p>Ele só precisava carregar uma verdade.</p>

<p>A verdade de que, muito antes deste dia chegar, muito antes mesmo desse futuro chegar, eu já tinha certeza de que, quando ele finalmente chegasse...</p>

<p>Eu estaria ainda mais apaixonado pela mesma mulher que me fez acreditar tanto no futuro a ponto de escrever uma carta para ele</p>
        
        <br>
        
       <!-- O Seu Poema -->
        <p class="poem" style="font-size: clamp(1.4rem, 4vw, 1.8rem); text-align: left; margin: 30px 0; line-height: 1.6;">
            <strong>Para a mulher que virou casa</strong><br><br>

            Se o destino escreve rotas em silêncio,<br>
            o nosso começou numa conversa qualquer.<br>
            Sem promessas, sem mapas, sem atalhos,<br>
            apenas dois corações aprendendo a caber.<br><br>

            Você chegou sem fazer barulho,<br>
            como chega a manhã depois da chuva;<br>
            e, quando percebi, já havia colocado<br>
            primavera onde antes havia dúvida.<br><br>

            Você não mudou o mundo inteiro.<br>
            Mudou o meu.<br><br>

            Fez do cotidiano um lugar bonito,<br>
            da espera uma companhia,<br>
            do futuro uma esperança tranquila.<br><br>

            Há pessoas que passam pela vida<br>
            como quem atravessa uma estação.<br><br>

            Você não.<br><br>

            Você ficou.<br><br>

            Ficou nas pequenas lembranças,<br>
            nas músicas que agora têm o seu nome,<br>
            nas fotografias que aprenderam a guardar saudade antes mesmo de existir distância.<br><br>

            E, se um dia me perguntarem<br>
            como é encontrar o amor,<br><br>

            eu não falarei de fogos de artifício.<br><br>

            Falarei da paz.<br><br>

            Da paz de saber que existe alguém<br>
            com quem até o silêncio faz sentido.<br><br>

            Porque amar você nunca foi um acontecimento.<br><br>

            Foi uma construção.<br><br>

            E, tijolo por tijolo, sorriso por sorriso,<br>
            conversa por conversa,<br><br>

            você acabou se tornando<br>
            o lugar para onde meu coração sempre volta.
        </p>
        
        <br>
        
        <!-- A Foto Especial -->
        <figure style="margin: 0 0 24px 0; border-radius: 16px; overflow: hidden; box-shadow: var(--shadow);">
            <!-- Troque o nome do arquivo abaixo pela foto que você quer revelar no dia -->
            <img src="assets/img/capsula.jpeg" alt="Uma lembrancinha besta minha" style="width: 100%; height: auto; display: block; filter: saturate(0.9) contrast(0.95);">
        </figure>
        
        <!-- O Fechamento -->
        <p>Ela guarda um instante nosso.</p>

        <p>Mas, se eu for completamente sincero, ela sequer chega perto da minha parte favorita. Até porque minha parte favorita sempre foi tudo aquilo que não cabe numa fotografia.</p>

        <p style="margin-left: 16px; border-left: 2px solid var(--rose); padding-left: 16px; font-style: italic; color: var(--muted);">
            As conversas sem assunto que duram horas.<br>
            Os "bom dia" que parecem simples, mas mudam completamente o meu humor.<br>
            As risadas por coisas que só a gente entende.<br>
            As dificuldades que enfrentamos sem soltar a mão um do outro.<br>
            A facilidade que temos de nos encontrar até quando o dia foi difícil.<br>
            A paz de saber que, no meio da correria da vida, existe alguém esperando por mim do outro lado da tela.
        </p>

        <p>É engraçado...as pessoas costumam acreditar que um relacionamento é feito dos grandes momentos. Eu aprendi com você que não.</p>

        <p>
            Ele é feito principalmente das terças-feiras comuns.<br>
            Dos dias sem comemoração.<br>
            Das conversas sobre como foi as tarefas, trabalho, a universidade, a família.<br>
            Dos planos bobos.<br>
            Dos sonhos compartilhados.<br>
            Da presença.
        </p>

        <p>Porque foi justamente nos dias mais normais que eu percebi o extraordinário. <strong>Você.</strong></p>

        <p>
            Obrigado por transformar o cotidiano no meu lugar favorito.<br>
            Obrigado por fazer da distância um detalhe e da companhia uma certeza.
        </p>

        <p>Se existe algo que um ano ao seu lado me ensinou, é que o amor não mora nas datas. Ele mora na escolha de continuar voltando um para o outro, todos os dias.</p>

        <p>E, de todas as escolhas bonitas que a vida já me permitiu fazer...<br>
        <strong style="color: var(--wine); font-size: 1.2rem;">continuar escolhendo você será sempre a mais fácil.</strong></p>
    `,
    // NOVA SEÇÃO: As 7 músicas da Mixtape
    playlist: [
        { title: "Always Be With You", file: "assets/audio/Always Be With You.mp3" },
        { title: "Come To Me", file: "assets/audio/Come To Me.mp3" },
        { title: "Come With Me", file: "assets/audio/Come With Me.mp3" },
        { title: "Everything Will Be Okay", file: "assets/audio/Everything Will Be Okay.mp3" },
        { title: "I Miss You", file: "assets/audio/I Miss You.mp3" },
        { title: "It's Raining", file: "assets/audio/It's Raining.mp3" },
        { title: "Let's Dance", file: "assets/audio/Let's Dance.mp3" }
    ]
};