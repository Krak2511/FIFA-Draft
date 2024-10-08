var vars = {};

var formationsUsed = [];
var formationPositionsUsed = [];
var draftPicks = [];
var draftOrder = [];
var currentRound = 0;

var swapPicks = [];
var swapRound = 0;
var swapCount = 0;

var stats = ["Acceleration", "Sprint Speed",
            "Agility", "Balance", "Reactions", "Ball Control", "Dribbling", "Composure",
            "Positioning", "Finishing", "Shot Power", "Long Shots", "Volleys", "Penalties",
            "Interceptions", "Heading Accuracy", "Defensive Awareness", "Standing Tackle", "Sliding Tackle",
            "Vision", "Crossing", "Free Kick Accuracy", "Short Passing", "Long Passing", "Curve",
            "Jumping", "Stamina", "Strength", "Aggression"]
var gkStats = ["Diving", "Handling", "Kicking", "Reflexes", "Speed", "Positioning"]
var formationPositions = {
    "451 Attack" : ["GK", "LB", "LCB", "RCB", "RB", "LM", "CM", "RM", "LAM", "RAM", "ST"],
    "4141" : ["GK", "LB", "LCB", "RCB", "RB", "CDM", "LM", "LCM", "RCM", "RM", "ST"],
    "4231 Narrow" : ["GK", "LB", "LCB", "RCB", "RB", "LDM", "RDM", "LAM", "CAM", "RAM", "ST"],
    "4231 Wide" : ["GK", "LB", "LCB", "RCB", "RB", "LDM", "RDM", "LM", "RM", "CAM", "ST"],
    "451 Flat" : ["GK", "LB", "LCB", "RCB", "RB", "LM", "LCM", "CM", "RCM", "RM", "ST"],
    "4411 Midfield" : ["GK", "LB", "LCB", "RCB", "RB", "LM", "LCM", "RCM", "RM", "CAM", "ST"],
    "4411 Attack" : ["GK", "LB", "LCB", "RCB", "RB", "LM", "LCM", "RCM", "RM", "CF", "ST"],
    "442 Holding" : ["GK", "LB", "LCB", "RCB", "RB", "LDM", "RDM", "LM", "RM", "LS", "RS"],
    "442 Flat" : ["GK", "LB", "LCB", "RCB", "RB", "LM", "LCM", "RCM", "RM", "LS", "RS"],
    "41212 Narrow" : ["GK", "LB", "LCB", "RCB", "RB", "CDM", "LCM", "RCM", "CAM", "LS", "RS"],
    "41212 Wide" : ["GK", "LB", "LCB", "RCB", "RB", "CDM", "LM", "RM", "CAM", "LS", "RS"],
    "4222" : ["GK", "LB", "LCB", "RCB", "RB", "LDM", "RDM", "LAM", "RAM", "LS", "RS"],
    "4312" : ["GK", "LB", "LCB", "RCB", "RB", "LCM", "CM", "RCM", "CAM", "LS", "RS"],
    "4132" : ["GK", "LB", "LCB", "RCB", "RB", "CDM", "LM", "CM", "RM", "LS", "RS"],
    "433 False 9" : ["GK", "LB", "LCB", "RCB", "RB", "CDM", "LCM", "RCM", "CF", "LW", "RW"],
    "433 Attack" : ["GK", "LB", "LCB", "RCB", "RB", "LCM", "RCM", "CAM", "LW", "ST", "RW"],
    "433 Defend" : ["GK", "LB", "LCB", "RCB", "RB", "LDM", "RDM", "CM", "LW", "ST", "RW"],
    "433 Holding" : ["GK", "LB", "LCB", "RCB", "RB", "CDM", "LCM", "RCM", "LW", "ST", "RW"],
    "433 Flat" : ["GK", "LB", "LCB", "RCB", "RB", "LCM", "CM", "RCM", "LW", "ST", "RW"],
    "4321" : ["GK", "LB", "LCB", "RCB", "RB", "LCM", "CM", "RCM", "LF", "RF", "ST"],
    "424" : ["GK", "LB", "LCB", "RCB", "RB", "LCM", "RCM", "LW", "LS", "RS", "RW"],
    "541 Diamond" : ["GK", "LCB", "CB", "RCB", "LWB", "RWB", "CDM", "LM", "RM", "CAM", "ST"],
    "541 Flat" : ["GK", "LCB", "CB", "RCB", "LWB", "RWB", "LM", "LCM", "RCM", "RM", "ST"],
    "5212" : ["GK", "LCB", "CB", "RCB", "LWB", "RWB", "LCM", "RCM", "CAM", "LS", "RS"],
    "532" : ["GK", "LCB", "CB", "RCB", "LWB", "RWB", "LCM", "CM", "RCM", "LS", "RS"],
    "523" : ["GK", "LCB", "CB", "RCB", "LWB", "RWB", "LCM", "RCM", "LW", "ST", "RW"],
    "3142" : ["GK", "LCB", "CB", "RCB", "CDM", "LM", "LCM", "RCM", "RM", "LS", "RS"],
    "3412" : ["GK", "LCB", "CB", "RCB", "LM", "LCM", "RCM", "RM", "CAM", "LS", "RS"],
    "352" : ["GK", "LCB", "CB", "RCB", "LDM", "RDM", "LM", "RM", "CAM", "LS", "RS"],
    "3511" : ["GK", "LCB", "CB", "RCB", "LDM", "RDM", "LM", "CM", "RM", "CF", "ST"],
    "3421" : ["GK", "LCB", "CB", "RCB", "LM", "LCM", "RCM", "RM", "LF", "RF", "ST"],
    "343 Flat" : ["GK", "LCB", "CB", "RCB", "LM", "LCM", "RCM", "RM", "LW", "ST", "RW"],
    "343 Diamond" : ["GK", "LCB", "CB", "RCB", "CDM", "LM", "RM", "CAM", "LW", "ST", "RW"]
}

