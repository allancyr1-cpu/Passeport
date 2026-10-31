/* ============================================================
   PASSEPORT — vocabulary bank (v5)
   One line per word:  LEVEL | term | traduction | example
   - LEVEL: B1, B2 or C1 (CEFR estimate)
   - Categories "essentiels", "nuance" and "pro" are always studied;
     the others follow the passions chosen in the settings.
   - Words are matched by their term: editing a translation or an
     example here never resets anyone's progress on that word.
   ============================================================ */

const VOCAB_CATEGORIES = {
  perso:      { label:'Mes mots',             emoji:'⭐', always:true },
  essentiels: { label:'Essentiels',           emoji:'🧩', always:true },
  nuance:     { label:'Nuancer & argumenter', emoji:'⚖️', always:true },
  pro:        { label:'Pro',                  emoji:'💼', always:true },
  voyage:     { label:'Voyage',               emoji:'✈️' },
  foot:       { label:'Football',             emoji:'⚽' },
  manga:      { label:'Mangas & Animes',      emoji:'🥋' },
  jeuxvideo:  { label:'Jeux vidéo',           emoji:'🎮' },
  cuisine:    { label:'Cuisine',              emoji:'🍳' },
};

const VOCAB_BANK_RAW = {
/* =========================== ENGLISH =========================== */
en: {
essentiels: `
B1 | to come up with | trouver (une idée, une solution) | She came up with a clever solution.
B1 | to figure out | comprendre, trouver | I can't figure out how this works.
B1 | to look forward to | avoir hâte de | I'm looking forward to seeing you.
B1 | to put off | repousser, remettre à plus tard | Stop putting off your homework.
B1 | to run out of | être à court de | We've run out of milk.
B1 | to get along with | bien s'entendre avec | I get along well with my roommates.
B1 | to turn down | refuser (une offre) | She turned down the job offer.
B1 | to deal with | gérer, s'occuper de | I'll deal with it tomorrow.
B1 | to end up | finir par | We ended up staying until midnight.
B1 | to give up | abandonner, arrêter | Don't give up now, you're nearly there.
B1 | to catch up | rattraper son retard ; prendre des nouvelles | Let's grab a coffee and catch up.
B1 | to show up | se pointer, arriver | He showed up an hour late.
B1 | to sort out | régler, arranger | Can you sort out the tickets?
B1 | to set up | mettre en place, installer | It took ages to set up the new laptop.
B1 | to make up your mind | se décider | I can't make up my mind.
B1 | actually | en fait (≠ actuellement) | Actually, I've changed my mind.
B1 | currently | actuellement | I'm currently living in Lyon.
B1 | eventually | finalement, au bout du compte (≠ éventuellement) | Eventually, we found the hotel.
B1 | to attend | assister à (≠ attendre) | Over 200 people attended the meeting.
B1 | to realize | se rendre compte (≠ réaliser un projet) | I realized I'd left my keys at home.
B2 | sensible | raisonnable, sensé (≠ sensible) | That's a sensible decision.
B2 | sensitive | sensible, susceptible | He's very sensitive about his age.
B2 | to pretend | faire semblant (≠ prétendre) | He pretended not to see me.
B2 | to achieve | accomplir, atteindre (≠ achever) | She achieved her goal in six months.
B2 | a lecture | un cours magistral (≠ une lecture) | The lecture lasted two hours.
B2 | to assist | aider (≠ assister à) | Can I assist you with your luggage?
B2 | to resume | reprendre (≠ résumer) | The meeting will resume after lunch.
B2 | a disappointment | une déception (deception = tromperie) | The ending was a huge disappointment.
B2 | a location | un emplacement, un lieu (≠ une location) | The hotel is in a perfect location.
B2 | ancient | antique, très ancien (≠ ancien = ex-) | Rome is full of ancient ruins.
B2 | former | ancien (ex-) | My former boss now lives in Canada.
C1 | genial | aimable, chaleureux (≠ génial) | Our host was a genial old man.
B2 | to get the hang of | prendre le coup de main | You'll get the hang of it after a few tries.
B2 | to bring up | aborder (un sujet) | She brought up an interesting point.
B2 | to put up with | supporter, tolérer | I can't put up with this noise any longer.
B2 | to come across | tomber sur | I came across an old photo of us.
B2 | to look into | se pencher sur, examiner | We'll look into the problem.
B2 | to carry on | continuer | Carry on, I'm listening.
B2 | to work out | s'arranger ; faire du sport | Things worked out in the end.
B2 | to point out | faire remarquer, souligner | He pointed out a mistake in my report.
B2 | to hold on | patienter | Hold on, I'll check.
B2 | to cut down on | réduire (sa consommation de) | I'm trying to cut down on sugar.
B2 | to fall through | tomber à l'eau | Our vacation plans fell through.
B2 | to live up to | être à la hauteur de | The movie didn't live up to the hype.
B2 | to keep up with | suivre le rythme de | It's hard to keep up with all the new shows.
B2 | to run into | croiser par hasard | I ran into an old friend at the station.
B2 | to take over | prendre le relais, prendre le contrôle | A new manager took over last month.
B2 | to wind down | décompresser | I read before bed to wind down.
B2 | to stand out | se démarquer | Her CV really stood out.
B2 | to look up to | admirer, prendre pour modèle | I've always looked up to my older sister.
B2 | to make the most of | profiter au maximum de | Let's make the most of the sunshine.
B2 | to take something for granted | tenir quelque chose pour acquis | Don't take your health for granted.
B2 | to keep an eye on | garder un œil sur | Can you keep an eye on my bag?
B2 | to be up to something | mijoter quelque chose | The kids are quiet... they're up to something.
B2 | to be fed up with | en avoir marre de | I'm fed up with this rain.
B2 | it's up to you | c'est toi qui vois | Pizza or sushi? It's up to you.
B2 | to have second thoughts | avoir des doutes, hésiter | I'm having second thoughts about the trip.
B2 | to be on the fence | être indécis | I'm still on the fence about buying it.
B2 | to break the ice | briser la glace | A joke is a good way to break the ice.
B2 | a piece of cake | un jeu d'enfant | The exam was a piece of cake.
B2 | to call it a day | s'arrêter là pour aujourd'hui | We're all tired, let's call it a day.
B2 | to get the gist | saisir l'essentiel | I didn't catch every word, but I got the gist.
B2 | to be into something | être fan de quelque chose | I'm really into Japanese movies.
B2 | to hit it off | accrocher tout de suite (avec quelqu'un) | We hit it off straight away.
B2 | no wonder | pas étonnant que | No wonder you're tired, you only slept four hours.
B2 | to go out of your way | se mettre en quatre | She went out of her way to help me.
B2 | a hassle | une galère, une corvée | Renewing my passport was such a hassle.
B2 | handy | pratique | This app is really handy.
B2 | awkward | gênant, embarrassant | There was an awkward silence.
B2 | overwhelmed | dépassé, submergé | I feel overwhelmed with work this week.
B2 | reliable | fiable | My old car is still very reliable.
B2 | a bargain | une bonne affaire | Twenty euros for this? What a bargain!
B2 | upset | contrarié, bouleversé | She was upset that nobody called her.
B2 | worth it | ça vaut le coup | The climb is hard, but the view is worth it.
C1 | to beat around the bush | tourner autour du pot | Stop beating around the bush and tell me.
C1 | to cut corners | bâcler, rogner sur la qualité | They cut corners and the building suffered.
C1 | the last straw | la goutte d'eau qui fait déborder le vase | Being late again was the last straw.
C1 | to play it by ear | improviser, voir venir | We haven't planned anything, we'll play it by ear.
C1 | to bite off more than you can chew | avoir les yeux plus gros que le ventre | I bit off more than I could chew with three projects.
C1 | to be on the same page | être sur la même longueur d'onde | Let's make sure we're on the same page.
`,
nuance: `
B1 | however | cependant | The plan is good. However, it's expensive.
B1 | although | bien que | Although it was raining, we went out.
B1 | in my opinion | à mon avis | In my opinion, the first movie was better.
B1 | as far as I know | pour autant que je sache | As far as I know, the shop is closed on Sundays.
B1 | on the other hand | d'un autre côté, en revanche | It's cheap. On the other hand, it's far away.
B1 | apart from | à part, hormis | Apart from the weather, the trip was perfect.
B1 | instead of | au lieu de | Let's walk instead of taking the bus.
B1 | to sum up | pour résumer | To sum up, we need more time.
B2 | whereas | alors que, tandis que | I love spicy food, whereas my brother hates it.
B2 | despite | malgré | Despite the rain, the match went ahead.
B2 | therefore | par conséquent | It's late; therefore, we should go.
B2 | moreover | de plus | The hotel is cheap. Moreover, it's close to the beach.
B2 | nevertheless | néanmoins | It was risky. Nevertheless, we tried.
B2 | unless | à moins que | I'll come unless it rains.
B2 | as long as | du moment que, tant que | You can borrow it as long as you give it back.
B2 | even though | même si, alors que | Even though I was tired, I finished the book.
B2 | in terms of | en termes de, du point de vue de | In terms of price, it's the best option.
B2 | as a matter of fact | en fait, d'ailleurs | As a matter of fact, I've been there twice.
B2 | to some extent | dans une certaine mesure | I agree with you to some extent.
B2 | that said | cela dit | It's expensive. That said, it's worth it.
B2 | on top of that | en plus de ça | On top of that, it started raining.
B2 | all in all | tout compte fait | All in all, it was a good trip.
B2 | in a nutshell | en bref | In a nutshell, it was a disaster.
B2 | it goes without saying | il va sans dire | It goes without saying that safety comes first.
B2 | to be worth doing | valoir la peine de faire | The old town is worth visiting.
B2 | I'd argue that | je dirais que | I'd argue that the book is better than the movie.
B2 | I see your point, but | je comprends ton point de vue, mais | I see your point, but I'm not convinced.
B2 | to make a point | faire valoir un argument | She made a good point about the costs.
B2 | to have a point | ne pas avoir tort | You have a point there.
B2 | to agree to disagree | rester chacun sur sa position | Let's just agree to disagree.
B2 | to be in favor of | être pour | I'm in favor of the new rules.
B2 | arguably | sans doute, on peut dire que | He's arguably the best player in the world.
B2 | overall | dans l'ensemble | Overall, it was a great experience.
B2 | biased | partial, qui a un parti pris | The article seems a bit biased.
B2 | the pros and cons | les avantages et les inconvénients | Let's look at the pros and cons.
B2 | to weigh up | peser (le pour et le contre) | I need to weigh up my options.
B2 | a drawback | un inconvénient | The main drawback is the price.
B2 | to be likely to | risquer de, avoir des chances de | It's likely to rain later.
B2 | not necessarily | pas forcément | Expensive doesn't necessarily mean better.
C1 | nonetheless | néanmoins, pourtant | The task was hard; nonetheless, we finished on time.
C1 | albeit | quoique, bien que | It worked, albeit slowly.
C1 | by and large | dans l'ensemble | By and large, the feedback was positive.
C1 | to play devil's advocate | se faire l'avocat du diable | Let me play devil's advocate for a second.
C1 | to take something with a grain of salt | prendre quelque chose avec des pincettes | Take those reviews with a grain of salt.
C1 | a double-edged sword | une arme à double tranchant | Social media is a double-edged sword.
C1 | I'm inclined to think | j'ai tendance à penser | I'm inclined to think he's right.
`,
pro: `
B1 | a deadline | une échéance | We need to meet the deadline on Friday.
B1 | to schedule | planifier, programmer | Let's schedule a call for Thursday.
B1 | to reschedule | reporter, décaler | Can we reschedule the meeting to Friday?
B1 | to be in charge of | être responsable de | I'm in charge of the marketing team.
B1 | an attachment | une pièce jointe | Please see the attachment.
B1 | to apply for | postuler à | I applied for a job in London.
B1 | a skill | une compétence | Communication is a key skill.
B1 | a weakness | un point faible | My main weakness is public speaking.
B1 | a day off | un jour de congé | I'm taking a day off on Friday.
B1 | to hire | embaucher | We're hiring two developers.
B1 | to get fired | se faire virer | He got fired for being late all the time.
B2 | to follow up | relancer | I'll follow up with the client tomorrow.
B2 | a bottleneck | un goulot d'étranglement | The approval process is a bottleneck.
B2 | to touch base | faire un point | Let's touch base on Monday.
B2 | a takeaway | un point à retenir | The main takeaway is we need more testing.
B2 | a trade-off | un compromis | There's always a trade-off between speed and quality.
B2 | a workload | une charge de travail | My workload has doubled this month.
B2 | to run late | être en retard (sur le programme) | Sorry, I'm running ten minutes late.
B2 | a heads-up | une info donnée à l'avance | Thanks for the heads-up.
B2 | to keep someone in the loop | tenir quelqu'un au courant | Please keep me in the loop.
B2 | to get back to someone | revenir vers quelqu'un | I'll get back to you by Friday.
B2 | to put forward | proposer, avancer (une idée) | She put forward a new proposal.
B2 | to sign off on | valider, approuver | The director needs to sign off on the budget.
B2 | a stakeholder | une partie prenante | We need to update all the stakeholders.
B2 | a milestone | une étape clé, un jalon | Launching the app was a major milestone.
B2 | the bottom line | l'essentiel, le fond du problème | The bottom line is we need more staff.
B2 | a raise | une augmentation (de salaire) | I'm going to ask for a raise.
B2 | to give notice | donner sa démission (préavis) | She gave notice last week.
B2 | to be shortlisted | être présélectionné | I've been shortlisted for the job.
B2 | to be swamped | être débordé | I'm swamped this week.
B2 | to wrap up | conclure, boucler | Let's wrap up the meeting.
B2 | on short notice | au dernier moment | Sorry to ask on such short notice.
B2 | to be on track | être dans les temps | The project is on track.
B2 | to fall behind | prendre du retard | We've fallen behind schedule.
B2 | to network | réseauter | Conferences are great for networking.
B2 | a lead | une piste, un prospect | We got three new leads from the trade fair.
B2 | a quote | un devis | Can you send me a quote?
B2 | an invoice | une facture | I'll send you the invoice tomorrow.
B2 | to pitch | présenter (une idée, un projet) | We pitched the idea to investors.
B2 | feedback | des retours, un avis | Thanks for the feedback.
B2 | to bring someone up to speed | mettre quelqu'un au courant | Can you bring me up to speed?
B2 | to take on | se charger de, accepter (du travail) | I can't take on any more work.
B2 | to be on sick leave | être en arrêt maladie | She's on sick leave this week.
B2 | a performance review | un entretien annuel d'évaluation | My performance review is next week.
B2 | to be laid off | être licencié (économique) | Two hundred workers were laid off.
B2 | to outsource | externaliser, sous-traiter | We outsource our IT support.
B2 | a shift | un poste (horaire) | I'm working the night shift.
B2 | to work remotely | télétravailler | I work remotely two days a week.
C1 | to think outside the box | sortir du cadre, penser autrement | We need to think outside the box.
C1 | a ballpark figure | un chiffre approximatif | Can you give me a ballpark figure?
C1 | to get the ball rolling | lancer les choses | Let's get the ball rolling with a quick intro.
C1 | to go the extra mile | faire un effort supplémentaire | She always goes the extra mile for clients.
C1 | to push back | repousser ; s'opposer à | They pushed back the launch by a week.
C1 | low-hanging fruit | les gains faciles | Let's start with the low-hanging fruit.
C1 | a steep learning curve | un apprentissage difficile au début | The software has a steep learning curve.
C1 | to circle back | revenir sur (un sujet) | Let's circle back to this next week.
`,
voyage: `
B1 | a layover | une escale | We have a three-hour layover in Lisbon.
B1 | jet lag | le décalage horaire | The jet lag hit me hard on day one.
B1 | a connecting flight | un vol de correspondance | We almost missed our connecting flight.
B1 | a boarding pass | une carte d'embarquement | Have your boarding pass ready.
B1 | the gate | la porte d'embarquement | Our flight leaves from gate 12.
B1 | a carry-on bag | un bagage cabine | Is this carry-on bag too big?
B1 | the check-in desk | le comptoir d'enregistrement | The check-in desk opens at 6 a.m.
B1 | a round trip | un aller-retour | A round trip to Rome costs about 100 euros.
B1 | a one-way ticket | un aller simple | I bought a one-way ticket.
B1 | fully booked | complet | Sorry, we're fully booked tonight.
B1 | a journey | un trajet, un voyage (≠ une journée) | The journey took six hours.
B1 | sightseeing | les visites touristiques | We did some sightseeing in the morning.
B1 | to check out | libérer la chambre | We have to check out by 11.
B1 | a delay | un retard | There's a two-hour delay.
B1 | a hostel | une auberge de jeunesse | We stayed in a cheap hostel.
B1 | to get lost | se perdre | We got lost in the old town.
B1 | a guided tour | une visite guidée | We took a guided tour of the castle.
B2 | off the beaten track | hors des sentiers battus | We wanted somewhere off the beaten track.
B2 | to overbook | surréserver | The flight was overbooked, so we got bumped.
B2 | to be stranded | être coincé, bloqué | We were stranded at the airport overnight.
B2 | a backpacker | un routard | The hostel was full of backpackers.
B2 | a tourist trap | un attrape-touristes | That restaurant is a total tourist trap.
B2 | a stopover | une escale prolongée, une étape | We had a two-day stopover in Dubai.
B2 | an aisle seat | une place côté couloir | Can I have an aisle seat, please?
B2 | breathtaking | à couper le souffle | The view from the top is breathtaking.
B2 | to wander around | flâner | We spent the afternoon wandering around the market.
B2 | a must-see | un incontournable | The cathedral is a must-see.
B2 | a road trip | un voyage en voiture | We did a road trip across Scotland.
B2 | to hitchhike | faire du stop | We hitchhiked to the next village.
B2 | the outskirts | la périphérie | The hotel is on the outskirts of town.
B2 | to pack light | voyager léger | I always try to pack light.
B2 | travel insurance | une assurance voyage | Don't forget to get travel insurance.
B2 | to overcharge | faire payer trop cher | I think the taxi driver overcharged us.
B2 | the locals | les gens du coin | Ask the locals where to eat.
B2 | to get around | se déplacer | It's easy to get around by bike.
B2 | customs | la douane | We went through customs quickly.
B2 | no vacancies | complet (hôtel) | The sign at the motel said "no vacancies".
C1 | a stone's throw from | à deux pas de | The hotel is a stone's throw from the beach.
C1 | to soak up the atmosphere | s'imprégner de l'ambiance | We sat in the square, soaking up the atmosphere.
C1 | to catch the travel bug | attraper le virus du voyage | I caught the travel bug in my twenties.
`,
foot: `
B1 | a winger | un ailier | Their winger is incredibly fast.
B1 | the referee | l'arbitre | The referee gave him a yellow card.
B1 | a draw | un match nul | The match ended in a draw.
B1 | a striker | un attaquant, un avant-centre | Their striker is in great form.
B1 | a midfielder | un milieu de terrain | He's a very creative midfielder.
B1 | the pitch | le terrain | The fans ran onto the pitch.
B2 | to equalize | égaliser | They equalized in the last minute.
B2 | a clean sheet | un match sans encaisser de but | The keeper kept a clean sheet.
B2 | a set piece | un coup de pied arrêté | They scored from a set piece.
B2 | a save | un arrêt (du gardien) | What a save by the keeper!
B2 | an own goal | un but contre son camp | They lost because of an own goal.
B2 | stoppage time | le temps additionnel | They scored in stoppage time.
B2 | a header | une tête | He scored with a powerful header.
B2 | offside | hors-jeu | The goal was ruled out for offside.
B2 | a tackle | un tacle | That was a dangerous tackle.
B2 | a free kick | un coup franc | He curled the free kick into the top corner.
B2 | to be sent off | être expulsé | He was sent off for a second yellow card.
B2 | a substitute | un remplaçant | The substitute changed the game.
B2 | the bench | le banc (des remplaçants) | He started the match on the bench.
B2 | the transfer window | le mercato | The transfer window closes on Friday.
B2 | to be on loan | être prêté | He's on loan from Chelsea.
B2 | the league table | le classement | They're top of the league table.
B2 | to be relegated | être relégué | They were relegated last season.
B2 | to be promoted | être promu | They were promoted to the Premier League.
B2 | an away game | un match à l'extérieur | They rarely win away games.
B2 | the home crowd | le public à domicile | The home crowd went wild.
B2 | to dribble past | dribbler (un adversaire) | He dribbled past three defenders.
B2 | a counter-attack | une contre-attaque | They scored on the counter-attack.
B2 | a hat-trick | un triplé | He scored a hat-trick against Arsenal.
B2 | goalless | sans but | It was a goalless draw.
B2 | the first leg | le match aller | They won the first leg 2-0.
B2 | to press high | presser haut | They press high and win the ball back fast.
B2 | to hit the post | toucher le poteau | He hit the post in the final minute.
B2 | a penalty shootout | une séance de tirs au but | They lost on a penalty shootout.
B2 | a kit | un maillot, une tenue | Have you seen their new away kit?
C1 | a howler | une grosse boulette | The keeper made a howler.
C1 | to park the bus | bétonner (défendre en masse) | They parked the bus after scoring.
C1 | a giant-killing | un exploit (petit qui bat un gros) | It was a famous giant-killing in the cup.
C1 | a tap-in | un but facile (à bout portant) | It was a simple tap-in.
`,
manga: `
B1 | to spoil | divulgâcher, spoiler | Don't spoil the ending!
B1 | the main character | le personnage principal | The main character is a young pirate.
B1 | a villain | un méchant | The villain is my favorite character.
B1 | subtitles | les sous-titres | I always watch with subtitles.
B1 | a fight scene | une scène de combat | The fight scenes are beautifully animated.
B2 | a plot twist | un rebondissement | That plot twist caught me off guard.
B2 | a story arc | un arc narratif | This story arc is my favorite.
B2 | a sidekick | un acolyte | Every hero needs a sidekick.
B2 | a backstory | le passé (d'un personnage) | His backstory is really sad.
B2 | a cliffhanger | une fin à suspense | The episode ended on a cliffhanger.
B2 | a filler episode | un épisode de remplissage | You can skip the filler episodes.
B2 | a sequel | une suite | The sequel is even better.
B2 | a spin-off | une série dérivée | They're making a spin-off about the villain.
B2 | the art style | le style graphique | I love the art style of this manga.
B2 | a fanbase | une communauté de fans | The series has a huge fanbase.
B2 | to binge-watch | regarder d'une traite | I binge-watched the whole season.
B2 | the opening | le générique de début | The opening of this season is amazing.
B2 | catchy | entraînant, qui reste en tête | That song is really catchy.
B2 | a volume | un tome | I just bought volume 12.
B2 | to be released | sortir, paraître | The new chapter is released on Sunday.
B2 | on hiatus | en pause (prolongée) | The manga has been on hiatus for a year.
B2 | dubbed | doublé | I prefer subtitles to the dubbed version.
B2 | faithful to | fidèle à | The anime is faithful to the manga.
B2 | character development | l'évolution d'un personnage | The character development in this arc is amazing.
B2 | a plot hole | une incohérence de scénario | That's a huge plot hole.
B2 | an underdog | un outsider | I always root for the underdog.
B2 | to root for | soutenir, être pour | Who are you rooting for?
B2 | overrated | surcoté | Honestly, I think that series is overrated.
B2 | underrated | sous-coté | This anime is so underrated.
B2 | to be hooked | être accro | I was hooked after the first episode.
C1 | foreshadowing | un indice annonciateur | That scene was clear foreshadowing.
C1 | a tearjerker | une histoire qui fait pleurer | The last episode was a real tearjerker.
C1 | to jump the shark | partir en vrille (série qui baisse en qualité) | The show jumped the shark in season four.
C1 | bittersweet | doux-amer | The ending was bittersweet.
`,
jeuxvideo: `
B1 | to save | sauvegarder | Don't forget to save before the boss.
B1 | a boss fight | un combat de boss | This boss fight is insane.
B1 | to beat a game | finir un jeu | I finally beat the game last night.
B1 | a release date | une date de sortie | The release date was pushed back again.
B1 | a teammate | un coéquipier | My teammates kept running off.
B1 | a controller | une manette | My controller ran out of battery.
B2 | a playthrough | une partie complète | I watched a full playthrough yesterday.
B2 | to grind | farmer | I spent hours grinding for gear.
B2 | a loadout | un équipement | What loadout are you using?
B2 | a checkpoint | un point de sauvegarde | I died right before the checkpoint.
B2 | a side quest | une quête secondaire | I spent hours doing side quests.
B2 | an open world | un monde ouvert | I love open-world games.
B2 | to nerf | affaiblir (nerfer) | They nerfed my favorite weapon.
B2 | to buff | renforcer (buffer) | The new patch buffed the tank class.
B2 | a cutscene | une cinématique | You can skip the cutscenes.
B2 | the storyline | le scénario | The storyline is surprisingly deep.
B2 | to respawn | réapparaître | You respawn at the last checkpoint.
B2 | lag | la latence | The lag made it unplayable.
B2 | a skill tree | un arbre de compétences | I put all my points in the skill tree.
B2 | to level up | monter de niveau | I leveled up twice tonight.
B2 | a walkthrough | une soluce | I had to check a walkthrough.
B2 | to rage-quit | quitter la partie de rage | He rage-quit after losing again.
B2 | in-game purchases | des achats intégrés | The game is full of in-game purchases.
B2 | pay-to-win | où il faut payer pour gagner | I hate pay-to-win games.
B2 | to team up | faire équipe | Let's team up for the next match.
B2 | to unlock | débloquer | You unlock new skins as you play.
B2 | early access | l'accès anticipé | The game is still in early access.
B2 | a sandbox game | un jeu bac à sable | Minecraft is the classic sandbox game.
B2 | a difficulty spike | un pic de difficulté | There's a huge difficulty spike in chapter 3.
B2 | a glitch | un bug | I fell through the map because of a glitch.
C1 | to cheese | exploiter une faille (pour battre un boss) | I cheesed the boss by hiding behind a rock.
C1 | a game-changer | qui change la donne | The new console is a game-changer.
C1 | replay value | la rejouabilité | The game has huge replay value.
C1 | button-mashing | le matraquage de boutons | You can't win just by button-mashing.
`,
cuisine: `
B1 | to chop | hacher, couper | Chop the onions finely.
B1 | to peel | éplucher | Peel the potatoes first.
B1 | to boil | faire bouillir | Boil the pasta for ten minutes.
B1 | to stir | remuer | Stir the sauce from time to time.
B1 | leftovers | les restes | We had leftovers for lunch.
B1 | to grate | râper | Grate some cheese on top.
B1 | to melt | faire fondre | Melt the chocolate slowly.
B1 | a spoonful | une cuillerée | Add a spoonful of honey.
B1 | to slice | couper en tranches | Slice the bread thinly.
B1 | to bake | cuire au four | Bake the cake at 180 degrees.
B1 | a frying pan | une poêle | Heat some oil in a frying pan.
B2 | to simmer | laisser mijoter | Let the sauce simmer for ten minutes.
B2 | to season | assaisonner | Season with salt and pepper to taste.
B2 | to sear | saisir (à la poêle) | Sear the steak on high heat.
B2 | to whisk | fouetter | Whisk the eggs and sugar together.
B2 | to drain | égoutter | Drain the pasta and keep a little water.
B2 | to roast | rôtir | Roast the vegetables for 40 minutes.
B2 | a pinch of | une pincée de | Add a pinch of salt.
B2 | a saucepan | une casserole | Melt the butter in a saucepan.
B2 | a baking sheet | une plaque de cuisson | Line a baking sheet with parchment paper.
B2 | to preheat | préchauffer | Preheat the oven to 200 degrees.
B2 | bland | fade | The soup is a bit bland.
B2 | crispy | croustillant | I love crispy fries.
B2 | tender | tendre | The meat was really tender.
B2 | overcooked | trop cuit | The pasta is overcooked.
B2 | to thicken | épaissir | Let the sauce thicken.
B2 | a dash of | un trait de | Add a dash of lemon juice.
B2 | to garnish | décorer (un plat) | Garnish with fresh parsley.
B2 | dough | la pâte (à pain, à pizza) | Let the dough rest for an hour.
B2 | to knead | pétrir | Knead the dough for ten minutes.
B2 | a side dish | un accompagnement | Rice makes a good side dish.
B2 | homemade | fait maison | Is the bread homemade?
C1 | to deglaze | déglacer | Deglaze the pan with white wine.
C1 | to fold in | incorporer délicatement | Fold in the egg whites gently.
C1 | to blanch | blanchir | Blanch the green beans for two minutes.
C1 | mouth-watering | alléchant, appétissant | That smells mouth-watering.
`,
},

/* ====================== SPANISH (Spain) ====================== */
es: {
essentiels: `
B1 | echar de menos | manquer (à quelqu'un) | Echo de menos a mi familia.
B1 | darse cuenta de | se rendre compte de | Me di cuenta de que había perdido las llaves.
B1 | tener ganas de | avoir envie de | Tengo ganas de ir a la playa.
B1 | dejar de | arrêter de | He dejado de fumar.
B1 | volver a | refaire, recommencer à | Mañana vuelvo a intentarlo.
B1 | acabar de | venir de | Acabo de llegar a casa.
B1 | llevar + gerundio | faire quelque chose depuis (durée) | Llevo dos años estudiando español.
B1 | soler | avoir l'habitude de | Suelo desayunar a las ocho.
B1 | ponerse a | se mettre à | Se puso a llover de repente.
B1 | quedar con alguien | retrouver quelqu'un, avoir rendez-vous | He quedado con Ana a las ocho.
B1 | quedarse | rester | Me quedo en casa esta noche.
B1 | hacer falta | falloir, être nécessaire | No hace falta reservar.
B1 | valer la pena | valoir la peine | Vale la pena visitar el casco antiguo.
B1 | echar una mano | donner un coup de main | ¿Me echas una mano con la mudanza?
B1 | llevarse bien con | bien s'entendre avec | Me llevo muy bien con mis compañeros de piso.
B1 | dar igual | être égal, peu importe | Me da igual, elige tú.
B1 | estar harto de | en avoir marre de | Estoy harto de esta lluvia.
B1 | pasarlo bien | bien s'amuser | ¡Que lo pases bien en la fiesta!
B1 | estar a punto de | être sur le point de | Estaba a punto de llamarte.
B1 | a lo mejor | peut-être | A lo mejor vamos al cine esta noche.
B1 | de repente | soudain, tout à coup | De repente se fue la luz.
B1 | vale | d'accord (Espagne) | —¿Nos vemos a las seis? —Vale.
B1 | guay | cool, génial (Espagne, fam.) | ¡Qué guay tu bici nueva!
B1 | un rato | un moment | Espera un rato, ahora vuelvo.
B1 | aprovechar | profiter de | Hay que aprovechar el buen tiempo.
B1 | tardar | mettre (du temps) | Tardo media hora en llegar al trabajo.
B1 | darse prisa | se dépêcher | Date prisa, que perdemos el tren.
B1 | conseguir | obtenir ; réussir à | Por fin conseguí las entradas.
B1 | quejarse | se plaindre | Siempre se queja del trabajo.
B1 | la vergüenza | la honte, la gêne | ¡Qué vergüenza! Me equivoqué de nombre.
B1 | embarazada | enceinte (≠ embarrassée) | Mi hermana está embarazada de cinco meses.
B1 | constipado | enrhumé (≠ constipé) | Estoy constipado, no puedo respirar bien.
B1 | largo | long (≠ large) | Fue un viaje muy largo.
B1 | ancho | large | La calle es muy ancha.
B1 | el éxito | le succès (≠ la sortie) | La película fue un éxito.
B1 | contestar | répondre (≠ contester) | No contesta al teléfono.
B1 | quitar | enlever (≠ quitter) | Quítate los zapatos, por favor.
B1 | molestar | déranger (≠ molester) | ¿Te molesta si abro la ventana?
B1 | la taza | la tasse | ¿Quieres una taza de té?
B1 | el vaso | le verre (≠ le vase) | Un vaso de agua, por favor.
B1 | hacer cola | faire la queue (≠ la colle) | Tuvimos que hacer cola durante una hora.
B1 | acordarse de | se souvenir de (≠ s'accorder) | ¿Te acuerdas de aquel verano?
B1 | el piso | l'appartement ; l'étage | Vivo en un piso pequeño en el centro.
B1 | aprobar | réussir (un examen) | ¡He aprobado el examen de conducir!
B1 | suspender | rater (un examen) (≠ suspendre) | Suspendí matemáticas el año pasado.
B1 | emocionante | passionnant, palpitant (≠ émouvant) | El partido fue muy emocionante.
B2 | la firma | la signature (≠ la firme) | Falta tu firma en el contrato.
B2 | el suceso | le fait divers, l'événement (≠ le succès) | El periódico habla del suceso de ayer.
B2 | la tasa | le taux ; la taxe (≠ la tasse) | La tasa de paro ha bajado.
B2 | exprimir | presser (un fruit) (≠ exprimer) | Exprime dos naranjas para el zumo.
B2 | la carrera | les études (universitaires) ; la course | Estudié la carrera de Derecho.
B2 | el despacho | le bureau (la pièce) | El jefe está en su despacho.
B2 | la propina | le pourboire | Dejamos una buena propina.
B2 | tener en cuenta | tenir compte de | Ten en cuenta que cierran a las dos.
B2 | ponerse de acuerdo | se mettre d'accord | No conseguimos ponernos de acuerdo.
B2 | hacer caso a | écouter (quelqu'un), tenir compte de | Nunca me hace caso.
B2 | por lo visto | apparemment | Por lo visto, mañana va a llover.
B2 | menos mal | heureusement, encore heureux | Menos mal que llegaste a tiempo.
B2 | ¡qué va! | pas du tout ! | —¿Estás cansado? —¡Qué va!
B2 | ¡qué fuerte! | c'est dingue ! | ¡Qué fuerte! ¿Se han separado?
B2 | molar | plaire, être cool (fam.) | Me mola mucho tu chaqueta.
B2 | currar | bosser (fam.) | Mañana curro todo el día.
B2 | flipar | halluciner (fam.) | Flipé con el final de la serie.
B2 | pillar | piger ; attraper (fam.) | No pillo el chiste.
B2 | agobiado | stressé, débordé | Estoy agobiado con tantos exámenes.
B2 | despistado | étourdi, tête en l'air | Soy tan despistado que siempre pierdo las llaves.
B2 | madrugar | se lever tôt | Mañana tengo que madrugar.
B2 | trasnochar | se coucher tard | Anoche trasnoché viendo series.
B2 | estrenar | étrenner ; sortir (un film) | Hoy estreno zapatos.
B2 | hacer ilusión | faire très plaisir | Me hace mucha ilusión verte.
B2 | aguantar | supporter, tenir le coup | No aguanto más este calor.
B2 | averiguar | découvrir, trouver | Tengo que averiguar a qué hora sale el tren.
B2 | lograr | parvenir à | Logré terminar el proyecto a tiempo.
B2 | enterarse de | apprendre (une nouvelle) | Me enteré de la noticia ayer.
B2 | meter la pata | faire une gaffe | Metí la pata con su cumpleaños.
B2 | estar en las nubes | être dans la lune | Hoy estás en las nubes.
B2 | costar un ojo de la cara | coûter les yeux de la tête | El billete me costó un ojo de la cara.
B2 | tomar el pelo | faire marcher, se moquer de | ¿Me estás tomando el pelo?
B2 | ser pan comido | être du gâteau | El examen fue pan comido.
B2 | estar hecho polvo | être crevé | Después del viaje estoy hecho polvo.
B2 | echar la culpa | rejeter la faute | Siempre me echa la culpa a mí.
C1 | no tener pelos en la lengua | ne pas mâcher ses mots | Mi abuela no tiene pelos en la lengua.
C1 | ponerse las pilas | se bouger, s'y mettre sérieusement | Si quieres aprobar, ponte las pilas.
C1 | dar en el clavo | mettre dans le mille | Con ese regalo diste en el clavo.
C1 | buscarle tres pies al gato | chercher la petite bête | No le busques tres pies al gato.
C1 | irse por las ramas | s'éloigner du sujet | Perdona, me estoy yendo por las ramas.
C1 | a regañadientes | à contrecœur | Aceptó a regañadientes.
`,
nuance: `
B1 | sin embargo | cependant | Es caro; sin embargo, merece la pena.
B1 | aunque | bien que, même si | Aunque llueva, saldremos.
B1 | además | en plus, de plus | El hotel es barato y, además, está cerca de la playa.
B1 | por eso | c'est pour ça que | Estaba cansado, por eso me fui pronto.
B1 | en mi opinión | à mon avis | En mi opinión, el libro es mejor que la película.
B1 | por un lado... por otro | d'un côté... de l'autre | Por un lado es barato; por otro, está lejos.
B1 | mientras que | alors que, tandis que | A mí me encanta el picante, mientras que a mi hermano no.
B1 | a pesar de | malgré | A pesar de la lluvia, jugaron el partido.
B1 | en cambio | en revanche | Mi hermano es tímido; yo, en cambio, hablo con todos.
B1 | por lo tanto | donc, par conséquent | Es tarde; por lo tanto, deberíamos irnos.
B1 | es decir | c'est-à-dire | Vuelvo en dos semanas, es decir, el día 15.
B1 | o sea | c'est-à-dire, bref (fam.) | O sea, que no vienes.
B1 | en realidad | en fait, en réalité | En realidad, no me gusta mucho.
B1 | estar de acuerdo | être d'accord | Estoy de acuerdo contigo.
B2 | no obstante | néanmoins | Era arriesgado; no obstante, lo intentamos.
B2 | sino | mais (après une négation) | No es rojo, sino naranja.
B2 | ya que | puisque, étant donné que | Ya que estás aquí, ayúdame.
B2 | puesto que | puisque | Puesto que no contestas, me voy.
B2 | de hecho | en fait, d'ailleurs | De hecho, he estado allí dos veces.
B2 | en cuanto a | quant à | En cuanto al precio, es la mejor opción.
B2 | en resumen | en résumé | En resumen, fue un éxito.
B2 | al fin y al cabo | après tout | Al fin y al cabo, es solo un juego.
B2 | desde mi punto de vista | de mon point de vue | Desde mi punto de vista, es un error.
B2 | dudo que | je doute que (+ subjonctif) | Dudo que venga esta noche.
B2 | no creo que | je ne crois pas que (+ subjonctif) | No creo que sea tan difícil.
B2 | es posible que | il est possible que (+ subjonctif) | Es posible que llueva mañana.
B2 | tener razón | avoir raison | En eso tienes razón.
B2 | estar a favor de | être pour | Estoy a favor de la nueva ley.
B2 | estar en contra de | être contre | Muchos vecinos están en contra del proyecto.
B2 | no es para tanto | il n'y a pas de quoi en faire un plat | Tranquilo, no es para tanto.
B2 | en el fondo | au fond | En el fondo, es buena persona.
B2 | por cierto | au fait | Por cierto, ¿has visto a Marta?
B2 | en cualquier caso | en tout cas | En cualquier caso, te llamo mañana.
B2 | hasta cierto punto | jusqu'à un certain point | Hasta cierto punto, te entiendo.
B2 | a no ser que | à moins que (+ subjonctif) | Iré a no ser que llueva.
B2 | con tal de que | pourvu que (+ subjonctif) | Te lo presto con tal de que me lo devuelvas.
B2 | siempre que | à condition que (+ subjonctif) | Puedes venir siempre que avises antes.
B2 | la ventaja | l'avantage | La gran ventaja es el precio.
B2 | el inconveniente | l'inconvénient | El único inconveniente es que está lejos.
C1 | si bien | bien que | Si bien es caro, la calidad es excelente.
C1 | así pues | ainsi donc | Así pues, empezamos mañana.
C1 | dicho esto | cela dit | Es caro. Dicho esto, merece la pena.
C1 | en definitiva | en définitive | En definitiva, fue una buena decisión.
C1 | por mucho que | avoir beau (+ subjonctif) | Por mucho que lo intente, no me sale.
C1 | aun así | malgré tout | Estaba cansado; aun así, fue a entrenar.
C1 | cabe destacar | il convient de souligner | Cabe destacar el trabajo del equipo.
C1 | más vale | mieux vaut | Más vale tarde que nunca.
`,
pro: `
B1 | un plazo | une échéance | Tenemos que cumplir el plazo del viernes.
B1 | una reunión | une réunion | La reunión se ha aplazado.
B1 | un punto clave | un point clé | El punto clave es probar más.
B1 | el sueldo | le salaire | Me han subido el sueldo.
B1 | el currículum | le CV | Envié mi currículum a tres empresas.
B1 | una entrevista de trabajo | un entretien d'embauche | Mañana tengo una entrevista de trabajo.
B1 | un compañero de trabajo | un collègue | Mis compañeros de trabajo son muy simpáticos.
B1 | el horario | les horaires, l'emploi du temps | Tengo un horario muy flexible.
B1 | un archivo adjunto | une pièce jointe | Te envío el informe como archivo adjunto.
B1 | el puesto | le poste | Me han ofrecido un puesto en Madrid.
B1 | contratar | embaucher | La empresa va a contratar a diez personas.
B1 | despedir | licencier | Lo despidieron el mes pasado.
B1 | un día libre | un jour de congé | El viernes tengo el día libre.
B1 | la fecha límite | la date limite | La fecha límite es el lunes.
B1 | una factura | une facture | Te mando la factura mañana.
B1 | el teletrabajo | le télétravail | Hago teletrabajo dos días a la semana.
B1 | una videollamada | un appel vidéo, une visio | Tenemos una videollamada a las diez.
B1 | los recursos humanos | les ressources humaines | Habla con recursos humanos.
B2 | hacer seguimiento | faire un suivi | Haré seguimiento con el cliente mañana.
B2 | aplazar | reporter | Hemos aplazado la reunión al jueves.
B2 | cumplir | respecter, tenir (un délai, une promesse) | Siempre cumple sus promesas.
B2 | un presupuesto | un budget ; un devis | ¿Nos puede enviar un presupuesto?
B2 | la plantilla | le personnel, l'effectif | La plantilla ha crecido mucho este año.
B2 | estar a cargo de | être responsable de | Estoy a cargo del equipo de ventas.
B2 | encargarse de | se charger de | Yo me encargo de las reservas.
B2 | la carga de trabajo | la charge de travail | Mi carga de trabajo se ha duplicado.
B2 | ir con retraso | être en retard (sur un projet) | Vamos con retraso con el proyecto.
B2 | estar a tope | être à fond, débordé | Esta semana estoy a tope.
B2 | ponerse en contacto con | prendre contact avec | Me pondré en contacto con el cliente.
B2 | quedar en | convenir de | Quedamos en vernos el lunes.
B2 | dar el visto bueno | donner son feu vert | El director ya ha dado el visto bueno.
B2 | el orden del día | l'ordre du jour | ¿Qué hay en el orden del día?
B2 | una lluvia de ideas | un brainstorming | Hagamos una lluvia de ideas.
B2 | un ascenso | une promotion | Le han dado un ascenso.
B2 | un aumento de sueldo | une augmentation de salaire | Voy a pedir un aumento de sueldo.
B2 | dimitir | démissionner | El director dimitió ayer.
B2 | el despido | le licenciement | Hubo muchos despidos este año.
B2 | autónomo | indépendant, freelance | Trabajo como autónomo desde 2020.
B2 | un becario | un stagiaire | El becario empieza el lunes.
B2 | las prácticas | le stage | Hice las prácticas en una agencia.
B2 | estar de baja | être en arrêt maladie | Está de baja toda la semana.
B2 | con antelación | à l'avance | Avísame con antelación, por favor.
B2 | a largo plazo | à long terme | Es una inversión a largo plazo.
B2 | hacer horas extra | faire des heures sup | Este mes he hecho muchas horas extra.
B2 | a media jornada | à mi-temps | Trabajo a media jornada.
B2 | mantener al tanto | tenir au courant | Mantenme al tanto, por favor.
B2 | ponerse al día | se mettre à jour, rattraper son retard | Necesito ponerme al día con los correos.
B2 | retomar | reprendre | Retomamos el tema después de comer.
B2 | un malentendido | un malentendu | Ha sido un malentendido.
B2 | el reto | le défi | Este proyecto es un gran reto.
B2 | afrontar | faire face à | Tenemos que afrontar el problema.
C1 | el finiquito | le solde de tout compte | Todavía no me han pagado el finiquito.
C1 | sacar adelante | mener à bien | Sacamos adelante el proyecto entre todos.
C1 | rendir | être performant | Rindo más por la mañana.
C1 | ir al grano | aller droit au but | Vamos al grano: ¿cuánto cuesta?
`,
voyage: `
B1 | una escala | une escale | Tenemos una escala de tres horas en Madrid.
B1 | el mostrador de facturación | le comptoir d'enregistrement | El mostrador de facturación cierra pronto.
B1 | la tarjeta de embarque | la carte d'embarquement | Tenga a mano la tarjeta de embarque.
B1 | la puerta de embarque | la porte d'embarquement | El vuelo sale por la puerta 12.
B1 | el equipaje de mano | le bagage cabine | Solo llevo equipaje de mano.
B1 | facturar | enregistrer (un bagage) | Tengo que facturar la maleta.
B1 | un billete de ida y vuelta | un aller-retour | Compré un billete de ida y vuelta a Sevilla.
B1 | un billete de ida | un aller simple | Solo tengo billete de ida.
B1 | el retraso | le retard | El tren lleva una hora de retraso.
B1 | perder el tren | rater le train | Perdimos el tren por cinco minutos.
B1 | completo | complet | Lo siento, el hotel está completo.
B1 | el alojamiento | le logement, l'hébergement | Buscamos alojamiento barato.
B1 | un albergue | une auberge de jeunesse | Dormimos en un albergue.
B1 | alquilar | louer | Alquilamos un coche para tres días.
B1 | perderse | se perdre | Nos perdimos en el casco antiguo.
B1 | una visita guiada | une visite guidée | Hicimos una visita guiada por el castillo.
B1 | hacer turismo | faire du tourisme | Pasamos el día haciendo turismo.
B1 | hacer la maleta | faire sa valise | Todavía no he hecho la maleta.
B1 | coger | prendre (Espagne) | Cogimos un taxi al aeropuerto.
B1 | las vistas | la vue | Las vistas desde la torre son increíbles.
B1 | la aduana | la douane | Pasamos la aduana muy rápido.
B2 | hacer transbordo | faire une correspondance | Tuvimos que hacer transbordo en Barcelona.
B2 | el desfase horario | le décalage horaire | El desfase horario me afectó mucho.
B2 | la consigna | la consigne (à bagages) | Dejamos las maletas en la consigna.
B2 | el andén | le quai | El tren sale del andén 3.
B2 | un asiento de pasillo | une place côté couloir | ¿Me da un asiento de pasillo?
B2 | la ventanilla | le hublot ; le guichet | Prefiero sentarme junto a la ventanilla.
B2 | un recorrido | un parcours, un circuit | Hicimos un recorrido por la costa.
B2 | callejear | flâner dans les rues | Me encanta callejear por Lisboa.
B2 | el casco antiguo | la vieille ville | El casco antiguo de Toledo es precioso.
B2 | las afueras | la périphérie | El hotel está en las afueras.
B2 | los alrededores | les environs | Visitamos los alrededores en bici.
B2 | la temporada alta | la haute saison | En temporada alta todo es más caro.
B2 | una ganga | une bonne affaire | ¡Diez euros! Es una ganga.
B2 | un mochilero | un routard | El albergue estaba lleno de mochileros.
B2 | hacer autostop | faire du stop | Hicimos autostop hasta el pueblo.
B2 | una trampa para turistas | un attrape-touristes | Ese restaurante es una trampa para turistas.
B2 | el seguro de viaje | l'assurance voyage | No olvides contratar un seguro de viaje.
B2 | la estancia | le séjour | Disfrute de su estancia.
B2 | un mirador | un belvédère, un point de vue | Subimos al mirador para ver el atardecer.
B2 | de paso | de passage ; au passage | Estamos de paso en Madrid.
C1 | a tiro de piedra | à deux pas | El hotel está a tiro de piedra de la playa.
C1 | quedarse tirado | rester en rade | Nos quedamos tirados en la autopista.
C1 | darse un madrugón | se lever aux aurores | Nos dimos un madrugón para coger el vuelo.
`,
foot: `
B1 | un extremo | un ailier | Su extremo es muy rápido.
B1 | empatar | égaliser ; faire match nul | Empataron en el último minuto.
B1 | el árbitro | l'arbitre | El árbitro le sacó tarjeta amarilla.
B1 | el portero | le gardien de but | El portero paró el penalti.
B1 | un delantero | un attaquant | Es el mejor delantero de la liga.
B1 | un centrocampista | un milieu de terrain | Es un centrocampista muy creativo.
B1 | un defensa | un défenseur | El defensa despejó el balón.
B2 | a balón parado | sur coup de pied arrêté | Marcaron a balón parado.
B2 | una parada | un arrêt (du gardien) | ¡Qué parada del portero!
B2 | un gol en propia puerta | un but contre son camp | Perdieron por un gol en propia puerta.
B2 | el tiempo de descuento | le temps additionnel | Marcaron en el tiempo de descuento.
B2 | un cabezazo | une tête | Marcó de un cabezazo impresionante.
B2 | fuera de juego | hors-jeu | Anularon el gol por fuera de juego.
B2 | una entrada | un tacle (aussi : un billet) | Fue una entrada muy peligrosa.
B2 | un tiro libre | un coup franc | Metió el tiro libre por la escuadra.
B2 | ser expulsado | être expulsé | Fue expulsado por doble amarilla.
B2 | un suplente | un remplaçant | El suplente cambió el partido.
B2 | el banquillo | le banc (des remplaçants) | Empezó el partido en el banquillo.
B2 | el mercado de fichajes | le mercato | El mercado de fichajes cierra el viernes.
B2 | fichar | recruter, signer (un joueur) | El Betis ha fichado a un delantero brasileño.
B2 | estar cedido | être prêté | Está cedido por el Atlético.
B2 | la clasificación | le classement | Van primeros en la clasificación.
B2 | descender | être relégué | Descendieron a Segunda la temporada pasada.
B2 | ascender | être promu (monter) | El equipo ascendió a Primera.
B2 | jugar fuera de casa | jouer à l'extérieur | Casi nunca ganan fuera de casa.
B2 | la afición | les supporters | La afición no paró de cantar.
B2 | regatear | dribbler | Regateó a tres defensas.
B2 | un contraataque | une contre-attaque | Marcaron al contraataque.
B2 | el partido de ida | le match aller | Ganaron el partido de ida 2-0.
B2 | dar en el palo | toucher le poteau | El balón dio en el palo.
B2 | la tanda de penaltis | la séance de tirs au but | Perdieron en la tanda de penaltis.
B2 | la prórroga | les prolongations | El partido se fue a la prórroga.
B2 | la equipación | le maillot, la tenue | ¿Has visto la nueva equipación?
B2 | la cantera | le centre de formation | Es un jugador de la cantera.
B2 | una goleada | une large victoire | Ganaron por goleada.
B2 | remontar | remonter (au score) | Remontaron un 0-2 en la segunda parte.
B2 | el saque de esquina | le corner | Marcaron en un saque de esquina.
C1 | una cantada | une boulette (du gardien) | El portero tuvo una cantada.
C1 | aparcar el autobús | bétonner (défendre en masse) | Después del gol, aparcaron el autobús.
C1 | un paradón | un arrêt exceptionnel | ¡Menudo paradón en el último minuto!
`,
manga: `
B1 | el malo | le méchant | El malo es mi personaje favorito.
B1 | los subtítulos | les sous-titres | Siempre lo veo con subtítulos.
B1 | en versión original | en VO | Prefiero ver el anime en versión original.
B1 | un capítulo | un épisode ; un chapitre | Solo me quedan dos capítulos.
B1 | una temporada | une saison | La segunda temporada sale en abril.
B1 | un personaje secundario | un personnage secondaire | Los personajes secundarios son geniales.
B1 | la banda sonora | la bande originale | La banda sonora es increíble.
B1 | el dibujo | le dessin | Me encanta el dibujo de este manga.
B2 | un giro argumental | un rebondissement | Ese giro argumental me sorprendió.
B2 | un arco narrativo | un arc narratif | Este arco narrativo es mi favorito.
B2 | destripar | spoiler, divulgâcher | ¡No me destripes el final!
B2 | la trama | l'intrigue | La trama se complica en el tomo 5.
B2 | el desenlace | le dénouement | No me esperaba ese desenlace.
B2 | el doblaje | le doublage | El doblaje al castellano es bastante bueno.
B2 | un tomo | un tome | Acabo de comprar el tomo 12.
B2 | la secuela | la suite | La secuela es todavía mejor.
B2 | engancharse | devenir accro | Me enganché desde el primer capítulo.
B2 | darse un atracón de series | enchaîner les épisodes | Este finde me di un atracón de series.
B2 | el relleno | le remplissage (épisodes fillers) | Puedes saltarte los capítulos de relleno.
B2 | el estreno | la sortie, la première | El estreno de la película es el viernes.
B2 | el trasfondo | le passé (d'un personnage), la toile de fond | El trasfondo del villano es muy triste.
B2 | fiel a | fidèle à | El anime es muy fiel al manga.
B2 | la evolución del personaje | l'évolution du personnage | La evolución del personaje en este arco es brutal.
B2 | un agujero de guion | une incohérence de scénario | Eso es un agujero de guion enorme.
B2 | sobrevalorado | surcoté | Sinceramente, esa serie está sobrevalorada.
B2 | infravalorado | sous-coté | Este anime está muy infravalorado.
B2 | entrañable | attachant | Es un personaje muy entrañable.
B2 | conmovedor | émouvant | El final fue muy conmovedor.
B2 | brutal | génial, énorme (fam., Espagne) | La pelea final fue brutal.
C1 | dejar en vilo | tenir en haleine | El último capítulo me dejó en vilo.
C1 | agridulce | doux-amer | El final fue agridulce.
C1 | el compinche | l'acolyte, le complice | El héroe y su compinche son inseparables.
`,
jeuxvideo: `
B1 | una partida | une partie | Vi una partida completa ayer.
B1 | guardar la partida | sauvegarder (la partie) | No olvides guardar la partida antes del jefe.
B1 | el mando | la manette | Se me ha quedado sin batería el mando.
B1 | pasarse un juego | finir un jeu | Me pasé el juego en una semana.
B1 | el jefe final | le boss de fin | El jefe final es dificilísimo.
B1 | la fecha de lanzamiento | la date de sortie | Han retrasado otra vez la fecha de lanzamiento.
B1 | descargar | télécharger | Estoy descargando la actualización.
B1 | una actualización | une mise à jour | La última actualización arregló los fallos.
B1 | el modo historia | le mode histoire | Primero quiero acabar el modo historia.
B1 | un truco | une astuce ; un code de triche | ¿Conoces algún truco para este nivel?
B1 | un torneo | un tournoi | Este finde hay un torneo online.
B2 | farmear | farmer | Pasé horas farmeando equipo.
B2 | un punto de control | un checkpoint | Morí justo antes del punto de control.
B2 | una misión secundaria | une quête secondaire | Me pasé horas haciendo misiones secundarias.
B2 | un mundo abierto | un monde ouvert | Me encantan los juegos de mundo abierto.
B2 | la jugabilidad | le gameplay | La jugabilidad es muy fluida.
B2 | una cinemática | une cinématique | Puedes saltarte las cinemáticas.
B2 | el argumento | le scénario (≠ un argument) | El argumento del juego es muy profundo.
B2 | reaparecer | réapparaître (respawn) | Reapareces en el último punto de control.
B2 | subir de nivel | monter de niveau | He subido de nivel dos veces esta noche.
B2 | una guía | une soluce | Tuve que mirar una guía.
B2 | desbloquear | débloquer | Desbloqueas trajes nuevos al jugar.
B2 | los micropagos | les microtransactions | El juego está lleno de micropagos.
B2 | el acceso anticipado | l'accès anticipé | El juego sigue en acceso anticipado.
B2 | el modo cooperativo | le mode coopératif | Jugamos en modo cooperativo.
B2 | un fallo | un bug ; une erreur | Me caí del mapa por un fallo.
B2 | un parche | un patch | El último parche ha arreglado el lag.
B2 | nerfear | nerfer, affaiblir | Han nerfeado mi arma favorita.
B2 | chetado | cheaté, trop fort (fam.) | Ese personaje está chetado.
B2 | enviciarse | devenir accro (à un jeu) | Me he enviciado al nuevo Zelda.
B2 | un pico de dificultad | un pic de difficulté | Hay un pico de dificultad en el capítulo 3.
B2 | picarse | se vexer, se piquer au jeu | Mi hermano se pica cuando pierde.
C1 | la rejugabilidad | la rejouabilité | El juego tiene mucha rejugabilidad.
C1 | aporrear los botones | marteler les boutons | No vas a ganar solo aporreando los botones.
C1 | marcar un antes y un después | marquer un tournant | Ese juego marcó un antes y un después.
`,
cuisine: `
B1 | picar | hacher ; grignoter | Pica la cebolla muy fina.
B1 | pelar | éplucher | Pela las patatas primero.
B1 | hervir | faire bouillir | Hierve la pasta diez minutos.
B1 | remover | remuer | Remueve la salsa de vez en cuando.
B1 | las sobras | les restes | Comimos las sobras de ayer.
B1 | rallar | râper | Ralla un poco de queso por encima.
B1 | derretir | faire fondre | Derrite el chocolate poco a poco.
B1 | una cucharada | une cuillerée | Añade una cucharada de miel.
B1 | hornear | cuire au four | Hornea el bizcocho a 180 grados.
B1 | una sartén | une poêle | Calienta aceite en una sartén.
B1 | casero | fait maison | ¿El pan es casero?
B1 | a la plancha | grillé (à la plancha) | Pedí pescado a la plancha.
B1 | probar | goûter ; essayer | ¿Puedo probar la salsa?
B1 | una tapa | une tapa (petite portion) | Pedimos unas tapas para compartir.
B2 | sofreír | faire revenir | Sofríe la cebolla a fuego lento.
B2 | a fuego lento | à feu doux | Deja la salsa a fuego lento diez minutos.
B2 | salpimentar | saler et poivrer | Salpimienta al gusto.
B2 | batir | battre (des œufs) | Bate los huevos con el azúcar.
B2 | escurrir | égoutter | Escurre la pasta y guarda un poco de agua.
B2 | asar | rôtir, griller | Asa las verduras durante 40 minutos.
B2 | una pizca de | une pincée de | Añade una pizca de sal.
B2 | un cazo | une casserole | Derrite la mantequilla en un cazo.
B2 | precalentar | préchauffer | Precalienta el horno a 200 grados.
B2 | soso | fade | La sopa está un poco sosa.
B2 | crujiente | croustillant | Me encantan las patatas crujientes.
B2 | tierno | tendre | La carne estaba muy tierna.
B2 | pasado | trop cuit | La pasta está pasada.
B2 | un chorrito de | un filet de | Añade un chorrito de aceite de oliva.
B2 | la masa | la pâte | Deja reposar la masa una hora.
B2 | amasar | pétrir | Amasa durante diez minutos.
B2 | dorar | faire dorer | Dora el pollo por los dos lados.
B2 | poco hecho | saignant | Me gusta la carne poco hecha.
B2 | trocear | couper en morceaux | Trocea el pollo antes de freírlo.
B2 | aliñar | assaisonner (une salade) | Aliña la ensalada con aceite y vinagre.
B2 | untar | tartiner | Unta el pan con tomate.
B2 | rebozar | paner, enrober de pâte | Reboza el pescado y fríelo.
C1 | rehogar | faire revenir à feu doux | Rehoga las verduras sin que se doren.
C1 | escalfar | pocher | Escalfa los huevos un par de minutos.
C1 | hacerse la boca agua | en avoir l'eau à la bouche | Se me hace la boca agua.
`,
},
};
