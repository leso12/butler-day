import json,sys
sys.path.insert(0,'/home/user/eren_work/talk/gen_fb')
import f1,f2,f3,f4,dc
folk={"helga":f1.helga,"hagen":f1.hagen,"bern":f1.bern,"rose":f2.rose,"lily":f2.lily,"hans":f3.hans,"peter":f3.peter,"oskar":f4.oskar,"jonas":f4.jonas}
json.dump(folk,open('/home/user/eren_work/talk/folk_b.json','w'),ensure_ascii=False,indent=1)
json.dump({"demian":dc.demian,"cecilia":dc.cecilia},open('/home/user/eren_work/talk/extra_dc.json','w'),ensure_ascii=False,indent=1)
print("built")