var nationIDs = {
    'Afghanistan': 149,
    'Albania': 1,
    'Algeria': 97,
    'American Samoa': 194,
    'Andorra': 2,
    'Angola': 98,
    'Anguilla': 62,
    'Antigua and Barbuda': 63,
    'Argentina': 52,
    'Armenia': 3,
    'Aruba': 64,
    'Australia': 195,
    'Austria': 4,
    'Azerbaijan': 5,
    'Bahamas': 65,
    'Bahrain': 150,
    'Bangladesh': 151,
    'Barbados': 66,
    'Belarus': 6,
    'Belgium': 7,
    'Belize': 67,
    'Benin': 99,
    'Bermuda': 68,
    'Bhutan': 152,
    'Bolivia': 53,
    'Bosnia and Herzegovina': 8,
    'Botswana': 100,
    'Brazil': 54,
    'British Virgin Islands': 69,
    'Brunei Darussalam': 153,
    'Bulgaria': 9,
    'Burkina Faso': 101,
    'Burundi': 102,
    'Cambodia': 154,
    'Cameroon': 103,
    'Canada': 70,
    'Cape Verde Islands': 104,
    'Cayman Islands': 71,
    'Central African Republic': 105,
    'Chad': 106,
    'Chile': 55,
    'China PR': 155,
    'Chinese Taipei': 213,
    'Colombia': 56,
    'Comoros': 214,
    'Congo': 107,
    'Congo DR': 110,
    'Cook Islands': 196,
    'Costa Rica': 72,
    'Côte d\'Ivoire': 108,
    'Croatia': 10,
    'Cuba': 73,
    'Curaçao': 85,
    'Cyprus': 11,
    'Czech Republic': 12,
    'Denmark': 13,
    'Djibouti': 109,
    'Dominica': 74,
    'Dominican Republic': 207,
    'Ecuador': 57,
    'Egypt': 111,
    'El Salvador': 76,
    'England': 14,
    'Equatorial Guinea': 112,
    'Eritrea': 113,
    'Estonia': 208,
    'Eswatini': 142,
    'Ethiopia': 114,
    'Faroe Islands': 16,
    'Fiji': 197,
    'Finland': 17,
    'France': 18,
    'Gabon': 115,
    'Gambia': 116,
    'Georgia': 20,
    'Germany': 21,
    'Ghana': 117,
    'Gibraltar': 205,
    'Greece': 22,
    'Greenland': 206,
    'Grenada': 77,
    'Guam': 157,
    'Guatemala': 78,
    'Guinea': 118,
    'Guinea-Bissau': 119,
    'Guyana': 79,
    'Haiti': 80,
    'Netherlands': 34,
    'Honduras': 81,
    'Hong Kong': 158,
    'Hungary': 23,
    'Iceland': 24,
    'India': 159,
    'Indonesia': 160,
    'International': 75,
    'Iran': 161,
    'Iraq': 162,
    'Israel': 26,
    'Italy': 27,
    'Jamaica': 82,
    'Japan': 163,
    'Jordan': 164,
    'Kazakhstan': 165,
    'Kenya': 120,
    'Korea DPR': 166,
    'Korea Republic': 167,
    'Kosovo': 219,
    'Kuwait': 168,
    'Kyrgyzstan': 169,
    'Laos': 170,
    'Latvia': 28,
    'Lebanon': 171,
    'Lesotho': 121,
    'Liberia': 122,
    'Libya': 123,
    'Liechtenstein': 29,
    'Lithuania': 30,
    'Luxembourg': 31,
    'Macau': 172,
    'Madagascar': 124,
    'Malawi': 125,
    'Malaysia': 173,
    'Maldives': 174,
    'Mali': 126,
    'Malta': 32,
    'Mauritania': 127,
    'Mauritius': 128,
    'Mexico': 83,
    'Moldova': 33,
    'Mongolia': 175,
    'Montenegro': 15,
    'Montserrat': 84,
    'Morocco': 129,
    'Mozambique': 130,
    'Myanmar': 176,
    'Namibia': 131,
    'Nepal': 177,
    'New Caledonia': 215,
    'New Zealand': 198,
    'Nicaragua': 86,
    'Niger': 132,
    'Nigeria': 133,
    'North Macedonia': 19,
    'Northern Ireland': 35,
    'Norway': 36,
    'Oman': 178,
    'Pakistan': 179,
    'Palestine': 180,
    'Panama': 87,
    'Papua New Guinea': 199,
    'Paraguay': 58,
    'Peru': 59,
    'Philippines': 181,
    'Poland': 37,
    'Portugal': 38,
    'Puerto Rico': 88,
    'Qatar': 182,
    'Republic of Ireland': 25,
    'Romania': 39,
    'Russia': 40,
    'Rwanda': 134,
    'Samoa': 200,
    'San Marino': 41,
    'São Tomé e Príncipe': 135,
    'Saudi Arabia': 183,
    'Scotland': 42,
    'Senegal': 136,
    'Serbia': 51,
    'Seychelles': 137,
    'Sierra Leone': 138,
    'Singapore': 184,
    'Slovakia': 43,
    'Slovenia': 44,
    'Solomon Islands': 201,
    'Somalia': 139,
    'South Africa': 140,
    'South Sudan': 218,
    'Spain': 45,
    'Sri Lanka': 185,
    'St. Kitts and Nevis': 89,
    'St. Lucia': 90,
    'St. Vincent and the Grenadines': 91,
    'Sudan': 141,
    'Suriname': 92,
    'Sweden': 46,
    'Switzerland': 47,
    'Syria': 186,
    'Tahiti': 202,
    'Tajikistan': 187,
    'Tanzania': 143,
    'Thailand': 188,
    'Timor-Leste': 212,
    'Togo': 144,
    'Tonga': 203,
    'Trinidad and Tobago': 93,
    'Tunisia': 145,
    'Turkey': 48,
    'Turkmenistan': 189,
    'Turks and Caicos Islands': 94,
    'Uganda': 146,
    'Ukraine': 49,
    'United Arab Emirates': 190,
    'United States': 95,
    'Uruguay': 60,
    'US Virgin Islands': 96,
    'Uzbekistan': 191,
    'Vanuatu': 204,
    'Venezuela': 61,
    'Vietnam': 192,
    'Wales': 50,
    'Yemen': 193,
    'Zambia': 147,
    'Zimbabwe': 148,
}

