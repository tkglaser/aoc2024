start
  = a:rega eol b:regb eol c:regc eol eol p:program { return { a,b,c,p } }

rega
  = "Register A: " v:int { return v }
  
regb
  = "Register B: " v:int { return v }
  
regc
  = "Register C: " v:int { return v }
  
program
  = "Program: " h:int t:("," int)* { return [h,...t.map(item => item[1])] }

id "identifier"
  = id:[0-9A-Z]+ { return id.join(""); }

int "integer"
  = [0-9]+ { return parseInt(text(), 10); }

_ "whitespace"
  = " "+
  
eol
  = "\n"