start
  = m:signalandnoise* { return m }

signalandnoise
 = noise s:signal noise { return s }

noise
 = (!signal .)*

signal
 = do / dont / mul

do
 = "do()" { return { do:true } }

dont
 = "don't()" { return { do:false } }

mul
 = "mul(" a:int "," b:int ")" { return { a,b } }
  
int "integer"
  = [0-9]+ { return parseInt(text(), 10); }
