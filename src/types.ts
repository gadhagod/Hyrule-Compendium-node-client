import { Transform } from "stream";
const fs = require("fs");
const https = require("https");

/**
 * @alias entryName
 */
export type entryName = 
    "cold darner" |
    "razorclaw crab" |
    "electric darner" |
    "sunset firefly" |
    "fairy" |
    "bright-eyed crab" |
    "thunderwing butterfly" |
    "rugged rhino beetle" |
    "armored porgy" |
    "armored carp" |
    "sneaky river snail" |
    "hot-footed frog" |
    "smotherwing butterfly" |
    "summerwing butterfly" |
    "restless cricket" |
    "mighty carp" |
    "ironshell crab" |
    "bladed rhino beetle" |
    "staminoka bass" |
    "tireless frog" |
    "hearty blueshell snail" |
    "hearty lizard" |
    "hightail lizard" |
    "sanke carp" |
    "hyrule bass" |
    "chillfin trout" |
    "mighty porgy" |
    "winterwing butterfly" |
    "energetic rhino beetle" |
    "hearty bass" |
    "sizzlefin trout" |
    "fireproof lizard" |
    "warm darner" |
    "stealthfin trout" |
    "hearty salmon" |
    "voltfin trout" |
    "white goat" |
    "great-horned rhinoceros" |
    "giant horse" |
    "woodland boar" |
    "water buffalo" |
    "highland sheep" |
    "cold-footed wolf" |
    "sand seal" |
    "blupee" |
    "pink heron" |
    "blue-winged heron" |
    "mountain crow" |
    "red-tusked boar" |
    "mountain buck" |
    "wood pigeon" |
    "grassland fox" |
    "islander hawk" |
    "cucco" |
    "hateno cow" |
    "golden sparrow" |
    "horse" |
    "mountain doe" |
    "blue sparrow" |
    "seagull" |
    "sand sparrow" |
    "eldin ostrich" |
    "snowcoat fox" |
    "patricia" |
    "wasteland coyote" |
    "bright-chested duck" |
    "honeyvore bear" |
    "grizzlemaw bear" |
    "lord of the mountain" |
    "maraudo wolf" |
    "mountain goat" |
    "rainbow pigeon" |
    "hylian retriever" |
    "stalhorse" |
    "donkey" |
    "rainbow sparrow" |
    "hotfeather pigeon" |
    "tabantha moose" |
    "red sparrow" |
    "common sparrow" |
    "white pigeon" |
    "white horse" |
    "bushy-tailed squirrel" |
    "windcleaver" |
    "forest dweller's bow" |
    "lizal bow" |
    "thunderblade" |
    "royal guard's shield" |
    "spiked moblin club" |
    "cobble crusher" |
    "soldier's claymore" |
    "guardian shield++" |
    "duplex bow" |
    "lizal tri-boomerang" |
    "silver bow" |
    "iron sledgehammer" |
    "silverscale spear" |
    "double axe" |
    "traveler's shield" |
    "royal guard's spear" |
    "reinforced lizal shield" |
    "arrow" |
    "knight's halberd" |
    "ancient spear" |
    "hylian shield" |
    "savage lynel bow" |
    "guardian shield" |
    "guardian spear+" |
    "ceremonial trident" |
    "guardian sword+" |
    "savage lynel sword" |
    "forest dweller's sword" |
    "ancient arrow" |
    "ancient battle axe" |
    "soup ladle" |
    "ancient shield" |
    "blizzard rod" |
    "gerudo shield" |
    "rusty halberd" |
    "lizal forked boomerang" |
    "boko spear" |
    "moonlight scimitar" |
    "emblazoned shield" |
    "wooden bow" |
    "frostspear" |
    "lizal spear" |
    "moblin club" |
    "guardian shield+" |
    "dragon bone boko bow" |
    "daybreaker" |
    "mighty lynel shield" |
    "drillshaft" |
    "boko shield" |
    "scimitar of the seven" |
    "soldier's broadsword" |
    "savage lynel shield" |
    "royal halberd" |
    "guardian spear" |
    "knight's broadsword" |
    "bow of light" |
    "knight's bow" |
    "dragonbone boko shield" |
    "eightfold longblade" |
    "great eagle bow" |
    "boomerang" |
    "royal guard's sword" |
    "ice rod" |
    "hunter's shield" |
    "feathered spear" |
    "guardian spear++" |
    "boko bat" |
    "boko club" |
    "lynel crusher" |
    "great thunderblade" |
    "giant boomerang" |
    "royal claymore" |
    "torch" |
    "lizalfos arm" |
    "tree branch" |
    "traveler's bow" |
    "farming hoe" |
    "throwing spear" |
    "gerudo spear" |
    "gerudo scimitar" |
    "meteor rod" |
    "rusty broadsword" |
    "fishing harpoon" |
    "falcon bow" |
    "soldier's spear" |
    "ancient battle axe+" |
    "boko bow" |
    "golden claymore" |
    "fisherman's shield" |
    "woodcutter's axe" |
    "dragonbone boko bat" |
    "forest dweller's shield" |
    "silver shield" |
    "golden bow" |
    "frostblade" |
    "soldier's shield" |
    "spiked boko shield" |
    "ancient battle axe++" |
    "mighty lynel bow" |
    "moblin spear" |
    "lightning rod" |
    "wooden shield" |
    "mighty lynel sword" |
    "fire rod" |
    "mighty lynel crusher" |
    "strengthened lizal bow" |
    "traveler's sword" |
    "dragonbone boko spear" |
    "lynel spear" |
    "silver longsword" |
    "guardian sword" |
    "royal broadsword" |
    "mighty lynel spear" |
    "steel lizal shield" |
    "ice arrow" |
    "demon carver" |
    "vicious sickle" |
    "royal guard's bow" |
    "one-hit obliterator" |
    "master sword" |
    "kite shield" |
    "lynel bow" |
    "bokoblin arm" |
    "dragonbone moblin spear" |
    "eightfold blade" |
    "shield of the mind's eye" |
    "farmer's pitchfork" |
    "forked lizal spear" |
    "savage lynel spear" |
    "wooden mop" |
    "bomb arrow" |
    "soldier's bow" |
    "great frostblade" |
    "guardian sword++" |
    "knight's shield" |
    "pot lid" |
    "lizal boomerang" |
    "spiked boko bat" |
    "dragonbone moblin club" |
    "radiant shield" |
    "spiked boko bow" |
    "thunderspear" |
    "traveler's claymore" |
    "ancient short sword" |
    "steel lizal bow" |
    "royal bow" |
    "flamespear" |
    "feathered edge" |
    "swallow bow" |
    "traveler's spear" |
    "boat oar" |
    "korok leaf" |
    "lynel shield" |
    "fire arrow" |
    "boulder breaker" |
    "knight's claymore" |
    "lynel sword" |
    "spiked moblin spear" |
    "shock arrow" |
    "lightscale trident" |
    "moblin arm" |
    "dragonbone boko club" |
    "forest dweller's spear" |
    "rusty shield" |
    "zora sword" |
    "edge of duality" |
    "great flameblade" |
    "ancient bow" |
    "royal shield" |
    "ancient bladesaw" |
    "savage lynel crusher" |
    "rusty claymore" |
    "serpentine spear" |
    "flameblade" |
    "phrenic bow" |
    "zora spear" |
    "lizal shield" |
    "enhanced lizal spear" |
    "royal guard's claymore" |
    "stone smasher" |
    "thunderstorm rod" |
    "spiked boko club" |
    "spring-loaded hammer" |
    "spiked boko spear" |
    "chillshroom" |
    "rushroom" |
    "zapshroom" |
    "swift violet" |
    "hyrule herb" |
    "mighty thistle" |
    "warm safflina" |
    "electric safflina" |
    "blue nightshade" |
    "stamella shroom" |
    "endura shroom" |
    "fleet-lotus seeds" |
    "big hearty radish" |
    "hearty radish" |
    "wildberry" |
    "mighty bananas" |
    "spicy pepper" |
    "silent princess" |
    "swift carrot" |
    "razorshroom" |
    "hearty truffle" |
    "cool safflina" |
    "armoranth" |
    "palm fruit" |
    "hearty durian" |
    "sunshroom" |
    "big hearty truffle" |
    "voltfruit" |
    "ironshroom" |
    "hylian shroom" |
    "endura carrot" |
    "courser bee honey" |
    "hydromelon" |
    "apple" |
    "silent shroom" |
    "fortified pumpkin" |
    "moblin" |
    "silver lynel" |
    "fire wizzrobe" |
    "molduga" |
    "black lizalfos" |
    "thunder wizzrobe" |
    "waterblight ganon" |
    "cursed moblin" |
    "guardian scout iii" |
    "silver lizalfos" |
    "electric wizzrobe" |
    "hinox" |
    "igneo pebblit" |
    "farosh" |
    "ice keese" |
    "frost pebblit" |
    "yiga blademaster" |
    "blue bokoblin" |
    "chuchu" |
    "cursed bokoblin" |
    "black moblin" |
    "blue moblin" |
    "silver bokoblin" |
    "snow octorok" |
    "dark beast ganon" |
    "black hinox" |
    "fire chuchu" |
    "fireblight ganon" |
    "frost talus" |
    "electric chuchu" |
    "ice-breath lizalfos" |
    "guardian skywatcher" |
    "guardian scout ii" |
    "rock octorok" |
    "blue hinox" |
    "stalizalfos" |
    "guardian scout iv" |
    "dinraal" |
    "master kohga" |
    "cursed lizalfos" |
    "molduking" |
    "guardian turret" |
    "windblight ganon" |
    "calamity ganon" |
    "stalmoblin" |
    "stalnox" |
    "bokoblin" |
    "silver moblin" |
    "keese" |
    "lynel" |
    "monk maz koshia" |
    "ice wizzrobe" |
    "stone talus" |
    "fire-breath lizalfos" |
    "decayed guardian" |
    "yiga footsoldier" |
    "treasure octorok" |
    "guardian scout i" |
    "blue-maned lynel" |
    "electric keese" |
    "thunderblight ganon" |
    "sentry" |
    "meteo wizzrobe" |
    "stone pebblit" |
    "igneo talus" |
    "stone talus (rare)" |
    "stone talus (luminous)" |
    "igneo talus titan" |
    "white-maned lynel" |
    "water octorok" |
    "forest octorok" |
    "guardian stalker" |
    "stalkoblin" |
    "black bokoblin" |
    "blizzrobe" |
    "blue lizalfos" |
    "lizalfos" |
    "electric lizalfos" |
    "naydra" |
    "fire keese" |
    "ice chuchu" |
    "ore deposit" |
    "luminous ore deposit" |
    "treasure chest" |
    "rare ore deposit"
