def N(e,t): return ["n",e,t]
def M(e,t): return ["m",e,t]
def R(t): return ["r",t]
def O(t,p,*r): return {"t":t,"p":p,"r":list(r)}
def C(*o): return ["c",list(o)]
def B(k,tier,cond,*s): return {"k":k,"tier":tier,"cond":cond,"s":list(s)}
