import json,collections,glob
E=set("nhabs"); CK={"season":{"봄","여름","가을","겨울"},"weather":{"clear","rain","snow","blizzard"},"time":{"morning","afternoon","evening"},"sunday":{True},"known":{True},"lover":{True}}
def lines(s,issues,k,maxlen,pmax,depth=0):
    for ln in s:
        t=ln[0]
        if t in("n","m"):
            if len(ln)!=3 or ln[1] not in E or not isinstance(ln[2],str): issues.append((k,"shape",ln))
            elif len(ln[2])>maxlen: issues.append((k,"len%d"%len(ln[2]),ln[2]))
        elif t=="r":
            if len(ln)!=2 or not isinstance(ln[1],str): issues.append((k,"shape",ln))
            elif len(ln[1])>maxlen: issues.append((k,"len%d"%len(ln[1]),ln[1]))
        elif t=="c" and depth==0:
            if len(ln)!=2 or not 2<=len(ln[1])<=3: issues.append((k,"choice count",len(ln[1])))
            for o in ln[1]:
                if set(o)!={"t","p","r"} or not 0<=o["p"]<=pmax or not o["r"]: issues.append((k,"opt",o))
                if len(o["t"])>maxlen: issues.append((k,"optlen",o["t"]))
                lines(o["r"],issues,k,maxlen,pmax,1)
        else: issues.append((k,"type",ln))
def check(path,maxlen,pmax,tiered,nmin,nmax):
    d=json.load(open(path)); issues=[]; keys=collections.Counter()
    for ch,bs in d.items():
        tiers=collections.Counter(); nc=0; nch=0
        for b in bs:
            keys[b["k"]]+=1
            exp={"k","cond","s"}|({"tier"} if tiered else set())
            if set(b)!=exp: issues.append((b["k"],"fields",sorted(b)))
            for ck,cv in b["cond"].items():
                if ck not in CK or cv not in CK[ck]: issues.append((b["k"],"cond",ck,cv))
                if not tiered and ck in("known","lover"): issues.append((b["k"],"cond not allowed",ck))
            if b["cond"]: nc+=1
            if any(l[0]=="c" for l in b["s"]): nch+=1
            if not nmin<=len(b["s"])<=nmax: issues.append((b["k"],"nlines",len(b["s"])))
            if tiered: tiers[b["tier"]]+=1
            lines(b["s"],issues,b["k"],maxlen,pmax)
        print(ch,len(bs),"cond",nc,"choice",nch,dict(sorted(tiers.items())) if tiered else "")
    dup=[k for k,v in keys.items() if v>1]
    print("dup keys:",dup); print("issues:",len(issues))
    for i in issues: print(" ",i)
    return set(keys)
a=check('/home/user/eren_work/talk/folk_b.json',70,10,False,2,5)
b=check('/home/user/eren_work/talk/extra_dc.json',60,30,True,2,6)
# cross-file key collisions
allk=collections.Counter()
for f in glob.glob('/home/user/eren_work/talk/*.json'):
    if f.endswith(('folk_b.json','extra_dc.json')): continue
    try: d=json.load(open(f))
    except Exception: continue
    def walk(x):
        if isinstance(x,dict):
            if "k" in x and isinstance(x["k"],str): allk[x["k"]]+=1
            for v in x.values(): walk(v)
        elif isinstance(x,list):
            for v in x: walk(v)
    walk(d)
print("collisions with other files:",sorted((a|b)&set(allk)))
