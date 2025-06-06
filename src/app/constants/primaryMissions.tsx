export const primaryMissions = [
  {
    id: 'purge-the-foe',
    name: 'Purge the Foe',
    history: 'Exterminate the enemy. Show them no mercy.',
    ruleDescription:
      'End of each battle round: Score 4VP if one or more enemy units were destroyed. From round 2 onwards: Score 4VP if more enemy units than friendly units were destroyed. Also, at the end of your Command phase (or your turn in round 5 if you go second), score 4VP if you control one or more objectives, and 4VP more if you control more than your opponent.',
  },
  {
    id: 'linchpin',
    name: 'Linchpin',
    history:
      'True victory is built upon a firm foundation. If the centre cannot hold then all else swiftly crumbles.',
    ruleDescription:
      'From round 2 onwards, at the end of your Command phase (or turn 5 if going second): If you don’t control the objective in your deployment zone, score 3VP per other objective you control. If you do control your deployment objective, score 3VP for it and 5VP per additional one (max 15VP).',
  },
  {
    id: 'scorched-earth',
    name: 'Scorched Earth',
    history: 'What cannot be secured must be burned to ash.',
    ruleDescription:
      'From round 2: Units can burn objectives outside your deployment zone via Action. If successful, the marker is removed. Score 5VP for burning one in No Man’s Land, or 10VP in enemy deployment. Also score 5VP for each objective you control (max 10VP per turn).',
  },
  {
    id: 'unexploded-ordnance',
    name: 'Unexploded Ordnance',
    history:
      'Volatile undetonated material lies in your path. Shifting such hazards towards enemy territory could be the key to victory.',
    ruleDescription:
      'Objectives in No Man’s Land are Hazard markers. From round 2: Units can move them via Action. End of each player’s turn: Score 8VP for each in enemy deployment zone, 5VP if within 6", and 2VP if within 12".',
  },
  {
    id: 'supply-drop',
    name: 'Supply Drop',
    history: 'Supplies are inbound. Secure the drop coordinates.',
    ruleDescription:
      'At the start: Randomly mark 2 No Man’s Land objectives (Alpha and Omega). At start of round 4: remove Alpha. At round 5: remove all others except Omega. From round 2: score 5VP in round 2-3, 8VP in round 4, and 15VP in round 5 for each No Man’s Land objective you control.',
  },
  {
    id: 'terraform',
    name: 'Terraform',
    history:
      'Victory here lies in dominating not only the foe, but also the landscape of the battlefield itself.',
    ruleDescription:
      ' From round 2: Units can start a Terraform action in the Shooting phase on  objective markers outside your deployment zone. If completed (at the end of your opponent’s next turn), the objective is terraformed. End of your Command phase: score 4VP per controlled objective + 2VP per terraformed (max 15VP/turn).',
  },
  {
    id: 'burden-of-trust',
    name: 'Burden of Trust',
    history:
      'The strategic prizes in this region must be guarded at all costs - a duty that falls upon a chosen few.',
    ruleDescription:
      'From round 2: At end of your Command phase, score 4VP per objective you control not in your deployment zone. Also, assign guarding units. At end of opponent’s turn, they score 2VP per unit guarding an objective they control (if not Battle-shocked).',
  },
  {
    id: 'take-and-hold',
    name: 'Take and Hold',
    history:
      'You are ordered to assault strategic locations, secure them, and hold them at any cost.',
    ruleDescription:
      'From round 2 onwards: End of your Command phase (or your turn in round 5 if second), score 5VP per objective you control (max 15VP/turn).',
  },
  {
    id: 'the-ritual',
    name: 'The Ritual',
    history:
      'Bitter foes clash in a race to finish a ritual to either sanctify or corrupt the battlefield.',
    ruleDescription:
      'At setup: Remove all No Man’s Land objectives except the one closest to the center. From round 2: Units can perform an Action to place a new objective in No Man’s Land under specific conditions. Score 5VP for each No Man’s Land objective you control (max 15VP/turn).',
  },
];