var clubIDs = {
    'RSC Anderlecht': 229,
    'Royal Antwerp FC': 230,
    'Club Brugge': 231,
    'Standard Liège': 232,
    'Sp. Charleroi': 670,
    'KRC Genk': 673,
    'KAA Gent': 674,
    'STVV': 680,
    'KVC Westerlo': 681,
    'Cercle Brugge': 1750,
    'KAS Eupen': 2013,
    'R. Union St.-G.': 2014,
    'RWD Molenbeek': 8001,
    'KV Kortrijk': 100081,
    'OH Leuven': 100087,
    'KV Mechelen': 110724,
    '1860 München': 33,
    'Arminia Bielefeld': 159,
    'Unterhaching': 172,
    'Dynamo Dresden': 503,
    'FC Erzgebirge Aue': 506,
    'Saarbrücken': 523,
    'Rot-Weiss Essen': 526,
    'Preußen Münster': 531,
    'Jahn Regensburg': 543,
    'MSV Duisburg': 1825,
    'VfB Lübeck': 1829,
    'SSV Ulm 1846': 110176,
    'SV Sandhausen': 110178,
    'Hallescher FC': 110482,
    'SC Verl': 110501,
    'SV Waldhof': 110532,
    'Viktoria Köln': 110645,
    'B. Dortmund II': 110676,
    'SC Freiburg II': 110691,
    'FC Ingolstadt 04': 111239,
    'Brøndby IF': 269,
    'Silkeborg IF': 270,
    'AGF': 271,
    'Odense BK': 272,
    'F.C. København': 819,
    'Vejle Boldklub': 822,
    'Viborg FF': 1443,
    'FC Midtjylland': 1516,
    'Randers FC': 1786,
    'FC Nordsjælland': 1788,
    'Hvidovre IF': 2002,
    'Lyngby BK': 15001,
    'Adelaide United': 111393,
    'Brisbane Roar': 111395,
    'Central Coast': 111396,
    'Melb. Victory': 111397,
    'Newcastle Jets': 111398,
    'Perth Glory': 111399,
    'Sydney FC': 111400,
    'Well. Phoenix': 111766,
    'Melbourne City': 112224,
    'WS Wanderers': 112427,
    'Western United': 114023,
    'Macarthur FC': 114604,
    'IFK Göteborg': 319,
    'Malmö FF': 320,
    'Halmstads BK': 321,
    'AIK': 433,
    'IF Elfsborg': 700,
    'IFK Norrköping': 702,
    'Hammarby IF': 708,
    'Djurgårdens IF': 710,
    'BK Häcken': 711,
    'Kalmar FF': 1439,
    'Brommapojkarna': 111705,
    'Mjällby AIF': 112072,
    'IFK Värnamo': 112126,
    'IK Sirius': 113458,
    'Varbergs BoIS': 113743,
    'Degerfors IF': 113892,
    'Arsenal': 1,
    'Aston Villa': 2,
    'Chelsea': 5,
    'Everton': 7,
    'Liverpool': 9,
    'Manchester City': 10,
    'Manchester Utd': 11,
    'Spurs': 18,
    'West Ham': 19,
    'Leicester City': 95,
    'Brighton': 1808,
    'Bristol City': 1919,
    'HERO': 114605,
    'Bayern München': 21,
    'Borussia Dortmund': 22,
    'M\'gladbach': 23,
    'Freiburg': 25,
    '1. FC Köln': 31,
    'Leverkusen': 32,
    'Stuttgart': 36,
    'SV Werder Bremen': 38,
    'VfL Bochum': 160,
    'Mainz 05': 169,
    'Wolfsburg': 175,
    'Frankfurt': 1824,
    'Union Berlin': 1831,
    'Hoffenheim': 10029,
    'FC Augsburg': 100409,
    'SV Darmstadt 98': 110502,
    'Heidenheim': 111235,
    'RB Leipzig': 112172,
    'HERO': 114605,
    'Hansa Rostock': 27,
    'Hamburger SV': 28,
    'Kaiserslautern': 29,
    'FC Schalke 04': 34,
    'Fürth': 165,
    'Hertha Berlin': 166,
    '1. FC Nürnberg': 171,
    'Hannover 96': 485,
    'VfL Osnabrück': 487,
    'Wehen Wiesbaden': 492,
    'Holstein Kiel': 576,
    'SV Elversberg': 580,
    'Karlsruher SC': 1832,
    'SC Paderborn 07': 10030,
    'FC St. Pauli': 110329,
    'Braunschweig': 110500,
    '1. FC Magdeburg': 110588,
    'Düsseldorf': 110636,
    'Juventus': 45,
    'Slavia Praha': 266,
    'Sparta Praha': 267,
    'Viktoria Plzeň': 110468,
    'Slavia Praha': 266,
    'Shanghai Shenhua': 110955,
    'Shandong Taishan': 111724,
    'Beijing Guoan': 111768,
    'Changchun Yatai': 111769,
    'Shenzhen FC': 111773,
    'Tianjin JMT FC': 111774,
    'Henan SSLM FC': 111779,
    'Zhejiang Pro': 112163,
    'Dalian Pro': 112378,
    'Shanghai Port': 112540,
    'Nantong Zhiyun FC': 112979,
    'Cangzhou FC': 112985,
    'Meizhou Hakka': 114628,
    'Rongcheng FC': 116360,
    'Wuhan 3 Towns': 116361,
    'Qingdao Hainiu': 131173,
    'Grasshopper Club': 322,
    'Servette FC': 324,
    'FC Zürich': 894,
    'FC Basel 1893': 896,
    'FC Luzern': 897,
    'FC St. Gallen': 898,
    'BSC Young Boys': 900,
    'Yverdon Sport FC': 1704,
    'FC Winterthur': 1713,
    'Lausanne-Sport': 1862,
    'FC Lugano': 10032,
    'Stade-Lausanne': 115201,
    'Bordeaux': 59,
    'En Avant Guingamp': 62,
    'Lille': 65,
    'Lyon': 66,
    'Montpellier': 70,
    'Paris SG': 73,
    'Stade de Reims': 379,
    'Havre AC': 1738,
    'Paris FC': 111817,
    'HERO': 114605,
    'FC Fleury 91': 116036,
    'Dijon FCO': 116039,
    'AS Saint Étienne': 116044,
    'Blackburn Rovers': 3,
    'Leeds United': 8,
    'Middlesbrough': 12,
    'QPR': 15,
    'Southampton': 17,
    'Birmingham City': 88,
    'Ipswich': 94,
    'Leicester City': 95,
    'Millwall': 97,
    'Sunderland': 106,
    'West Brom': 109,
    'Norwich': 1792,
    'Watford': 1795,
    'Rotherham Utd': 1797,
    'Coventry City': 1800,
    'Preston': 1801,
    'Stoke City': 1806,
    'Sheffield Wed': 1807,
    'Bristol City': 1919,
    'Plymouth Argyle': 1929,
    'Huddersfield': 1939,
    'Hull City': 1952,
    'Swansea City': 1960,
    'Cardiff City': 1961,
    'Bolton': 4,
    'Charlton Ath': 89,
    'Derby County': 91,
    'Shrewsbury': 127,
    'Exeter City': 143,
    'Lincoln City': 149,
    'Stevenage': 361,
    'Carlisle United': 1480,
    'Portsmouth': 1790,
    'Reading': 1793,
    'Wigan Athletic': 1917,
    'Blackpool': 1926,
    'Port Vale': 1928,
    'Northampton': 1930,
    'Barnsley': 1932,
    'Wycombe': 1933,
    'Cheltenham Town': 1936,
    'Peterborough': 1938,
    'Cambridge Utd': 1944,
    'Oxford United': 1951,
    'Leyton Orient': 1958,
    'Bristol Rovers': 1962,
    'Burton Albion': 15015,
    'Fleetwood Town': 112260,
    'Grimsby Town': 92,
    'Crewe Alexandra': 121,
    'Doncaster': 142,
    'Morecambe': 357,
    'Barrow': 381,
    'Forest Green': 561,
    'MK Dons': 1798,
    'Gillingham': 1802,
    'Walsall': 1803,
    'Bradford City': 1804,
    'Stockport': 1931,
    'Swindon Town': 1934,
    'Colchester': 1935,
    'Notts County': 1937,
    'Mansfield Town': 1940,
    'Wrexham AFC': 1947,
    'Tranmere Rovers': 15048,
    'Accrington': 110313,
    'Sutton United': 110799,
    'Crawley Town': 110890,
    'Harrogate Town': 112222,
    'Newport County': 112254,
    'AFC Wimbledon': 112259,
    'Salford City': 113926,
    'Rosenborg BK': 298,
    'Lillestrøm SK': 299,
    'Viking FK': 300,
    'Molde FK': 417,
    'Tromsø IL': 418,
    'Stabæk Fotball': 917,
    'FK Bodø/Glimt': 918,
    'SK Brann': 919,
    'Vålerenga Fotball': 920,
    'Strømsgodset IF': 922,
    'Odds BK': 1456,
    'FK Haugesund': 1463,
    'Aalesunds FK': 1755,
    'HamKam Fotball': 1756,
    'Sandefjord': 1757,
    'Sarpsborg 08': 112199,
    'Ajax': 245,
    'Feyenoord': 246,
    'PSV': 247,
    'Fortuna Sittard': 634,
    'FC Volendam': 645,
    'FC Utrecht': 1903,
    'RKC Waalwijk': 1905,
    'AZ': 1906,
    'FC Twente': 1908,
    'Vitesse': 1909,
    'N.E.C. Nijmegen': 1910,
    'sc Heerenveen': 1913,
    'PEC Zwolle': 1914,
    'Excelsior': 1971,
    'Go Ahead Eagles': 100632,
    'Heracles Almelo': 100634,
    'Sparta Rotterdam': 100646,
    'Almere City FC': 111380,
    'HERO': 114605,
    'HJK Helsinki': 100325,
    'Bayern München': 21,
    'Freiburg': 25,
    '1. FC Köln': 31,
    'Leverkusen': 32,
    'SV Werder Bremen': 38,
    '1. FC Nürnberg': 171,
    'Wolfsburg': 175,
    'Frankfurt': 1824,
    'MSV Duisburg': 1825,
    'Hoffenheim': 10029,
    'RB Leipzig': 112172,
    'HERO': 114605,
    'SGS Essen': 116001,
    'AEK Athens': 278,
    'PAOK FC': 393,
    'Panathinaikos': 1884,
    'East Bengal': 111629,
    'NorthEast United': 113040,
    'ATK Mohun Bagan': 113146,
    'Odisha FC': 113257,
    'Chennaiyin FC': 113297,
    'FC Goa': 113298,
    'Kerala Blasters': 113299,
    'Mumbai City FC': 113300,
    'Hyderabad FC': 113301,
    'Bengaluru FC': 113302,
    'Jamshedpur FC': 114168,
    'Punjab FC': 115202,
    'EA FC ICONS': 112658,
    'Daejeon Citizen': 980,
    'FC Seoul': 982,
    'Suwon Samsung': 983,
    'Ulsan Hyundai': 1473,
    'Pohang Steelers': 1474,
    'Jeonbuk Hyundai': 1477,
    'Jeju United': 1478,
    'Daegu FC': 2056,
    'Incheon United': 110765,
    'Gangwon FC': 112115,
    'GwangJu FC': 112258,
    'Suwon FC': 112558,
    'Atlético de Madrid': 240,
    'Barcelona': 241,
    'Real Madrid': 243,
    'Athletic Club': 448,
    'Real Betis': 449,
    'Celta Vigo': 450,
    'Mallorca': 453,
    'Real Sociedad': 457,
    'Valencia': 461,
    'D. Alavés': 463,
    'UD Las Palmas': 472,
    'Osasuna': 479,
    'Rayo Vallecano': 480,
    'Sevilla': 481,
    'Villarreal': 483,
    'Getafe': 1860,
    'Almería': 1861,
    'Cádiz': 1968,
    'Girona': 110062,
    'Granada': 110832,
    'HERO': 114605,
    'Real Zaragoza': 244,
    'CD Tenerife': 260,
    'Espanyol': 452,
    'R. Racing Club': 456,
    'R. Sporting': 459,
    'R. Valladolid CF': 462,
    'SD Eibar': 467,
    'Elche CF': 468,
    'Levante UD': 1853,
    'Albacete BP': 1854,
    'Burgos CF': 10846,
    'AD Alcorcón': 100831,
    'FC Cartagena': 100851,
    'CD Leganés': 100888,
    'CD Mirandés': 110069,
    'Racing de Ferrol': 110242,
    'R. Oviedo': 110827,
    'SD Huesca': 110839,
    'Villarreal CF B': 110902,
    'SD Amorebieta': 113356,
    'FC Andorra': 114554,
    'CD Eldense': 131110,
    'Palmeiras': 383,
    'Fluminense': 567,
    'San Lorenzo': 1013,
    'Atlético Mineiro': 1035,
    'Athletico-PR': 1039,
    'Corinthians': 1041,
    'Flamengo': 1043,
    'Internacional': 1048,
    'River Plate': 1876,
    'Boca Juniors': 1877,
    'Estudiantes': 101083,
    'Racing Club': 101085,
    'Atl. Nacional': 101100,
    'Junior': 101101,
    'Indep. Medellín': 101103,
    'Millonarios': 101105,
    'Olimpia': 101108,
    'Rosario Central': 110580,
    'Bolívar': 110968,
    'The Strongest': 110969,
    'Cobresal': 110978,
    'Colo-Colo': 110980,
    'Barcelona SC': 110981,
    'LDU Quito': 110986,
    'Aucas': 110987,
    'Caracas F.C.': 110989,
    'Dep. Táchira': 110990,
    'Monagas SC': 110993,
    'Libertad': 111008,
    'Alianza Lima': 111010,
    'Sporting Cristal': 111013,
    'Argentinos Jrs.': 111019,
    'Nacional': 111325,
    'Liverpool': 111326,
    'Palestino': 111328,
    'FBC Melgar': 111334,
    'Ñublense': 112585,
    'Talleres': 112670,
    'Cerro Porteño': 112716,
    'Dep. Pereira': 112744,
    'Independiente DV': 112908,
    'Metropolitanos': 112914,
    'Apoel FC': 100135,
    'Atlético de Madrid': 240,
    'Barcelona': 241,
    'Real Madrid': 243,
    'Athletic Club': 448,
    'Real Betis': 449,
    'Real Sociedad': 457,
    'Valencia': 461,
    'SD Eibar': 467,
    'Sevilla': 481,
    'Villarreal': 483,
    'Levante UD': 1853,
    'Granada CF': 110832,
    'UDG Tenerife': 116332,
    'Madrid CFF': 116334,
    'Sporting Huelva': 116338,
    'Levante LP': 131125,
    'Dinamo Zagreb': 211,
    'Hajduk Split': 263,
    'Benfica': 234,
    'Porto': 236,
    'Sporting': 237,
    'Farense': 489,
    'GD Chaves': 518,
    'Estrela Amadora': 718,
    'Rio Ave FC': 744,
    'Vitória SC': 1887,
    'Gil Vicente': 1888,
    'Braga': 1896,
    'Boavista FC': 1898,
    'Moreirense FC': 1900,
    'Estoril Praia': 10020,
    'Portimonense SC': 10031,
    'FC Vizela': 111539,
    'Arouca': 112513,
    'FC Famalicão': 112809,
    'Casa Pia AC': 114510,
    'HERO': 114605,
    'Benfica': 234,
    'Lens': 64,
    'Lille': 65,
    'Lyon': 66,
    'FC Metz': 68,
    'Monaco': 69,
    'Montpellier': 70,
    'FC Nantes': 71,
    'Nice': 72,
    'Paris SG': 73,
    'Stade Rennais': 74,
    'Strasbourg': 76,
    'FC Lorient': 217,
    'Marseille': 219,
    'Stade Brestois 29': 378,
    'Stade de Reims': 379,
    'Havre AC': 1738,
    'Toulouse FC': 1809,
    'Clermont Foot 63': 1815,
    'HERO': 114605,
    'Lazio': 115841,
    'AJ Auxerre': 57,
    'SC Bastia': 58,
    'Bordeaux': 59,
    'En Avant Guingamp': 62,
    'SM Caen': 210,
    'ESTAC Troyes': 294,
    'AC Ajaccio': 614,
    'Angers SCO': 1530,
    'Grenoble Foot 38': 1805,
    'Stade Lavallois': 1814,
    'Amiens SC': 1816,
    'AS Saint-Étienne': 1819,
    'Pau FC': 110321,
    'Valenciennes FC': 110456,
    'USL Dunkerque': 111276,
    'Rodez AF': 111659,
    'Paris FC': 111817,
    'Quevilly Rouen': 112552,
    'US Concarneau': 113742,
    'AC Beauruelle': 131447,
    'Gimnasia': 101084,
    'Vélez Sarsfield': 101088,
    'Independiente': 110093,
    'Arsenal': 110394,
    'Lanús': 110395,
    'Banfield': 110404,
    'Colón': 110406,
    'Rosario Central': 110580,
    'Instituto': 110953,
    'Argentinos Jrs.': 111019,
    'Belgrano': 111022,
    'Godoy Cruz': 111706,
    'Atlético Tucumán': 111708,
    'Huracán': 111711,
    'Tigre': 111715,
    'Unión': 111716,
    'Talleres': 112670,
    'Platense': 112689,
    'Sarmiento': 112713,
    'Central Córdoba': 112965,
    'Barracas Central': 113044,
    'HERO': 114605,
    'Ferencvárosi TC': 1874,
    'Columbus Crew': 687,
    'D.C. United': 688,
    'Red Bulls': 689,
    'New England': 691,
    'Chicago Fire FC': 693,
    'Colorado Rapids': 694,
    'FC Dallas': 695,
    'Sporting KC': 696,
    'LA Galaxy': 697,
    'Houston Dynamo': 698,
    'Whitecaps FC': 101112,
    'Real Salt Lake': 111065,
    'Minnesota United': 111138,
    'CF Montréal': 111139,
    'Portland Timbers-Thorns': 111140,
    'Sounders FC': 111144,
    'Toronto FC': 111651,
    'SJ Earthquakes': 111928,
    'Philadelphia': 112134,
    'Orlando City': 112606,
    'New York City FC': 112828,
    'Atlanta United': 112885,
    'Inter Miami CF': 112893,
    'LAFC': 112996,
    'St. Louis CITY SC': 113018,
    'FC Cincinnati': 113149,
    'Austin FC': 114161,
    'Nashville SC': 114162,
    'HERO': 114605,
    'Charlotte FC': 114640,
    'Ajax': 245,
    'Portland Timbers-Thorns': 111140,
    'OL Reign': 116300,
    'NC Courage': 116303,
    'Washington Spirit': 116304,
    'Chicago Red Stars': 116305,
    'Houston Dash': 116306,
    'Orlando Pride': 116307,
    'Rac. Louisville': 116308,
    'KC Current': 116309,
    'NJ/NY Gotham': 116310,
    'Angel City FC': 116311,
    'San Diego Wave': 116312,
    'RB Salzburg': 191,
    'SK Sturm Graz': 209,
    'LASK': 252,
    'SK Rapid Wien': 254,
    'FK Austria Wien': 256,
    'SC Austria': 781,
    'Austria Klagenfurt': 1787,
    'TSV Hartberg': 2017,
    'SCR Altach': 15009,
    'WSG Tirol': 15040,
    'Blau-Weiss Linz': 110720,
    'Wolfsberger AC': 111822,
    'Widzew Łódź': 301,
    'Górnik Zabrze': 420,
    'Lech Poznań': 873,
    'Ruch Chorzów': 874,
    'Legia Warszawa': 1871,
    'Jagiellonia': 110745,
    'Pogoń Szczecin': 110746,
    'Cracovia': 110747,
    'Zagłębie Lubin': 110749,
    'Korona Kielce': 111083,
    'ŁKS Łódź': 111085,
    'Piast Gliwice': 111086,
    'Radomiak Radom': 111088,
    'Śląsk Wrocław': 111092,
    'Warta Poznań': 112511,
    'Stal Mielec': 114004,
    'Raków': 114326,
    'Puszcza': 114393,
    'Arsenal': 1,
    'Aston Villa': 2,
    'Chelsea': 5,
    'Everton': 7,
    'Liverpool': 9,
    'Manchester City': 10,
    'Manchester Utd': 11,
    'Newcastle Utd': 13,
    'Nott\'m Forest': 14,
    'Spurs': 18,
    'West Ham': 19,
    'Wolves': 110,
    'Fulham': 144,
    'Sheffield Utd': 1794,
    'Burnley': 1796,
    'Crystal Palace': 1799,
    'Brighton': 1808,
    'Luton Town': 1923,
    'Brentford': 1925,
    'Bournemouth': 1943,
    'Çaykur Rizespor': 101037,
    'HERO': 114605,
    'Al Hilal': 605,
    'Al Ittihad': 607,
    'Al Shabab': 111674,
    'Ettifaq FC': 112096,
    'Al Nassr': 112139,
    'Al Ahli': 112387,
    'Al Fateh': 112390,
    'Al Raed': 112392,
    'Al Taawoun': 112393,
    'Al Wehda': 112408,
    'Al Tai': 112572,
    'Al Khaleej': 112883,
    'Al Riyadh': 113037,
    'Al Fayha': 113057,
    'Abha Club': 113058,
    'Al Okhdood': 113060,
    'Damac FC': 113217,
    'Al Hazem': 113222,
    'HERO': 114605,
    'FC Zürich': 894,
    'Glasgow City FC': 131363,
    'Inter': 44,
    'Juventus': 45,
    'Milan': 47,
    'Torino': 54,
    'Udinese': 55,
    'Bologna': 189,
    'Hellas Verona': 206,
    'Lecce': 347,
    'Empoli': 1746,
    'Cagliari': 1842,
    'Salernitana': 110373,
    'Fiorentina': 110374,
    'Genoa': 110556,
    'Frosinone': 111657,
    'Monza': 111811,
    'Sassuolo': 111974,
    'HERO': 114605,
    'Roma': 114912,
    'Lazio': 115841,
    'Atalanta': 115845,
    'Napoli': 116365,
    'Parma': 50,
    'Venezia': 205,
    'Ternana': 570,
    'Modena': 1744,
    'Como': 1745,
    'Sampdoria': 1837,
    'Palermo': 1843,
    'Borgocalcio': 1846,
    'Ascoli': 1847,
    'Bari': 1848,
    'Pisa': 110738,
    'Reggiana': 110740,
    'Catanzaro': 110908,
    'Cremonese': 111434,
    'Cittadella': 111993,
    'Cosenza': 112168,
    'Südtirol': 112494,
    'Feralpisalò': 112499,
    'Brisigonza': 113973,
    'Spezia': 113974,
    'Bohemian FC': 305,
    'Shamrock Rovers': 306,
    'Cork City': 422,
    'St. Pats': 423,
    'Derry City': 445,
    'Sligo Rovers': 563,
    'Shelbourne': 834,
    'Dundalk': 837,
    'Drogheda United': 1572,
    'UCD AFC': 111132,
    'Botafogo': 517,
    'São Paulo': 598,
    'San Lorenzo': 1013,
    'Santos': 1053,
    'Estudiantes': 101083,
    'Gimnasia': 101084,
    'Audax Italiano': 101097,
    'Junior': 101101,
    'Santa Fe': 101104,
    'Millonarios': 101105,
    'Defensor': 101109,
    'Peñarol': 101110,
    'Newell\'s': 110396,
    'Blooming': 110967,
    'O. Petrolero': 110970,
    'Uni. Católica': 110975,
    'Cobresal': 110978,
    'Dep. Cuenca': 110982,
    'CS Emelec': 110984,
    'LDU Quito': 110986,
    'Caracas F.C.': 110989,
    'Dep. Táchira': 110990,
    'Danubio': 110998,
    'Tacuary': 111004,
    'Cienciano': 111011,
    'Universitario': 111014,
    'Goiás': 111042,
    'Fortaleza': 111052,
    'Palestino': 111328,
    'Guaraní': 111329,
    'Est. de Mérida': 111332,
    'Defensa': 111710,
    'Huracán': 111711,
    'Tigre': 111715,
    'Deportes Tolima': 111722,
    'América Mineiro': 112001,
    'River Plate': 112184,
    'RB Bragantino': 112472,
    'Águilas Doradas': 112578,
    'Club Magallanes': 112707,
    'UCV': 113029,
    'Delfín S.C.': 114580,
    'Binacional': 114582,
    'Guabirá': 114600,
    'Puerto Cabello': 114611,
    'Palmaflor': 115358,
    'Gral. Caballero': 116007,
    'S. Ameliano': 116295,
    'Univ. Craiova': 308,
    'FC Rapid 1923': 310,
    'FC Dinamo 1948': 100757,
    'FCSB': 100761,
    'SC Oțelul Galați': 110072,
    'Farul Constanța': 110075,
    'FC Petrolul': 110078,
    'UTA Arad': 110750,
    'FC Univ. Cluj': 110751,
    'FC Botoșani': 110752,
    'Politehnica Iași': 110815,
    'FC Voluntari': 113182,
    'Sepsi OSK': 113378,
    'FC Hermannstadt': 114147,
    'CFR 1907 Cluj': 114385,
    'FCU 1948': 115716,
    'FC Rosengård': 131362,
    'Galatasaray': 325,
    'Fenerbahçe': 326,
    'Beşiktaş': 327,
    'Trabzonspor': 436,
    'Antalyaspor': 741,
    'İstanbulspor': 746,
    'Samsunspor': 748,
    'MKE Ankaragücü': 101007,
    'Başakşehir': 101014,
    'Adana Demirspor': 101016,
    'Kayserispor': 101020,
    'Hatayspor': 101028,
    'Konyaspor': 101033,
    'Çaykur Rizespor': 101037,
    'Sivasspor': 101041,
    'Gaziantep': 110776,
    'Karagümrük SK': 111117,
    'Kasımpaşa': 111339,
    'Alanyaspor': 113142,
    'HERO': 114605,
    'Pendikspor': 131389,
    'Dynamo Kyiv': 101047,
    'Shakhtar Donetsk': 101059,
    'Al Ain FC': 111701,
}