/**
 * @alias entryId
 */
export type entryId =
    1 |
    2 |
    3 |
    4 |
    5 |
    6 |
    7 |
    8 |
    9 |
    10 |
    11 |
    12 |
    13 |
    14 |
    15 |
    16 |
    17 |
    18 |
    19 |
    20 |
    21 |
    22 |
    23 |
    24 |
    25 |
    26 |
    27 |
    28 |
    29 |
    30 |
    31 |
    32 |
    33 |
    34 |
    35 |
    36 |
    37 |
    38 |
    39 |
    40 |
    41 |
    42 |
    43 |
    44 |
    45 |
    46 |
    47 |
    48 |
    49 |
    50 |
    51 |
    52 |
    53 |
    54 |
    55 |
    56 |
    57 |
    58 |
    59 |
    60 |
    61 |
    62 |
    63 |
    64 |
    65 |
    66 |
    67 |
    68 |
    69 |
    70 |
    71 |
    72 |
    73 |
    74 |
    75 |
    76 |
    77 |
    78 |
    79 |
    80 |
    81 |
    82 |
    83 |
    84 |
    85 |
    86 |
    87 |
    88 |
    89 |
    90 |
    91 |
    92 |
    93 |
    94 |
    95 |
    96 |
    97 |
    98 |
    99 |
    100 |
    101 |
    102 |
    103 |
    104 |
    105 |
    106 |
    107 |
    108 |
    109 |
    110 |
    111 |
    112 |
    113 |
    114 |
    115 |
    116 |
    117 |
    118 |
    119 |
    120 |
    121 |
    122 |
    123 |
    124 |
    125 |
    126 |
    127 |
    128 |
    129 |
    130 |
    131 |
    132 |
    133 |
    134 |
    135 |
    136 |
    137 |
    138 |
    139 |
    140 |
    141 |
    142 |
    143 |
    144 |
    145 |
    146 |
    147 |
    148 |
    149 |
    150 |
    151 |
    152 |
    153 |
    154 |
    155 |
    156 |
    157 |
    158 |
    159 |
    160 |
    161 |
    162 |
    163 |
    164 |
    165 |
    166 |
    167 |
    168 |
    169 |
    170 |
    171 |
    172 |
    173 |
    174 |
    175 |
    176 |
    177 |
    178 |
    179 |
    180 |
    181 |
    182 |
    183 |
    184 |
    185 |
    186 |
    187 |
    188 |
    189 |
    190 |
    191 |
    192 |
    193 |
    194 |
    195 |
    196 |
    197 |
    198 |
    199 |
    200 |
    201 |
    202 |
    203 |
    204 |
    205 |
    206 |
    207 |
    208 |
    209 |
    210 |
    211 |
    212 |
    213 |
    214 |
    215 |
    216 |
    217 |
    218 |
    219 |
    220 |
    221 |
    222 |
    223 |
    224 |
    225 |
    226 |
    227 |
    228 |
    229 |
    230 |
    231 |
    232 |
    233 |
    234 |
    235 |
    236 |
    237 |
    238 |
    239 |
    240 |
    241 |
    242 |
    243 |
    244 |
    245 |
    246 |
    247 |
    248 |
    249 |
    250 |
    251 |
    252 |
    253 |
    254 |
    255 |
    256 |
    257 |
    258 |
    259 |
    260 |
    261 |
    262 |
    263 |
    264 |
    265 |
    266 |
    267 |
    268 |
    269 |
    270 |
    271 |
    272 |
    273 |
    274 |
    275 |
    276 |
    277 |
    278 |
    279 |
    280 |
    281 |
    282 |
    283 |
    284 |
    285 |
    286 |
    287 |
    288 |
    289 |
    290 |
    291 |
    292 |
    293 |
    294 |
    295 |
    296 |
    297 |
    298 |
    299 |
    300 |
    301 |
    302 |
    303 |
    304 |
    305 |
    306 |
    307 |
    308 |
    309 |
    310 |
    311 |
    312 |
    313 |
    314 |
    315 |
    316 |
    317 |
    318 |
    319 |
    320 |
    321 |
    322 |
    323 |
    324 |
    325 |
    326 |
    327 |
    328 |
    329 |
    330 |
    331 |
    332 |
    333 |
    334 |
    335 |
    336 |
    337 |
    338 |
    339 |
    340 |
    341 |
    342 |
    343 |
    344 |
    345 |
    346 |
    347 |
    348 |
    349 |
    350 |
    351 |
    352 |
    353 |
    354 |
    355 |
    356 |
    357 |
    358 |
    359 |
    360 |
    361 |
    362 |
    363 |
    364 |
    365 |
    366 |
    367 |
    368 |
    369 |
    370 |
    371 |
    372 |
    373 |
    374 |
    375 |
    376 |
    377 |
    378 |
    379 |
    380 |
    381 |
    382 |
    383 |
    384 |
    385 |
    386 |
    387 |
    388
