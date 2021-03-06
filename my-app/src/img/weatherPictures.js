// appendix _n for night pictures

// WEITERMACHEN MIT SHOWERS (rain with some sun)
// suche nach rainbows (rain + sun )

// Search for 15 up to 20 pictures for each category.

/* 
metaweather
abbr	Name											              corresponds (openweathermap)

c		  Clear											              800	clear sky
lc		Light Cloud		                          Sonne mit leichten Wolken		801 few clouds
hc		Heavy Cloud		Bewölkt						  	    802-804 scattered clouds - broken clouds
s		  Showers			  Regen, aber auch mit Sonne 500-504 rain
lr		Light Rain		Regen ohne Sonne			    3xx shower rain (group Drizzle)
hr		Heavy Rain										          520-522, 531 shower rain (group Rain)
t		  Thunderstorm	  						            2xx thunderstorm
h		  Hail			    Hagel				              511 rain (freezing rain)
sl		Sleet			    Schneeregen				        611	snow (sleet)
sn		Snow											              6xx	snow
														                  7xx Nebel gibt es bei metaweather nicht als icon.
*/

const weatherPictures = {
  // clear sky
  c: [
    { name: 'Teddy Kelley',
      profileURL: 'https://unsplash.com/@teddykelley',
      url: 'https://images.unsplash.com/photo-1484960055659-a39d25adcb3c' },
    { name: 'ordan McQueen',
      profileURL: 'https://unsplash.com/@jordanfmcqueen',
      url: 'https://images.unsplash.com/photo-1440557653082-e8e186733eeb' },
    { name: 'Teddy Kelley',
      profileURL: 'https://unsplash.com/@teddykelley',
      url: 'https://images.unsplash.com/photo-1466916674976-e1383310f35d' },
    { name: 'Andrej Chudy',
      profileURL: 'https://unsplash.com/@ach',
      url: 'https://images.unsplash.com/photo-1430263326118-b75aa0da770b' },
    { name: 'Diego Jimenez',
      profileURL: 'https://unsplash.com/@diegojimenez',
      url: 'https://images.unsplash.com/photo-1494783367193-149034c05e8f' },
    { name: 'Samuel Zeller',
      profileURL: 'https://unsplash.com/@samuelzeller',
      url: 'https://images.unsplash.com/photo-1502623547075-299b5ba76c53' },
    { name: 'Antunes Vila Nova Neto',
      profileURL: 'https://unsplash.com/@carambolas',
      url: 'https://images.unsplash.com/photo-1523913950023-c47b5ae5b164' },
    { name: 'Joakim Berglund',
      profileURL: 'https://unsplash.com/@jaybgt',
      url: 'https://images.unsplash.com/photo-1520283440659-4438f9c38d1f' },
    { name: 'Kupono Kuwamura',
      profileURL: 'https://unsplash.com/@kuponokuwamura',
      url: 'https://images.unsplash.com/photo-1438129460879-8f5868d4a802' },
    { name: 'Joshua Sortino',
      profileURL: 'https://unsplash.com/@sortino',
      url: 'https://images.unsplash.com/photo-1421091242698-34f6ad7fc088' },
    { name: 'Alexey Ruban',
      profileURL: 'https://unsplash.com/@intelligenciya',
      url: 'https://images.unsplash.com/photo-1464866691624-e6bdc728bedd' },
    { name: 'Victor Filippov',
      profileURL: 'https://unsplash.com/@victorf',
      url: 'https://images.unsplash.com/photo-1431686969995-531930eb462f' },
    { name: 'Kyle Hinkson',
      profileURL: 'https://unsplash.com/@kajhinkson',
      url: 'https://images.unsplash.com/photo-1514923995763-768e52f5af87' },
    /*
      { name: 'Nick Scheerbart',
      profileURL: 'https://unsplash.com/@nck',
      url: 'https://images.unsplash.com/photo-1533682306043-20c582306f2e' },
    */
    { name: 'Ales Krivec',
      profileURL: 'https://unsplash.com/@aleskrivec',
      url: 'https://images.unsplash.com/photo-1433360405326-e50f909805b3' },
    { name: 'Steven Kamenar',
      profileURL: 'https://unsplash.com/@skamenar',
      url: 'https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1' },
    { name: 'Pedro Lastra',
      profileURL: 'https://unsplash.com/@peterlaster',
      url: 'https://images.unsplash.com/photo-1479604892802-5879d21253f2' },
    { name: 'Aaron Burden',
      profileURL: 'https://unsplash.com/@aaronburden',
      url: 'https://images.unsplash.com/photo-1443466025693-9f6c5d2e8a22' },
    { name: 'Oliver & Hen Pritchard-Barrett',
      profileURL: 'https://unsplash.com/@olliepb',
      url: 'https://images.unsplash.com/photo-1428535172630-fb1c050ac3e0'
    },{
      name: "Micah Hallahan",
      profileURL: "https://unsplash.com/@micah_hallahan",
      url: "https://images.unsplash.com/photo-1438179152657-8ce7dfda4f0b"
    },{
      name: "Jonas Weckschmied",
      profileURL: "https://unsplash.com/@jweckschmied",
      url: "https://images.unsplash.com/photo-1470137430626-983a37b8ea46"
    },
    {
      name: "Leo Wieling",
      profileURL: "https://unsplash.com/@leowieling",
      url: "https://images.unsplash.com/photo-1540141709893-21c6273b507c"
    }
  ],

  c_n: [
    { name: 'Ivana Cajina',
      profileURL: 'https://unsplash.com/@von_co',
      url:
       'https://images.unsplash.com/photo-1500534623283-312aade485b7' },
    { name: 'Fabian Oelkers',
      profileURL: 'https://unsplash.com/@foemedia',
      url:
       'https://images.unsplash.com/photo-1479233270217-77d99c494c4e' },
    { name: 'Andrea Enríquez Cousiño',
      profileURL: 'https://unsplash.com/@andreoiide',
      url:
       'https://images.unsplash.com/photo-1456846602846-65c937210b50' },
    { name: 'Simon Matzinger',
      profileURL: 'https://unsplash.com/@8moments',
      url:
       'https://images.unsplash.com/photo-1500964757637-c85e8a162699' },
    { name: 'Simon Matzinger',
      profileURL: 'https://unsplash.com/@8moments',
      url: 'https://images.unsplash.com/photo-1547639199-ae0bd483a07d' },
    { name: 'Chris Holgersson',
      profileURL: 'https://unsplash.com/@chrisholgersson',
      url: 'https://images.unsplash.com/photo-1549128584-3e199cb2db4d' },
    { name: 'Patrick Hendry',
      profileURL: 'https://unsplash.com/@worldsbetweenlines',
      url: 'https://images.unsplash.com/photo-1548125544-2d4cad80de29' },
    { name: 'Benjamin Voros',
      profileURL: 'https://unsplash.com/@vorosbenisop',
      url:
       'https://images.unsplash.com/photo-1519681393784-d120267933ba' },
    { name: 'Arto Marttinen',
      profileURL: 'https://unsplash.com/@wandervisions',
      url:
       'https://images.unsplash.com/photo-1485356824219-4bc17c2a2ea7' },
    { name: 'Kristopher Roller',
      profileURL: 'https://unsplash.com/@krisroller',
      url:
       'https://images.unsplash.com/photo-1468276311594-df7cb65d8df6' },
    { name: 'Jeremy Thomas',
      profileURL: 'https://unsplash.com/@jeremythomasphoto',
      url:
       'https://images.unsplash.com/photo-1464802686167-b939a6910659' },
    { name: 'Ryan Hutton',
      profileURL: 'https://unsplash.com/@huthut10',
      url:
       'https://images.unsplash.com/photo-1444080748397-f442aa95c3e5' },
    { name: 'Farid Askerov',
      profileURL: 'https://unsplash.com/@whereisfarid',
      url:
       'https://images.unsplash.com/photo-1491598601902-712af90cc6ee' },
    { name: 'Farid Askerov',
      profileURL: 'https://unsplash.com/@whereisfarid',
      url:
       'https://images.unsplash.com/photo-1491598782524-8ebdb06fbc85' },
    { name: 'eberhard grossgasteiger',
      profileURL: 'https://unsplash.com/@eberhardgross',
      url:
       'https://images.unsplash.com/photo-1502481851512-e9e2529bfbf9' },
    { name: 'eberhard grossgasteiger',
      profileURL: 'https://unsplash.com/@eberhardgross',
      url:
       'https://images.unsplash.com/photo-1537295300199-f10d0865dd26' },
    { name: 'Frame Harirak',
      profileURL: 'https://unsplash.com/@framemily',
      url:
       'https://images.unsplash.com/photo-1527738553715-2c217719bfce' },
    { name: 'Luca Bravo',
      profileURL: 'https://unsplash.com/@lucabravo',
      url:
       'https://images.unsplash.com/photo-1522482178516-7a04ae0dce7a' },
    { name: 'Rob Bates',
      profileURL: 'https://unsplash.com/@inksurgeon',
      url:
       'https://images.unsplash.com/photo-1528920304568-7aa06b3dda8b' },
    { name: 'Jessica Ruscello',
      profileURL: 'https://unsplash.com/@jruscello',
      url:
       'https://images.unsplash.com/photo-1470596914251-afb0b4510279' },
    { name: 'Rose Erkul',
      profileURL: 'https://unsplash.com/@rose_ekl',
      url:
       'https://images.unsplash.com/photo-1443632826930-7e5bc4aa7fa0' },
    { name: 'Johannes Plenio',
      profileURL: 'https://unsplash.com/@jplenio',
      url:
       'https://images.unsplash.com/photo-1517683508178-6f7135781b7d' },
    { name: 'Teddy Kelley',
      profileURL: 'https://unsplash.com/@teddykelley',
      url:
       'https://images.unsplash.com/photo-1483030096298-4ca126b58199' },
    { name: 'NASA',
      profileURL: 'https://unsplash.com/@nasa',
      url:
       'https://images.unsplash.com/photo-1459909633680-206dc5c67abb' },
    { name: 'Jason Blackeye',
      profileURL: 'https://unsplash.com/@jeisblack',
      url:
       'https://images.unsplash.com/photo-1499462926192-86109aa8ffb6' },
    { name: 'NASA',
      profileURL: 'https://unsplash.com/@nasa',
      url:
       'https://images.unsplash.com/photo-1527718177306-8746d905bb61' },
    { name: 'Fabian Oelkers',
      profileURL: 'https://unsplash.com/@foemedia',
      url:
       'https://images.unsplash.com/photo-1532894964196-a805f29171ee' } ],
  
  // ligth cloud, few clouds
  lc: [
    { name: 'Ohmky',
      profileURL: 'https://unsplash.com/@ohmky2540',
      url:
       'https://images.unsplash.com/photo-1508347112266-c513b71211d2' },
    { name: 'ellehem',
      profileURL: 'https://unsplash.com/@ellehem',
      url:
       'https://images.unsplash.com/reserve/L55hYy77SLqb6zeTMlWr_IMG_9035.jpg' },
    { name: 'Agustinus Nathaniel',
      profileURL: 'https://unsplash.com/@nate_228',
      url:
       'https://images.unsplash.com/photo-1528872042734-8f50f9d3c59b' },
    { name: 'Billy Huynh',
      profileURL: 'https://unsplash.com/@billy_huy',
      url:
       'https://images.unsplash.com/photo-1501630834273-4b5604d2ee31' },
    { name: 'Davies Designs Studio',
      profileURL: 'https://unsplash.com/@davies_designs',
      url:
       'https://images.unsplash.com/photo-1505533542167-8c89838bb19e' },
    { name: 'chuttersnap',
      profileURL: 'https://unsplash.com/@chuttersnap',
      url:
       'https://images.unsplash.com/photo-1525490829609-d166ddb58678' },
    { name: 'Dan Gold',
      profileURL: 'https://unsplash.com/@danielcgold',
      url:
       'https://images.unsplash.com/photo-1504753930079-4c0b71580d40' },
    { name: '贝莉儿 NG',
      profileURL: 'https://unsplash.com/@danist07',
      url:
       'https://images.unsplash.com/photo-1440407876336-62333a6f010f' },
    { name: 'Gabriel Lamza',
      profileURL: 'https://unsplash.com/@glamza',
      url:
       'https://images.unsplash.com/photo-1534629938736-b1b076531d3b' },
    { name: 'Rowan Heuvel',
      profileURL: 'https://unsplash.com/@insolitus',
      url:
       'https://images.unsplash.com/photo-1434701780707-de4500cebb3a' },
    { name: 'Andrew Ruiz',
      profileURL: 'https://unsplash.com/@andrewruiz',
      url:
       'https://images.unsplash.com/photo-1421081177127-339f586c9b49' },
    { name: 'Gabriela Parra',
      profileURL: 'https://unsplash.com/@gabriela_parra',
      url:
       'https://images.unsplash.com/photo-1455735459330-969b65c65b1c' },
    { name: 'Artem Sapegin',
      profileURL: 'https://unsplash.com/@sapegin',
      url:
       'https://images.unsplash.com/photo-1490682143684-14369e18dce8' },
    { name: 'Jasper Boer',
      profileURL: 'https://unsplash.com/@jasperboer',
      url:
       'https://images.unsplash.com/photo-1433477077279-9354d2d72f6b' },
    { name: 'Quinsey Sablan',
      profileURL: 'https://unsplash.com/@qsablan',
      url:
       'https://images.unsplash.com/photo-1428353077903-d09b3e000f37' },
    { name: 'Sergey Pesterev',
      profileURL: 'https://unsplash.com/@sickle',
      url:
       'https://images.unsplash.com/photo-1490791539531-102a1e0beb7b' },
    { name: 'Kevin Young',
      profileURL: 'https://unsplash.com/@kevinjyoung',
      url:
       'https://images.unsplash.com/photo-1422393462206-207b0fbd8d6b' },
    { name: 'Christian Joudrey',
      profileURL: 'https://unsplash.com/@cjoudrey',
      url:
       'https://images.unsplash.com/photo-1454982523318-4b6396f39d3a' },
    { name: 'Rachel Davis',
      profileURL: 'https://unsplash.com/@rmaedavis',
      url:
       'https://images.unsplash.com/photo-1449452198679-05c7fd30f416' },
    { name: 'Luca Bravo',
      profileURL: 'https://unsplash.com/@lucabravo',
      url:
       'https://images.unsplash.com/photo-1482192505345-5655af888cc4' },
    { name: 'Luca Bravo',
      profileURL: 'https://unsplash.com/@lucabravo',
      url:
       'https://images.unsplash.com/photo-1473448912268-2022ce9509d8' },
    { name: 'Luca Bravo',
      profileURL: 'https://unsplash.com/@lucabravo',
      url:
       'https://images.unsplash.com/photo-1468877294001-94aef5ebfa1e' },
    { name: 'Aniket Deole',
      profileURL: 'https://unsplash.com/@anik3t',
      url:
       'https://images.unsplash.com/photo-1498429089284-41f8cf3ffd39' },
    { name: 'Terry Tan De Hao',
      profileURL: 'https://unsplash.com/@terrytandehao',
      url:
       'https://images.unsplash.com/photo-1498972385535-427d93dadf44' },
    { name: 'Fritz Bielmeier',
      profileURL: 'https://unsplash.com/@fritzbielmeier',
      url:
       'https://images.unsplash.com/photo-1439723680580-bfd9d28ef9b6' },
    { name: 'Rob Potvin',
      profileURL: 'https://unsplash.com/@robpotvin',
      url:
       'https://images.unsplash.com/43/2EsHHwmRswlLYnaG07Ew_paris-motionbug.com.jpg' },
    { name: 'Dominik Schröder',
      profileURL: 'https://unsplash.com/@wirhabenzeit',
      url:
       'https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2' },
    { name: 'Johannes Plenio',
      profileURL: 'https://unsplash.com/@jplenio',
      url:
       'https://images.unsplash.com/photo-1525291529786-4bb8cf9d6a97'
    },{
      name: "Leo Wieling",
      profileURL: "https://unsplash.com/@leowieling",
      url: "https://images.unsplash.com/photo-1533934245110-69e70e2a5098"
    },{
      name: "Leo Wieling",
      profileURL: "https://unsplash.com/@leowieling",
      url: "https://images.unsplash.com/photo-1540141800614-409074725241"
    }
  ],
 
  lc_n: [
    { name: 'Lori M. Sousa',
      profileURL: 'https://unsplash.com/@loriseuss',
      url:
       'https://images.unsplash.com/photo-1436228625646-f30c3e8447b0' },
    { name: 'Billy Huynh',
      profileURL: 'https://unsplash.com/@billy_huy',
      url:
       'https://images.unsplash.com/photo-1503355292172-d861fcfa2228' },
    { name: 'Jeremy Goldberg',
      profileURL: 'https://unsplash.com/@jeremy',
      url:
       'https://images.unsplash.com/photo-1444525222362-d88990a2027e' },
    { name: 'Bryan Minear',
      profileURL: 'https://unsplash.com/@bryanminear',
      url:
       'https://images.unsplash.com/photo-1503509701200-f488aa927c02' },
    { name: 'Bryan Minear',
      profileURL: 'https://unsplash.com/@bryanminear',
      url: 'https://images.unsplash.com/photo-1542296140-47fd7d838e76' },
    { name: 'Andrew Small',
      profileURL: 'https://unsplash.com/@andsmall',
      url:
       'https://images.unsplash.com/photo-1472068113808-609faf3a6cf1' },
    { name: 'George Kedenburg III',
      profileURL: 'https://unsplash.com/@gk3',
      url:
       'https://images.unsplash.com/photo-1508184360431-51989b9a586f' },
    { name: 'Nick Scheerbart',
      profileURL: 'https://unsplash.com/@nck',
      url:
       'https://images.unsplash.com/photo-1429734956993-8a9b0555e122' },
    { name: 'Linda Xu',
      profileURL: 'https://unsplash.com/@rhindaxu',
      url:
       'https://images.unsplash.com/photo-1480947787678-b5676c5a4d18' },
    { name: 'Saketh Garuda',
      profileURL: 'https://unsplash.com/@sakethgaruda',
      url:
       'https://images.unsplash.com/photo-1503424932503-3907c660eea5' },
    { name: 'Abigail Keenan',
      profileURL: 'https://unsplash.com/@akeenster',
      url:
       'https://images.unsplash.com/photo-1437915219556-8c287594737a' },
    { name: 'Dino Reichmuth',
      profileURL: 'https://unsplash.com/@dinoreichmuth',
      url:
       'https://images.unsplash.com/photo-1445364030979-677898992bf5' },
    { name: 'Taylor Peissner',
      profileURL: 'https://unsplash.com/@taylorpeissner',
      url:
       'https://images.unsplash.com/photo-1454106762129-d29573632181' },
    { name: 'Fancycrave',
      profileURL: 'https://unsplash.com/@fancycrave',
      url:
       'https://images.unsplash.com/photo-1492225427505-8d5130acce70' },
    { name: 'Noah Näf',
      profileURL: 'https://unsplash.com/@noahdavis',
      url:
       'https://images.unsplash.com/photo-1532274309425-6232a9f08638' },
    { name: 'Noah Näf',
      profileURL: 'https://unsplash.com/@noahdavis',
      url:
       'https://images.unsplash.com/photo-1532280610118-bf3152fb6390' },
    { name: 'Jenna Beekhuis',
      profileURL: 'https://unsplash.com/@jennabee',
      url:
       'https://images.unsplash.com/photo-1441154283565-f88df169765a' },
    { name: 'Johannes Plenio',
      profileURL: 'https://unsplash.com/@jplenio',
      url:
       'https://images.unsplash.com/flagged/photo-1552863045-98478b36b024' },
    { name: 'eberhard grossgasteiger',
      profileURL: 'https://unsplash.com/@eberhardgross',
      url: 'https://images.unsplash.com/photo-1543176633-f692a21fab58'
    },{
      name: "Paul Rysz",
      profileURL: "https://unsplash.com/@paulrysz",
      url: "https://images.unsplash.com/photo-1491771966163-57e58bcba7f7"
    }
  ],
 
  // heavy cloud, scattered clouds, broken clouds
  hc:
  [ { name: 'Martin Adams',
      profileURL: 'https://unsplash.com/@martinadams',
      url:
       'https://images.unsplash.com/photo-1528157377481-b010149f0e4c' },
    { name: 'Schalk Neethling',
      profileURL: 'https://unsplash.com/@schalkneethling',
      url: 'https://images.unsplash.com/photo-1545650150-53ad4271adb2' },
    { name: 'Jason Blackeye',
      profileURL: 'https://unsplash.com/@jeisblack',
      url:
       'https://images.unsplash.com/photo-1498496294664-d9372eb521f3' },
    { name: 'Daniel Páscoa',
      profileURL: 'https://unsplash.com/@dpascoa',
      url:
       'https://images.unsplash.com/photo-1495756111155-45cb19b8aeee' },
    { name: 'Joshua Reddekopp',
      profileURL: 'https://unsplash.com/@joshuaryanphoto',
      url:
       'https://images.unsplash.com/photo-1500491460312-c32fc2dbc751' },
    { name: 'Zbynek Burival',
      profileURL: 'https://unsplash.com/@zburival',
      url:
       'https://images.unsplash.com/photo-1517685352821-92cf88aee5a5' },
    { name: 'Kaushik Panchal',
      profileURL: 'https://unsplash.com/@kaushikpanchal',
      url:
       'https://images.unsplash.com/photo-1443694910004-3567042689f5' },
    { name: 'Jesse Gardner',
      profileURL: 'https://unsplash.com/@plasticmind',
      url:
       'https://images.unsplash.com/photo-1445264618000-f1e069c5920f' },
    { name: 'Davide Cantelli',
      profileURL: 'https://unsplash.com/@cant89',
      url:
       'https://images.unsplash.com/photo-1475319122043-5ca9eeceefaf' },
    { name: 'Sam Schooler',
      profileURL: 'https://unsplash.com/@sam',
      url:
       'https://images.unsplash.com/photo-1419833173245-f59e1b93f9ee' },
    { name: 'Oscar Söderlund',
      profileURL: 'https://unsplash.com/@messisorder',
      url:
       'https://images.unsplash.com/photo-1505369430974-b1835a0491f7' },
    { name: 'Ales Krivec',
      profileURL: 'https://unsplash.com/@aleskrivec',
      url:
       'https://images.unsplash.com/photo-1503049555010-f8616ee8f0f3' },
    { name: 'Joseph Barrientos',
      profileURL: 'https://unsplash.com/@jbcreate_',
      url:
       'https://images.unsplash.com/photo-1434472007488-8d47f604f644' },
    { name: 'Johannes Plenio',
      profileURL: 'https://unsplash.com/@jplenio',
      url:
       'https://images.unsplash.com/photo-1493243350443-9e3048ce7288' },
    { name: 'Arto Marttinen',
      profileURL: 'https://unsplash.com/@wandervisions',
      url:
       'https://images.unsplash.com/photo-1459236914855-982c6a11b8ee' },
    { name: 'Jason Wong',
      profileURL: 'https://unsplash.com/@jasonhk1920',
      url: 'https://images.unsplash.com/photo-1503662549813-28954e75f215'
    },{
      name: "Brian Cook",
      profileURL: "https://unsplash.com/@briancook5",
      url: "https://images.unsplash.com/photo-1501415753052-e620be3cb38a"
    }
  ],
 
  hc_n:
  [ { name: 'Tom Barrett',
      profileURL: 'https://unsplash.com/@wistomsin',
      url:
       'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b' },
    { name: 'Schalk Neethling',
      profileURL: 'https://unsplash.com/@schalkneethling',
      url: 'https://images.unsplash.com/photo-1545650150-53ad4271adb2' },
    { name: 'Anandu Vinod',
      profileURL: 'https://unsplash.com/@anandu',
      url:
       'https://images.unsplash.com/photo-1500740516770-92bd004b996e' },
    { name: 'Schalk Neethling',
      profileURL: 'https://unsplash.com/@schalkneethling',
      url: 'https://images.unsplash.com/photo-1546013439-d5a5c983d06c' },
    { name: 'Tom Barrett',
      profileURL: 'https://unsplash.com/@wistomsin',
      url:
       'https://images.unsplash.com/photo-1500835176302-48dbd01f6437' },
    { name: 'ZACHARY STAINES',
      profileURL: 'https://unsplash.com/@zaccastravels',
      url:
       'https://images.unsplash.com/photo-1454540723233-f0b9ff08b132' },
    { name: 'Łukasz Łada',
      profileURL: 'https://unsplash.com/@lukaszlada',
      url:
       'https://images.unsplash.com/photo-1493130952181-47e36589f64d' },
    { name: 'Łukasz Łada',
      profileURL: 'https://unsplash.com/@lukaszlada',
      url:
       'https://images.unsplash.com/photo-1496450681664-3df85efbd29f' },
    { name: 'Arto Marttinen',
      profileURL: 'https://unsplash.com/@wandervisions',
      url:
       'https://images.unsplash.com/photo-1475727946784-2890c8fdb9c8' },
    { name: 'Arto Marttinen',
      profileURL: 'https://unsplash.com/@wandervisions',
      url:
       'https://images.unsplash.com/photo-1459445364195-16475050193c' },
    { name: 'Patrick Fore',
      profileURL: 'https://unsplash.com/@patrickian4',
      url:
       'https://images.unsplash.com/photo-1451417379553-15d8e8f49cde' },
    { name: 'Christian Joudrey',
      profileURL: 'https://unsplash.com/@cjoudrey',
      url:
       'https://images.unsplash.com/photo-1492645110833-bf92f4368257' } ],
 
  // showers. rain with some sun // moon
  s: [
    { name: 'Kelly Sikkema',
      profileURL: 'https://unsplash.com/@kellysikkema',
      url:
       'https://images.unsplash.com/photo-1500297211576-5f1628bc4262' },
    { name: 'Pete Nowicki',
      profileURL: 'https://unsplash.com/@shadypete',
      url:
       'https://images.unsplash.com/photo-1449175334484-66563eaeec14' },
    { name: 'Joshua K. Jackson',
      profileURL: 'https://unsplash.com/@joshua',
      url:
       'https://images.unsplash.com/photo-1519226117221-932ddd5522f7' },
    { name: 'Pascal Chanel',
      profileURL: 'https://unsplash.com/@pc911',
      url:
       'https://images.unsplash.com/photo-1450696714834-bb5b4aee70d3' },
    { name: 'dan carlson',
      profileURL: 'https://unsplash.com/@dan_carl5on',
      url:
       'https://images.unsplash.com/photo-1446608943998-cbd52b140335' },
    { name: 'Mark Doda',
      profileURL: 'https://unsplash.com/@markdoda',
      url:
       'https://images.unsplash.com/13/unsplash_523bf67db73f1_1.JPG'
    },{
      name: "Todd Cravens",
      profileURL: "https://unsplash.com/@toddcravens",
      url: "https://images.unsplash.com/photo-1463743981180-c90485a4f274"
    },{
      name: "Micah Hallahan",
      profileURL: "https://unsplash.com/@micah_hallahan",
      url: "https://images.unsplash.com/photo-1446696577247-2fef509e6641"
    },{
      name: "Brian Taylor",
      profileURL: "https://unsplash.com/@batman2",
      url: "https://images.unsplash.com/photo-1544672804-900c962b8213"
    }
  ],
 
 s_n: [],
 
 // ligth rain, drizzle, shower rain. no sun.
  lr: [
    { name: '兆航 樊',
      profileURL: 'https://unsplash.com/@bolijojo',
      url: 'https://images.unsplash.com/photo-1524476007393-f88428db5c02' },
    { name: 'freddie marriage',
      profileURL: 'https://unsplash.com/@fredmarriage',
      url: 'https://images.unsplash.com/photo-1485797460056-2310c82d1213' },
    { name: 'reza shayestehpour',
      profileURL: 'https://unsplash.com/@r_shayesrehpour',
      url: 'https://images.unsplash.com/photo-1428592953211-077101b2021b' },
    { name: 'Riley Briggs',
      profileURL: 'https://unsplash.com/@rileybriggs',
      url: 'https://images.unsplash.com/18/trickle.JPG' },
    { name: 'Noah Silliman',
      profileURL: 'https://unsplash.com/@noahsilliman',
      url: 'https://images.unsplash.com/photo-1477847616630-cf9cf8815fda' },
    { name: 'Nick Scheerbart',
      profileURL: 'https://unsplash.com/@nck',
      url: 'https://images.unsplash.com/photo-1476044591369-74ee6ac6899c'
    },{
      name: "Jessie Bell",
      profileURL: "https://unsplash.com/@jessbowbess",
      url: "https://images.unsplash.com/photo-1430769860170-bea225f02277"
    },{
      name: "James Zwadlo",
      profileURL: "https://unsplash.com/@jzwadlo",
      url: "https://images.unsplash.com/photo-1462040700793-fcd2dbc0edf0"
    },{
      name: "Francesco Gallarotti",
      profileURL: "https://unsplash.com/@gallarotti",
      url: "https://images.unsplash.com/photo-1415394171664-b29caa4dca77"
    },{
      name: "Ana Silva",
      profileURL: "https://unsplash.com/@noqas",
      url: "https://images.unsplash.com/photo-1469225297065-2fd47d56c9c4"
    },{
      name: "Andrea Rosina",
      profileURL: "https://unsplash.com/@geobracc",
      url: "https://images.unsplash.com/photo-1557238236-d4fa6f18b32a"
    }, {
      name: "Patrick Hendry",
      profileURL: "https://unsplash.com/@worldsbetweenlines",
      url: "https://images.unsplash.com/photo-1550548660-fc8d761b6ae7"
    }, {
      name: "Tomas Robertson",
      profileURL: "https://unsplash.com/@tomasrobertson",
      url: "https://images.unsplash.com/photo-1553182648-061019fa5e86"
    }
  ],
 
 lr_n: [
    { name: 'Ohmky',
      profileURL: 'https://unsplash.com/@ohmky2540',
      url: 'https://images.unsplash.com/photo-1536424868245-13b715e11e71' },
    { name: 'Todd Diemer',
      profileURL: 'https://unsplash.com/@todd_diemer',
      url: 'https://images.unsplash.com/photo-1468476396571-4d6f2a427ee7' },
    { name: 'Luca Bravo',
      profileURL: 'https://unsplash.com/@lucabravo',
      url: 'https://images.unsplash.com/photo-1521794286957-348245b517a0' },
    { name: 'Luca Bravo',
      profileURL: 'https://unsplash.com/@lucabravo',
      url: 'https://images.unsplash.com/photo-1521794414102-37606728dd9c' },
    {
      name: 'Joshua K. Jackson',
      profileURL: 'https://unsplash.com/@joshua',
      url: 'https://images.unsplash.com/photo-1519219481154-3def552ca367'
    },{
      name: 'Geetanjal Khanna',
      profileURL: 'https://unsplash.com/@geetanjalkhanna',
      url: 'https://images.unsplash.com/photo-1460013477427-b0cce3e30151'
    },{
      name: 'reza shayestehpour',
      profileURL: 'https://unsplash.com/@r_shayesrehpour',
      url: 'https://images.unsplash.com/photo-1428592953211-077101b2021b'
    },{
      name: 'Gabriel Santiago',
      profileURL: 'https://unsplash.com/@whileimout',
      url: 'https://images.unsplash.com/photo-1432836431433-925d3cc0a5cd'
    },{
      name: "Rowan Heuvel",
      profileURL: "Rowan Heuvel",
      url: "https://images.unsplash.com/photo-1438260483147-81148f799f25"
    }
  ],
 
  // heavy rain, shower rain.
  hr: [
    { name: 'Noah Silliman',
      profileURL: 'https://unsplash.com/@noahsilliman',
      url: 'https://images.unsplash.com/photo-1493314894560-5c412a56c17c' },
    { name: 'Eutah Mizushima',
      profileURL: 'https://unsplash.com/@eutahm',
      url: 'https://images.unsplash.com/photo-1437624155766-b64bf17eb2ce' },
    { name: 'Christopher',
      profileURL: 'https://unsplash.com/@kismet',
      url: 'https://images.unsplash.com/photo-1434118489318-42a0e62c6235' },
    { name: 'michael podger',
      profileURL: 'https://unsplash.com/@jammypodger7470',
      url: 'https://images.unsplash.com/photo-1494007485290-ce668e189d92' },
    { name: 'Anjana Menon',
      profileURL: 'https://unsplash.com/@anjimenon',
      url: 'https://images.unsplash.com/photo-1487762488615-8a011458b53e' },
    { name: 'Thanun Buranapong',
      profileURL: 'https://unsplash.com/@thanunburanapong',
      url: 'https://images.unsplash.com/19/drops.JPG' },
    { name: 'Lola Guti',
      profileURL: 'https://unsplash.com/@lolaguti',
      url: 'https://images.unsplash.com/photo-1444384851176-6e23071c6127'
    },{
      name: "Mete Myagkiy",
      profileURL: "https://unsplash.com/@mmiyahki",
      url: "https://images.unsplash.com/photo-1493985925742-321dd437e002"
    },{
      name: "Paul Rysz",
      profileURL: "https://unsplash.com/@paulrysz",
      url: "https://images.unsplash.com/photo-1496102592344-dfc6d617e6fb"
    },{
      name: "Anna King",
      profileURL: "https://unsplash.com/@ak1",
      url: "https://images.unsplash.com/photo-1498847559558-1e4b1a7f7a2f"
    },{
      name: "Ameen Fahmy",
      profileURL: "https://unsplash.com/@ameenfahmy_",
      url: "https://images.unsplash.com/photo-1494694081617-38b4cba8fc36"
    }
  ],
 
  hr_n: [
    { name: 'pan xiaozhen',
      profileURL: 'https://unsplash.com/@zhenhappy',
      url: 'https://images.unsplash.com/photo-1501999635878-71cb5379c2d8' },
    { name: 'Dollar Gill',
      profileURL: 'https://unsplash.com/@dollargill',
      url: 'https://images.unsplash.com/photo-1550938147-1202a4c1aa3e' },
    { name: 'Dollar Gill',
      profileURL: 'https://unsplash.com/@dollargill',
      url: 'https://images.unsplash.com/photo-1550938156-61ae75ffe4cc' },
    { name: 'Dollar Gill',
      profileURL: 'https://unsplash.com/@dollargill',
      url: 'https://images.unsplash.com/photo-1550938156-a474a8d5e253' },
    { name: 'Dollar Gill',
      profileURL: 'https://unsplash.com/@dollargill',
      url: 'https://images.unsplash.com/photo-1550938147-146607757c41'
    },{
      name: "Dominik Schröder",
      profileURL: "https://unsplash.com/@wirhabenzeit",
      url: "https://images.unsplash.com/photo-1428908200541-d395094cc816"
    }
  ],
 
 // thunderstorm
  t: [
    { name: 'Ryan Phillips',
      profileURL: 'https://unsplash.com/@ryphillips',
      url: 'https://images.unsplash.com/photo-1537908829143-c49accec9f80' },
    { name: 'Layne Lawson',
      profileURL: 'https://unsplash.com/@laynelawson',
      url: 'https://images.unsplash.com/photo-1465799522714-8eb0e6fccf73' },
    { name: 'Dejan Zakic',
      profileURL: 'https://unsplash.com/@dejan_kide',
      url: 'https://images.unsplash.com/photo-1529220100082-80957b04a221' },
    { name: 'Ronald Langeveld',
      profileURL: 'https://unsplash.com/@ronaldlangeveld',
      url: 'https://images.unsplash.com/photo-1516188239414-6bfa485294d8' },
    { name: 'Jeremy Thomas',
      profileURL: 'https://unsplash.com/@jeremythomasphoto',
      url: 'https://images.unsplash.com/photo-1472145246862-b24cf25c4a36' },
    { name: 'Johannes Plenio',
      profileURL: 'https://unsplash.com/@jplenio',
      url: 'https://images.unsplash.com/photo-1500674425229-f692875b0ab7' },
    { name: 'Jeremy Bishop',
      profileURL: 'https://unsplash.com/@jeremybishop',
      url: 'https://images.unsplash.com/photo-1457528877294-b48235bdaa68' },
    { name: 'Angela Compagnone',
      profileURL: 'https://unsplash.com/@angelacompagnone',
      url: 'https://images.unsplash.com/photo-1505144992585-d281c0e2cff8' },
    { name: 'Felix Mittermeier',
      profileURL: 'https://unsplash.com/@felixmittermeier',
      url: 'https://images.unsplash.com/photo-1537210249814-b9a10a161ae4' },
    { name: 'Josep Castells',
      profileURL: 'https://unsplash.com/@paniscusbcn',
      url: 'https://images.unsplash.com/photo-1516490981167-dc990a242afe' },
    { name: 'Johannes Plenio',
      profileURL: 'https://unsplash.com/@jplenio',
      url: 'https://images.unsplash.com/photo-1504123010103-b1f3fe484a32' },
    { name: 'Breno Machado',
      profileURL: 'https://unsplash.com/@brenomachado',
      url: 'https://images.unsplash.com/photo-1431440869543-efaf3388c585' } ],
 
 // hail, freezing rain
 h: [
  {
    name: 'Lola Guti',
    profileURL: 'https://unsplash.com/@lolaguti',
    url: 'https://images.unsplash.com/photo-1444384851176-6e23071c6127'
  }
 ],
 
 // sleet (Schneeregen)
 sl: [
  {
    name: 'Lola Guti',
    profileURL: 'https://unsplash.com/@lolaguti',
    url: 'https://images.unsplash.com/photo-1444384851176-6e23071c6127'
  },{ name: 'Dollar Gill',
    profileURL: 'https://unsplash.com/@dollargill',
    url: 'https://images.unsplash.com/photo-1550938147-1202a4c1aa3e'
  },{
    name: 'Dollar Gill',
    profileURL: 'https://unsplash.com/@dollargill',
    url: 'https://images.unsplash.com/photo-1550938156-61ae75ffe4cc'
  },{ name: 'Dollar Gill',
    profileURL: 'https://unsplash.com/@dollargill',
    url: 'https://images.unsplash.com/photo-1550938156-a474a8d5e253'
  },{
    name: "Dominik Schröder",
    profileURL: "https://unsplash.com/@wirhabenzeit",
    url: "https://images.unsplash.com/photo-1428908200541-d395094cc816"
  }
 ],
 
 // snow
 sn: [
  {
    name: "Osman Rana",
    profileURL: "https://unsplash.com/@osmanrana",
    url: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef"
  },{
    name: "Daud Balling",
    profileURL: "https://unsplash.com/@daudballing",
    url: "https://images.unsplash.com/photo-1540682814466-3d84fee22c49" 
  },{
    name: "Anastasia Vityukova",
    profileURL: "https://unsplash.com/@anastasiavitph",
    url: "https://images.unsplash.com/photo-1548541501-d01cd9e06074"
  },{
    name: "Jonathan Knepper",
    profileURL: "https://unsplash.com/@jknepp",
    url: "https://images.unsplash.com/photo-1542254503-d802f00c2342"
  },{
    name: "Cody Chan",
    profileURL: "https://unsplash.com/@cceee",
    url: "https://images.unsplash.com/photo-1549989142-806009a4efde"
  },{
    name: "Artiom Vallat",
    profileURL: "https://unsplash.com/@virussinside",
    url: "https://images.unsplash.com/photo-1552653291-82b40fe924e6"
  },{
    name: "Jessica Fadel",
    profileURL: "https://unsplash.com/@jessicalfadel",
    url: "https://images.unsplash.com/photo-1511131341194-24e2eeeebb09"
  },{
    name: "Aaron Burden",
    profileURL: "https://unsplash.com/@aaronburden",
    url: "https://images.unsplash.com/photo-1457269449834-928af64c684d"
  },{
    name: "Aaron Burden",
    profileURL: "https://unsplash.com/@aaronburden",
    url: "https://images.unsplash.com/photo-1457270508644-1e4905fabd7e"
  },{
    name: "Aaron Burden",
    profileURL: "https://unsplash.com/@aaronburden",
    url: "https://images.unsplash.com/photo-1454688515140-ce3372b1b6f8"
  },{
    name: "Jeffrey Blum",
    profileURL: "https://unsplash.com/@jeffreyblum",
    url: "https://images.unsplash.com/photo-1506978520653-bb3accebb1a3"
  },{
    name: "Jeffrey Blum",
    profileURL: "https://unsplash.com/@jeffreyblum",
    url: "https://images.unsplash.com/photo-1518035192191-9872107848e7"
  },{
    name: "Brian Jones",
    profileURL: "https://unsplash.com/@caslad48",
    url: "https://images.unsplash.com/photo-1516431883659-655d41c09bf9"
  },{
    name: "Adam Chang",
    profileURL: "https://unsplash.com/@sametomorrow",
    url: "https://images.unsplash.com/photo-1491002052546-bf38f186af56"
  },{
    name: "Noah Silliman",
    profileURL: "https://unsplash.com/@noahsilliman",
    url: "https://images.unsplash.com/photo-1487204370947-961cb4f261da"
  },{
    name: "Ray Hennessy",
    profileURL: "https://unsplash.com/@rayhennessy",
    url: "https://images.unsplash.com/photo-1480775292373-5175d0634811"
  },{
    name: "Torbjorn Sandbakk",
    profileURL: "https://unsplash.com/@torbjs",
    url: "https://images.unsplash.com/photo-1489868155831-faf942b596e5"
  },{
    name: "Jonny McNee",
    profileURL: "https://unsplash.com/@jmcnee",
    url: "https://images.unsplash.com/photo-1483056293146-9eac9521932f"
  },{
    name: "Tyson Dudley",
    profileURL: "https://unsplash.com/@ty_dudley",
    url: "https://images.unsplash.com/photo-1470883361187-d6eaa64cdf00"
  },{
    name: "Takemaru Hirai",
    profileURL: "https://unsplash.com/@takemaru",
    url: "https://images.unsplash.com/photo-1544274411-a7afe6230711"
  }

 ],
 
 // 7xx Atmosphere, fog
  fog: [
    { name: 'Johannes Plenio',
      profileURL: 'https://unsplash.com/@jplenio',
      url: 'https://images.unsplash.com/photo-1500673922987-e212871fec22' },
    { name: 'Kristine Weilert',
      profileURL: 'https://unsplash.com/@kristineweilert',
      url: 'https://images.unsplash.com/photo-1462290625486-c142817fb94d' },
    { name: 'Teddy Kelley',
      profileURL: 'https://unsplash.com/@teddykelley',
      url: 'https://images.unsplash.com/photo-1458935416903-006892a9d8ca' },
    { name: 'Phoebe Strafford',
      profileURL: 'https://unsplash.com/@phoebeann',
      url: 'https://images.unsplash.com/photo-1446729444801-31245ddba81a' },
    { name: 'Susan Yin',
      profileURL: 'https://unsplash.com/@syinq',
      url: 'https://images.unsplash.com/photo-1461397932544-11132a69bf46' },
    { name: 'Thomas Griesbeck',
      profileURL: 'https://unsplash.com/@jack_scorner',
      url: 'https://images.unsplash.com/photo-1476362555312-ab9e108a0b7e' },
    { name: 'Roksolana Zasiadko',
      profileURL: 'https://unsplash.com/@cieloadentro',
      url: 'https://images.unsplash.com/photo-1469106233956-20341cc41f8b' },
    { name: 'Taylor Leopold',
      profileURL: 'https://unsplash.com/@taylorleopold',
      url: 'https://images.unsplash.com/reserve/D9xlw7UxTBqQw5sLf8cJ_reef%20insp-72.jpg' },
    { name: 'Sebastian Unrau',
      profileURL: 'https://unsplash.com/@sebastian_unrau',
      url: 'https://images.unsplash.com/photo-1440847899694-90043f91c7f9' },
    { name: 'Tevin Trinh',
      profileURL: 'https://unsplash.com/@tevintrinh',
      url: 'https://images.unsplash.com/photo-1515789978829-1418c77d67f6' },
    { name: 'Sebastian Unrau',
      profileURL: 'https://unsplash.com/@sebastian_unrau',
      url: 'https://images.unsplash.com/photo-1445964047600-cdbdb873673d' },
    { name: 'Johannes Plenio',
      profileURL: 'https://unsplash.com/@jplenio',
      url: 'https://images.unsplash.com/photo-1518562180175-34a163b1a9a6' },
    { name: 'Sebastian Unrau',
      profileURL: 'https://unsplash.com/@sebastian_unrau',
      url: 'https://images.unsplash.com/photo-1448375240586-882707db888b' },
    { name: 'Justin Luebke',
      profileURL: 'https://unsplash.com/@jluebke',
      url: 'https://images.unsplash.com/photo-1446602320560-d871472aa0b9' },
    { name: 'Matthew Henry',
      profileURL: 'https://unsplash.com/@matthewhenry',
      url: 'https://images.unsplash.com/photo-1449157291145-7efd050a4d0e'
    },{
      name: "Sensei Minimal",
      profileURL: "https://unsplash.com/@senseiminimal",
      url: "https://images.unsplash.com/photo-1508179070693-6f044d6d1c43"
    }
  ]
}
       