window.onload = function() {
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        value = value.replaceAll('%0D%0A', ',');
        if(value.includes('+')) value = value.replaceAll('+', ' ');
        if(value.includes(',')) value = value.split(',');
        vars[key] = value;
    });

    if (!vars.teams) {
        vars.teams = [];
    }

    if ('plTeams23' in vars) {
        vars.teams = vars.teams.concat(["Manchester City", "Arsenal", "Liverpool", "Aston Villa", "Spurs",
                                        "Chelsea", "Newcastle Utd", "Manchester Utd", "West Ham", "Crystal Palace",
                                        "Brighton", "Bournemouth", "Fulham", "Wolves", "Everton",
                                        "Brentford", "Nott'm Forest", "Luton Town", "Burnley", "Sheffield Utd"]);
    }

    if ('plTeams24' in vars) {
        vars.teams = vars.teams.concat(["Manchester City", "Arsenal", "Liverpool", "Aston Villa", "Spurs",
                                        "Chelsea", "Newcastle Utd", "Manchester Utd", "West Ham", "Crystal Palace",
                                        "Brighton", "Bournemouth", "Fulham", "Wolves", "Everton",
                                        "Brentford", "Nott'm Forest", "Leicester City", "Ipswich", "Southampton"]);
    }

    if ('euroTeams' in vars) {
        vars.teams = vars.teams.concat(["Germany", "Scotland", "Hungary", "Switzerland",
                                        "Spain", "Croatia", "Italy", "Albania",
                                        "Slovenia", "Denmark", "Serbia", "England",
                                        "Poland", "Netherlands", "Austria", "France",
                                        "Belgium", "Slovakia", "Romania", "Ukraine",
                                        "Turkey", "Georgia", "Portugal", "Czech Republic"]);
    }

    if ('worldCupTeams' in vars) {
        vars.teams = vars.teams.concat(["Netherlands", "Senegal", "Ecuador", "Qatar",
                                        "England", "United States", "Iran", "Wales",
                                        "Argentina", "Poland", "Mexico", "Saudi Arabia",
                                        "France", "Australia", "Tunisia", "Denmark",
                                        "Japan", "Spain", "Germany", "Costa Rica",
                                        "Morocco", "Croatia", "Belgium", "Canada",
                                        "Brazil", "Switzerland", "Cameroon", "Serbia",
                                        "Portugal", "Korea Republic", "Uruguay", "Ghana"]);
    }

    if ('5starTeams' in vars) {
        vars.teams = vars.teams.concat(["Manchester City", "Real Madrid", "Paris SG", "Barcelona", "Bayern München",
                                        "Atlético de Madrid", "Liverpool"]);
    }

    if ('4.5starTeams' in vars) {
        vars.teams = vars.teams.concat(["Arsenal", "Inter", "Manchester Utd", "Spurs", "Borussia Dortmund",
                                        "Napoli", "Juventus", "Newcastle Utd", "Milan", "Chelsea",
                                        "RB Leipzig", "Lazio", "Roma", "Sevilla", "Leverkusen",
                                        "Aston Villa", "Real Betis", "Real Sociedad", "Villarreal", "Athletic Club"]);
    }

    if ('4starTeams' in vars) {
        var fourStarTeams = ["Galatasaray", "Atalanta", "Porto", "Benfica", "Fiorentina",
                            "Marseille", "West Ham", "Everton", "Frankfurt", "Wolves",
                            "Sporting", "Braga", "Stade Rennais", "Osasuna", "Fulham",
                            "Brighton", "Brentford", "Al Ittihad", "Monaco", "Palmeiras",
                            "Ajax", "Hoffenheim", "Fenerbahçe", "Celta Vigo", "Rayo Vallecano",
                            "Nice", "Lyon", "Flamengo", "Wolfsburg", "Freiburg",
                            "Getafe", "Union Berlin", "Nott'm Forest", "Lille", "PSV",
                            "River Plate", "Lens", "Girona", "Crystal Palace", "M'gladbach",
                            "Leicester City", "Al Nassr", "Bologna", "Sassuolo", "Atlético Mineiro",
                            "Mallorca", "Monza", "Mainz 05", "AEK Athens", "Torino",
                            "Boca Juniors", "Espanyol", "Almería", "Cádiz", "Valencia",
                            "Feyenoord", "Al Hilal"];

        if ('4starTeamsNo' in vars) {
            for (let i = 0; i < vars['4starTeamsNo']; i++) {
                var index = Math.floor(Math.random()*fourStarTeams.length);
                vars.teams.push(fourStarTeams[index]);
                fourStarTeams.splice(index, 1);
            }
        } else {
            vars.teams = vars.teams.concat(fourStarTeams);
        }
    }

    vars.teams = vars.teams.filter((item, pos) => vars.teams.indexOf(item) === pos);

    if ('4atb' in vars) {
        var formations = ["451 Attack", "4141", "4231 Narrow", "4231 Wide", "451 Flat",
                        "4411 Midfield", "4411 Attack", "442 Holding", "442 Flat",
                        "41212 Narrow", "41212 Wide", "4222", "4312", "4132",
                        "433 False 9", "433 Attack", "433 Defend", "433 Holding",
                        "433 Flat", "4321", "424"]
    } else {
        var formations = ["451 Attack", "4141", "4231 Narrow", "4231 Wide", "451 Flat",
                        "4411 Midfield", "4411 Attack", "442 Holding", "442 Flat",
                        "41212 Narrow", "41212 Wide", "4222", "4312", "4132",
                        "433 False 9", "433 Attack", "433 Defend", "433 Holding",
                        "433 Flat", "4321", "424", "541 Diamond", "541 Flat", "5212",
                        "532", "523", "3142", "3412", "352", "3511", "3421", "343 Flat",
                        "343 Diamond"]
    }

    shuffle(vars.players);
    const playerRows = document.getElementsByClassName('playerRow');
    const formationRow = document.getElementById('formationRow');
    const positionRow = document.getElementById('positionRow');
    vars.players.forEach(player => {
        playerRows[1].insertCell().outerHTML = '<th scope="col">' + player + '</th>';
        playerRows[0].insertCell().outerHTML = '<th scope="col">' + player + '</th>';

        var formation = formations[Math.floor(Math.random()*formations.length)];
        formationsUsed.push(formation);
        var playerFormationPositions = formationPositions[formation].slice();
        formationPositionsUsed.push(playerFormationPositions);
        formationRow.insertCell().outerHTML = '<th>' + formation + '</th>';

        if ('positionList' in vars) {
            var posCell = positionRow.insertCell();
            playerFormationPositions.forEach(pos => {
                var id = vars.players.indexOf(player) + '-' + pos;
                posCell.innerHTML += '<div class="mb-1 form-check"><input class="form-check-input" type="checkbox" value="" id="' + id + '" name="' + id + '"><label class="form-check-label" for="' + id + '">' + pos + '</label></div>';
            })
        }

        draftPicks.push([]);
    });

    for (let i = 0; i < 11; i++) {
        if (i % 2 == 0) {
            draftOrder = draftOrder.concat(vars.players);
        } else {
            draftOrder = draftOrder.concat(vars.players.toReversed());
        }
    }
}