/**
 * @alias entryNameEncoded URI encoded `entryName`
 */
type entryNameEncoded = 
    "horse" |
    "giant%20horse" |
    "white%20horse" |
    "lord%20of%20the%20mountain" |
    "stalhorse" |
    "donkey" |
    "sand%20seal" |
    "patricia" |
    "bushy-tailed%20squirrel" |
    "woodland%20boar" |
    "red-tusked%20boar" |
    "mountain%20goat" |
    "white%20goat" |
    "mountain%20buck" |
    "mountain%20doe" |
    "water%20buffalo" |
    "hateno%20cow" |
    "highland%20sheep" |
    "grassland%20fox" |
    "snowcoat%20fox" |
    "maraudo%20wolf" |
    "wasteland%20coyote" |
    "cold-footed%20wolf" |
    "tabantha%20moose" |
    "great-horned%20rhinoceros" |
    "honeyvore%20bear" |
    "grizzlemaw%20bear" |
    "hylian%20retriever" |
    "blupee" |
    "common%20sparrow" |
    "red%20sparrow" |
    "blue%20sparrow" |
    "rainbow%20sparrow" |
    "sand%20sparrow" |
    "golden%20sparrow" |
    "wood%20pigeon" |
    "rainbow%20pigeon" |
    "hotfeather%20pigeon" |
    "white%20pigeon" |
    "mountain%20crow" |
    "bright-chested%20duck" |
    "blue-winged%20heron" |
    "pink%20heron" |
    "islander%20hawk" |
    "seagull" |
    "eldin%20ostrich" |
    "cucco" |
    "hyrule%20bass" |
    "hearty%20bass" |
    "staminoka%20bass" |
    "hearty%20salmon" |
    "chillfin%20trout" |
    "sizzlefin%20trout" |
    "voltfin%20trout" |
    "stealthfin%20trout" |
    "mighty%20carp" |
    "armored%20carp" |
    "sanke%20carp" |
    "mighty%20porgy" |
    "armored%20porgy" |
    "sneaky%20river%20snail" |
    "hearty%20blueshell%20snail" |
    "razorclaw%20crab" |
    "ironshell%20crab" |
    "bright-eyed%20crab" |
    "fairy" |
    "winterwing%20butterfly" |
    "summerwing%20butterfly" |
    "thunderwing%20butterfly" |
    "smotherwing%20butterfly" |
    "cold%20darner" |
    "warm%20darner" |
    "electric%20darner" |
    "restless%20cricket" |
    "bladed%20rhino%20beetle" |
    "rugged%20rhino%20beetle" |
    "energetic%20rhino%20beetle" |
    "sunset%20firefly" |
    "hot-footed%20frog" |
    "tireless%20frog" |
    "hightail%20lizard" |
    "hearty%20lizard" |
    "fireproof%20lizard" |
    "master%20sword" |
    "tree%20branch" |
    "torch" |
    "soup%20ladle" |
    "boomerang" |
    "spring-loaded%20hammer" |
    "traveler's%20sword" |
    "soldier's%20broadsword" |
    "knight's%20broadsword" |
    "royal%20broadsword" |
    "forest%20dweller's%20sword" |
    "zora%20sword" |
    "feathered%20edge" |
    "gerudo%20scimitar" |
    "moonlight%20scimitar" |
    "scimitar%20of%20the%20seven" |
    "eightfold%20blade" |
    "ancient%20short%20sword" |
    "rusty%20broadsword" |
    "royal%20guard's%20sword" |
    "flameblade" |
    "frostblade" |
    "thunderblade" |
    "boko%20club" |
    "spiked%20boko%20club" |
    "dragonbone%20boko%20club" |
    "lizal%20boomerang" |
    "lizal%20forked%20boomerang" |
    "lizal%20tri-boomerang" |
    "guardian%20sword" |
    "guardian%20sword%2B" |
    "guardian%20sword%2B%2B" |
    "lynel%20sword" |
    "mighty%20lynel%20sword" |
    "savage%20lynel%20sword" |
    "fire%20rod" |
    "meteor%20rod" |
    "ice%20rod" |
    "blizzard%20rod" |
    "lightning%20rod" |
    "thunderstorm%20rod" |
    "vicious%20sickle" |
    "demon%20carver" |
    "one-hit%20obliterator" |
    "bokoblin%20arm" |
    "lizalfos%20arm" |
    "korok%20leaf" |
    "farming%20hoe" |
    "boat%20oar" |
    "woodcutter's%20axe" |
    "double%20axe" |
    "iron%20sledgehammer" |
    "giant%20boomerang" |
    "traveler's%20claymore" |
    "soldier's%20claymore" |
    "knight's%20claymore" |
    "royal%20claymore" |
    "silver%20longsword" |
    "cobble%20crusher" |
    "stone%20smasher" |
    "boulder%20breaker" |
    "golden%20claymore" |
    "eightfold%20longblade" |
    "edge%20of%20duality" |
    "ancient%20bladesaw" |
    "rusty%20claymore" |
    "royal%20guard's%20claymore" |
    "great%20flameblade" |
    "great%20frostblade" |
    "great%20thunderblade" |
    "boko%20bat" |
    "spiked%20boko%20bat" |
    "dragonbone%20boko%20bat" |
    "moblin%20club" |
    "spiked%20moblin%20club" |
    "dragonbone%20moblin%20club" |
    "ancient%20battle%20axe" |
    "ancient%20battle%20axe%2B" |
    "ancient%20battle%20axe%2B%2B" |
    "lynel%20crusher" |
    "mighty%20lynel%20crusher" |
    "savage%20lynel%20crusher" |
    "windcleaver" |
    "moblin%20arm" |
    "wooden%20mop" |
    "farmer's%20pitchfork" |
    "fishing%20harpoon" |
    "throwing%20spear" |
    "traveler's%20spear" |
    "soldier's%20spear" |
    "knight's%20halberd" |
    "royal%20halberd" |
    "forest%20dweller's%20spear" |
    "zora%20spear" |
    "silverscale%20spear" |
    "ceremonial%20trident" |
    "lightscale%20trident" |
    "drillshaft" |
    "feathered%20spear" |
    "gerudo%20spear" |
    "serpentine%20spear" |
    "ancient%20spear" |
    "rusty%20halberd" |
    "royal%20guard's%20spear" |
    "flamespear" |
    "frostspear" |
    "thunderspear" |
    "boko%20spear" |
    "spiked%20boko%20spear" |
    "dragonbone%20boko%20spear" |
    "moblin%20spear" |
    "spiked%20moblin%20spear" |
    "dragonbone%20moblin%20spear" |
    "lizal%20spear" |
    "enhanced%20lizal%20spear" |
    "forked%20lizal%20spear" |
    "guardian%20spear" |
    "guardian%20spear%2B" |
    "guardian%20spear%2B%2B" |
    "lynel%20spear" |
    "mighty%20lynel%20spear" |
    "savage%20lynel%20spear" |
    "bow%20of%20light" |
    "wooden%20bow" |
    "traveler's%20bow" |
    "soldier's%20bow" |
    "knight's%20bow" |
    "royal%20bow" |
    "forest%20dweller's%20bow" |
    "silver%20bow" |
    "swallow%20bow" |
    "falcon%20bow" |
    "great%20eagle%20bow" |
    "golden%20bow" |
    "phrenic%20bow" |
    "ancient%20bow" |
    "royal%20guard's%20bow" |
    "boko%20bow" |
    "spiked%20boko%20bow" |
    "dragon%20bone%20boko%20bow" |
    "lizal%20bow" |
    "strengthened%20lizal%20bow" |
    "steel%20lizal%20bow" |
    "lynel%20bow" |
    "mighty%20lynel%20bow" |
    "savage%20lynel%20bow" |
    "duplex%20bow" |
    "arrow" |
    "fire%20arrow" |
    "ice%20arrow" |
    "shock%20arrow" |
    "bomb%20arrow" |
    "ancient%20arrow" |
    "hylian%20shield" |
    "pot%20lid" |
    "wooden%20shield" |
    "emblazoned%20shield" |
    "hunter's%20shield" |
    "fisherman's%20shield" |
    "traveler's%20shield" |
    "soldier's%20shield" |
    "knight's%20shield" |
    "royal%20shield" |
    "forest%20dweller's%20shield" |
    "silver%20shield" |
    "kite%20shield" |
    "gerudo%20shield" |
    "radiant%20shield" |
    "daybreaker" |
    "shield%20of%20the%20mind's%20eye" |
    "ancient%20shield" |
    "rusty%20shield" |
    "royal%20guard's%20shield" |
    "boko%20shield" |
    "spiked%20boko%20shield" |
    "dragonbone%20boko%20shield" |
    "lizal%20shield" |
    "reinforced%20lizal%20shield" |
    "steel%20lizal%20shield" |
    "guardian%20shield" |
    "guardian%20shield%2B" |
    "guardian%20shield%2B%2B" |
    "lynel%20shield" |
    "mighty%20lynel%20shield" |
    "savage%20lynel%20shield" |
    "apple" |
    "palm%20fruit" |
    "wildberry" |
    "hearty%20durian" |
    "hydromelon" |
    "spicy%20pepper" |
    "voltfruit" |
    "fleet-lotus%20seeds" |
    "mighty%20bananas" |
    "hylian%20shroom" |
    "endura%20shroom" |
    "stamella%20shroom" |
    "hearty%20truffle" |
    "big%20hearty%20truffle" |
    "chillshroom" |
    "sunshroom" |
    "zapshroom" |
    "rushroom" |
    "razorshroom" |
    "ironshroom" |
    "silent%20shroom" |
    "hyrule%20herb" |
    "hearty%20radish" |
    "big%20hearty%20radish" |
    "cool%20safflina" |
    "warm%20safflina" |
    "electric%20safflina" |
    "swift%20carrot" |
    "endura%20carrot" |
    "fortified%20pumpkin" |
    "swift%20violet" |
    "mighty%20thistle" |
    "armoranth" |
    "blue%20nightshade" |
    "silent%20princess" |
    "courser%20bee%20honey" |
    "chuchu" |
    "fire%20chuchu" |
    "ice%20chuchu" |
    "electric%20chuchu" |
    "keese" |
    "fire%20keese" |
    "ice%20keese" |
    "electric%20keese" |
    "water%20octorok" |
    "forest%20octorok" |
    "rock%20octorok" |
    "snow%20octorok" |
    "treasure%20octorok" |
    "fire%20wizzrobe" |
    "ice%20wizzrobe" |
    "electric%20wizzrobe" |
    "meteo%20wizzrobe" |
    "blizzrobe" |
    "thunder%20wizzrobe" |
    "bokoblin" |
    "blue%20bokoblin" |
    "black%20bokoblin" |
    "stalkoblin" |
    "silver%20bokoblin" |
    "moblin" |
    "blue%20moblin" |
    "black%20moblin" |
    "stalmoblin" |
    "silver%20moblin" |
    "lizalfos" |
    "blue%20lizalfos" |
    "black%20lizalfos" |
    "stalizalfos" |
    "fire-breath%20lizalfos" |
    "ice-breath%20lizalfos" |
    "electric%20lizalfos" |
    "silver%20lizalfos" |
    "lynel" |
    "blue-maned%20lynel" |
    "white-maned%20lynel" |
    "silver%20lynel" |
    "guardian%20stalker" |
    "guardian%20skywatcher" |
    "guardian%20turret" |
    "sentry" |
    "decayed%20guardian" |
    "guardian%20scout%20i" |
    "guardian%20scout%20ii" |
    "guardian%20scout%20iii" |
    "guardian%20scout%20iv" |
    "yiga%20footsoldier" |
    "yiga%20blademaster" |
    "master%20kohga" |
    "monk%20maz%20koshia" |
    "stone%20talus" |
    "stone%20talus%20(luminous)" |
    "stone%20talus%20(rare)" |
    "igneo%20talus" |
    "frost%20talus" |
    "stone%20pebblit" |
    "igneo%20pebblit" |
    "frost%20pebblit" |
    "igneo%20talus%20titan" |
    "hinox" |
    "blue%20hinox" |
    "black%20hinox" |
    "stalnox" |
    "molduga" |
    "molduking" |
    "dinraal" |
    "naydra" |
    "farosh" |
    "cursed%20bokoblin" |
    "cursed%20moblin" |
    "cursed%20lizalfos" |
    "thunderblight%20ganon" |
    "fireblight%20ganon" |
    "waterblight%20ganon" |
    "windblight%20ganon" |
    "calamity%20ganon" |
    "dark%20beast%20ganon" |
    "treasure%20chest" |
    "ore%20deposit" |
    "rare%20ore%20deposit" |
    "luminous%20ore%20deposit"
