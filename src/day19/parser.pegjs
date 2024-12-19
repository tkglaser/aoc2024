start
  = available:available eol eol designs:designs { return { available, designs } }

available
  = h:towel t:(", " towel)* { return [h, ...t.map(item => item[1])] }

designs
  = h:towel t:(eol towel)* { return [h, ...t.map(item => item[1])] }

towel
  = [wubrg]+ { return text() }
  
id "identifier"
  = id:[0-9A-Z]+ { return id.join(""); }

int "integer"
  = [0-9]+ { return parseInt(text(), 10); }

_ "whitespace"
  = " "+
  
eol
  = "\n"