export { weatherPictures };


//////////////////////////////////////////////////////
/*=========================*/
//#region CHECK COLLECTION //

/*
https://images.unsplash.com/photo-1484960055659-a39d25adcb3c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80

*/
/* 
function writeNewCollection() {
  let newObj = {};
  for (cat in weatherPictures) {
    newObj[cat] = [];
    weatherPictures[cat].forEach( pic => {
      let newUrl = pic.url.slice(0, pic.url.indexOf("?") );
      let ixlib = "ixlib=rb-1.2.1";
      let ixid = "ixid=eyJhcHBfaWQiOjEyMDd9";
      let format = "auto=format";
      let fit = "fit=crop";
      let width = "w=500"
      let height = "h=1000";
      let quality = "q=80";
      // newUrl += `${ixlib}&${ixid}&${format}&${fit}&${width}&${height}&${quality}`;
      
      newObj[cat].push( {
        name : pic.name,
        profileURL : pic.profileURL,
        url : newUrl
      });
    });
  }
  return newObj;
} */

function analyseImageCollection() {
  let info = {
    insgesamt: 0
  };
  let dublicates = [];
  let all = [];
  for (let el in weatherPictures) {
    info[el] = weatherPictures[el].length;
    weatherPictures[el].forEach( e => {
      if (all.includes(e.url) && ! dublicates.includes(e) ) {
        dublicates.push( Object.assign( {}, e) );
      }
      all.push(e.url);
      info.insgesamt++;
    });

  }
  console.log("Bilder pro Kategorie:");
  console.table(info);
  console.log("Dublikate:");
  console.log(dublicates);
}

analyseImageCollection();


//#endregion