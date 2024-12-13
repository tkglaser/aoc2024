start
  = head:machine tail:(eol eol machine)* { return [head, ...tail.map(t => t[2])] }

machine
  = a:button eol b:button eol prize:prize { return { a, b, prize } }

button
  = "Button " [AB] ": X+" x:int ", Y+" y:int { return {x, y} }

prize
  = "Prize: X=" x:int ", Y=" y:int { return {x, y} }
  
id "identifier"
  = id:[0-9A-Z]+ { return id.join(""); }

int "integer"
  = [0-9]+ { return parseInt(text(), 10); }

_ "whitespace"
  = " "+
  
eol
  = "\n"