function shuffle(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
  
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}

function draft() {
    if (draftOrder.length == 0) {
        if ('swaps' in vars) {
            showSwaps();
            document.getElementById('draftButton').disabled = true;
        } else {
            var params = new URLSearchParams(window.location.search);
            params.delete('teams');
            window.location.href = 'fixtures.html?' + params.toString();    
        }
        return;
    }
    if (draftOrder.length % vars.players.length == 0) {
        var row = document.querySelector('#draftTable tbody').insertRow(currentRound);
        for (let i = 0; i < vars.players.length; i++) {
            row.insertCell();
        }
    }

    var player = draftOrder.shift();
    var team = pickTeam(player);
    draftPicks[vars.players.indexOf(player)].push(team);
    
    var positionList = '';    
    if ('positionLock' in vars) {
        var index = Math.floor(Math.random()*formationPositionsUsed[vars.players.indexOf(player)].length);
        positionList = formationPositionsUsed[vars.players.indexOf(player)][index];
        formationPositionsUsed[vars.players.indexOf(player)].splice(index, 1);
    } else if ('positionList' in vars) {
        var checkboxList = document.querySelectorAll('input[id^="' + vars.players.indexOf(player) + '-"]:not(:checked)');
        positionList = [];
        checkboxList.forEach(checkbox => {
            var pos = checkbox.id.split('-')[1];
            positionList.push(pos);
        })
        positionList.forEach(pos => {
            var posIndex = positionList.indexOf(pos);
            if (pos == 'LCB') positionList[posIndex] = 'CB';
            else if (pos == 'RCB') positionList[posIndex] = 'CB';
            else if (pos == 'LDM') positionList[posIndex] = 'CDM';
            else if (pos == 'RDM') positionList[posIndex] = 'CDM';
            else if (pos == 'LCM') positionList[posIndex] = 'CM';
            else if (pos == 'RCM') positionList[posIndex] = 'CM';
            else if (pos == 'LAM') positionList[posIndex] = 'CAM';
            else if (pos == 'RAM') positionList[posIndex] = 'CAM';
            else if (pos == 'LF') positionList[posIndex] = 'CF';
            else if (pos == 'RF') positionList[posIndex] = 'CF';
            else if (pos == 'LS') positionList[posIndex] = 'ST';
            else if (pos == 'RS') positionList[posIndex] = 'ST';
        })
        positionList = positionList.join(',');
    }

    var cell = document.querySelectorAll('#draftTable tbody tr')[currentRound].children[vars.players.indexOf(player)];
    var display = ('positionLock' in vars) ? (team + ' ' + positionList) : team;
    if ('positionLock' in vars) {
        if (positionList == 'LCB') positionList = 'CB';
        else if (positionList == 'RCB') positionList = 'CB';
        else if (positionList == 'LDM') positionList = 'CDM';
        else if (positionList == 'RDM') positionList = 'CDM';
        else if (positionList == 'LCM') positionList = 'CM';
        else if (positionList == 'RCM') positionList = 'CM';
        else if (positionList == 'LAM') positionList = 'CAM';
        else if (positionList == 'RAM') positionList = 'CAM';
        else if (positionList == 'LF') positionList = 'CF';
        else if (positionList == 'RF') positionList = 'CF';
        else if (positionList == 'LS') positionList = 'ST';
        else if (positionList == 'RS') positionList = 'ST';
    }
    if (vars.teamSwitch == 'nations' && nationIDs[team]) {
        if (positionList) {
            cell.innerHTML = '<a target="_blank" href="https://www.futbin.com/24/players?page=1&version=gold&pos_type=all&gender=men&nation=' + nationIDs[team] + '&position=' + positionList + '" class="link-dark link-underline-opacity-0 link-underline-opacity-100-hover">' + display + '</a>';
        } else {
            cell.innerHTML = '<a target="_blank" href="https://www.futbin.com/24/players?page=1&version=gold&pos_type=all&gender=men&nation=' + nationIDs[team] + '" class="link-dark link-underline-opacity-0 link-underline-opacity-100-hover">' + display + '</a>';
        }
    } else if (vars.teamSwitch == 'clubs' && clubIDs[team]) {
        if (positionList) {
            cell.innerHTML = '<a target="_blank" href="https://www.futbin.com/24/players?page=1&version=gold&pos_type=all&gender=men&club=' + clubIDs[team] + '&position=' + positionList + '" class="link-dark link-underline-opacity-0 link-underline-opacity-100-hover">' + display + '</a>';
        } else {
            cell.innerHTML = '<a target="_blank" href="https://www.futbin.com/24/players?page=1&version=gold&pos_type=all&gender=men&club=' + clubIDs[team] + '" class="link-dark link-underline-opacity-0 link-underline-opacity-100-hover">' + display + '</a>';
        }
    } else {
        cell.innerHTML = '<p class="link-dark">' + display + '</p>';
    }
    
    if (draftOrder.length % vars.players.length == 0) currentRound++;
}

