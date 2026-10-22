
/* ═════════ 아르젠트 대공성 · 바깥 ═════════ */
newArea('castle','대공성 마당',64,58,',',{outdoor:1,def:'grounds',group:'castle'});
fill(0,0,64,1,'%');fill(0,57,64,1,'%');fill(0,0,1,58,'%');fill(63,0,1,58,'%');put([[31,57],[32,57]],'G');
// 길
fill(31,18,2,39,':');fill(3,20,58,2,':');fill(7,22,2,20,':');fill(53,22,2,20,':');fill(9,30,22,1,':');fill(33,30,20,1,':');
fill(43,18,1,2,':');fill(8,18,1,2,':');fill(54,18,1,2,':');fill(55,7,1,1,':');fill(47,7,9,1,':');fill(47,7,1,13,':');fill(6,29,1,1,':');fill(3,42,20,1,':');fill(19,41,1,1,':');fill(53,42,1,1,':');
// 건물
bld('keep','본관',18,3,28,15,'#4e5a72','#cfc8bc',31,null,{wr:3,style:'stone',door2:32,back:43});
bld('servq','서쪽 별관 · 사용인 숙소',3,8,12,10,'#8a5a4a','#e6dccb',8,null,{wr:2,style:'timber'});
bld('wash','세탁장',2,23,9,6,'#6a7a8a','#e8e2d6',6,null,{wr:2});
bld('annex','동쪽 별관 · 연회장',48,8,13,10,'#6a5a7a','#e6e0d4',54,null,{wr:2,style:'stone'});
bld('green','동관 온실',50,2,10,5,'#bfe0dc','#d6eeea',55,null,{wr:1,style:'glass'});
bld('kq','기사단 숙소',2,32,12,9,'#5a4a3a','#d8ccb8',7,null,{wr:2,style:'timber'});
bld('armory','무기고',16,34,7,7,'#5a5a62','#b8b2a8',19,null,{wr:2,style:'stone'});
bld('stable','마구간',46,33,14,9,'#8a4a3a','#d8c4a4',53,null,{wr:2,style:'timber'});
// 분수 정원
fill(22,22,20,13,',');fill(22,26,20,1,':');fill(22,30,20,1,':');fill(31,22,2,13,':');fill(26,24,12,9,':');fill(30,27,4,3,'F');
for(let x=22;x<42;x++){if(x<30||x>33){A.map[22][x]='z';A.map[34][x]='z';}}for(let y=23;y<34;y++){if(y!==26&&y!==30){A.map[y][22]='z';A.map[y][41]='z';}}
put([[27,25],[36,25],[27,31],[36,31]],'Y');put([[24,24],[39,24],[24,32],[39,32],[25,28],[38,28]],'f');put([[29,24],[34,24],[29,32],[34,32]],'l');
// 텃밭 · 장작
for(const [x,y] of [[44,23],[45,23],[46,23],[44,25],[45,25],[46,25],[48,23],[49,23],[48,25],[49,25]])A.map[y][x]='e';
fill(43,22,8,1,'=');
// 세탁장 마당
// 훈련장
fill(2,43,22,12,'x');fill(2,43,22,1,'=');fill(2,54,22,1,'=');fill(2,43,1,12,'=');fill(23,43,1,12,'=');A.map[43][7]='x';A.map[43][8]='x';A.map[43][19]='x';
// 방목장
fill(46,44,16,11,',');fill(46,44,16,1,'=');fill(46,54,16,1,'=');fill(46,44,1,11,'=');fill(61,44,1,11,'=');A.map[44][53]=',';A.map[44][54]=',';
// 나무 · 꽃 · 등
put([[2,2],[5,2],[9,3],[13,2],[2,5],[16,2],[47,1],[61,9],[61,13],[61,24],[61,28],[16,24],[18,27],[15,30],[19,32],[44,29],[48,29],[50,31],[58,23],[61,40],[25,38],[28,44],[35,44],[38,40],[42,48],[44,52],[40,53],[27,50],[36,50],[11,1],[61,2],[25,1],[38,1]],'t');
put([[20,2],[46,2],[60,20],[2,15],[16,15],[16,20],[45,37],[24,47],[39,46]],'I');
put([[17,18],[46,18],[30,18],[33,18],[19,21],[23,36],[39,36],[42,32],[13,28],[14,26],[57,30],[26,46],[37,47],[29,54],[34,54]],'f');
put([[30,21],[33,21],[30,40],[33,40],[30,52],[33,52],[9,21],[52,21],[6,30],[55,30],[20,42]],'l');put([[10,21]],'u');put([[34,19]],'g');
put([[15,19],[17,22],[44,21],[50,21]],'z');
A.floor=A.map.map(r=>r.map(c=>':'.includes(c)?':':c==='x'?'x':','));
for(let y=43;y<55;y++)for(let x=2;x<24;x++)if(A.map[y][x]==='=')A.floor[y][x]='x';
ob('woodpile',38,18,3,1,{it:'woodpile'});ob('line',12,24,5,1,{walk:1});ob('line',12,27,5,1,{walk:1});ob('basket',11,26,1,1,{walk:0,it:'basket'});
ob('dummy',5,47);ob('dummy',9,47);ob('dummy',13,47);ob('target',18,46);ob('target',21,46);ob('weaponrack',16,52,3,1);ob('bench',4,52,2,1,{walk:1});
ob('horse',50,48,2,1,{c:'#2a2228',it:'warhorse'});ob('horse',56,51,2,1,{c:'#c8b090'});ob('hay',59,46,2,1);ob('gazebo',24,27,2,2,{it:'gazebo'});ob('statue',39,27,1,1,{it:'statue'});
A.OUT=[['plaza','분수 정원',22,22,20,13],['training','기사단 훈련장',2,43,22,12],['gate','성문 앞',26,50,12,7],['paddock','방목장',46,44,16,11],['kgarden','텃밭',43,22,8,5],['yard_w','세탁장 마당',2,22,17,8]];
A.doors.push({x:31,y:57,to:'town',ax:24,ay:2,dir:0,gate:1},{x:32,y:57,to:'town',ax:25,ay:2,dir:0,gate:1});
link('keep',31,'keep',28,35);link('keep',32,'keep',29,35);link('keep',43,'keep',52,35);link('servq',8,'servq',15,18);link('wash',6,'wash',8,8);
link('annex',54,'annex',14,15);link('green',55,'green',9,9);link('kq',7,'kq',12,15);link('armory',19,'armory',6,8);link('stable',53,'stable',11,9);
spots('k_garden',[[28,28,3,'stand',25],[35,28,2,'stand',25],[31,33,1,'stand',20],[27,25,0,'sit',30]]);
spots('t_play',[[31,24,0,'stand',8],[35,29,2,'stand',6],[28,31,3,'stand',6],[24,26,0,'stand',8]]);
spots('r_train',[[6,46,0,'stand',10],[10,46,0,'stand',10],[16,49,2,'stand',8],[20,47,1,'stand',8]]);
spots('d_train',[[8,49,0,'stand',8],[12,49,1,'stand',8],[17,46,3,'stand',8]]);
spots('kn_train',[[5,50,1,'stand',10],[9,50,1,'stand',10],[13,50,1,'stand',10],[19,50,2,'stand',8]]);
spots('kn_gate',[[29,55,0,'stand',60],[34,55,0,'stand',60]]);spots('d_guard',[[30,54,0,'stand',60]]);
spots('k_gate',[[31,54,1,'stand',99]]);spots('g_paddock',[[49,47,0,'stand',15],[55,50,2,'stand',15],[58,47,2,'stand',10]]);
spots('m_line',[[13,25,1,'stand',15],[15,28,1,'stand',15]]);spots('c_garden',[[25,24,0,'stand',20],[37,33,1,'stand',20],[27,31,0,'sit',30]]);
spots('e_round',[[31,19,0,'stand',20],[45,19,2,'stand',15],[40,20,1,'stand',15]]);spots('t_wood',[[37,19,3,'stand',10],[41,19,2,'stand',10]]);

