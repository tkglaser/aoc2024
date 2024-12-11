start
  = h:int t:(_ int)* { return [h,...t.map(item => item[1])] }
  
int "integer"
  = [0-9]+ { return parseInt(text(), 10); }

_ "whitespace"
  = " "+