/**
 * @alias entryImageUrl
 */
export type entryImageUrl = `${string}/api/v2/entry/${entryNameEncoded}/image`
/**
 * @alias entryCategory
 */
export type entryCategory =
    "creatures" | 
    "equipment" |
    "materials" |
    "monsters" |
    "treasure"
/**
 * @alias entryLocation
 */
export type entryLocation =
    "Hyrule Field" |
    "Faron Grasslands" |
    null |
    "Satori Mountain" |
    "Hebra Mountains" |
    "Akkala Highlands" |
    "Greater Hyrule" |
    "Gerudo Desert" |
    "Hyrule Ridge" |
    "Lanayru Great Spring" |
    "Deep Akkala" |
    "Great Hyrule Forest" |
    "West Necluda" |
    "Eldin Canyon" |
    "Lanayru Wetlands" |
    "East Necluda" |
    "Tabantha Frontier" |
    "Gerudo Highlands" |
    "Crenel Peak" |
    "Rito Stable" |
    "Floria Bridge" |
    "Seres Scablands" |
    "Eldin Mountains" |
    "Necluda Sea" |
    "Akkala Sea" |
    "Lanayru Sea" |
    "Death Mountain" |
    "Gerudo Town" |
    "Lake Hylia" |
    "Faron" |
    "Mount Lanayru" |
    "Kakariko Village" |
    "Hyrule Castle" |
    "Yiga Clan Hideout" |
    "Lake Floria" |
    "Divine Beast Vah Naboris" |
    "Divine Beast Vah Rudania" |
    "Divine Beast Vah Ruta" |
    "Divine Beast Vah Medoh"