/* ═════════ 본관 ═════════ */
newArea('keep','본관',58,37,'#',{group:'castle',wall:'cream'});
room('kbed','대공 침실',1,1,10,9,'C','navy');room('office','집무실',12,1,10,9,'.','wood');room('library','서재',23,1,12,9,'.','green');room('parlor','응접실',36,1,10,9,'c','rose');room('guest','손님방',47,1,10,9,'.','cream');
room('hallN','중앙 복도',1,11,56,4,'.','gold');
room('myroom','부집사의 방',1,16,8,10,'.','cream');room('butler','집사실',10,16,8,10,'.','sage');room('infirmary','의무실',19,16,5,10,'k','white');room('grand','중앙 계단홀',25,16,8,10,'m','gold');
room('dining','식당',34,16,12,10,'.','rose');room('kitchen','주방',47,16,10,10,'k','white');
room('storage','창고',1,27,11,9,'s','stone');room('entrance','현관 홀',13,27,33,9,'m','gold');room('pantry','식료품 창고',47,27,10,9,'s','stone');
[6,17,29,41,52].forEach(x=>door(x,10));[5,14,21,26,31,36,51].forEach(x=>door(x,15));[28,29,40,51].forEach(x=>door(x,26));sdoor(46,21);sdoor(12,32);sdoor(46,32);
[[4,1],[8,1],[16,1],[29,1],[39,1],[43,1],[50,1],[54,1],[3,16],[12,16],[43,16],[54,16],[17,27],[23,27],[35,27],[41,27]].forEach(([x,y])=>win(x,y));
exitTo(28,36,'castle',31,18,0);exitTo(29,36,'castle',32,18,0);exitTo(52,36,'castle',43,18,0);exitTo(56,29,'cellar',2,4,0,'>');
// 대공 침실
ob('rug',3,6,5,3,{c:'#3e5680',walk:1});ob('bed',3,3,2,3,{c:'#3e4c6e',it:'kbed'});ob('plant',1,3,1,1,{tall:1});ob('dresser',6,3,2,1,{mirror:1,it:'kdresser'});ob('wardrobe',9,3,2,1,{it:'kwardrobe'});
ob('armchair',9,7,1,1,{d:2,c:'#3e4c6e',walk:1});ob('lamp',1,8);ob('painting',2,1,2,2,{walk:1,c:'#4a5a7a'});
// 집무실
ob('rug',14,6,5,3,{c:'#6a8a5a',walk:1});ob('shelf',12,3,2,1,{it:'ledgers'});ob('shelf',20,3,2,1,{it:'ledgers'});ob('chair',16,4,1,1,{d:0,walk:1});ob('desk',15,5,3,1,{it:'kdesk'});
ob('sofa',14,8,3,1,{d:1,c:'#5a3a2c'});ob('globe',12,8);ob('plant',21,8);ob('painting',18,1,2,2,{walk:1,portrait:1});ob('clock',12,6);
// 서재
ob('shelf',23,3,3,1,{it:'books'});ob('shelf',26,3,3,1,{it:'books'});ob('shelf',30,3,3,1,{it:'books'});ob('shelf',33,3,2,1,{it:'books'});
ob('rug',26,6,5,3,{c:'#4f6e50',walk:1});ob('table',27,6,3,1,{c:'#4f6e50'});ob('chair',28,7,1,1,{d:1,walk:1});ob('chair',26,6,1,1,{d:3,walk:1});ob('armchair',33,7,1,1,{d:2,c:'#6a4a3a',walk:1});ob('globe',23,8);ob('lamp',34,9);ob('books_pile',24,9);
// 응접실
ob('rug',38,4,6,4,{c:'#a8505e',walk:1});ob('fireplace',40,3,2,1,{deco:1});ob('armchair',38,5,1,1,{d:3,c:'#c48a8e',walk:1});ob('armchair',43,5,1,1,{d:2,c:'#c48a8e',walk:1});
ob('table',40,5,2,1,{cups:1,it:'teatable'});ob('sofa',39,7,4,1,{d:1,c:'#8e3848'});ob('piano',36,8,2,1,{it:'piano'});ob('cabinet',44,3,2,1);ob('plant',36,3,1,1,{tall:1});ob('painting',37,1,2,2,{walk:1,c:'#c08a6a'});
// 손님방
ob('rug',50,6,4,3,{c:'#c48a8e',walk:1});ob('bed',48,3,2,3,{c:'#c48a8e',it:'gbed'});ob('dresser',51,3,2,1,{mirror:1});ob('wardrobe',55,3,2,1);ob('armchair',55,8,1,1,{d:2,walk:1,c:'#e0c0c4'});ob('table',53,8,1,1,{vase:1});ob('plant',47,9);
// 중앙 복도
ob('rug',2,13,54,2,{c:'#8e3848',walk:1});[[3,11],[9,11],[19,11],[33,11],[45,11],[55,11]].forEach(([x,y],i)=>ob('painting',x,y,2,2,{walk:1,c:['#6a8ac0','#c08a6a','#7a9a6a','#a87ab0','#c8a060','#6a7a9a'][i],portrait:i===3}));
ob('plant',1,13);ob('plant',56,13);
// 부집사의 방
ob('rug',3,21,4,2,{c:'#c8a070',walk:1});ob('bed',1,18,1,2,{c:'#7a8a5a',it:'mybed'});ob('desk',3,18,2,1,{it:'mydesk'});ob('chair',3,19,1,1,{d:1,walk:1});ob('wardrobe',7,18,2,1,{it:'mywardrobe'});
ob('table',6,23,2,1,{chess:1,it:'chess'});ob('chair',5,23,1,1,{d:3,walk:1});ob('chair',8,23,1,1,{d:2,walk:1});ob('chest',1,24,1,1,{it:'mychest'});ob('plant',1,21);
// 집사실
ob('rug',11,21,6,3,{c:'#6a7a5a',walk:1});ob('shelf',10,18,2,1,{it:'diaries'});ob('chair',13,18,1,1,{d:0,walk:1});ob('desk',12,19,3,1,{it:'edesk'});ob('cabinet',16,18,2,1);ob('bed',17,22,1,2,{c:'#5a6e5a'});
ob('clock',10,22);ob('table',12,24,2,1,{chess:1});ob('chair',11,24,1,1,{d:3,walk:1});ob('chair',14,24,1,1,{d:2,walk:1});
// 의무실
ob('bed',19,18,1,2,{c:'#e8e8e0',it:'ibed'});ob('bed',23,18,1,2,{c:'#e8e8e0',it:'ibed'});ob('screen',19,21,1,1);ob('medcab',22,23,2,1,{it:'medcab'});ob('stool',20,24,1,1,{walk:1});ob('plant',19,25);
// 계단홀
ob('rug',27,21,4,5,{c:'#8e3848',walk:1});ob('stairs',27,18,4,3,{it:'stairs'});ob('plant',25,18,1,1,{tall:1});ob('plant',32,18,1,1,{tall:1});ob('armor',25,23);ob('armor',32,23);
// 식당
ob('rug',35,20,10,4,{c:'#8e3848',walk:1});ob('fireplace',40,18,2,1,{deco:1});ob('cabinet',43,18,2,1,{it:'dishes'});ob('cabinet',34,18,1,1);
ob('table',36,21,8,2,{c:'#f4ecd8',set:1,it:'dtable'});[37,39,41].forEach(x=>{ob('chair',x,20,1,1,{d:0,walk:1});ob('chair',x,23,1,1,{d:1,walk:1});});ob('chair',35,21,1,1,{d:3,walk:1});ob('chair',44,21,1,1,{d:2,walk:1,c:'#8e3848'});
ob('plant',45,25);ob('painting',37,16,2,2,{walk:1,c:'#7a9a6a'});
// 주방
ob('stove',47,18,2,1,{it:'stove'});ob('counter',49,18,2,1,{items:1});ob('sink',52,18,1,1,{it:'sink'});ob('counter',53,18,3,1,{items:1});ob('cabinet',56,18,1,1);
ob('table',50,21,3,2,{it:'prep'});ob('barrel',56,24);ob('barrel',56,25);ob('sack',55,25);ob('counter',47,24,2,1,{items:1});
// 창고
ob('shelf',5,29,3,1,{it:'storage'});ob('boxes',1,29,3,1,{it:'storage'});ob('barrel',9,29);ob('barrel',10,29);ob('crate',1,33);ob('crate',2,33);ob('crate',1,34);ob('sack',9,34);ob('sack',10,34);ob('sack',10,33);
// 현관
ob('rug',26,31,6,5,{c:'#8e3848',walk:1});ob('pillar',18,30);ob('pillar',39,30);ob('armor',24,29);ob('armor',33,29);ob('bench',14,33,2,1,{walk:1});ob('bench',43,33,2,1,{walk:1});
ob('plant',13,29,1,1,{tall:1});ob('plant',45,29,1,1,{tall:1});ob('clock',35,29);ob('painting',20,27,3,2,{walk:1,c:'#4e5a72'});ob('painting',36,27,3,2,{walk:1,c:'#7a6a4a'});
// 식료품 창고
ob('shelf',47,29,2,1,{it:'jars'});ob('shelf',53,29,2,1,{it:'jars'});ob('crate',49,33,1,1,{fill:'#c8a070',it:'potato'});ob('crate',50,33,1,1,{fill:'#c8a070',it:'potato'});ob('crate',49,34,1,1,{it:'potato'});
ob('sack',49,35);ob('sack',50,35);ob('barrel',55,33);ob('barrel',56,33);ob('table',53,32,2,1,{it:'pledger'});
spots('k_bed',[[5,7,0,'sleep',999]]);spots('k_desk',[[16,4,0,'sit',99]]);spots('k_dine',[[44,21,2,'sit',99]]);spots('k_lib',[[24,4,1,'read',25],[31,4,1,'read',25],[28,7,1,'sit',40]]);
spots('k_pantry',[[51,31,2,'stand',99]]);spots('k_visit',[[8,23,2,'sit',99]]);spots('k_hall',[[29,32,0,'stand',99]]);spots('k_parlor',[[38,5,3,'sit',60]]);spots('k_inf',[[21,20,2,'stand',99]]);
spots('e_door',[[27,33,0,'stand',30],[30,33,0,'stand',20]]);spots('e_grand',[[29,23,0,'stand',20],[26,20,3,'stand',15]]);spots('e_desk',[[13,18,0,'sit',90]]);spots('e_dine',[[45,22,2,'stand',99]]);
spots('e_bed',[[16,22,2,'sleep',999]]);spots('e_dep',[[6,20,2,'stand',99]]);spots('e_hall',[[10,13,0,'stand',15],[30,14,0,'stand',15],[48,13,0,'stand',15]]);
spots('b_cook',[[48,19,1,'stand',20],[51,20,0,'stand',20],[52,19,1,'stand',12],[48,23,0,'stand',10]]);spots('b_party',[[37,23,1,'sit',99]]);
spots('t_eat',[[49,20,1,'stand',30]]);spots('r_snack',[[53,22,2,'stand',30]]);spots('m_party',[[39,20,0,'sit',99]]);spots('r_party',[[41,20,0,'sit',99]]);
spots('m_parlor',[[37,7,1,'stand',15],[44,7,1,'stand',15],[41,8,1,'stand',12]]);spots('m_clean',[[7,7,1,'stand',20],[52,7,1,'stand',20],[30,14,0,'stand',15],[38,24,1,'stand',15]]);
spots('n_clean',[[5,13,0,'stand',20],[24,13,1,'stand',20],[40,14,0,'stand',20],[30,33,0,'stand',20],[15,31,1,'stand',20],[55,13,1,'stand',15]]);
spots('n_rooms',[[7,7,1,'stand',25],[52,7,1,'stand',25],[27,8,1,'stand',25],[19,7,1,'stand',25]]);
spots('n_kitchen',[[54,20,1,'stand',25],[49,22,1,'stand',20]]);spots('k_dinner',[[44,21,2,'sit',99]]);spots('j_myroom',[[6,20,2,'stand',99]]);
spots('t_myroom',[[2,22,3,'stand',20],[5,23,3,'sit',40]]);spots('t_mybed',[[2,23,0,'sleep',999]]);
spots('c_room',[[52,7,0,'stand',30],[55,8,2,'sit',40]]);spots('c_parlor',[[43,5,2,'sit',90]]);

