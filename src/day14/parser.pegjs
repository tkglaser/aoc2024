start
  = head:robot tail:(eol robot)* { return [head, ...tail.map(t => t[1])] }

robot
  = "p=" px:int "," py:int " v=" vx:int "," vy:int { return { p: [px, py], v:[vx, vy] }}
  
id "identifier"
  = id:[0-9A-Z]+ { return id.join(""); }

int "integer"
  = [-0-9]+ { return parseInt(text(), 10); }

_ "whitespace"
  = " "+
  
eol
  = "\n"