/**
 * @alias entryDrop
 */
export type entryDrop =
    null |
    "acorn" |
    "raw meat" |
    "raw prime meat" |
    "raw gourmet meat" |
    "hearty salmon" |
    "chickaloo tree nut" |
    "raw bird drumstick" |
    "raw bird thigh" |
    "raw whole bird" |
    "bird egg" |
    "chuchu jelly" |
    "red chuchu jelly" |
    "white chuchu jelly" |
    "yellow chuchu jelly" |
    "keese wing" |
    "keese eyeball" |
    "fire keese wing" |
    "ice keese wing" |
    "electric keese wing" |
    "octorok tentacle" |
    "octo balloon" |
    "octorok eyeball" |
    "green rupee" |
    "blue rupee" |
    "red rupee" |
    "purple rupee" |
    "silver rupee" |
    "bokoblin horn" |
    "bokoblin fang" |
    "bokoblin guts" |
    "amber" |
    "opal" |
    "topaz" |
    "ruby" |
    "sapphire" |
    "diamond" |
    "moblin horn" |
    "moblin fang" |
    "moblin guts" |
    "lizalfos horn" |
    "lizalfos talon" |
    "lizalfos tail" |
    "red lizalfos tail" |
    "icy lizalfos tail" |
    "yellow lizalfos tail" |
    "lynel horn" |
    "lynel hoof" |
    "lynel guts" |
    "star fragment" |
    "ancient screw" |
    "ancient spring" |
    "ancient gear" |
    "ancient shaft" |
    "ancient core" |
    "giant ancient core" |
    "mighty bananas" |
    "flint" |
    "luminous stone" |
    "hinox toenail" |
    "hinox tooth" |
    "hinox guts" |
    "apple" |
    "wildberry" |
    "palm fruit" |
    "voltfruit" |
    "fortified pumpkin" |
    "hearty durian" |
    "roasted bass" |
    "roasted hearty bass" |
    "roasted hearty salmon" |
    "roasted trout" |
    "roasted carp" |
    "roasted porgy" |
    "sneaky river escargot" |
    "blueshell escargot" |
    "blackened crab" |
    "seared steak" |
    "seared prime steak" |
    "seared gourmet steak" |
    "roasted bird drumstick" |
    "roasted bird thigh" |
    "roasted whole bird" |
    "molduga fin" |
    "molduga guts" |
    "treasures"
