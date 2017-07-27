
// @flow

import React, { Component } from 'react';

import I18n from '../helpers/i18n';
import Headersimple from '../components/headersimple';

import {

  Text,
  View,
  ScrollView,
  Image,
  Platform,
  TouchableOpacity,
  Dimensions,
  StyleSheet,

} from 'react-native';

export default class Terminos extends Component {

  render() {
    let pic = {
      uri: require('../../assets/img/run.png')
    };
    let picArrowBack = {
      uri: require('../../assets/img/arrowBack.png')
    };
    return (
      <View style={styles.wrapper}>

      <Headersimple style={styles.headersimple} title="Terminos y Condiciones" navigator={this.props.navigator} />

        <ScrollView style={styles.scroll}>
          <View>
            <Text style={styles.txtUser}>Términos de servicio y política de privacidad de Runnify</Text>
            <Text style={styles.txtTerminos}>Al acceder al sitio web en http://www.runnify.com, usted está aceptando estar obligado por estos términos de servicio, todas las leyes y regulaciones aplicables, y acepta que usted es responsable del cumplimiento con las leyes locales aplicables. Si no está de acuerdo con alguno de estos términos, está prohibido utilizar o acceder a este sitio. Los materiales contenidos en este sitio web están protegidos por la ley aplicable de derechos de autor y marcas registradas.</Text>
            <Text style={styles.txtTerminos}>Utilizar Licencia</Text>
            <Text style={styles.txtTerminos}>Se otorga permiso para descargar temporalmente una copia de los materiales (información o software) en el sitio web de Runnify para ver solo personal y no transitoriamente. Esta es la concesión de una licencia, no una transferencia de título, y bajo esta licencia usted no puede: Modificar o copiar los materiales;
              Usar los materiales para cualquier propósito comercial, o para cualquier exhibición pública (comercial o no comercial);
              Intentar descompilar o realizar ingeniería inversa de cualquier software contenido en el sitio web de Runnify;
              Eliminar los derechos de autor u otras anotaciones de propiedad de los materiales; o
              Transferir los materiales a otra persona o "reflejar" los materiales en cualquier otro servidor.
              Esta licencia terminará automáticamente si usted viola cualquiera de estas restricciones y puede ser terminado por Runnify en cualquier momento. Al terminar la visualización de estos materiales o al finalizar esta licencia, debe destruir cualquier material descargado en su posesión, ya sea en formato electrónico o impreso.
            </Text>
            <Text style={styles.txtTerminos}>
              3. Renuncia
            </Text>
            <Text style={styles.txtTerminos}>
              Los materiales en el sitio web de Runnify se proporcionan en la forma en que están. Runnify no hace ninguna garantía, expresa o implícita, y por la presente niega y niega todas las demás garantías incluyendo, sin limitación, garantías implícitas o condiciones de comerciabilidad, aptitud para un propósito particular o no infracción de propiedad intelectual u otra violación de derechos.
              Además, Runnify no garantiza ni hace ninguna representación con respecto a la exactitud, los resultados probables o la confiabilidad del uso de los materiales en su sitio web o relacionados con dichos materiales o en cualquier sitio vinculado a este sitio.
            </Text>
            <Text style={styles.txtTerminos}>
              4. Limitaciones
            </Text>
            <Text style={styles.txtTerminos}>
              En ningún caso, Runnify o sus proveedores serán responsables de daños y perjuicios (incluyendo, sin limitación, daños por pérdida de datos o ganancias, o debido a interrupción de negocios) derivados del uso o incapacidad de utilizar los materiales en el sitio web de Runnify, incluso si Runnify o un representante autorizado de Runnify ha sido notificado oralmente o por escrito de la posibilidad de tal daño. Debido a que algunas jurisdicciones no permiten limitaciones sobre garantías implícitas, o limitaciones de responsabilidad por daños consecuenciales o incidentales, estas limitaciones pueden no aplicarse a usted.
            </Text>
            <Text style={styles.txtTerminos}>
              Exactitud de los materiales
            </Text>
            <Text style={styles.txtTerminos}>
              Los materiales que aparecen en el sitio web de Runnify pueden incluir errores técnicos, tipográficos o fotográficos. Runnify no garantiza que ninguno de los materiales en su sitio web sean exactos, completos o actuales. Runnify puede hacer cambios en los materiales contenidos en su sitio web en cualquier momento sin previo aviso. Sin embargo, Runnify no se compromete a actualizar los materiales.
            </Text>
            <Text style={styles.txtTerminos}>
              Enlaces
            </Text>
              <Text style={styles.txtTerminos}>
              Runnify no ha revisado todos los sitios vinculados a su sitio web y no es responsable del contenido de dichos sitios vinculados. La inclusión de cualquier enlace no implica aprobación por parte de Runnify del sitio. El uso de cualquier sitio web vinculado es bajo el riesgo del usuario.
              </Text>
            <Text style={styles.txtTerminos}>
              Modificaciones
            </Text>
            <Text style={styles.txtTerminos}>
              Runnify puede revisar estos términos de servicio para su sitio web en cualquier momento sin previo aviso. Al usar este sitio web, usted está de acuerdo en estar obligado por la versión actual de estos términos de servicio.
            </Text>
              <Text style={styles.txtTerminos}>
              Ley aplicable
              </Text>
            <Text style={styles.txtTerminos}>
              Estos términos y condiciones se rigen e interpretan de acuerdo con las leyes de Argentina y usted se somete irrevocablemente a la jurisdicción exclusiva de los tribunales de ese Estado o lugar.
            </Text>
            <Text style={styles.txtTerminos}>
              Política de privacidad
            </Text>
            <Text style={styles.txtTerminos}>
              Su privacidad es importante para nosotros.
            </Text>
            <Text style={styles.txtTerminos}>
              La política de Runnify es respetar su privacidad con respecto a cualquier información que podamos recopilar durante la operación de nuestro sitio web. En consecuencia, hemos desarrollado esta política de privacidad para que usted entienda cómo recopilamos, usamos, comunicamos, divulgamos y de otra manera hacemos uso de información personal. Hemos esbozado nuestra política de privacidad a continuación.
            </Text>
            <Text style={styles.txtTerminos}>
              Recopilaremos información personal por medios legales y justos y, en su caso, con el conocimiento o consentimiento de la persona afectada.
              Antes o en el momento de recolectar información personal, identificaremos los propósitos para los cuales se está recopilando información.
              Recopilaremos y usaremos información personal únicamente para cumplir con los propósitos especificados por nosotros y para otros fines auxiliares, a menos que obtengamos el consentimiento del individuo afectado o como lo requiere la ley.
              Los datos personales deben ser pertinentes para los propósitos para los cuales se va a usar, y, en la medida necesaria para esos fines, deben ser exactos, completos y actualizados.
              Protegeremos la información personal usando salvaguardas de seguridad razonables contra pérdida o robo, así como acceso no autorizado, divulgación, copia, uso o modificación.
              Facilitaremos a los clientes información sobre nuestras políticas y prácticas relacionadas con la administración de información personal.
              Sólo reteneremos información personal durante el tiempo que sea necesario para el cumplimiento de esos propósitos.
              Estamos comprometidos a conducir nuestro negocio de acuerdo con estos principios para asegurar que la confidencialidad de la información personal es protegida y mantenida. Runnify puede cambiar esta política de privacidad de vez en cuando a la sola discreción de Runnify.
            </Text>
          </View>
        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1
  },
  scroll:{

  },
  txtUser:{fontSize:18,fontWeight:'bold',marginTop:20,marginLeft:20},
  txtTerminos:{
    fontSize:16
  },
  txtTerminos:{
    paddingLeft:20,
    paddingRight:20,
    paddingBottom:20,
    paddingTop:20,
    justifyContent: 'center'
  },
  wrapper: {
    flex: 1,
    backgroundColor:'#ffffff'
    // paddingTop: Platform.OS == 'android' ? 24 : 20,
  }

});
