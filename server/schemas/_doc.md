
accounts [{ 
  first_name,
  last_name,
  password,
  fb_token,
  preferences { 
    station,
    types [{ name }]
  }
}]

groups [{ name }]
types [{ group, name }]
stations [{ name, code, location }]
palynologists [{ name, email, phone, password }]

measurements [{
  date,
  author,
  station,
  items [{
    group,
    type,
    value
  }]
}]

/api/forecast?station=buenos-aires
