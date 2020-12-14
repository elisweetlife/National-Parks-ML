var template=`<div>
<table>
  <tr>
    <td rowspan="4">
      <img src="[ICSRC]" alt="">
    </td>
    <td data-cls=1><span>Current Weather: [DC]°C / </span><span>[DF]°F</span></td>
  </tr>
</table>
</div>`;
// Creating a map object
var myMap = L.map("map", {
  center: [45.8283, -98.5795],
  zoom: 4
});

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  //id: "mapbox/outdoors-v10",
  id: mapbox/streets-v11,
  //id: mapbox/outdoors-v11
  //id: mapbox/light-v10
  //id: mapbox/dark-v10
  //id: mapbox/satellite-v9
  //id: mapbox/satellite-streets-v11


  accessToken: API_KEY
}).addTo(myMap);

// Defining a markerSize function that will give each park a different radius based on its average rating
function markerSize(rating) {
  if (rating == 0) {
    return 2.5 * 15000;
  }
  else {
    return rating * 15000;
  }
  
}

// Each park object contains the park data including parkcode, name, latitude and longitude, junk integer, average user rating, and recommendations.
var parks = [

  {
    parkcode: "acad",
    name: "Acadia National Park",
    location: [44.3386, -68.2733],
    junkInt: 100,
    rating: 3.936,
    recommendations: ['1: Yosemite, 0.6311133588232232', '2: Cuyahoga Valley, 0.6196384074702594', '3: Dry Tortugas, 0.6020582269967976', '4: Yellowstone, 0.5787418995717107', '5: Zion, 0.5782640516407724', '6: Everglades, 0.577053844759615', '7: Rocky Mountain, 0.5735352769754769', '8: Grand Canyon, 0.5223487648953334', '9: Shenandoah, 0.5084027702001823', '10: Great Smoky Mountains, 0.49715903976140896']
  },
  {
    parkcode: "arch",
    name: "Arches National Park",
    location: [38.7331, -109.5925],
    junkInt: 115,
    rating: 4.007,
    recommendations: ['1: Sequoia, 0.5171677051081278', '2: Joshua Tree, 0.5024240267864182', '3: Death Valley, 0.48192190990918804', '4: Mesa Verde, 0.4778478870896635', '5: Capitol Reef, 0.4563278556931438', '6: Yosemite, 0.4382848007142224', '7: Grand Canyon, 0.3974714187486591', '8: Bryce Canyon, 0.35584685051985665', '9: Canyonlands, 0.34480000431235425', '10: Zion, 0.3403492713155909']
  },
  {
    parkcode: "badl",
    name: "Badlands National Park",
    location: [43.8554, -102.3397],
    junkInt: 100,
    rating: 3.725,
    recommendations: ['1: Kings Canyon, 0.5938099449634171', '2: Arches, 0.582895925489192', '3: Yosemite, 0.5801097831555574', '4: Theodore Roosevelt, 0.5742028670330181', '5: Bryce Canyon, 0.5710428588137058', '6: Rocky Mountain, 0.5678308689976432', '7: Yellowstone, 0.5490656584193755', '8: Grand Canyon, 0.5342566691046642', '9: Glacier, 0.5174869311650635', '10: Grand Teton, 0.4976490234585832']
    },
    {
      parkcode: "bibe",
      name: "Big Bend National Park",
      location: [29.1275,-103.2425],
      junkInt: 42,
      rating: 4.083,
      recommendations: ['1: Yosemite, 0.6690240356835101', '2: Sequoia, 0.6617114968307362', '3: Grand Canyon, 0.6567310536916379', '4: Carlsbad Caverns, 0.6513465254202434', '5: Guadalupe Mountains, 0.6422887326699371', '6: Petrified Forest, 0.6396274838774414', '7: Joshua Tree, 0.6370915573573569', '8: Death Valley, 0.6357047947816657', '9: Capitol Reef, 0.6017337816971464', '10: Arches, 0.5700658636195922']
    },
    {
      parkcode: "bisc",
      name: "Biscayne National Park",
      location: [25.4824,-80.2083],
      junkInt: 42,
      rating: 3.143,
      recommendations: ['1: Everglades, 0.6583382451153474', '2: Virgin Islands, 0.6581889823918126', '3: Mammoth Cave, 0.6513021795506705', '4: Indiana Dunes, 0.6445226165290578', '5: Acadia, 0.6436913674667577', '6: Cuyahoga Valley, 0.6400397485833473', '7: Gateway Arch, 0.6334095094443951', '8: Congaree, 0.6110540439598702', '9: American Samoa, 0.37230472096206046', '10: Dry Tortugas, 0.2635325387519054']
      },
    {
      parkcode: "blca",
      name: "Black Canyon Of The Gunnison National Park",
      location: [38.5754, -107.7416],
      junkInt: 125,
      rating: 3.412,
      recommendations: ['1: Arches, 0.6482077853033313', '2: White Sands, 0.6319648731332312', '3: Theodore Roosevelt, 0.6263005129336159', '4: Canyonlands, 0.617982463864231', '5: Rocky Mountain, 0.6164600805823592', '6: Voyageurs, 0.6079349651632009', '7: Capitol Reef, 0.5889234960061828', '8: Wrangell-St. Elias, 0.5572989670919561', '9: Congaree, 0.5569578367679515', '10: Great Sand Dunes, 0.40873031923156156']
    },
    {
      parkcode: "brca",
      name: "Bryce Canyon National Park",
      location: [37.593, -112.1871],
      junkInt: 100,
      rating: 4.18,
      recommendations: ['1: Rocky Mountain, 0.492551009951651', '2: Joshua Tree, 0.470789883157134', '3: Sequoia, 0.45576820015313424', '4: Canyonlands, 0.4501330915849425', '5: Yosemite, 0.4088217165101452', '6: Capitol Reef, 0.403896334931109', '7: Arches, 0.35584685051985665', '8: Grand Canyon, 0.3442917066260579', '9: Death Valley, 0.3095426569997515', '10: Zion, 0.18341099686239204']
    },
    {
      parkcode: "cany",
      name: "Canyonlands National Park",
      location: [38.3269, -109.8783],
      junkInt: 115,
      rating: 3.792,
      recommendations: ['1: Sequoia, 0.6430344028448205', '2: Kings Canyon, 0.6375122560191089', '3: Mesa Verde, 0.6271452043883973', '4: Black Canyon of the Gunnison, 0.617982463864231', '5: Death Valley, 0.5593181717118916', '6: Grand Canyon, 0.5499232223729851', '7: Zion, 0.4842672608379066', '8: Bryce Canyon, 0.4501330915849425', '9: Capitol Reef, 0.40701451317477877', '10: Arches, 0.34480000431235425']
    },
    {
      parkcode: "care",
      name: "Capitol Reef National Park",
      location: [38.367, -111.2615],
      junkInt: 125,
      rating: 3.907,
      recommendations: ['1: Great Sand Dunes, 0.6120493574237456', '2: Big Bend, 0.6017337816971464', '3: Black Canyon of the Gunnison, 0.5889234960061828', '4: Grand Canyon, 0.5598164714810352', '5: Death Valley, 0.5335637819638714', '6: Mesa Verde, 0.5248078657680042', '7: Zion, 0.4905577335931923', '8: Arches, 0.4563278556931438', '9: Canyonlands, 0.40701451317477877', '10: Bryce Canyon, 0.403896334931109']
    },
    {
      parkcode: "cave",
      name: "Carlsbad Caverns National Park",
      location: [32.1479, -104.5567],
      junkInt: 100,
      rating: 3.9,
      recommendations: ['1: Rocky Mountain, 0.6166969264963766', '2: Petrified Forest, 0.6149978248943666', '3: Arches, 0.6131915205403525', '4: Yosemite, 0.6124079834980177', '5: Zion, 0.6096602319266331', '6: Bryce Canyon, 0.5920812402160835', '7: Yellowstone, 0.5829494267519314', '8: Grand Teton, 0.5658011381260384', '9: Channel Islands, 0.5582881662303127', '10: Guadalupe Mountains, 0.5297782206732665']
    },
    {
      parkcode: "chis",
      name: "Channel Islands National Park",
      location: [34.0069, -119.7785],
      junkInt: 115,
      rating: 3.938,
      recommendations: ['1: Pinnacles, 0.6396079034539439', '2: Death Valley, 0.6353183019577893', '3: Joshua Tree, 0.624095599389193', '4: Zion, 0.6202753301024203', '5: Kings Canyon, 0.6140923335826296', '6: Mount Rainier, 0.599997082665109', '7: Olympic, 0.5954203046055058', '8: Kenai Fjords, 0.5751214466926584', '9: Carlsbad Caverns, 0.5582881662303127', '10: Petrified Forest, 0.5421618646625724']
    },
    {
      parkcode: "cong",
      name: "Congaree National Park",
      location: [33.7948, -80.7821],
      junkInt: 100,
      rating: 2.7,
      recommendations: ['1: Wind Cave, 0.6709249354228375', '2: Mammoth Cave, 0.6407698518486823', '3: Indiana Dunes, 0.6366513814319584', '4: Dry Tortugas, 0.6363039848188297', '5: Kenai Fjords, 0.6330424593436025', '6: Great Sand Dunes, 0.6211535442568823', '7: Biscayne, 0.6110540439598702', '8: Voyageurs, 0.5995609555862976', '9: Wrangell-St. Elias, 0.5920814779962148', '10: Black Canyon of the Gunnison, 0.5569578367679515']
    },
    {
      parkcode: "crla",
      name: "Crater Lake National Park",
      location: [42.8684, -122.1685],
      junkInt: 115,
      rating: 4.056,
      recommendations: ['1: Petrified Forest, 0.5530095497829146', '2: Bryce Canyon, 0.5498301996992447', '3: Grand Canyon, 0.5454370717289032', '4: Pinnacles, 0.5356140764897757', '5: Yellowstone, 0.5273665899707732', '6: Joshua Tree, 0.51191292196615', '7: Yosemite, 0.4963117430270728', '8: Lassen Volcanic, 0.49597296298387494', '9: Redwood, 0.48709796416604456', '10: Mount Rainier, 0.4764162123524158']
    },
    {
      parkcode: "cuva",
      name: "Cuyahoga Valley National Park",
      location: [41.2808, -81.5678],
      junkInt: 125,
      rating: 2.767,
      recommendations: ['1: Virgin Islands, 0.7102118503116619', '2: Shenandoah, 0.6972502319786915', '3: Congaree, 0.6959250005041658', '4: Rocky Mountain, 0.6913304835604717', '5: Hot Springs, 0.6814603801458268', '6: Great Smoky Mountains, 0.6470976414276547', '7: Wind Cave, 0.6409486173047688', '8: Biscayne, 0.6400397485833473', '9: Acadia, 0.6196384074702594', '10: Dry Tortugas, 0.4749026142059647']
    },
    {
      parkcode: "deva",
      name: "Death Valley National Park",
      location: [36.5323, -116.9325],
      junkInt: 125,
      rating: 3.915,
      recommendations: ['1: Pinnacles, 0.5178449345466485', '2: Arches, 0.48192190990918804', '3: Yellowstone, 0.4786740859257266', '4: Grand Canyon, 0.47584108097341093', '5: Kings Canyon, 0.453838720168369', '6: Yosemite, 0.4231128234356438', '7: Sequoia, 0.40940798665537337', '8: Zion, 0.38120068172317856', '9: Joshua Tree, 0.36008913922689834', '10: Bryce Canyon, 0.3095426569997515']
    },
    {
      parkcode: "dena",
      name: "Denali National Park & Preserve",
      location: [63.1148, -151.1926],
      junkInt: 150,
      rating: 4.5,
      recommendations: ['1: Rocky Mountain, 0.6429809749812572', '2: Sequoia, 0.6426249173867147', '3: Olympic, 0.6413921773549609', '4: Lake Clark, 0.6373493929491453', '5: Grand Teton, 0.6319212593755908', '6: Katmai, 0.6288651904873973', '7: Bryce Canyon, 0.6269422747896205', '8: Yosemite, 0.6223963021764847', '9: Glacier Bay, 0.518888798256721', '10: Kenai Fjords, 0.3501649419283319']
    },
    {
      parkcode: "drto",
      name: "Dry Tortugas National Park",
      location: [24.6285, -82.8732],
      junkInt: 100,
      rating: 4.071,
      recommendations: ['1: Mammoth Cave, 0.6795573341150665', '2: Wrangell-St. Elias, 0.6779151136471184', '3: Gateway Arch, 0.6726492321875456', '4: Congaree, 0.6363039848188297', '5: Acadia, 0.6020582269967976', '6: Indiana Dunes, 0.5948766130364413', '7: American Samoa, 0.5272083123435347', '8: Cuyahoga Valley, 0.4749026142059647', '9: Virgin Islands, 0.4580622604001354', '10: Biscayne, 0.2635325387519054']
    },
    {
      parkcode: "ever",
      name: "Everglades National Park",
      location: [25.7459, -80.555],
      junkInt: 150,
      rating: 3.563,
      recommendations: ['1: Zion, 0.5909858137956112', '2: Yosemite, 0.590032953818501', '3: Pinnacles, 0.5885190294525824', '4: Acadia, 0.577053844759615', '5: Rocky Mountain, 0.5724907420006049', "6: Hawai'I Volcanoes, 0.5631882106726136", '7: Death Valley, 0.5630777757698328', '8: Haleakal_, 0.5379009345863611', '9: Grand Canyon, 0.5309514930174521', '10: Great Smoky Mountains, 0.49451091241660583']
    },
    {
      parkcode: "gaar",
      name: "Gates Of The Arctic National Park & Preserve",
      location: [67.8819, -153.1861],
      junkInt: 115,
      rating: 3,
      recommendations: ['1: Wind Cave, 0.7381385317168091', '2: Dry Tortugas, 0.7340546756932382', '3: Black Canyon of the Gunnison, 0.73214018792703', '4: Voyageurs, 0.6716946069012504', '5: Lake Clark, 0.6094332670575284', '6: Isle Royale, 0.5622594758683338', '7: Guadalupe Mountains, 0.5602802320565499', '8: Wrangell-St. Elias, 0.453641635291847', '9: Katmai, 0.42264973081037427', '10: American Samoa, 0.33333333333333337']
    },
    {
      parkcode: "jeff",
      name: "Gateway Arch National Park",
      location: [38.6270, -90.1855],
      junkInt: 42,
      rating: 3.235,
      recommendations: ['1: Wind Cave, 0.7035227635488633', '2: Arches, 0.7015527658657366', '3: Acadia, 0.6903587824253632', '4: Grand Canyon, 0.6860726386954283', '5: Great Smoky Mountains, 0.6751657814549432', '6: Carlsbad Caverns, 0.6727255343215195', '7: Dry Tortugas, 0.6726492321875456', '8: American Samoa, 0.6516334928541911', '9: Biscayne, 0.6334095094443951', '10: Guadalupe Mountains, 0.6323592647645793']
    },
    {
      parkcode: "glba",
      name: "Glacier Bay National Park & Preserve",
      location: [58.6658, -136.9002],
      junkInt: 125,
      rating: 4.205,
      recommendations: ['1: Redwood, 0.7461419960740463', '2: Sequoia, 0.7426865076310172', '3: Arches, 0.7201485826692743', "4: Hawai'I Volcanoes, 0.7196849800244123", '5: Rocky Mountain, 0.7019232223191967', '6: Bryce Canyon, 0.696770561346623', '7: Yosemite, 0.6921086296508662', '8: Kenai Fjords, 0.6904414737453656', '9: Grand Canyon, 0.6689055051696602', '10: Denali, 0.518888798256721']
    },
    {
      parkcode: "glac",
      name: "Glacier National Park",
      location: [48.7596, -113.787],
      junkInt: 115,
      rating: 4.406,
      recommendations: ['1: Arches, 0.6166397529759708', '2: Bryce Canyon, 0.6162948742400398', '3: Pinnacles, 0.6130626972570963', '4: Zion, 0.5923536577986652', '5: Grand Canyon, 0.5834872957965018', '6: Rocky Mountain, 0.5318115315130572', '7: Yosemite, 0.5255339601027295', '8: Badlands, 0.5174869311650635', '9: Yellowstone, 0.4844111619845064', '10: Grand Teton, 0.4177979891807122']
    },
    {
      parkcode: "grca",
      name: "Grand Canyon National Park",
      location: [36.0548, -112.1222],
      junkInt: 125,
      rating: 4.165,
      recommendations: ['1: Grand Teton, 0.4884552699471263', '2: Rocky Mountain, 0.4846158262763479', '3: Death Valley, 0.47584108097341093', '4: Yellowstone, 0.447506297860662', '5: Redwood, 0.4269332931885208', '6: Sequoia, 0.4001796733350663', '7: Arches, 0.3974714187486591', '8: Bryce Canyon, 0.3442917066260579', '9: Zion, 0.3124723703630059', '10: Yosemite, 0.28533220465413345']
    },
    {
      parkcode: "grte",
      name: "Grand Teton National Park",
      location: [43.7904, -110.6818],
      junkInt: 100,
      rating: 4.141,
      recommendations: ['1: Bryce Canyon, 0.5282534425208181', '2: Joshua Tree, 0.5264200157945529', '3: Zion, 0.5263786643691907', '4: Death Valley, 0.5248248833302591', '5: Badlands, 0.4976490234585832', '6: Grand Canyon, 0.4884552699471263', '7: Rocky Mountain, 0.46367285308325024', '8: Yosemite, 0.4485455942529142', '9: Glacier, 0.4177979891807122', '10: Yellowstone, 0.2104373600230307']
    },
    {
      parkcode: "grba",
      name: "Great Basin National Park",
      location: [38.9833, -114.3],
      junkInt: 115,
      rating: 3.692,
      recommendations: ['1: Arches, 0.7478496092632984', '2: Grand Canyon, 0.7476182366180381', '3: Bryce Canyon, 0.7474879520723843', '4: Rocky Mountain, 0.7438192704776492', '5: Mesa Verde, 0.7422387281678663', '6: Wrangell-St. Elias, 0.7411067859889656', '7: Canyonlands, 0.7231776823098717', '8: Zion, 0.712612869242429', '9: Capitol Reef, 0.6951393918142423', '10: Great Sand Dunes, 0.6856662219284886']
    },
    {
      parkcode: "grsa",
      name: "Great Sand Dunes National Park & Preserve",
      location: [37.7916, -105.5943],
      junkInt: 125,
      rating: 3.65,
      recommendations: ['1: Shenandoah, 0.651819674704466', '2: Grand Canyon, 0.6402149322437402', '3: Wind Cave, 0.6229550841372304', '4: Congaree, 0.6211535442568823', '5: Capitol Reef, 0.6120493574237456', '6: Mesa Verde, 0.5965915574676119', '7: Theodore Roosevelt, 0.5933534387938129', '8: Voyageurs, 0.5849721357540266', '9: Rocky Mountain, 0.48694000659389725', '10: Black Canyon of the Gunnison, 0.40873031923156156']
    },
    {
      parkcode: "grsm",
      name: "Great Smoky Mountains National Park",
      location: [35.6118, -83.4895],
      junkInt: 150,
      rating: 3.99,
      recommendations: ['1: Mammoth Cave, 0.625343616103295', '2: Badlands, 0.6243644704877223', '3: Zion, 0.6183815675127868', '4: Yosemite, 0.5995470018624193', '5: Bryce Canyon, 0.5835748917031043', '6: Yellowstone, 0.5825616767018778', '7: Grand Canyon, 0.525222711551476', '8: Acadia, 0.49715903976140896', '9: Everglades, 0.49451091241660583', '10: Rocky Mountain, 0.49092343241383873']
    },
    {
      parkcode: "gumo",
      name: "Guadalupe Mountains National Park",
      location: [31.9231, -104.8645],
      junkInt: 125,
      rating: 3.583,
      recommendations: ['1: Death Valley, 0.6819345607803536', '2: Congaree, 0.674949794276993', '3: Capitol Reef, 0.6567364783568653', '4: Big Bend, 0.6422887326699371', '5: Gateway Arch, 0.6323592647645793', '6: White Sands, 0.577504911707903', '7: Gates of the Arctic, 0.5602802320565499', '8: Wrangell-St. Elias, 0.5435353106474793', '9: Carlsbad Caverns, 0.5297782206732665', '10: American Samoa, 0.4503502900706873']
    },
    {
      parkcode: "hale",
      name: "Haleakala National Park",
      location: [20.7204, -156.1552],
      junkInt: 150,
      rating: 4.471,
      recommendations: ['1: Lake Clark, 0.692567383197769', '2: Pinnacles, 0.6894740495852448', '3: Katmai, 0.6836970043482173', '4: Sequoia, 0.6805876226253418', '5: Joshua Tree, 0.6755985580722382', '6: Grand Canyon, 0.6723192728449008', '7: Death Valley, 0.6399407566260512', '8: Yosemite, 0.5879110430585246', "9: Hawai'I Volcanoes, 0.5654440394651071", '10: Everglades, 0.5379009345863611']
    },
    {
      parkcode: "havo",
      name: "Hawai'i Volcanoes National Park",
      location: [19.4194, -155.2885],
      junkInt: 42,
      rating: 4.057,
      recommendations: ['1: Olympic, 0.592293648505118', '2: Haleakal_, 0.5654440394651071', '3: Everglades, 0.5631882106726136', '4: Yellowstone, 0.5568991039767821', '5: Death Valley, 0.5410908781124373', '6: Sequoia, 0.5364715146648983', '7: Pinnacles, 0.5215225335234661', '8: Redwood, 0.5047877044399904', '9: Grand Canyon, 0.5011337850697062', '10: Yosemite, 0.4673071437608166']
    },
    {
      parkcode: "hosp",
      name: "Hot Springs National Park",
      location: [34.5217, -93.0424],
      junkInt: 100,
      rating: 3.63,
      recommendations: ['1: Gateway Arch, 0.763476335443904', '2: Everglades, 0.7556740320391592', '3: Dry Tortugas, 0.7486127184482261', '4: Grand Canyon, 0.7341352726538815', '5: Wind Cave, 0.7322424508041758', '6: Yellowstone, 0.7275429055302842', '7: Carlsbad Caverns, 0.725275611636683', '8: Redwood, 0.7040823720857661', '9: Rocky Mountain, 0.6843163747269354', '10: Cuyahoga Valley, 0.6814603801458268']
    },
    {
      parkcode: "indu",
      name: "Indiana Dunes National Park",
      location: [41.6533, -87.0524],
      junkInt: 150,
      rating: 2.647,
      recommendations: ['1: Grand Teton, 0.755937749479433', '2: Gateway Arch, 0.748104688337744', '3: Great Smoky Mountains, 0.7416116940650868', '4: Glacier, 0.7033448357929666', '5: Wind Cave, 0.6826510489225454', '6: Theodore Roosevelt, 0.6799624467238274', '7: Biscayne, 0.6445226165290578', '8: Congaree, 0.6366513814319584', '9: Dry Tortugas, 0.5948766130364413', '10: Mammoth Cave, 0.5235009355402971']
    },
    {
      parkcode: "isro",
      name: "Isle Royale National Park",
      location: [47.9959, -88.9093],
      junkInt: 100,
      rating: 4,
      recommendations: ['1: Death Valley, 0.7478656940522707', '2: Katmai, 0.7472703905573747', '3: Lassen Volcanic, 0.7453778165604533', '4: Wind Cave, 0.7325361217889328', '5: Mesa Verde, 0.7293661309288666', '6: Acadia, 0.720544718107619', '7: American Samoa, 0.7081729839122226', '8: Voyageurs, 0.6646706586826348', '9: Theodore Roosevelt, 0.6407615828632851', '10: Gates of the Arctic, 0.5622594758683338']
    },
    {
      parkcode: "jotr",
      name: "Joshua Tree National Park",
      location: [33.8734, -115.90100000000001],
      junkInt: 115,
      rating: 4.063,
      recommendations: ['1: Crater Lake, 0.51191292196615', '2: Arches, 0.5024240267864182', '3: Lassen Volcanic, 0.4955297798206535', '4: Redwood, 0.4860099653994394', '5: Kings Canyon, 0.47212983071442216', '6: Bryce Canyon, 0.470789883157134', '7: Zion, 0.45283298876217404', '8: Sequoia, 0.43537771043304974', '9: Yosemite, 0.37842687456064117', '10: Death Valley, 0.36008913922689834']
    },
    {
      parkcode: "katm",
      name: "Katmai National Park & Preserve",
      location: [58.6126, -155.0631],
      junkInt: 125,
      rating: 5,
      recommendations: ['1: Everglades, 0.7182282391664274', '2: Wrangell-St. Elias, 0.6845598510617441', '3: Haleakal_, 0.6836970043482173', '4: Carlsbad Caverns, 0.6593659110409915', '5: Channel Islands, 0.6510728463864524', '6: Denali, 0.6288651904873973', '7: American Samoa, 0.6150998205402496', '8: Kenai Fjords, 0.5928044790297191', '9: Gates of the Arctic, 0.42264973081037427', '10: Lake Clark, 0.02286016359632237']
    },
    {
      parkcode: "kefj",
      name: "Kenai Fjords National Park",
      location: [60.0438, -149.8164],
      junkInt: 150,
      rating: 4.25,
      recommendations: ['1: Death Valley, 0.6686157667189799', '2: Mammoth Cave, 0.658431116494105', '3: Rocky Mountain, 0.6547905328879431', '4: Bryce Canyon, 0.6414070551454589', '5: Congaree, 0.6330424593436025', '6: Katmai, 0.5928044790297191', '7: Lake Clark, 0.5832781493496907', '8: Channel Islands, 0.5751214466926584', '9: Wrangell-St. Elias, 0.5642722710784727', '10: Denali, 0.3501649419283319']
    },
    {
      parkcode: "seki",
      name: "Kings Canyon National Park",
      location: [36.8879,-118.5551],
      junkInt: 42,
      rating: 4.227,
      recommendations: ['1: Petrified Forest, 0.5818587300777683', '2: Pinnacles, 0.5560901831870929', '3: Arches, 0.5248994795603015', '4: Grand Canyon, 0.5164496081822871', '5: Bryce Canyon, 0.4937547536085388', '6: Zion, 0.48870305812445347', '7: Yosemite, 0.4885480820826379', '8: Joshua Tree, 0.47212983071442216', '9: Death Valley, 0.453838720168369', '10: Sequoia, 0.30943248111502164']
    },
    {
      parkcode: "kova",
      name: "Kobuk Valley National Park",
      location: [67.3356, -159.1243],
      junkInt: 115,
      rating: 0,
      recommendations: ['1: Redwood, 1.0', '2: Kenai Fjords, 1.0', '3: Joshua Tree, 1.0', '4: Lake Clark, 1.0', '5: Petrified Forest, 1.0', '6: Mammoth Cave, 1.0', '7: Mesa Verde, 1.0', '8: Mount Rainier, 1.0', '9: North Cascades, 1.0', '10: Kobuk Valley, 1.0']
    },
    {
      parkcode: "lacl",
      name: "Lake Clark National Park & Preserve",
      location: [60.4127, -154.3235],
      junkInt: 150,
      rating: 4.333,
      recommendations: ['1: American Samoa, 0.7396221780383523', '2: Olympic, 0.7318367124400094', '3: Everglades, 0.7229752467172353', '4: Haleakal_, 0.692567383197769', '5: Carlsbad Caverns, 0.6750309008093371', '6: Channel Islands, 0.6459358927474594', '7: Denali, 0.6373493929491453', '8: Gates of the Arctic, 0.6094332670575284', '9: Kenai Fjords, 0.5832781493496907', '10: Katmai, 0.02286016359632237']
    },
    {
      parkcode: "lavo",
      name: "Lassen Volcanic National Park",
      location: [40.4977, -121.4207],
      junkInt: 150,
      rating: 3.929,
      recommendations: ['1: Bryce Canyon, 0.5899768662757394', '2: Grand Canyon, 0.5855569064405773', '3: Death Valley, 0.5772277511186297', '4: Sequoia, 0.5722456256894257', '5: Zion, 0.5608950014909642', '6: Redwood, 0.5498705728949584', '7: Yosemite, 0.5083144104700417', '8: Crater Lake, 0.49597296298387494', '9: Joshua Tree, 0.4955297798206535', '10: Pinnacles, 0.4458649840405522']
    },
    {
      parkcode: "maca",
      name: "Mammoth Cave National Park",
      location: [37.187, -86.1005],
      junkInt: 115,
      rating: 3.839,
      recommendations: ['1: Biscayne, 0.6513021795506705', '2: Yellowstone, 0.6465920671274039', '3: Congaree, 0.6407698518486823', '4: Grand Canyon, 0.6336651907974707', '5: Bryce Canyon, 0.6280590008339908', '6: Great Smoky Mountains, 0.625343616103295', '7: Mount Rainier, 0.6140484599881415', '8: Rocky Mountain, 0.6070036908411787', '9: Grand Teton, 0.5881178255302033', '10: Indiana Dunes, 0.5235009355402971']
    },
    {
      parkcode: "meve",
      name: "Mesa Verde National Park",
      location: [37.2309, -108.4618],
      junkInt: 125,
      rating: 3.894,
      recommendations: ['1: Everglades, 0.6294501255307816', '2: Petrified Forest, 0.6280436698464115', '3: Canyonlands, 0.6271452043883973', '4: Death Valley, 0.6227427950816733', '5: Great Sand Dunes, 0.5965915574676119', '6: Zion, 0.5917716192556858', '7: Grand Canyon, 0.5803085257392657', '8: Bryce Canyon, 0.5489456031737734', '9: Capitol Reef, 0.5248078657680042', '10: Arches, 0.4778478870896635']
    },
    {
      parkcode: "mora",
      name: "Mount Rainier National Park",
      location: [46.88, -121.7269],
      junkInt: 125,
      rating: 4.155,
      recommendations: ['1: Kings Canyon, 0.6158074769785475', '2: Mammoth Cave, 0.6140484599881415', '3: Channel Islands, 0.599997082665109', '4: Death Valley, 0.5947094910268065', '5: Redwood, 0.5933472015836049', '6: Joshua Tree, 0.5843757573764923', '7: Grand Teton, 0.5516864283013745', '8: Crater Lake, 0.4764162123524158', '9: North Cascades, 0.46435522347697544', '10: Olympic, 0.3986618430090355']
    },
    {
      parkcode: "npsa",
      name: "National Park of American Samoa",
      location: [14.2583,-170.6833],
      junkInt: 42,
      rating: 4.167,
      recommendations: ['1: North Cascades, 0.6541657493774591', '2: Gateway Arch, 0.6516334928541911', '3: Virgin Islands, 0.6506664941562508', '4: Wrangell-St. Elias, 0.6357610901945647', '5: Katmai, 0.6150998205402496', '6: White Sands, 0.5900466975871532', '7: Dry Tortugas, 0.5272083123435347', '8: Guadalupe Mountains, 0.4503502900706873', '9: Biscayne, 0.37230472096206046', '10: Gates of the Arctic, 0.33333333333333337']
    },
    {
      parkcode: "noca",
      name: "North Cascades National Park",
      location: [48.7718, -121.2985],
      junkInt: 125,
      rating: 4.188,
      recommendations: ['1: Zion, 0.7310965169672261', '2: Bryce Canyon, 0.7258211696762544', '3: Wrangell-St. Elias, 0.7181504251849501', '4: Mammoth Cave, 0.7088602586402217', '5: Petrified Forest, 0.6991006932817084', '6: Saguaro, 0.6981772938905559', '7: Crater Lake, 0.6636013969399333', '8: American Samoa, 0.6541657493774591', '9: Mount Rainier, 0.46435522347697544', '10: Olympic, 0.40983794702304444']
    },
    {
      parkcode: "olym",
      name: "Olympic National Park",
      location: [47.8021, -123.6044],
      junkInt: 125,
      rating: 4.349,
      recommendations: ['1: Yellowstone, 0.5772589351853874', '2: Joshua Tree, 0.5740804974733862', '3: Crater Lake, 0.5697994673733392', '4: Bryce Canyon, 0.5612128772800198', '5: Yosemite, 0.5461893220690098', '6: Grand Canyon, 0.5451181815462204', '7: Grand Teton, 0.539610974730478', '8: Zion, 0.5339752042658724', '9: North Cascades, 0.40983794702304444', '10: Mount Rainier, 0.3986618430090355']
    },
    {
      parkcode: "pefo",
      name: "Petrified Forest National Park",
      location: [34.91, -109.8068],
      junkInt: 150,
      rating: 3.742,
      recommendations: ['1: Mesa Verde, 0.6280436698464115', '2: Yosemite, 0.6221636416884301', '3: Death Valley, 0.6210797512390693', '4: Joshua Tree, 0.6177582064350002', '5: Carlsbad Caverns, 0.6149978248943666', '6: Grand Canyon, 0.6076188926813301', '7: Bryce Canyon, 0.6003550568698588', '8: Kings Canyon, 0.5818587300777683', '9: Crater Lake, 0.5530095497829146', '10: Channel Islands, 0.5421618646625724']
    },
    {
      parkcode: "pinn",
      name: "Pinnacles National Park",
      location: [36.4906, -121.1825],
      junkInt: 173,
      rating: 3.898,
      recommendations: ['1: Yellowstone, 0.5522023344736696', '2: Crater Lake, 0.5356140764897757', '3: Sequoia, 0.5353749347626484', '4: Joshua Tree, 0.5263856129282034', "5: Hawai'I Volcanoes, 0.5215225335234661", '6: Death Valley, 0.5178449345466485', '7: Zion, 0.5146384291286457', '8: Redwood, 0.49182547126268616', '9: Yosemite, 0.4536054857332026', '10: Lassen Volcanic, 0.4458649840405522']
    },
    {
      parkcode: "redw",
      name: "Redwood National and State Parks",
      location: [41.2132, -124.0046],
      junkInt: 125,
      rating: 4.232,
      recommendations: ['1: Death Valley, 0.5555938076983529', '2: Lassen Volcanic, 0.5498705728949584', '3: Yellowstone, 0.5441687724174957', "4: Hawai'I Volcanoes, 0.5047877044399904", '5: Pinnacles, 0.49182547126268616', '6: Crater Lake, 0.48709796416604456', '7: Joshua Tree, 0.4860099653994394', '8: Sequoia, 0.4511430095003297', '9: Yosemite, 0.4274330126543232', '10: Grand Canyon, 0.4269332931885208']
    },
    {
      parkcode: "romo",
      name: "Rocky Mountain National Park",
      location: [40.3428, -105.6836],
      junkInt: 100,
      rating: 4.117,
      recommendations: ['1: Badlands, 0.5678308689976432', '2: Yosemite, 0.5355061152080092', '3: Glacier, 0.5318115315130572', '4: Yellowstone, 0.5142250782227359', '5: Zion, 0.49618897203381307', '6: Bryce Canyon, 0.492551009951651', '7: Great Smoky Mountains, 0.49092343241383873', '8: Great Sand Dunes, 0.48694000659389725', '9: Grand Canyon, 0.4846158262763479', '10: Grand Teton, 0.46367285308325024']
    },
    {
      parkcode: "sagu",
      name: "Saguaro National Park",
      location: [32.2967, -111.1666],
      junkInt: 125,
      rating: 3.737,
      recommendations: ['1: White Sands, 0.6978397051138364', '2: Bryce Canyon, 0.6924476890086468', '3: Redwood, 0.6846322927939071', '4: Everglades, 0.6838784531627188', '5: Grand Canyon, 0.6796410780796109', '6: Rocky Mountain, 0.6733950603497647', '7: Biscayne, 0.6653002743986101', '8: Pinnacles, 0.6610782428064763', '9: Crater Lake, 0.6562382740964017', '10: Joshua Tree, 0.6262511030767138']
    },
    {
      parkcode: "seki",
      name: "Sequoia National Park",
      location: [36.4864, -118.5658],
      junkInt: 115,
      rating: 4.31,
      recommendations: ['1: Pinnacles, 0.5353749347626484', '2: Arches, 0.5171677051081278', '3: Zion, 0.4645610897233712', '4: Bryce Canyon, 0.45576820015313424', '5: Redwood, 0.4511430095003297', '6: Joshua Tree, 0.43537771043304974', '7: Death Valley, 0.40940798665537337', '8: Grand Canyon, 0.4001796733350663', '9: Yosemite, 0.3857103768134492', '10: Kings Canyon, 0.30943248111502164']
    },
    {
      parkcode: "shen",
      name: "Shenandoah National Park",
      location: [38.2928, -78.6796],
      junkInt: 125,
      rating: 3.875,
      recommendations: ['1: Badlands, 0.7084518790040224', '2: Black Canyon of the Gunnison, 0.7061785631788184', '3: Rocky Mountain, 0.698515934211472', '4: Cuyahoga Valley, 0.6972502319786915', '5: Congaree, 0.68231079882127', '6: Capitol Reef, 0.6743110439376558', '7: Great Smoky Mountains, 0.6721750770108408', '8: Grand Canyon, 0.6582220329086277', '9: Great Sand Dunes, 0.651819674704466', '10: Acadia, 0.5084027702001823']
    },
    {
      parkcode: "thro",
      name: "Theodore Roosevelt National Park",
      location: [46.979, -103.5387],
      junkInt: 125,
      rating: 3.529,
      recommendations: ['1: Rocky Mountain, 0.6677087745456678', '2: Mesa Verde, 0.6510665337137704', '3: Grand Teton, 0.6424434847483168', '4: Isle Royale, 0.6407615828632851', '5: Black Canyon of the Gunnison, 0.6263005129336159', '6: Glacier, 0.624114618383441', '7: Wind Cave, 0.6002848920947762', '8: Great Sand Dunes, 0.5933534387938129', '9: Badlands, 0.5742028670330181', '10: Voyageurs, 0.5329900577222706']
    },
    {
      parkcode: "viis",
      name: "Virgin Islands National Park",
      location: [18.3424, -64.7486],
      junkInt: 150,
      rating: 4.571,
      recommendations: ['1: Wrangell-St. Elias, 0.758242374878628', '2: White Sands, 0.7538570831241989', '3: Haleakal_, 0.7525215173186444', '4: Saguaro, 0.7480711244266024', '5: Acadia, 0.7480311679028766', '6: Grand Canyon, 0.7116734939193671', '7: Cuyahoga Valley, 0.7102118503116619', '8: Biscayne, 0.6581889823918126', '9: American Samoa, 0.6506664941562508', '10: Dry Tortugas, 0.4580622604001354']
    },
    {
      parkcode: "voya",
      name: "Voyageurs National Park",
      location: [48.4841, -92.8271],
      junkInt: 100,
      rating: 3.5,
      recommendations: ['1: Rocky Mountain, 0.6840928039653115', '2: Dry Tortugas, 0.6798586244558784', '3: Gates of the Arctic, 0.6716946069012504', '4: Biscayne, 0.669672702337426', '5: Isle Royale, 0.6646706586826348', '6: Black Canyon of the Gunnison, 0.6079349651632009', '7: Congaree, 0.5995609555862976', '8: Great Sand Dunes, 0.5849721357540266', '9: Wind Cave, 0.5534308462011646', '10: Theodore Roosevelt, 0.5329900577222706']
    },
    {
      parkcode: "whsa",
      name: "White Sands National Park",
      location: [32.7872, -106.3257],
      junkInt: 125,
      rating: 3.864,
      recommendations: ['1: Saguaro, 0.6978397051138364', '2: Zion, 0.6918852248818117', '3: Channel Islands, 0.6777194823805427', '4: Petrified Forest, 0.6635878155805721', '5: Rocky Mountain, 0.6445045829717005', '6: Black Canyon of the Gunnison, 0.6319648731332312', '7: Carlsbad Caverns, 0.6232399900573569', '8: Wrangell-St. Elias, 0.5905339740340653', '9: American Samoa, 0.5900466975871532', '10: Guadalupe Mountains, 0.577504911707903']
    },
    {
      parkcode: "wica",
      name: "Wind Cave National Park",
      location: [43.6046, -103.4213],
      junkInt: 150,
      rating: 3.45,
      recommendations: ['1: Denali, 0.6998098464373848', '2: Guadalupe Mountains, 0.6905460278204325', '3: Indiana Dunes, 0.6826510489225454', '4: Congaree, 0.6709249354228375', '5: Kenai Fjords, 0.6696952469371173', '6: Cuyahoga Valley, 0.6409486173047688', '7: Great Sand Dunes, 0.6229550841372304', '8: Badlands, 0.6148335537476681', '9: Theodore Roosevelt, 0.6002848920947762', '10: Voyageurs, 0.5534308462011646']
    },
    {
      parkcode: "wrst",
      name: "Wrangell - St Elias National Park & Preserve",
      location: [61.7104, -142.9857],
      junkInt: 100,
      rating: 3.9,
      recommendations: ['1: Dry Tortugas, 0.6779151136471184', '2: Denali, 0.6722017051512854', '3: Great Sand Dunes, 0.6591934564515453', '4: American Samoa, 0.6357610901945647', '5: Congaree, 0.5920814779962148', '6: White Sands, 0.5905339740340653', '7: Kenai Fjords, 0.5642722710784727', '8: Black Canyon of the Gunnison, 0.5572989670919561', '9: Guadalupe Mountains, 0.5435353106474793', '10: Gates of the Arctic, 0.453641635291847']
    },
    {
      parkcode: "yell",
      name: "Yellowstone National Park",
      location: [44.428000000000004, -110.5885],
      junkInt: 115,
      rating: 4.313,
      recommendations: ['1: Crater Lake, 0.5273665899707732', '2: Joshua Tree, 0.5176291818017054', '3: Rocky Mountain, 0.5142250782227359', '4: Bryce Canyon, 0.5049914077750208', '5: Zion, 0.48780075190561545', '6: Glacier, 0.4844111619845064', '7: Death Valley, 0.4786740859257266', '8: Grand Canyon, 0.447506297860662', '9: Yosemite, 0.3573695993914364', '10: Grand Teton, 0.2104373600230307']
    },
    {
      parkcode: "yose",
      name: "Yosemite National Park",
      location: [37.8651, -119.5383],
      junkInt: 125,
      rating: 4.417,
      recommendations: ['1: Grand Teton, 0.4485455942529142', '2: Arches, 0.4382848007142224', '3: Redwood, 0.4274330126543232', '4: Death Valley, 0.4231128234356438', '5: Bryce Canyon, 0.4088217165101452', '6: Sequoia, 0.3857103768134492', '7: Joshua Tree, 0.37842687456064117', '8: Yellowstone, 0.3573695993914364', '9: Zion, 0.34088212277247565', '10: Grand Canyon, 0.28533220465413345']
    },
    {
      parkcode: "zion",
      name: "Zion National Park",
      location: [37.2982, -113.0263],
      junkInt: 100,
      rating: 4.317,
      recommendations: ['1: Kings Canyon, 0.48870305812445347', '2: Yellowstone, 0.48780075190561545', '3: Canyonlands, 0.4842672608379066', '4: Sequoia, 0.4645610897233712', '5: Joshua Tree, 0.45283298876217404', '6: Death Valley, 0.38120068172317856', '7: Yosemite, 0.34088212277247565', '8: Arches, 0.3403492713155909', '9: Grand Canyon, 0.3124723703630059', '10: Bryce Canyon, 0.18341099686239204']
    }

];

