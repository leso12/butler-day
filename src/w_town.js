
/* ═════════ 로젠하임 마을 ═════════ */
newArea('town','로젠하임 마을',50,38,',',{outdoor:1,def:'street',group:'town'});
fill(0,0,50,1,'t');fill(0,37,50,1,'t');fill(0,0,1,38,'t');fill(49,0,1,38,'t');put([[24,0],[25,0]],'G');
fill(24,1,2,36,':');fill(1,8,48,2,':');fill(1,18,48,2,':');
bld('gen','모리스 잡화점',2,2,8,6,'#b0524a','#efe0c4',6,'#d9b766');
bld('flower','꽃집 «북녘정원»',11,2,7,6,'#d98aa0','#f5ead8',14,'#ee9ab0');
bld('book','서점 «잉크와 양피지»',28,2,7,6,'#4f6e96','#eadcc2',31,'#6b8fc0');
bld('tea','찻집 «은빛 주전자»',37,2,10,6,'#6f9a8a','#f3ead8',41,'#c9d4d0');
bld('bakery','빵집 «황금 밀»',2,11,7,7,'#c98a3e','#f2e3c6',5,'#e8b86a',{style:'timber'});
bld('hagen','하겐 상회',10,11,11,7,'#5a4a5e','#d9ccb8',15,'#8a7a90',{style:'stone'});
bld('tavern','선술집 «검은 곰»',28,11,8,7,'#6a4632','#c8a488',31,'#3a2a24',{style:'timber'});
bld('tailor','양장점 «로즈»',39,14,8,4,'#a86a8a','#f4e6e0',42,'#e0a8c0');
bld('house1','방앗간 집',10,31,5,5,'#8a9a5a','#f0e4cc',12,null,{style:'timber'});
bld('house2','빨간 지붕 집',18,31,5,5,'#c06a5a','#f4e8d4',20,null);
bld('house3','호숫가 오두막',43,20,5,4,'#6a8aa8','#eee2cc',45,null,{style:'timber'});
A.OUT=[['hagen_d','하겐 상회 앞',13,18,5,2],['tgate','성으로 가는 길',22,1,6,6],['tea_t','은빛 주전자 테라스',37,10,10,3],['market','시장 광장',10,21,13,10],['tav_t','검은 곰 테라스',28,20,8,3],['lake','호숫가',31,24,18,12],['park','공원',1,21,8,15],['homes','주택가',9,31,15,6]];
fill(37,10,10,3,':');put([[38,11],[41,11],[44,11]],'T');fill(28,20,8,3,':');put([[29,21],[32,21],[34,21]],'T');
fill(10,21,13,10,':');fill(15,24,3,3,'F');put([[11,22],[13,22],[19,22],[21,22],[11,29],[13,29],[19,29],[21,29]],'K');
put([[10,22],[22,22],[10,30],[22,25]],'V');put([[12,26],[20,26],[22,26],[10,25]],'X');put([[22,28]],'j');put([[10,27]],'o');put([[14,22],[18,22]],'p');
for(let y=24;y<36;y++)for(let x=31;x<49;x++){const dx=(x+.5-40)/7.6,dy=(y+.5-29.6)/5.2;if(dx*dx+dy*dy<=1)A.map[y][x]='L';}
for(let y=24;y<29;y++)if(A.map[y][39]==='L')A.map[y][39]='J';A.map[23][39]='J';
for(const [x,y] of [[33,27],[33,32],[46,27],[46,31],[34,26],[45,33],[36,34]])if(A.map[y][x]==='L')A.map[y][x]='Z';
put([[31,26],[31,32],[37,23],[48,29]],'Y');put([[42,24],[36,23]],'f');put([[48,24]],'g');
fill(1,28,8,1,':');fill(4,21,1,15,':');
put([[2,22],[7,23],[2,26],[7,32],[2,34],[7,35]],'t');put([[6,22],[2,31],[7,25]],'I');put([[5,26],[5,30]],'Y');
for(let y=21;y<36;y++)if(y!==28&&y!==24)A.map[y][9]='z';put([[3,30],[6,34],[1,25]],'z');
put([[3,29],[6,25],[2,31],[7,28],[4,33],[8,22],[20,34],[12,35],[27,34],[29,28],[22,32]],'f');
put([[23,4],[26,4],[23,13],[26,13],[23,23],[26,23],[23,31],[26,31],[9,10],[36,10],[9,20],[36,20],[47,10],[47,20]],'l');
put([[1,20],[48,20],[28,35],[47,35],[27,30],[48,33]],'t');put([[30,35],[44,36],[29,25],[26,33]],'I');put([[28,24],[30,30],[27,27],[33,36],[41,36],[38,21],[40,22],[46,36]],'f');put([[29,33],[48,26],[26,36]],'z');
fill(10,36,15,1,':');fill(15,32,2,3,'e');put([[15,35],[16,35]],'=');put([[17,32],[17,34]],'z');put([[9,32],[23,33]],'I');
put([[20,3],[21,3]],'z');put([[21,5]],'u');put([[19,6],[26,6]],'p');put([[22,7]],'g');
put([[27,3],[27,5],[36,3],[36,6],[47,3],[47,6],[47,12],[47,16],[1,12],[1,15]],'z');
put([[21,13],[22,13],[21,14]],'X');put([[22,14],[22,16]],'V');put([[36,15],[37,15],[36,16]],'V');put([[37,13]],'g');
put([[26,12],[27,15],[26,16],[38,17],[9,12],[9,16]],'f');put([[42,21],[42,22]],'=');put([[47,23]],'p');
A.floor=A.map.map(r=>r.map(c=>':'.includes(c)?':':','));
for(let y=0;y<A.MH;y++)for(let x=0;x<A.MW;x++){const c=A.map[y][x];if('VXjopKFT'.includes(c)&&((y>20&&y<31&&x>9&&x<23)||(y>9&&y<13&&x>36)||(y>19&&y<23&&x>27&&x<36)))A.floor[y][x]=':';}
A.doors.push({x:24,y:0,to:'castle',ax:31,ay:55,dir:1,gate:1},{x:25,y:0,to:'castle',ax:32,ay:55,dir:1,gate:1});
link('gen',6,'gen',6,8);link('flower',14,'flower',5,7);link('book',31,'book',6,8);link('tea',41,'tea',8,10);link('bakery',5,'bakery',6,8);link('hagen',15,'hagen',6,10);
link('tavern',31,'tavern',9,11);link('tailor',42,'tailor',6,8);link('house1',12,'house1',5,7);link('house2',20,'house2',5,7);link('house3',45,'house3',4,6);
spots('k_market',[[18,27,2,'stand',99]]);spots('k_walk',[[17,28,2,'stand',99]]);spots('r_hagen',[[16,19,1,'stand',99]]);
spots('v_market',[[12,23,1,'stand',15],[20,23,1,'stand',15],[12,28,0,'stand',15],[20,28,0,'stand',15],[14,27,3,'stand',12],[18,25,2,'stand',12]]);
spots('v_park',[[4,26,3,'stand',20],[5,27,1,'sit',30],[4,31,1,'stand',20],[3,28,0,'stand',15],[5,31,1,'sit',30]]);
spots('v_lake',[[31,25,3,'stand',20],[38,24,0,'stand',20],[39,27,0,'stand',40],[31,31,3,'stand',15],[47,28,2,'stand',15]]);
spots('v_street',[[14,9,0,'stand',12],[30,9,0,'stand',12],[42,19,1,'stand',12],[20,19,0,'stand',12],[7,8,1,'stand',10],[34,19,1,'stand',10]]);
spots('v_teat',[[38,12,1,'sit',40],[44,12,1,'sit',40],[41,12,1,'sit',40]]);spots('v_tavt',[[29,22,1,'sit',40],[32,22,1,'sit',40],[34,22,1,'sit',40]]);
spots('v_gate',[[23,3,0,'stand',60],[26,3,0,'stand',60]]);spots('v_homes',[[13,36,1,'stand',20],[17,36,1,'stand',20],[16,31,0,'stand',20]]);
spots('b_market',[[20,23,1,'stand',20],[12,23,1,'stand',20]]);spots('m_market',[[12,28,0,'stand',20],[14,23,1,'stand',20]]);spots('t_market',[[14,26,0,'stand',6],[18,24,2,'stand',6],[14,23,0,'stand',6]]);
spots('r_tav_t',[[32,22,1,'sit',99]]);

