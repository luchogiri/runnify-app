
let lang = 'ES';

const I18n = (term) => { return LANG[lang][term] || term; }

I18n.set = (newLang) => lang = newLang && lang;
I18n.get = () => lang;

const LANG = {

  ES : {

    'Home': 'Home',

    '42-200':'#superhero',
    '21-41.99':'#athlete',
    '10-20.99':'#sporty',
    '0-9.99':'#enjoyer',

    'adventure':'Aventura',
    'road_running':'Carreras de calle',
    'trial':'Trial running',
    'duathlon':'Duathlon',
    'triathlon':'Triathlon',
    'obstacles':'Obstáculos',
    'cycling':'Ciclismo',

    'Jan': 'ENE',
    'Feb': 'FEB',
    'Mar': 'MAR',
    'Apr': 'ABR',
    'May': 'MAY',
    'Jun': 'JUN',
    'Jul': 'JUL',
    'Aug': 'AGO',
    'Sep': 'SEP',
    'Oct': 'OCT',
    'Nov': 'NOV',
    'Dec': 'DIC',

    'January': 'Enero',
    'February': 'Febrero',
    'March': 'Marzo',
    'April': 'Abril',
    'May': 'Mayo',
    'Jun': 'Junio',
    'July': 'Julio',
    'August': 'Agosto',
    'September': 'Septiembre',
    'October': 'Octubre',
    'November': 'Noviembre',
    'December': 'Diciembre',

    days: [
      'Domingo',
      'Lunes',
      'Martes',
      'Miercoles',
      'Jueves',
      'Viernes',
      'Sábado'
    ],

    months: [
      '',
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'
    ],


    // errors
    'Email already exists.': 'El e-mail proporcionado ya pertenece a un usuario.'

  }

};

export default I18n;
