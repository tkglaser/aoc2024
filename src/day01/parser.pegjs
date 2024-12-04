start
  = h:line t:(eol line)* { return [h, ...t.map(m => m[1])] }

line
  = left:int _ right:int { return { left, right } }
  
id "identifier"
  = id:[0-9A-Z]+ { return id.join(""); }

int "integer"
  = [0-9]+ { return parseInt(text(), 10); }

_ "whitespace"
  = " "+
  
eol
  = "\n"