// Looping through the parks array and creating one marker for each park object
var circles = [];

for (var i = 0; i < parks.length; i++) {
  
  // handling pop-up content related to average rating for parks with no ratings (e.g., rating = 0)
  var popDisplay = "";

  if (parks[i].rating == 0) {
    popDisplay = "not rated"
  } else {
    popDisplay = `Average rating = ${parks[i].rating}/5`
  };

  circles[i] = L.circle(parks[i].location, {
    fillOpacity: 0.75,
    color: "white",
    fillColor: "green",
    // Setting circle's radius equal to the output of markerSize function
    // Makes marker's size proportionate to its average rating
    radius: markerSize(parks[i].rating)
  }).bindPopup("<h1>" + parks[i].name + "</h1> <hr> <h3>" + popDisplay + "</h3>").addTo(myMap);



  circles[i].on('mouseover', (e) => {
    e.target.openPopup();
    
    _onmouseover(e);
  })

}
// const key = "c0214b454c5244a4901191705202706"; (old expired key as of 12/14/20)
const key = "8e377034c9884dfcb1b43107201412";

// add latest weather data to the popup for the park being moused over
function _onmouseover(e){
  var cont=e.target.getPopup().getContent();
    
    debugger
    console.info(e);
    var loc = `${e.latlng.lat},${e.latlng.lng}`;
    e.target.setPopupContent("<h1>Loading...</h1>");
    getWeather({ location: loc }).then(data => {
      debugger;
      data=data.data;
      t=template;
      
      t=t.replace('[DC]',data.current_condition[0].temp_C);
      t=t.replace('[DF]',data.current_condition[0].temp_F);
      
      var finalCont="";
      if(cont.match(/<td data-cls=1>.*?<\/td>/i)&&cont.match(/<td data-cls=1>.*?<\/td>/i).length>0){
        finalCont= cont.replace(cont.match(/<td data-cls=1>.*?<\/td>/i)[0],`<td data-cls=1><span>Current Weather: ${data.current_condition[0].temp_C}°C / </span><span>${data.current_condition[0].temp_F}°F</span></td>`);
      }else{
        finalCont=cont+t;
      }
      e.target.setPopupContent(finalCont);
    }).catch(er=>{
      e.target.setPopupContent("<h4 style='color:red'>Something went wrong.</h1>");
    })
}

// get weather data for a latitude/longitude pair
function getWeather(params) {
  return new Promise((resolve, reject) => {
    const call = `http://api.worldweatheronline.com/premium/v1/weather.ashx?key=${key}&q=${params.location}&format=json&num_of_days=1`;
    $.ajax({
      method:"GET",
      url:call,
      success:function(suc){
        resolve(suc);
      },
      error:function(er){
reject(er);
      }
    })
  })
}

