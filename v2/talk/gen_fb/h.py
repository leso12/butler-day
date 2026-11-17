import json
def N(e,t): return ["n",e,t]
def M(e,t): return ["m",e,t]
def R(t): return ["r",t]
def O(t,p,*r): return {"t":t,"p":p,"r":list(r)}
def C(*o): return ["c",list(o)]
def F(k,*s,**c): return {"k":k,"cond":c,"s":list(s)}
def B(k,tier,*s,**c): return {"k":k,"tier":tier,"cond":c,"s":list(s)}
