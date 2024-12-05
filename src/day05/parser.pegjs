start
  = rules:rule* eol updates:updates { return { rules, updates } }

rule
  = a:int "|" b:int eol { return { a, b } }

updates
  = h:update t:(eol update)* { return [h, ...t.map(item=>item[1])] }

update
  = h:int t:("," int)* { return [h, ...t.map(item => item[1])] }
  
id "identifier"
  = id:[0-9A-Z]+ { return id.join(""); }

int "integer"
  = [0-9]+ { return parseInt(text(), 10); }

_ "whitespace"
  = " "+
  
eol
  = "\n"