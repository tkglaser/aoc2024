start
  = h:edge t:(eol edge)* { return [h,...t.map(item=>item[1])] }

edge
  = a:node "-" b:node { return { a, b } }

node
  = [a-z]+ { return text() }

eol
  = "\n"