/**
 * @alias entryCookingEffect
 */
export type entryCookingEffect =
    "" |
    "extra hearts" |
    "stamina recovery" |
    "heat resistance" |
    "cold resistance" |
    "shock resistance" |
    "stealth up" |
    "attack up" |
    "defense up" |
    "flame guard" |
    "speed up" |
    "extra stamina"
/**
 * @interface BaseEntry Contains attributes which all entries have
 */
export interface BaseEntry {
    /**
     * Name of the category of the entry
     * @type {entryCategory}
     * @memberof BaseEntry
     * @readonly
     */
    readonly category: entryCategory
    /**
     * Common locations of entry
     * @type {entryLocation[]}
     * @memberof BaseEntry
     * @readonly
     */
    readonly common_locations: entryLocation[]
    /**
     * Description of entry
     * @type {string}
     * @memberof BaseEntry
     * @readonly
     */
    readonly description: string
    /**
     * ID of entry
     * @type {number}
     * @memberof BaseEntry
     * @readonly
     */
    readonly id: entryId
    /**
     * Name of entry
     * @type {entryName}
     * @memberof BaseEntry
     * @readonly
     */
    readonly name: entryName
    /**
     * Image of entry as a link, can be downloaded with `compendium.download_entry_image`
     * @type {entryImageUrl}
     * @memberof BaseEntry
     * @readonly
     */
    readonly image: entryImageUrl
}
/**
 * @interface CreatureEntry An entry of the "creatures" category
 * @extends BaseEntry
 */