/* 지하 저장고 */
newArea('cellar','지하 와인 저장고',20,12,'#',{group:'castle',wall:'stone'});
room('cellar','지하 와인 저장고',1,1,18,10,'s','stone');exitTo(2,3,'keep',56,30,0,'<');
ob('winerack',4,3,3,1,{it:'wine'});ob('winerack',8,3,3,1,{it:'wine'});ob('winerack',12,3,3,1,{it:'wine'});ob('winerack',16,3,2,1,{it:'wine'});
ob('keg',4,7,2,1);ob('keg',4,9,2,1);ob('barrel',15,8);ob('barrel',16,8);ob('barrel',17,9);ob('crate',10,9);ob('crate',11,9);
spots('k_cellar',[[9,6,1,'stand',99]]);

/* ═════════ 서쪽 별관 · 사용인 숙소 ═════════ */
newArea('servq','서쪽 별관',32,20,'#',{group:'castle',wall:'wood'});
room('m_room','마르타의 방',1,1,7,8,'.','rose');room('b_room','브란트의 방',9,1,7,8,'.','wood');room('maids','하녀 숙소',17,1,14,8,'.','cream');room('servants','사용인 휴게실',1,10,30,9,'h','wood');
door(4,9);door(12,9);door(23,9);[[2,1],[11,1],[20,1],[27,1],[8,10],[19,10]].forEach(([x,y])=>win(x,y));exitTo(15,19,'castle',8,18,0);
ob('bed',1,3,1,2,{c:'#c87a92',it:'mbed'});ob('dresser',5,3,2,1,{mirror:1});ob('basket',6,7,1,1,{it:'yarn'});ob('rug',2,6,3,2,{c:'#e8a0b4',walk:1});ob('chair',2,7,1,1,{d:3,walk:1});
ob('bed',9,3,1,2,{c:'#a87a5a'});ob('bed',15,3,1,2,{c:'#86a868',it:'tbed'});ob('chest',11,3);ob('barrel',13,3);ob('table',13,6,2,1,{mugs:1});
[17,19,21,25,27,29].forEach(x=>ob('bunk',x,3,1,2,{it:'bunk'}));ob('chest',18,7);ob('chest',26,7);ob('plant',30,8);
ob('cabinet',1,12,2,1,{it:'dishes'});ob('counter',4,12,3,1,{items:1});ob('table',8,14,12,2,{c:'#d8c8a8',set:1});ob('bench',8,13,6,1,{walk:1});ob('bench',14,13,6,1,{walk:1});ob('bench',8,16,6,1,{walk:1});ob('bench',14,16,6,1,{walk:1});
ob('rug',22,13,6,4,{c:'#a8743e',walk:1});ob('fireplace',24,12,2,1);ob('armchair',23,14,1,1,{d:3,c:'#8a6a5a',walk:1});ob('armchair',26,14,1,1,{d:2,c:'#8a6a5a',walk:1});ob('basket',27,17,1,1,{it:'yarn'});
ob('barrel',29,17);ob('barrel',29,18);ob('plant',1,18);ob('clock',30,12);
spots('m_bed',[[3,6,0,'sleep',999]]);spots('b_bed',[[10,6,0,'sleep',999]]);spots('t_room',[[14,6,0,'sleep',999]]);spots('n_bed',[[18,6,0,'sleep',999],[24,6,0,'sleep',999]]);
spots('m_rest',[[26,14,2,'sit',99]]);spots('b_rest',[[23,14,3,'sit',99]]);spots('t_rest',[[24,16,1,'stand',20],[11,17,1,'stand',20]]);
spots('s_eat',[[9,13,0,'sit',40],[11,13,0,'sit',40],[15,13,0,'sit',40],[17,13,0,'sit',40],[9,16,1,'sit',40],[12,16,1,'sit',40],[16,16,1,'sit',40],[18,16,1,'sit',40]]);
spots('m_eat',[[13,13,0,'sit',99]]);spots('b_eat',[[19,13,0,'sit',99]]);spots('t_eat2',[[10,16,1,'sit',99]]);spots('n_eat',[[15,16,1,'sit',99],[17,16,1,'sit',99]]);
spots('n_rest',[[21,16,1,'stand',20],[6,15,1,'stand',20],[25,17,1,'stand',20]]);