function pickTeam(player) {
    var draftList = draftPicks[vars.players.indexOf(player)];
    var index = Math.floor(Math.random()*vars.teams.length);
    while (draftList.includes(vars.teams[index])) {
        index = Math.floor(Math.random()*vars.teams.length);
    }
    return vars.teams[index];
}

function showSwaps() {
    document.getElementById("swapsHeader").style.display = 'block';
    document.getElementById("swapsTable").style.display = 'table';
    for (let i = (('swapsGKs' in vars) ? 1 : 0); i < 11; i++) {
        swapPicks.push(i);
        swapPicks.push(i);
    }
    swaps();
}

function swaps() {
    if (swapPicks.length == 0) return;

    document.getElementById("swapButtons").style.display = 'inline-flex';

    var row = document.querySelector('#swapsTable tbody').insertRow();
    var cell = row.insertCell();
    for (let i = 0; i < vars.players.length; i++) {
        row.insertCell();
    }

    var posIndex = swapPicks[Math.floor(Math.random()*swapPicks.length)];

    if (posIndex == 0) {
        var statIndex = Math.floor(Math.random()*gkStats.length);
        cell.innerText = gkStats[statIndex];
        gkStats.splice(statIndex, 1);
    } else {
        var statIndex = Math.floor(Math.random()*stats.length);
        cell.innerText = stats[statIndex];
        stats.splice(statIndex, 1);
    }
    
    vars.players.forEach(player => {
        var formation = formationsUsed[vars.players.indexOf(player)];
        var positions = formationPositions[formation];
        document.querySelectorAll('#swapsTable tbody tr')[swapRound].children[vars.players.indexOf(player)+1].innerHTML = positions[posIndex];
    });

    swapPicks.splice(swapPicks.indexOf(posIndex), 1);
    swapRound++;
}

function swapYes() {
    swapCount++;
    if (swapCount < vars.swapsNo) {
        swaps();
    } else {
        var params = new URLSearchParams(window.location.search);
        params.delete('teams');
        window.location.href = 'fixtures.html?' + params.toString();
    }
}