export interface CreatureEntry extends BaseEntry {
    /**
     * Entry's drops when defeated, attribute only exists on entries of sub-category 'non_food'
     * @type {?entryDrop[]}
     * @memberof CreatureEntry
     * @readonly
     */
    readonly drops?: entryDrop[]
    /**
     * Entry' hearts recovered when eaten, attribute only exists on entries of sub-category 'food'
     * @type {?number}
     * @memberof CreatureEntry
     * @readonly
     */
    readonly hearts_recovered?: number
    /**
     * Entry's cooking effect when eaten after cooked
     * @type {?entryCookingEffect}
     * @memberof CreatureEntry
     * @readonly
     */
    readonly cooking_effect?: entryCookingEffect
}
/**
 * @interface EquipmentEntry An entry of the "equipment" category
 * @extends BaseEntry
 */
export interface EquipmentEntry extends BaseEntry {
    /**
     * Damage done of entry when attacked with
     * @type {number}
     * @memberof EquipmentEntry
     * @readonly
     */
    readonly attack: number
    /**
     * Defense points of entry
     * @type {number}
     * @memberof EquipmentEntry
     * @readonly
     */
    readonly defense: number
}
/**
 * @interface MaterialEntry An entry of "materials" category
 * @extends BaseEntry
 */
export interface MaterialEntry extends BaseEntry {
    /**
     * Hearts recovered of entery when eaten
     * @type {number}
     * @memberof MaterialEntry
     * @readonly
     */
    readonly hearts_recovered: number
}
/**
 * @interface MonsterEntry An entry of "monsters" category
 * @extends BaseEntry
 */
export interface MonsterEntry extends BaseEntry {
    /**
     * Entry's materials dropped when defeaten.
     * @type {entryDrop[]}
     * @memberof MonsterEntry
     * @readonly
     */
    readonly drops: entryDrop[]
}
/**
 * @interface TreasureEntry An entry of "treasure" category
 * @extends BaseEntry
 */
export interface TreasureEntry extends BaseEntry {
    /**
     * Entry's materials dropped when broken open.
     * @type {entryDrop[]}
     * @memberof TreasureEntry
     * @readonly
     */
    readonly drops: entryDrop[]
}
/**
 * @deprecated Since v1.6.0. Use entryId | entryName
 * @alias EntryType Represents the type of an entry
 */