/* 세탁장 */
newArea('wash','세탁장',18,10,'#',{group:'castle',wall:'white'});
room('laundry','세탁실',1,1,16,8,'s','white');[[4,1],[12,1]].forEach(([x,y])=>win(x,y));exitTo(8,9,'castle',6,29,0);
ob('tub',2,3,2,1,{board:1,it:'washtub'});ob('tub',5,3,2,1,{board:1,it:'washtub'});ob('rack',10,3,3,1);ob('rack',14,3,2,1);ob('basket',2,7);ob('basket',3,7);ob('counter',12,7,4,1,{items:1,it:'fold'});ob('tub',5,6,2,1);ob('cabinet',15,5,1,1);
spots('m_wash',[[3,4,1,'stand',20],[6,4,1,'stand',20],[13,6,0,'stand',15],[11,4,1,'stand',12]]);spots('n_wash',[[4,6,3,'stand',25],[14,6,1,'stand',25]]);

/* 동쪽 별관 · 연회장 */
newArea('annex','동쪽 별관',30,17,'#',{group:'castle',wall:'gold'});
room('ballroom','대연회장',1,1,28,15,'m','gold');[[6,1],[10,1],[19,1],[23,1]].forEach(([x,y])=>win(x,y));exitTo(14,16,'castle',54,18,0);exitTo(15,16,'castle',54,18,0);
ob('rug',10,6,10,7,{c:'#c9a35e',walk:1});[[4,5],[4,11],[25,5],[25,11],[9,3],[20,3]].forEach(([x,y])=>ob('pillar',x,y,1,1,{it:'pillar'}));
ob('table',11,3,8,1,{c:'#f4ecd8',set:1,it:'buffet'});ob('piano',2,3,2,1,{it:'piano'});
for(const [x,y] of [[6,7],[22,7],[6,12],[22,12]]){ob('table',x,y,2,1,{c:'#f4ecd8',vase:1});ob('chair',x-1,y,1,1,{d:3,walk:1});ob('chair',x+2,y,1,1,{d:2,walk:1});}
ob('plant',1,3,1,1,{tall:1});ob('plant',28,3,1,1,{tall:1});ob('plant',1,14);ob('plant',28,14);
spots('k_ball',[[14,8,0,'stand',99]]);spots('r_ball',[[20,9,2,'stand',99]]);spots('m_ball',[[12,10,1,'stand',99]]);spots('b_ball',[[16,4,0,'stand',99]]);spots('n_ball',[[8,5,0,'stand',30],[21,11,2,'stand',30]]);

