start
  = "TODO"
  
int "integer"
  = [0-9]+ { return +text(); }

_ "whitespace"
  = " "+
  
eol
  = "\n"