export type EntryType = string | number
/**
 * @alias AnyEntry Represents an entry of any category
 */
export type AnyEntry = CreatureEntry | EquipmentEntry | MaterialEntry | MonsterEntry | TreasureEntry
/**
 * @alias AnyCategory Represents any category
 */
export type AnyCategory = AnyEntry[] | {food: CreatureEntry[], non_food: CreatureEntry[]}
/**
 * @interface EntryCallback Callback function for `compendium.get_entry`
 */
export interface EntryCallback {
    /**
     * @type {void}
     * @memberof EntryCallback
     */
    (
        /**
         * @param {AnyEntry} data API data
         */
        data: AnyEntry
    ): void
}
/**
 * @interface CategoryCallback Callback function for `compendium.get_category`
 */
export interface CategoryCallback {
    /**
     * @type {void}
     * @memberof CategoryCallback
     */
    (
        /**
         * @param {AnyCategory} data API data
         */
        data: AnyCategory
    ): void
}
/**
 * @interface AllCallback Callback function for `compendium.get_all`
 */
 export interface AllCallback {
     /**
      * @type {void}
      * @memberof AllCallback
      */
    (
        /**
         * @param {AnyCategory[]} data API data
         */
         data: {
            creatures: {food: AnyEntry[], non_food: AnyEntry[]},
            equipment: EquipmentEntry[],
            materials: MaterialEntry[],
            monsters: MonsterEntry[],
            treasure: TreasureEntry[]
        }
    ): void
}
/** 
 * Converts items of a category to their respective data types
 * @param category_data API response of category
 * @returns {AnyCategory}
 */
export function type_category(category_data: AnyCategory) {
    let res: any = []
    if (Object.keys(category_data).length===2) {
        res = category_data as {food: CreatureEntry[], non_food: CreatureEntry[]}
    } else {
        category_data = category_data as AnyEntry[]
        if (category_data[0].category === "equipment") {
            res = category_data as EquipmentEntry[]
        } else if (category_data[0].category === "materials") {
            res = category_data as MaterialEntry[]
        } else if (category_data[0].category === "monsters") {
            res = category_data as MonsterEntry[]
        } else if (category_data[0].category === "treasure") {
            res = category_data as TreasureEntry[]
        }
    }
    return res
}
/**
 * Callback for `compendium.entry_image.get_stream` @param callback
 */
export interface ImageGetStreamCallback {
    /**
     * @type {void}
     * @memberof ImageGetStreamCallback
     */
    (
        /**
         * @param {Transform} stream Image data
         */
        stream: Transform
    ): void
}
/**
 * Represents the image of an entry.
 * @param {compendium} compendium_instance Instance of `compendium`
 * @param {entryName | entryId} entry ID or name of entry
 */
export class EntryImage {
    compendium_instance: any
    entry: entryName | entryId
    constructor(compendium_instance: any, entry: entryName | entryId) {
        this.compendium_instance = compendium_instance
        this.entry = entry
    }
    /**
     * Gets the `stream.Transform` object of image, useful for file uploads
     * @param {ImageGetStreamCallback} callback Function to be executed with image
     * @param {number} timeout Time to wait for response before executing @param error_callback
     * @param {Function} [error_callback=(err)=>{throw(err)] Function to be executed on error
     */
    get_stream(
        callback: ImageGetStreamCallback,
        timeout: number=this.compendium_instance.default_timeout, 
        error_callback: Function=(err: any)=>{throw err}
    ) {
        this.compendium_instance.get_entry(this.entry, (data: any) => {
            let req = https.get(data["image"], (resp: any) => {
                    let strm = new Transform();
                    resp.on("data", (chunk: string) => {
                        strm.push(chunk);
                    });
        
                    resp.on("end", () => {
                        callback(strm)
                    })
            }).on("error", error_callback)
            req.on("timeout", req.destroy)
        }, timeout, error_callback)
    }
    /**
     * Downloads the image of an entry
     * @param {entryName | entryId} entry ID or name of entry
     * @param {string} [output_file] File path of which image is to saved, default: "./[entry name].png"
     * @param {Function} [callback=(err)=>{throw err}] @param callback of https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback
     * @param {number} timeout Time to wait for response before executing @param error_callback
     * @param {Function} [error_callback=(err)=>{throw(err)] Function to be executed on error
     */
    download(
        output_file?: string, 
        callback: Function=()=>{},
        timeout: number=this.compendium_instance.default_timeout, 
        error_callback: Function=(err: any)=>{throw err}
    ) { 
        this.compendium_instance.get_entry(this.entry, (data: any) => {
            let req = https.get(data["image"], (resp: any) => {
                    let strm = new Transform();
                    resp.on("data", (chunk: string) => {
                        strm.push(chunk);
                    });
        
                    resp.on("end", () => {
                        fs.writeFile(output_file ?? (data["name"]+".png").replace(" ", "_"), strm.read(), callback)
                    })
            }).on("error", error_callback)
            req.on("timeout", req.destroy)
        }, timeout, error_callback)
    }
}