/* 동관 온실 */
newArea('green','동관 온실',20,11,'#',{group:'castle',wall:'glass'});
room('greenhouse','동관 온실',1,1,18,9,'k','glass');exitTo(9,10,'castle',55,7,0);
ob('bed_planter',2,3,4,2,{it:'herbs'});ob('bed_planter',13,3,5,2,{it:'herbs'});ob('tree_pot',2,8,1,1,{fruit:1});ob('tree_pot',17,8,1,1,{fruit:1});ob('tree_pot',7,3,1,1);ob('tree_pot',11,3,1,1);
ob('table',8,6,3,1,{c:'#fbf6ec',cups:1,it:'gtable'});ob('chair',7,6,1,1,{d:3,walk:1});ob('chair',11,6,1,1,{d:2,walk:1});ob('bench',13,8,2,1,{walk:1});ob('bucket',4,8);ob('bucket',5,8);
spots('k_green',[[11,6,2,'sit',99]]);spots('j_green',[[7,6,3,'sit',99]]);spots('c_green',[[14,7,1,'stand',30],[4,6,1,'stand',30]]);

/* 기사단 숙소 */
newArea('kq','기사단 숙소',26,17,'#',{group:'castle',wall:'wood'});
room('r_room','로웬의 방',1,1,8,7,'.','wood');room('bunks','기사 침소',10,1,15,7,'.','wood');room('kq','기사단 식당',1,9,24,7,'h','wood');
door(5,8);door(17,8);[[3,1],[13,1],[21,1],[8,9],[19,9]].forEach(([x,y])=>win(x,y));exitTo(12,16,'castle',7,41,0);
ob('bed',1,3,1,2,{c:'#5a6e5a',it:'rbed'});ob('weaponrack',3,3,2,1);ob('chest',7,3);ob('armorstand',8,3);ob('table',6,6,2,1,{mugs:1});
[10,12,14,19,21,23].forEach(x=>ob('bunk',x,3,1,2,{it:'bunk'}));ob('chest',11,6);ob('chest',22,6);
ob('table',3,12,5,1,{mugs:1});ob('table',14,12,5,1,{mugs:1});ob('bench',3,13,5,1,{walk:1});ob('bench',14,13,5,1,{walk:1});ob('fireplace',20,11,2,1);ob('barrel',23,14);ob('barrel',23,15);ob('weaponrack',1,11,2,1);ob('keg',9,14,2,1);
spots('r_bed',[[3,6,0,'sleep',999]]);spots('kn_bed',[[16,6,0,'sleep',999],[18,6,0,'sleep',999]]);spots('d_bed',[[20,6,0,'sleep',999]]);
spots('r_mess',[[5,13,1,'sit',99]]);spots('kn_mess',[[15,13,1,'sit',60],[17,13,1,'sit',60],[4,13,1,'sit',60]]);spots('d_mess',[[7,13,1,'sit',99]]);

