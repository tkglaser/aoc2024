start
  = h:line t:(eol line)* { return [h, ...t.map(item => item[1])]}

line
 = h:int t:(_ int)* { return [h, ...t.map(item => item[1])] }
  
id "identifier"
  = id:[0-9A-Z]+ { return id.join(""); }

int "integer"
  = [0-9]+ { return parseInt(text(), 10); }

_ "whitespace"
  = " "+
  
eol
  = "\n"