/* ── 마을 건물 내부 ── */
function shop(id,name,w,h,fl,wall,ex,to,ax,ay){newArea(id,name,w,h,'#',{group:'town',wall});room(id+'_in',name,1,1,w-2,h-2,fl,wall);exitTo(ex,h-1,to,ax,ay,0);}
// 잡화점
shop('gen','모리스 잡화점',14,10,'.','sage',6,'town',6,8);win(5,1);win(8,1);
ob('shelf',1,3,3,1,{it:'goods'});ob('shelf',9,3,3,1,{it:'goods'});ob('counter',4,5,4,1,{items:1,it:'counter'});ob('register',7,4,1,1);ob('barrel',1,7);ob('barrel',2,7);ob('crate',11,7);ob('crate',11,8);ob('sack',10,8);ob('rug',4,7,4,2,{c:'#a8743e',walk:1});
spots('o_gen',[[5,4,0,'stand',99]]);spots('c_gen',[[2,4,1,'stand',20],[10,4,1,'stand',20],[8,7,3,'stand',15]]);spots('o_gen_off',[[6,4,0,'sleep',999]]);
// 꽃집
shop('flower','꽃집 «북녘정원»',12,9,'k','sage',5,'town',14,8);win(3,1);
[1,2,3,8,9,10].forEach(x=>ob('bucket',x,3,1,1,{walk:0}));ob('counter',4,5,3,1,{items:1,it:'counter'});ob('plant',10,7,1,1,{tall:1,flower:'#f0a0b8'});ob('plant',1,7,1,1,{flower:'#f6dc78'});ob('bed_planter',8,5,3,1);
spots('o_flower',[[5,4,0,'stand',99]]);spots('c_flower',[[2,4,1,'stand',20],[9,4,1,'stand',20]]);
// 서점
shop('book','서점 «잉크와 양피지»',14,10,'.','green',6,'town',31,8);win(6,1);
ob('shelf',1,3,3,1,{it:'books'});ob('shelf',4,3,2,1,{it:'books'});ob('shelf',8,3,4,1,{it:'books'});ob('counter',9,6,3,1,{it:'counter'});ob('books_pile',12,8);ob('armchair',2,7,1,1,{d:3,c:'#4f6e50',walk:1});ob('lamp',1,8);ob('books_pile',4,8);ob('rug',3,6,4,2,{c:'#4f6e50',walk:1});
spots('o_book',[[10,5,0,'stand',99]]);spots('c_book',[[2,4,1,'read',25],[9,4,1,'read',25],[2,7,3,'sit',40]]);
// 찻집
shop('tea','찻집 «은빛 주전자»',18,12,'h','rose',8,'town',41,8);win(3,1);win(7,1);
ob('fireplace',1,3,2,1);ob('cake',11,3,2,1);ob('cabinet',14,3,2,1,{it:'teaset'});ob('counter',11,5,5,1,{items:1,it:'counter'});
for(const [x,y] of [[2,5],[6,5],[2,8],[6,8]]){ob('table',x,y,2,1,{c:'#fbf6ec',cups:1});ob('chair',x-1,y,1,1,{d:3,walk:1});ob('chair',x+2,y,1,1,{d:2,walk:1});}
ob('plant',16,9,1,1,{tall:1});ob('plant',10,9,1,1,{flower:'#f0a0b8'});ob('rug',11,7,5,3,{c:'#c48a8e',walk:1});ob('armchair',13,9,1,1,{d:1,c:'#c48a8e',walk:1});
spots('o_tea',[[13,4,0,'stand',99]]);spots('c_tea',[[1,5,3,'sit',60],[4,5,2,'sit',60],[5,5,3,'sit',60],[8,5,2,'sit',60],[1,8,3,'sit',60],[4,8,2,'sit',60],[5,8,3,'sit',60],[8,8,2,'sit',60],[13,9,1,'sit',60]]);
// 빵집
shop('bakery','빵집 «황금 밀»',14,10,'k','gold',6,'town',5,18);win(10,1);
ob('oven',1,3,2,1,{it:'oven'});ob('breadshelf',4,3,3,1);ob('breadshelf',8,3,3,1);ob('display',4,6,4,1,{it:'counter'});ob('table',10,7,1,1,{c:'#fbf6ec'});ob('chair',11,7,1,1,{d:2,walk:1});ob('chair',9,7,1,1,{d:3,walk:1});ob('sack',1,7);ob('sack',1,8);ob('barrel',12,4);
spots('o_bakery',[[5,5,0,'stand',99]]);spots('o_bake',[[2,4,1,'stand',30]]);spots('c_bakery',[[6,7,1,'stand',20],[9,7,3,'sit',40],[11,7,2,'sit',40]]);
// 하겐 상회
newArea('hagen','하겐 상회',20,12,'#',{group:'town',wall:'plum'});room('hagen_in','하겐 상회',1,1,12,10,'.','plum');room('h_ware','상회 창고',14,1,5,10,'s','stone');sdoor(13,6);exitTo(6,11,'town',15,18,0);win(4,1);win(9,1);
ob('rug',3,6,6,3,{c:'#7a5a7a',walk:1});ob('chair',5,3,1,1,{d:0,walk:1,c:'#7a3a5a'});ob('desk',4,4,3,1,{it:'hdesk'});ob('safe',10,3,1,1,{it:'safe'});ob('shelf',1,3,2,1,{it:'hledger'});
ob('armchair',4,7,1,1,{d:1,c:'#7a5a7a',walk:1});ob('armchair',7,7,1,1,{d:1,c:'#7a5a7a',walk:1});ob('plant',11,9,1,1,{tall:1});ob('clock',1,7);
ob('boxes',14,3,3,1);ob('boxes',14,5,2,2);ob('crate',17,8);ob('crate',17,9);ob('sack',14,9);ob('sack',15,9);ob('barrel',18,3);ob('barrel',18,4);
spots('o_hagen',[[5,3,0,'sit',99]]);spots('h_clerk',[[16,7,2,'stand',30],[3,5,0,'stand',20]]);spots('c_hagen',[[4,7,1,'sit',40],[7,7,1,'sit',40]]);
// 선술집
newArea('tavern','선술집 «검은 곰»',20,13,'#',{group:'town',wall:'brick'});room('tavern_in','선술집 «검은 곰»',1,1,18,11,'.','brick');exitTo(9,12,'town',31,18,0);win(3,1);win(9,1);
ob('keg',11,3,2,1);ob('keg',16,3,2,1);ob('bar',11,4,7,1,{it:'bar'});[12,14,16].forEach(x=>ob('stool',x,5,1,1,{walk:1}));ob('fireplace',6,3,2,1);
for(const [x,y] of [[2,4],[2,8],[6,7]]){ob('table',x,y,2,1,{mugs:1});ob('chair',x-1,y,1,1,{d:3,walk:1});ob('chair',x+2,y,1,1,{d:2,walk:1});}
ob('table',12,9,3,1,{mugs:1});ob('chair',11,9,1,1,{d:3,walk:1});ob('chair',15,9,1,1,{d:2,walk:1});ob('barrel',18,9);ob('barrel',18,10);ob('rug',5,9,5,2,{c:'#8a4a3a',walk:1});
spots('o_tavern',[[14,3,0,'stand',40],[13,3,0,'stand',30]]);spots('c_tavern',[[12,5,1,'sit',50],[14,5,1,'sit',50],[16,5,1,'sit',50],[1,4,3,'sit',60],[4,4,2,'sit',60],[1,8,3,'sit',60],[4,8,2,'sit',60],[5,7,3,'sit',60],[8,7,2,'sit',60]]);
spots('r_tavern',[[11,9,3,'sit',99]]);spots('j_tavern',[[15,9,2,'sit',99]]);
// 양장점
shop('tailor','양장점 «로즈»',14,10,'h','rose',6,'town',42,18);win(4,1);win(9,1);
ob('mannequin',1,3,1,1,{c:'#c87a92'});ob('mannequin',3,3,1,1,{c:'#7a9ac8'});ob('fabric',5,3,3,1);ob('mirror',11,3,1,1,{it:'mirror'});ob('counter',4,6,3,1,{it:'counter'});ob('screen',10,6,2,1);ob('armchair',1,7,1,1,{d:3,c:'#e0a8c0',walk:1});ob('rug',2,7,4,2,{c:'#e0a8c0',walk:1});
spots('o_tailor',[[5,5,0,'stand',99]]);spots('o_sew',[[9,4,1,'stand',30],[2,5,1,'stand',30]]);spots('c_tailor',[[11,4,1,'stand',20],[1,7,3,'sit',40],[8,5,1,'stand',20]]);
// 주택
function house(id,name,fl,wall,ex,ax,ay){newArea(id,name,12,9,'#',{group:'town',wall});room(id+'_in',name,1,1,10,7,fl,wall);exitTo(ex,8,'town',ax,ay,0);win(3,1);win(8,1);}
house('house1','방앗간 집','.','cream',5,12,36);
ob('bed',1,3,1,2,{c:'#8a9a5a'});ob('bed',10,3,1,2,{c:'#7a6a5a'});ob('fireplace',4,3,2,1);ob('table',4,6,2,1,{mugs:1});ob('chair',3,6,1,1,{d:3,walk:1});ob('chair',6,6,1,1,{d:2,walk:1});ob('barrel',8,7);ob('sack',9,7);ob('rug',3,5,4,1,{c:'#a8743e',walk:1});
spots('h1_bed',[[2,5,0,'sleep',999],[9,5,0,'sleep',999]]);spots('h1_sit',[[3,6,3,'sit',60],[6,6,2,'sit',60]]);
house('house2','빨간 지붕 집','.','rose',5,20,36);
ob('bed',1,3,1,2,{c:'#c06a5a'});ob('bed',10,3,1,2,{c:'#e8b860'});ob('counter',3,3,2,1,{items:1});ob('stove',6,3,2,1);ob('table',4,6,2,1,{c:'#fbf6ec'});ob('chair',3,6,1,1,{d:3,walk:1});ob('chair',6,6,1,1,{d:2,walk:1});ob('plant',9,7,1,1,{flower:'#f0a0b8'});
spots('h2_bed',[[2,5,0,'sleep',999],[9,5,0,'sleep',999]]);spots('h2_sit',[[3,6,3,'sit',60],[6,6,2,'sit',60]]);
newArea('house3','호숫가 오두막',10,8,'#',{group:'town',wall:'wood'});room('house3_in','호숫가 오두막',1,1,8,6,'q','wood');exitTo(4,7,'town',45,24,0);win(6,1);
ob('bed',1,3,1,2,{c:'#6a8aa8'});ob('barrel',7,3);ob('crate',8,3);ob('table',4,5,2,1,{mugs:1});ob('chair',3,5,1,1,{d:3,walk:1});ob('rack',6,3,2,1);
spots('h3_bed',[[2,5,0,'sleep',999]]);spots('h3_sit',[[3,5,3,'sit',60]]);
