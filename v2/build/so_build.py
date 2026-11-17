import base64,io,json
from PIL import Image
SRC='/home/user/eren_work/mods3/kr_retex/assets/Maps/springobjects.png'
M={'tea_leaf':815,'yarn':440,'wildflower':597,'rose':595,'cider':350,'dandelion':22,'leek':20,'primrose':18,'rasp':296,'sweetpea':402,'mushroom':404,'blackberry':410,
'winterroot':412,'holly':283,'crystal':414,'tulip':591,'sunflower':421,'camellia':376,'chrysan':593,'pumpkin_pie':608,'strawberry':221,'berry_tart':611,'bouquet':458,'ring':516,
'egg':176,'egg_big':174,'weed':152,'bait':685,'potato':192,'strawb':400,'cabbage':266,'pea':188,'tomato':256,'blueb':258,'corn':270,'melon':254,'wheat':262,'pumpkin':276,'grape':398,'beet':284,'kale':250,'herb':259,
's_potato':475,'s_strawb':745,'s_cabbage':485,'s_tomato':480,'s_blueb':481,'s_corn':487,'s_melon':479,'s_wheat':483,'s_pumpkin':490,'s_grape':301,'s_beet':494,'s_kale':477,'s_tea':251,'s_tulip':427,'s_sunflower':431,'s_herb':495,
'd_soup':199,'d_herbtea':614,'d_cornbread':229,'d_salad':196,'d_grapejuice':350,'d_pumpsoup':236,'d_jam':344,'d_fishherb':214,'d_vegpie':222,'d_kalesoup':218,'d_strawcake':221,'d_fishstew':728,'d_salmonsteak':212,
'poem':102}
im=Image.open(SRC).convert('RGBA');cols=im.width//16
ids=sorted(set(M.values()));A=Image.new('RGBA',(16*16,16*((len(ids)+15)//16)),(0,0,0,0));pos={}
for n,i in enumerate(ids):
  t=im.crop(((i%cols)*16,(i//cols)*16,(i%cols)*16+16,(i//cols)*16+16));A.paste(t,((n%16)*16,(n//16)*16));pos[i]=[(n%16)*16,(n//16)*16]
b=io.BytesIO();A.save(b,'PNG',optimize=True)
open('/home/user/eren_work/scripts/so_data.js','w').write('const SOICO='+json.dumps({k:pos[v] for k,v in M.items()})+',SOSRC="data:image/png;base64,'+base64.b64encode(b.getvalue()).decode()+'";\n')
A.resize((A.width*3,A.height*3),Image.NEAREST).save('/tmp/claude-0/-home-user/544a44ab-db30-5b59-866b-c200ad6b16cc/scratchpad/so_atlas.png');print(len(ids),len(b.getvalue()))