/* 무기고 */
newArea('armory','무기고',14,10,'#',{group:'castle',wall:'stone'});
room('armory','무기고',1,1,12,8,'s','stone');win(9,1);exitTo(6,9,'castle',19,41,0);
ob('weaponrack',2,3,3,1,{it:'weapons'});ob('weaponrack',6,3,3,1,{it:'weapons'});ob('armorstand',10,3);ob('armorstand',11,3);ob('table',4,6,3,1,{it:'whet'});ob('crate',11,7);ob('crate',11,8);ob('barrel',1,8);
spots('r_armory',[[5,5,1,'stand',30],[9,6,2,'stand',20]]);spots('d_armory',[[8,5,1,'stand',30],[3,7,3,'stand',20]]);

/* 마구간 */
newArea('stable','마구간',24,12,'#',{group:'castle',wall:'wood'});
room('stable','마구간',1,1,22,10,'q','wood');exitTo(11,11,'castle',53,42,0);
for(const [x,c] of [[2,'#2a2228'],[6,'#8a5a3a'],[14,'#c8b090'],[18,'#6a4430']]){ob('stall',x-1,3,4,2,{walk:1});ob('horse',x,4,2,1,{c,it:x===2?'warhorse':'horse'});}
ob('hay',2,8,2,1);ob('hay',19,8,2,1);ob('barrel',22,9);ob('crate',10,3);ob('crate',11,3);ob('weaponrack',22,3,1,1);
spots('r_stable',[[4,6,1,'stand',30]]);spots('g_stable',[[8,6,1,'stand',20],[16,6,1,'stand',20],[12,8,0,'stand',15]]);spots('t_stable',[[19,6,1,'stand',20],[6,7,1,'stand',15]]);spots('g_bed',[[21,9,0,'sleep',999]]);
