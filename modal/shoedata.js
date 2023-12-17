const shoedata = [
  {
    SKU: "DD1391-104",
    Shoe: "Nike Dunk Low Championship Court Purple ",
  },
  {
    SKU: "DN4321-100",
    Shoe: "Jordan 1 Mid Diamond Shorts (GS)",
  },
  {
    SKU: "CT8013-106",
    Shoe: "Jordan 12 Twist",
  },
  {
    SKU: "554724-130",
    Shoe: "Jordan 1 Mid Triple White 2.0 (2020 release)",
  },
  {
    SKU: "555088-041",
    Shoe: "Jordan 1 Retro High Royal Toe",
  },
  {
    SKU: "408452-111",
    Shoe: "Jordan 4 Retro Military Black (GS)",
  },
  {
    SKU: "408452-061",
    Shoe: "Jordan 4 Retro Infrared (GS)",
  },
  {
    SKU: "GZ3079",
    Shoe: "Adidas Yeezy 700 Cyan",
  },
  {
    SKU: "555088-035",
    Shoe: "Jordan 1 Retro High Shadow 2.0",
  },
  {
    SKU: "DC0350-100",
    Shoe: "Jordan 1 Mid Dia de los Muertos",
  },
  {
    SKU: "GW9524",
    Shoe: "Adidas Yeezy 700 Metallic",
  },
  {
    SKU: "554724-132",
    Shoe: "Jordan 1 Mid Tropical Twist",
  },
  {
    SKU: "DV2122-400",
    Shoe: "Nike Dunk Low Jackie Robinson",
  },
  {
    SKU: "DO9329-001",
    Shoe: "Nike Dunk Low Undftd Black ",
  },
  {
    SKU: "DJ9649-500",
    Shoe: "Nike Dunk Low Union Court Purple",
  },
  {
    SKU: "AR4237-902",
    Shoe: "Nike Fear of God 1 String the Question",
  },
  {
    SKU: "CQ3835-003",
    Shoe: "Nike Jordan 1 High FlyEase Smoke Grey ",
  },
  {
    SKU: "555088-402",
    Shoe: "Nike Jordan 1 Hyper Royal Blue ",
  },
  {
    SKU: "CK3022-600",
    Shoe: "Nike Jordan 1 Low Arctic Punch",
  },
  {
    SKU: "553558-040",
    Shoe: "Nike Jordan 1 Low Black White Grey",
  },
  {
    SKU: "CZ0790-061",
    Shoe: "NIke Jordan 1 Low Bleached Coral ",
  },
  {
    SKU: "705329-001",
    Shoe: "Nike Jordan 1 Low Bred (2015)",
  },
  {
    SKU: "553558-612",
    Shoe: "Nike Jordan 1 Low Bred Toe",
  },
  {
    SKU: "553558-034",
    Shoe: "Nike Jordan 1 Low Crimson Tint",
  },
  {
    SKU: "553558-371",
    Shoe: "Nike Jordan 1 Low Green Toe ",
  },
  {
    SKU: "CK3022-004",
    Shoe: "Nike Jordan 1 Low Laser Blue ",
  },
  {
    SKU: "DC6991-200",
    Shoe: "Nike Jordan 1 Low Mocha",
  },
  {
    SKU: "553560-606",
    Shoe: "Nike Jordan 1 Low Reverse Bred GS",
  },
  {
    SKU: "553560-030",
    Shoe: "Nike Jordan 1 Low Smoke Grey GS",
  },
  {
    SKU: "553558-144",
    Shoe: "Nike Jordan 1 Low UNC",
  },
  {
    SKU: "553558-118",
    Shoe: "Nike Jordan 1 Low University Red White ",
  },
  {
    SKU: "852542-800",
    Shoe: "Nike Jordan 1 Mid Crimson Tint",
  },
  {
    SKU: "DC7294-200",
    Shoe: "Nike Jordan 1 Mid Dark Chocolate",
  },
  {
    SKU: "554724-067",
    Shoe: "Nike Jordan 1 Mid Green Toe",
  },
  {
    SKU: "554724-092",
    Shoe: "Nike Jordan 1 Mid Light Smoke Grey ",
  },
  {
    SKU: "CW5853-100",
    Shoe: "Nike Jordan 1 Mid Luka Doncic",
  },
  {
    SKU: "DD1666-100",
    Shoe: "Nike Jordan 1 Mid Paint Drip GS",
  },
  {
    SKU: "DH0210-100",
    Shoe: "Nike Jordan 1 Mid Peach Mocha (W)",
  },
  {
    SKU: "554725-170",
    Shoe: "Nike Jordan 1 Mid University Gold GS",
  },
  {
    SKU: "DC1420-700",
    Shoe: "Nike Jordan 1 Mid White Gold Black GS",
  },
  {
    SKU: "575441-063",
    Shoe: "Nike Jordan 1 Patent Bred GS",
  },
  {
    SKU: "555088-134",
    Shoe: "Nike Jordan 1 University Blue",
  },
  {
    SKU: "130690-014",
    Shoe: "Nike Jordan 12 Royal Black",
  },
  {
    SKU: "DH3434-110",
    Shoe: "Nike Jordan 3 A Ma Maniere (W)",
  },
  {
    SKU: "308497-406",
    Shoe: "Nike Jordan 4 Cactus Jack ",
  },
  {
    SKU: "DB0732-200",
    Shoe: "Nike Jordan 4 Taupe Haze",
  },
  {
    SKU: "CT8529-141",
    Shoe: "Nike Jordan 6 Midnight Navy",
  },
  {
    SKU: "CT8529-162",
    Shoe: "Nike Jordan 6 Red Oreo ",
  },
  {
    SKU: "CI4072-001",
    Shoe: "Nike Jordan 6 Reflections of a Champion ",
  },
  {
    SKU: "CW2190-300",
    Shoe: "Nike Kobe 6 Grinch ",
  },
  {
    SKU: "CW2190-002",
    Shoe: "Nike Kobe 6 Mambacita ",
  },
  {
    SKU: "DA6672-700",
    Shoe: "Nike Tom Sachs General Purpose Shoe Sulfur",
  },
  {
    SKU: "EF2829",
    Shoe: "Yeezy 700 Static ",
  },
  {
    SKU: "GZ5554",
    Shoe: "Yeezy Slide Pure",
  },
  {
    SKU: "GW1934",
    Shoe: "Yeezy Slide Pure (Restock)",
  },
  {
    SKU: "CT8529-410",
    Shoe: "Nike Jordan 6 UNC White",
  },
  {
    SKU: "414571-040",
    Shoe: "Nike Jordan 13 Hyper Royal Black",
  },
  {
    SKU: "408452-400",
    Shoe: "Nike Jordan 4 UNC GS",
  },
  {
    SKU: "CT8527-400",
    Shoe: "Nike Jordan 4 UNC",
  },
  {
    SKU: "555088-603",
    Shoe: "Nike Jordan 1 Light Fusion",
  },
  {
    SKU: "DJ0675-200",
    Shoe: "Nike Jordan 4 Shimmer (W)",
  },
  {
    SKU: "555088-001",
    Shoe: "Nike Jordan 1 Banned 2016 ",
  },
  {
    SKU: "AF5836",
    Shoe: "Adidas Ultra Boost Burgundy 1.0",
  },
  {
    SKU: "1A8WB9",
    Shoe: "Louis Vuitton Trainer White Signature",
  },
  {
    SKU: "BB550BZ1",
    Shoe: "New Balance 550 Burgundy ",
  },
  {
    SKU: "BB550HA1",
    Shoe: "New Balance 550 White Black",
  },
  {
    SKU: "BB550WT1",
    Shoe: "New Balance 550 White Green",
  },
  {
    SKU: "BB550PB/BB550PB1",
    Shoe: "New Balance 550 White Grey ",
  },
  {
    SKU: "AT8087-003",
    Shoe: "Nike Air Fear of God Raid (FNF)",
  },
  {
    SKU: "DH4406-100",
    Shoe: "Nike Air Force 1 Blue Paisely (W)",
  },
  {
    SKU: "CZ3986-001",
    Shoe: "Nike Air Force 1 CLOT Fragment Black",
  },
  {
    SKU: "CW7577-100",
    Shoe: "NIke Air Force 1 Euro Tour",
  },
  {
    SKU: "AQ3692-001",
    Shoe: "Nike Air Force 1 G Dragon 1.0 ",
  },
  {
    SKU: "DD3223-100",
    Shoe: "Nike Air Force 1 G Dragon 2.0",
  },
  {
    SKU: "AO1635-100",
    Shoe: "Nike Air Force 1 Ivory Snake",
  },
  {
    SKU: "315122-111/CW2288-111",
    Shoe: "Nike Air Force 1 Low White",
  },
  {
    SKU: "DJ7841-200",
    Shoe: "Nike Air Force 1 Mid Stussy Fossil ",
  },
  {
    SKU: "DM8461-001",
    Shoe: "Nike Air Force 1 Undefeated 5 On It Dunk vs. AF1",
  },
  {
    SKU: "DH3064-300",
    Shoe: "Nike Air Force 1 Undefeated Ballistic Dunk Olive",
  },
  {
    SKU: "DC1454-100",
    Shoe: "Nike Air Max 1 Anniversary Green ",
  },
  {
    SKU: "DO9392-700",
    Shoe: "Nike Air Max 1 Cactus Jack Saturn Gold",
  },
  {
    SKU: "DD1870-200",
    Shoe: "Nike Air Max 1 CLOT KOD CHA ",
  },
  {
    SKU: "DH1348-004",
    Shoe: "Nike Air Max 1 Patta Waves Aqua",
  },
  {
    SKU: "DQ0299-100",
    Shoe: "Nike Air Max 1 Patta Waves White",
  },
  {
    SKU: "CU1816-100",
    Shoe: "Nike Air Max 90 Bacon",
  },
  {
    SKU: "AA7293-001",
    Shoe: "Nike Air Max 90 Off White Black ",
  },
  {
    SKU: "CU1854-001",
    Shoe: "Nike Air Zoom Spiridon Stussy Pure Platinum",
  },
  {
    SKU: "DD1869-107",
    Shoe: "Nike Dunk High Aluminum (W)",
  },
  {
    SKU: "DB2179-105",
    Shoe: "Nike Dunk High Cargo Khaki GS",
  },
  {
    SKU: "DD1399-104",
    Shoe: "Nike Dunk High Championship Navy ",
  },
  {
    SKU: "DH0960-600",
    Shoe: "Nike Dunk High First Use Red",
  },
  {
    SKU: "DH6758-100",
    Shoe: "Nike Dunk High First Use Sail ",
  },
  {
    SKU: "DJ0382-600",
    Shoe: "Nike Dunk High Fragment",
  },
  {
    SKU: "CZ8149-700",
    Shoe: "Nike Dunk High Michigan",
  },
  {
    SKU: "DD1869-002",
    Shoe: "Nike Dunk High Moon Fossil (W)",
  },
  {
    SKU: "DD1399-105",
    Shoe: "Nike Dunk High Panda",
  },
  {
    SKU: "DD1869-103",
    Shoe: "Nike Dunk High Panda (W)",
  },
  {
    SKU: "CZ8149-101",
    Shoe: "Nike Dunk High Pure Platinum",
  },
  {
    SKU: "DC9053-101",
    Shoe: "Nike Dunk High Pure Platinum (PS)",
  },
  {
    SKU: "DD1869-104",
    Shoe: "Nike Dunk High Sail Crimson Tint (W)",
  },
  {
    SKU: "DD1869-102",
    Shoe: "Nike Dunk High Sail Football Grey (W) ",
  },
  {
    SKU: "DA1639-100",
    Shoe: "Nike Dunk High Slam Jam Pure Platinum",
  },
  {
    SKU: "CZ8149-100",
    Shoe: "Nike Dunk High Spartan Green",
  },
  {
    SKU: "DQ4691-700",
    Shoe: "Nike Dunk High University Gold (W) ",
  },
  {
    SKU: "DQ8581-100",
    Shoe: "Nike Dunk High Vintage Black (W)",
  },
  {
    SKU: "DD1503-104",
    Shoe: "Nike Dunk Low Barely Green (W)",
  },
  {
    SKU: "DD1391-600",
    Shoe: "Nike Dunk Low Championship Red ",
  },
  {
    SKU: "DR9511-100",
    Shoe: "Nike Dunk Low Champs ",
  },
  {
    SKU: "DH5360-300",
    Shoe: "Nike Dunk Low Dusty Olive",
  },
  {
    SKU: "DO6288-001",
    Shoe: "Nike Dunk Low EMB GS Brooklyn Nets",
  },
  {
    SKU: "DD3363-100",
    Shoe: "Nike Dunk Low EMB NBA 75th Anniversary Chicago",
  },
  {
    SKU: "DD1391-003",
    Shoe: "Nike Dunk Low Georgetown",
  },
  {
    SKU: "CW1590-004",
    Shoe: "Nike Dunk Low Georgetown GS",
  },
  {
    SKU: "DD1391-004",
    Shoe: "Nike Dunk Low Golden Rod",
  },
  {
    SKU: "DD1503-105",
    Shoe: "Nike Dunk Low Green Glow (W)",
  },
  {
    SKU: "DD1503-600",
    Shoe: "Nike Dunk Low Lime Ice (W)",
  },
  {
    SKU: "DD1391-700",
    Shoe: "Nike Dunk Low Michigan ",
  },
  {
    SKU: "CW1590-700",
    Shoe: "Nike Dunk Low Michigan GS",
  },
  {
    SKU: "DD1873-100",
    Shoe: "Nike Dunk Low Next Nature Pale Coral (W)",
  },
  {
    SKU: "DD1873-101",
    Shoe: "Nike Dunk Low Next Nature Sail (W)",
  },
  {
    SKU: "CT0856-100",
    Shoe: "Nike Dunk Low Off White Green",
  },
  {
    SKU: "CT0856-700",
    Shoe: "Nike Dunk Low Off White Michigan",
  },
  {
    SKU: "CT0856-600",
    Shoe: "Nike Dunk Low Off White University Red",
  },
  {
    SKU: "DD1503-103",
    Shoe: "Nike Dunk Low Photon (W)",
  },
  {
    SKU: "DD1503-601",
    Shoe: "Nike Dunk Low Pink Oxford (W)",
  },
  {
    SKU: "DM9467-500",
    Shoe: "Nike Dunk Low Purple Pulse (W)",
  },
  {
    SKU: "DN3866-100",
    Shoe: "Nike Dunk Low Safari Mix (W)",
  },
  {
    SKU: "CU1727-100",
    Shoe: "Nike Dunk Low St. John's University Red",
  },
  {
    SKU: "DN0855-600 / DD1872-600",
    Shoe: "Nike Dunk Low Sunset Pulse (W)",
  },
  {
    SKU: "DD1391-601",
    Shoe: "Nike Dunk Low Team Red",
  },
  {
    SKU: "CW1589-003",
    Shoe: "Nike Dunk Low Tropical Twist (TD)",
  },
  {
    SKU: "DD1391-102",
    Shoe: "Nike Dunk Low UNC",
  },
  {
    SKU: "CW1590-103",
    Shoe: "Nike Dunk Low UNC GS",
  },
  {
    SKU: "DJ9649-400",
    Shoe: "Nike Dunk Low Union Argon",
  },
  {
    SKU: "DQ4690-800",
    Shoe: "Nike Dunk Low University Gold (W)",
  },
  {
    SKU: "DM9467-700",
    Shoe: "Nike Dunk Low Yellow Strike (W)",
  },
  {
    SKU: "521286-800",
    Shoe: "Nike Foamposite Galaxy ",
  },
  {
    SKU: "DO7097-100",
    Shoe: "Nike Jordan 1 A Ma Maniere",
  },
  {
    SKU: "DN2857-330",
    Shoe: "Nike Jordan 1 Billie Eilish Ghost Green (W)",
  },
  {
    SKU: "555088-611",
    Shoe: "Nike Jordan 1 Bordeaux",
  },
  {
    SKU: "555088-610",
    Shoe: "Nike Jordan 1 Bred Toe",
  },
  {
    SKU: "555088-706",
    Shoe: "Nike Jordan 1 Brotherhood",
  },
  {
    SKU: "CD0461-151",
    Shoe: "Nike Jordan 1 Court Purple Metallic (W)",
  },
  {
    SKU: "555088-108",
    Shoe: "Nike Jordan 1 High Bleached Coral",
  },
  {
    SKU: "832596-030",
    Shoe: "Nike Jordan 1 High Heiress Camo (GS)",
  },
  {
    SKU: "DC3481-900",
    Shoe: "Nike Jordan 1 Retro High J Balvin",
  },
  {
    SKU: "555088-603",
    Shoe: "Nike Jordan 1 Light Fusion",
  },
  {
    SKU: "DD9315-600",
    Shoe: "Nike Jordan 1 Low Chicago Golf",
  },
  {
    SKU: "CZ0790-100",
    Shoe: "Nike Jordan 1 Low Neutral Grey",
  },
  {
    SKU: "CZ0858-100",
    Shoe: "Nike Jordan 1 Low Neutral Grey GS",
  },
  {
    SKU: "CZ0776-300",
    Shoe: "Nike Jordan 1 Low SE Barely Green (W)",
  },
  {
    SKU: "CZ0790-801",
    Shoe: "Nike Jordan 1 Low Starfish",
  },
  {
    SKU: "AO9944-111",
    Shoe: "Nike Jordan 1 Low White (W)",
  },
  {
    SKU: "BQ6472-104",
    Shoe: "Nike Jordan 1 Mid Kentucky (W)",
  },
  {
    SKU: "BQ6472-015",
    Shoe: "Nike Jordan 1 Mid Light Smoke Grey (W)",
  },
  {
    SKU: "BQ6472-110",
    Shoe: "Nike Jordan 1 Mid White Snakeskin (W)",
  },
  {
    SKU: "AA3834-101",
    Shoe: "Nike Jordan 1 Off White Chicago ",
  },
  {
    SKU: "555088-302",
    Shoe: 'Jordan 1 Retro High "Pine Green" ',
  },
  {
    SKU: "555088-701",
    Shoe: "Jordan 1 Retro High Pollen",
  },
  {
    SKU: "CD0461-001",
    Shoe: "Jordan 1 Retro High Silver Toe (W)",
  },
  {
    SKU: "555088-126",
    Shoe: "Jordan 1 Retro High Light Smoke Grey",
  },
  {
    SKU: "575441-127",
    Shoe: "Jordan 1 Retro Storm Blue (GS)",
  },
  {
    SKU: "555088-711",
    Shoe: "Jordan 1 Retro High OG Taxi",
  },
  {
    SKU: "575441-711",
    Shoe: "Jordan 1 Retro High OG Taxi",
  },
  {
    SKU: "BV1300-146",
    Shoe: "Jordan 1 Retro High Union Los Angeles Blue Toe",
  },
  {
    SKU: "555088-134",
    Shoe: "The Jordan 1 Retro High University Blue ",
  },
  {
    SKU: "555088-118",
    Shoe: "Jordan 1 Retro High Volt",
  },
  {
    SKU: "CI2977-006",
    Shoe: "NIke Jordan 12 Chinese New Year 2019",
  },
  {
    SKU: "CT8013-006",
    Shoe: "Jordan 12 Retro Playoffs (2022)",
  },
  {
    SKU: "487471-104",
    Shoe: "Jordan 14 Retro White Hyper Royal",
  },
  {
    SKU: "DN3802-200",
    Shoe: "Jordan 2 Retro SP Union Rattan",
  },
  {
    SKU: "DH3434-110",
    Shoe: "Jordan 3 Retro A Ma Maniére (W) ",
  },
  {
    SKU: "398614-012",
    Shoe: "Jordan 3 Retro Cool Grey (2021) (GS) ",
  },
  {
    SKU: "DA3595-100",
    Shoe: "Jordan 3 Retro Fragment",
  },
  {
    SKU: "398614-401",
    Shoe: "Jordan 3 Retro Georgetown (2021) (GS)",
  },
  {
    SKU: "CK9246-102",
    Shoe: "Jordan 3 Retro Neapolitan Dark Mocha (W)",
  },
  {
    SKU: "136064-105",
    Shoe: "Jordan 3 Retro White Cement (2011)",
  },
  {
    SKU: "580775-160",
    Shoe: "Nike Jordan 3 White Cement 88 Dunk Contest",
  },
  {
    SKU: "CU1110-010",
    Shoe: "Jordan 4 Retro Black Cat (2020)",
  },
  {
    SKU: "308497-007",
    Shoe: "Jordan 4 Retro Cool Grey (2019)",
  },
  {
    SKU: "CT8527-700",
    Shoe: "Jordan 4 Retro Lightning (2021)",
  },
  {
    SKU: "408452-700",
    Shoe: "Jordan 4 Retro Lightning (2021) (GS)",
  },
  {
    SKU: "CT8527-016",
    Shoe: "Nike Jordan 4 Red Thunder ",
  },
  {
    SKU: "BQ7669-016",
    Shoe: "Nike Jordan 4 Red Thunder (PS)",
  },
  {
    SKU: "DJ6249-200",
    Shoe: "Jordan 4 Retro Taupe Haze (GS)",
  },
  {
    SKU: "DJ5718-300",
    Shoe: "Jordan 4 Retro SP 30th Anniversary Union Desert Moss",
  },
  {
    SKU: "DC9533-800",
    Shoe: "Jordan 4 Retro Union Guava Ice",
  },
  {
    SKU: "CT8527-100",
    Shoe: "Nike Jordan 4 White Oreo",
  },
  {
    SKU: "136027-120",
    Shoe: "Nike Jordan 5 Retro Fire Red",
  },
  {
    SKU: "440890-108",
    Shoe: "Nike Jordan 5  Retro White Grape (TD)",
  },
  {
    SKU: "DH0690-200",
    Shoe: "Nike Jordan 6 Travis Scott British Kakhi",
  },
  {
    SKU: "384665-410",
    Shoe: "Nike Jordan 6 UNC White (GS)",
  },
  {
    SKU: "AA1239-135",
    Shoe: "Nike Jordan 8 OVO White ",
  },
  {
    SKU: "CD4991-500",
    Shoe: "Nike Kobe 5 Lakers",
  },
  {
    SKU: "CZ0328-400",
    Shoe: "Nike Lebron 13 South Beach",
  },
  {
    SKU: "DD1875-200",
    Shoe: "Nike Sacai Vapor Waffle Sesame",
  },
  {
    SKU: "CV1363-001",
    Shoe: "Nike Sacai Vaporwaffle Black White",
  },
  {
    SKU: "CV1363-100",
    Shoe: "Nike Sacai Vaporwaffle Fuschia",
  },
  {
    SKU: "CV1363-700",
    Shoe: "Nike Vaporwaffle Sacai Tour Yellow Stadium Green",
  },
  {
    SKU: "DJ4877-600",
    Shoe: "Nike LD Waffle Sacai Undercover Night Maroon Team Royal ",
  },
  {
    SKU: "BV0073-400",
    Shoe: "Nike LD Waffle sacai Blue Multi",
  },
  {
    SKU: "DH1347-100",
    Shoe: "Nike LD Waffle sacai CLOT Kiss of Death Net Orange Blaze",
  },
  {
    SKU: "DH2684-001",
    Shoe: "Nike Sacai Waffle Fragment Grey ",
  },
  {
    SKU: "DC6887-200",
    Shoe: "Nike SB Dunk High Concepts Turdunken (Special Box)",
  },
  {
    SKU: "DC6887-200",
    Shoe: "Nike SB Dunk High Concepts Turdunken",
  },
  {
    SKU: "BQ6817-600",
    Shoe: "Nike SB Dunk Low J-Pack Chicago",
  },
  {
    SKU: "DH7687-400",
    Shoe: "Nike SB Dunk Low Pro FTC Lagoon Pulse",
  },
  {
    SKU: "CJ5378-700",
    Shoe: "Nike SB Dunk Low Grateful Dead Bears Opti Yellow",
  },
  {
    SKU: "CZ5128-400",
    Shoe: "Nike SB Dunk Low Instant Skateboards ",
  },
  {
    SKU: "BQ6817-101",
    Shoe: "Nike SB Dunk Low Laser Blue ",
  },
  {
    SKU: "BQ6832-101",
    Shoe: "Nike SB Dunk Low Raygun Tie-Dye White",
  },
  {
    SKU: "DC9936-100",
    Shoe: "Nike SB Dunk Low Sean Cliver",
  },
  {
    SKU: "DH3228-103",
    Shoe: " Nike SB Dunk Low Supreme Stars Barkroot Brown",
  },
  {
    SKU: "DH3228-101",
    Shoe: "Nike SB Dunk Low Supreme Mean Green",
  },
  {
    SKU: "#REF!",
    Shoe: "Nike SB Dunk Low What the Paul ",
  },
  {
    SKU: "BQ6817-204",
    Shoe: "Nike SB Dunk Low Wheat",
  },
  {
    SKU: "AR7623-001",
    Shoe: "Nike Supeme Air Force 1 CDG",
  },
  {
    SKU: "DA6672-700",
    Shoe: "The NikeCraft General Purpose Shoe Tom Sachs Archive Dark Sulfur",
  },
  {
    SKU: "163862C",
    Shoe: "Converse Chuck Taylor All-Star 70 Hi Off-White",
  },
  {
    SKU: "DM7866-162",
    Shoe: "Travis Low Reverse Mocha",
  },
  {
    SKU: "FU9006",
    Shoe: "Yeezy 350 Black",
  },
  {
    SKU: "FW5318",
    Shoe: "Yeezy 350 Citrin Relfective",
  },
  {
    SKU: "FW5191",
    Shoe: "Yeezy 350 Yeezreel ",
  },
  {
    SKU: "FX4130",
    Shoe: "Yeezy 350 Yeezreel Reflective",
  },
  {
    SKU: "GZ8668",
    Shoe: "Yeezy 380 Calcite Glow",
  },
  {
    SKU: "FZ1270",
    Shoe: "Yeezy 380 Onyx",
  },
  {
    SKU: "F36640",
    Shoe: "Yeezy 500 Utility Black",
  },
  {
    SKU: "H67799",
    Shoe: "Yeezy 700 Alvah",
  },
  {
    SKU: "GZ2002",
    Shoe: "Yeezy 700 Faded Azure",
  },
  {
    SKU: "GY0260",
    Shoe: "Yeezy 700 Kyanite",
  },
  {
    SKU: "GZ0717",
    Shoe: "Yeezy 700 MNVN Honey Flux",
  },
  {
    SKU: "G54853",
    Shoe: "Yeezy 700 Safflower",
  },
  {
    SKU: "EG7487",
    Shoe: "Yeezy 700 Salt",
  },
  {
    SKU: "EF2829",
    Shoe: "Yeezy 700 Static",
  },
  {
    SKU: "GV6843",
    Shoe: "Yeezy Foam RNNR Desert Sand ",
  },
  {
    SKU: "FY4567",
    Shoe: "Yeezy Foam RNNR Sand",
  },
  {
    SKU: "GV6775",
    Shoe: "Yeezy Foam RNNR Sulfur",
  },
  {
    SKU: "HP6587",
    Shoe: "Yeezy Boost 350 V2 Core Black Red (Infants)",
  },
  {
    SKU: "GX6138",
    Shoe: "Yeezy Slide Glow Green",
  },
  {
    SKU: "GW1931",
    Shoe: "Yeezy Slide Ochre",
  },
  {
    SKU: "HQ4115",
    Shoe: "Yeezy Slide Onyx (Kids)",
  },
  {
    SKU: "FZ5904",
    Shoe: "Yeezy Slide Resin ",
  },
  {
    SKU: "FD8775-001",
    Shoe: "Nike SB Dunk Low HUF San Francisco",
  },
  {
    SKU: "555088-611",
    Shoe: "Jordan 1 Retro High OG Bordeaux",
  },
  {
    SKU: "555088-404",
    Shoe: "Jordan 1 Retro High OG Dark Marina Blue",
  },
  {
    SKU: "555088-161",
    Shoe: "Jordan 1 Retro High OG Heritage",
  },
  {
    SKU: "DJ0950-104",
    Shoe: "Nike Dunk Low Off-White Lot 32",
  },
  // {
  //   SKU: "#REF!",
  //   Shoe: "Jordan 1 Retro High OG Patent Bred",
  // },
  {
    SKU: "CT8527-115",
    Shoe: "Nike Jordan 4 Metallic Purple ",
  },
  {
    SKU: "378037-003",
    Shoe: "Nike Jordan 11 Space Jam 2019 ",
  },
  {
    SKU: "DA6809-700",
    Shoe: "Nike Kobe 5 Protro Undefeated Hall of Fame",
  },
  {
    SKU: "DV4982-641",
    Shoe: "Jordan 5 Retro DJ Khaled We The Best Crimson Bliss",
  },
  {
    SKU: "CT8013-071",
    Shoe: "Jordan 12 Retro Black Taxi",
  },
  {
    SKU: "DH6927-140",
    Shoe: "Jordan 4 Retro Midnight Navy",
  },
  {
    SKU: "FD1437-612",
    Shoe: "Jordan 1 Retro High OG Chicago Lost and Found (GS)",
  },
  {
    SKU: "DM7866-140",
    Shoe: "Jordan 1 Retro Low OG SP Fragment x Travis Scott ",
  },
  {
    SKU: "DC9533-001",
    Shoe: "Jordan 4 Retro Union Off Noir ",
  },
  {
    SKU: "DV6773-220",
    Shoe: "Jordan 4 Retro A Ma Maniére Violet Ore",
  },
  {
    SKU: "DH7138-006",
    Shoe: "Jordan 4 Retro SE Black Canvas",
  },
  {
    SKU: "HP8739",
    Shoe: "Yeezy Foam RNR Onyx",
  },
  {
    SKU: "DC1788-100",
    Shoe: "Jordan 1 Retro High COJP Midnight Navy",
  },
  {
    SKU: "BV0073-301",
    Shoe: "Nike LD Waffle sacai Pine Green",
  },
  {
    SKU: "AA1239-045",
    Shoe: "Jordan 8 Retro OVO Black ",
  },
  {
    SKU: "AH6987-023",
    Shoe: "Jordan 12 Retro Doernbecher",
  },
  {
    SKU: "378037-100",
    Shoe: "Jordan 11 Retro Concord (2018)",
  },
  {
    SKU: "DC7770-160",
    Shoe: "Jordan 4 Retro Fire Red (2020)",
  },
  {
    SKU: "EF2905",
    Shoe: "Yeezy Boost 350 V2 Static (Non-Reflective)",
  },
  {
    SKU: "308497-060",
    Shoe: "Jordan 4 Retro Bred (2019)",
  },
  {
    SKU: "CT8012-005",
    Shoe: "Jordan 11 Retro Cool Grey (2021)",
  },
  {
    SKU: "AQ3835-160",
    Shoe: "Jordan 3 Retro Tinker Hatfield",
  },
  {
    SKU: "DM1602-114",
    Shoe: "Nike Dunk Low Off-White Lot 4",
  },
  {
    SKU: "378037-061",
    Shoe: "Jordan 11 Retro Playoffs Bred (2019)",
  },
  {
    SKU: "CU2277-600",
    Shoe: "Nike Jordan 3 Fire Red ",
  },
  {
    SKU: "CT8019-162",
    Shoe: "Nike Jordan 9 Fire Red ",
  },
  {
    SKU: "DZ5485-612",
    Shoe: "Jordan 1 Retro High OG Chicago Lost and Found",
  },
  {
    SKU: "AQ4832",
    Shoe: "Yeezy Boost 350 Turtledove (2022)",
  },
  {
    SKU: "DD1391-402",
    Shoe: "Nike Dunk Low UCLA",
  },
  {
    SKU: "DZ7292-200",
    Shoe: "Jordan 1 Retro Low OG Zion Williamson Voodoo",
  },
  {
    SKU: "DM6447-200",
    Shoe: "Nike Air Max 2013 Stussy Fossil",
  },
  {
    SKU: "CZ0790-801",
    Shoe: "Jordan 1 Low Starfish ",
  },
  {
    SKU: "HQ4540",
    Shoe: "Yeezy Boost 350 V2 Onyx",
  },
  {
    SKU: "555088-105",
    Shoe: "Jordan 1 Retro High Dark Mocha",
  },
  {
    SKU: "BQ4422-100",
    Shoe: "Jordan 1 Retro High 85 Neutral Grey",
  },
  {
    SKU: "535357-935",
    Shoe: "Jordan Golden Moments Pack (6/7)",
  },
  {
    SKU: "DC9561-300",
    Shoe: "Nike Dunk Low Toasty Sequoia GS",
  },
  {
    SKU: "DH9765-100",
    Shoe: "Nike Dunk Low White Pink GS",
  },
  {
    SKU: "DQ8580-100",
    Shoe: "Nike Dunk Low Vintage Green (W)",
  },
  {
    SKU: "DD1391-701",
    Shoe: "Nike Dunk Low Midas Gold\n",
  },
  {
    SKU: "DV0553-006",
    Shoe: "Jordan 4 Retro SE Black Canvas GS",
  },
  {
    SKU: "408452-016",
    Shoe: "Jordan 4 Retro Red Thunder GS",
  },
  {
    SKU: "AA7293-200",
    Shoe: "Nike Air Max 90 OFF-WHITE Desert Ore",
  },
  {
    SKU: "GW1229",
    Shoe: "Yeezy Boost 350 V2 Beluga Reflective",
  },
  {
    SKU: "CZ9747-900",
    Shoe: "Nike Dunk Low Community Garden",
  },
  {
    SKU: "DO9392-200",
    Shoe: "Nike Air Max 1 Travis Scott Cactus Jack Baroque Brown",
  },
  {
    SKU: "AA3830-002",
    Shoe: "Nike Air Presto Off-White Black (2018)",
  },
  {
    SKU: "553558-052",
    Shoe: "Jordan 1 Low Shadow Toe",
  },
  {
    SKU: "DH7742-600",
    Shoe: "Nike SB Dunk High Pro KCDC",
  },
  {
    SKU: "DH6927-111",
    Shoe: "Nike Jordan 4 Military Black ",
  },
  {
    SKU: "DD1503-118",
    Shoe: "Nike Dunk Low Rose Whisper ",
  },
  {
    SKU: "DO6290-001",
    Shoe: "Nike Air Force 1 Mid Off-White Black",
  },
  {
    SKU: "DO6290-100",
    Shoe: "Nike Off White Air Force 1 Mid White ",
  },
  {
    SKU: "DR7515-200",
    Shoe: "Nike Air Trainer 1 SP Travis Scott Wheat",
  },
  {
    SKU: "DR1413-200",
    Shoe: "Nike Cortez SP Union Sesame",
  },
  {
    SKU: "DQ4488-001",
    Shoe: "Nike SB Dunk Low Pro QS Neckface",
  },
  {
    SKU: "DV2130-400",
    Shoe: "Nike Dunk High I Got Next\n",
  },
  {
    SKU: "555088-032",
    Shoe: "Jordan 1 Retro High Black Metallic Gold (2020)",
  },
  {
    SKU: "AQ0818-148",
    Shoe: "Jordan 1 Retro High Off-White University Blue",
  },
  {
    SKU: "AA3834-101",
    Shoe: "Jordan 1 Retro High Off-White Chicago",
  },
  {
    SKU: "DX5549-400",
    Shoe: "Nike SB Dunk Low Why So Sad",
  },
  {
    SKU: "FD8777-100",
    Shoe: "Nike SB Dunk Low Sandy Bodecker",
  },
  {
    SKU: "DR9654-001",
    Shoe: "Nike Dunk Low SE Jackpot",
  },
  {
    SKU: "408452-140",
    Shoe: "Jordan 4 Retro Midnight Navy GS",
  },
  {
    SKU: "CT8012-116",
    Shoe: "Jordan 11 Retro Cherry (2022)",
  },
  {
    SKU: "DJ9955-101",
    Shoe: "Dunk Low Reverse UNC (W)",
  },
  {
    SKU: "DH9765-100",
    Shoe: "Dunk Low White Pink ",
  },
  {
    SKU: "CW1589-601",
    Shoe: "Dunk Low Pink Red White (TD)",
  },
  {
    SKU: "DN3673-400",
    Shoe: "Nike SB Dunk Low Philadelphia Phillies (TD)",
  },
  {
    SKU: "DX5930-001",
    Shoe: "Nike Dunk Low Phantom Metallic Gold (W)",
  },
  {
    SKU: "DD1391-100",
    Shoe: "Nike Dunk Low Retro White Black Panda (2021)",
  },
  {
    SKU: "DD1503-101",
    Shoe: "Nike Dunk Low Retro White Black Panda (2021) (W)",
  },
  {
    SKU: "DM0121-400",
    Shoe: "Nike Dunk Low Retro QS Argon (2022)",
  },
  {
    SKU: "DJ9649-401",
    Shoe: "Nike Dunk Low Union Passport Pack Pistachio\n",
  },
  {
    SKU: "DC0774-050",
    Shoe: "Jordan 1 Low Football Grey",
  },
  {
    SKU: "BY9612",
    Shoe: "Yeezy Boost 350 V2 Core Black Red",
  },
  {
    SKU: "DD0587-600",
    Shoe: "Jordan 5 Retro Raging Bull Red (2021)",
  },
  {
    SKU: "FX9017",
    Shoe: 'Yeezy Boost 350 V2 "Tail Light"',
  },
  {
    SKU: "EG7596",
    Shoe: 'Yeezy 700 "Analog"',
  },
  {
    SKU: "CT8529-106",
    Shoe: "Jordan 6 Retro Carmine (2021) ",
  },
  {
    SKU: "G54854",
    Shoe: 'Yeezy 700 V3 Kids "Safflower"',
  },
  {
    SKU: "CU9225-100",
    Shoe: 'Supreme Air Force 1 "White"',
  },
  {
    SKU: "DD1391-602",
    Shoe: "Dunk Low USC",
  },
  {
    SKU: "AR0715-441",
    Shoe: "Air Jordan 11 Midnight Navy",
  },
  {
    SKU: "DN1555-200",
    Shoe: "Nike Air Force 1 Low SP Supreme Wheat",
  },
  {
    SKU: "DH8009-600",
    Shoe: "Nike Dunk Low QS LeBron James Fruity Pebbles",
  },
  {
    SKU: "FU6684",
    Shoe: "Yeezy 700 Vanta",
  },
  {
    SKU: "DO9776-001",
    Shoe: 'Nike Dunk Low "Certified Fresh"',
  },
  {
    SKU: "DR1033-001",
    Shoe: 'Nike Air Max 98TL "Supreme Black"',
  },
  {
    SKU: "CP9654",
    Shoe: "Yeezy 350 V2 “Zebra”",
  },
  {
    SKU: "DD1391-401",
    Shoe: "Nike Dunk Low Racer Blue",
  },
  {
    SKU: "BQ4422-400",
    Shoe: "Jordan 1 Retro High 85 Georgetown",
  },
  {
    SKU: "B75806",
    Shoe: "adidas Samba OG Cloud White Core Black",
  },
  {
    SKU: "B75807",
    Shoe: "adidas Samba OG Black White Gum",
  },
  {
    SKU: "DO1157-100",
    Shoe: "Nike Blazer Mid 77 Vintage Joker",
  },
  {
    SKU: "GZ0711",
    Shoe: "adidas Yeezy Boost 700 MNVN Blue Tint",
  },
  {
    SKU: "CZ4166-101",
    Shoe: "Jordan Point Lane True Blue",
  },
  {
    SKU: "MT580AB2",
    Shoe: "New Balance 580 Real Mad Brown",
  },
  {
    SKU: "GSB550BB",
    Shoe: "New Balance 550 Triple Black (GS)",
  },
  {
    SKU: "DJ3624-002",
    Shoe: "Nike Air Max Dawn Grey Fog",
  },
  {
    SKU: "DJ9158-200",
    Shoe: "Nike Air Force 1 Mid '07 Flax (2022)",
  },
  {
    SKU: "NF0A7W6J-7IL",
    Shoe: "The North Face ThermoBall Traction Mule VP KAWS Black Print",
  },
  {
    SKU: "DH7338-001",
    Shoe: "Nike Air Trainer 1 SP Dark Smoke Grey",
  },
  {
    SKU: "FJ4555-104",
    Shoe: "Nike Dunk Low PRM Team Red (W)",
  },
  {
    SKU: "MS327ART",
    Shoe: "New Balance 327 Atmos Realtree",
  },
  {
    SKU: "1201A482-101",
    Shoe: "ASICS Gel-Lyte III OG Oyster Blue Grey",
  },
  {
    SKU: "Dj2776-106",
    Shoe: "Jordan 7 Retro Cardinal (2022) (TD)",
  },
  {
    SKU: "Bq6472-022",
    Shoe: "Jordan 1 Mid Cement Grey (Women's)",
  },
  {
    SKU: "169221c",
    Shoe: "Converse Chuck Taylor All-Star 70 Hi Carhartt WIP Covert Green",
  },
  {
    SKU: "Nf0a7w6j-944",
    Shoe:
      "The North Face ThermoBall Traction Mule VP KAWS Moonlight Ivory Print",
  },
  {
    SKU: "Bb550wbg",
    Shoe: "New Balance 550 Burgundy Cyan",
  },
  {
    SKU: "Bb550bgu",
    Shoe: "New Balance 550 Black Gum White",
  },
  {
    SKU: "G55120",
    Shoe: "Reebok Question Mid Pink Toe",
  },
  {
    SKU: "DV1753-601",
    Shoe: "Jordan 1 High OG Spider-Man Across the Spider-Verse (GS) ",
  },
  {
    SKU: "DH6927-017",
    Shoe: "Jordan 4 Retro Thunder (2023)",
  },
];
export default shoedata;
