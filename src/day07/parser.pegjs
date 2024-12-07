start
  = h:equation t:(eol equation)* { return [h, ...t.map(item => item[1])] }

equation
 = result:int ":" values:value* { return { result, values }} 

value
 = _ v:int { return v }
  
id "identifier"
  = id:[0-9A-Z]+ { return id.join(""); }

int "integer"
  = [0-9]+ { return parseInt(text(), 10); }

_ "whitespace"
  = " "+
  
eol
  = "\n"