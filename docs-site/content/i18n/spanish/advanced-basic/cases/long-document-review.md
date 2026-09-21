---
icon: file-lines
---
# Revisión de documentos extensos

Un gerente de producto recibe un plan extenso y necesita identificar problemas de hechos, vacíos estructurales y modificaciones ejecutables, al tiempo que conserva el borrador original y el proceso de confirmación manual. El siguiente enfoque es adecuado para informes, reglamentos, materiales de licitación y planes de producto.

## Combinación recomendada

* 【Diálogo】: Comparar rápidamente los ángulos de revisión de diferentes modelos;
* 【Trabajo】Agent: Leer el directorio de trabajo y generar un borrador revisado;
* Base de conocimientos: Proporcionar reglamentos, terminología o materiales históricos;
* 【Archivos】 en el panel derecho: Inspeccionar el borrador original y los productos generados.

<figure><img src="../../../../assets/861fd559d589c892d6c82334.webp" alt="Los reglamentos, la terminología y los materiales históricos pueden servir como fuentes para la base de conocimientos, mientras que el borrador original se mantiene en un directorio de trabajo independiente."><figcaption><p>Los reglamentos, la terminología y los materiales históricos pueden servir como fuentes para la base de conocimientos, mientras que el borrador original se mantiene en un directorio de trabajo independiente. </p></figcaption></figure>

<figure><img src="../../../../assets/d3679aebd8f1fdf0aa6058bf.webp" alt="① Introducir el texto original y los criterios de revisión; ② Los resultados reales señalan los vacíos punto por punto y conservan la información que no se puede confirmar como elementos pendientes de verificación."><figcaption><p>① Introducir el texto original y los criterios de revisión; ② Los resultados reales señalan los vacíos punto por punto y conservan la información que no se puede confirmar como elementos pendientes de verificación. </p></figcaption></figure>

## Flujo de operación

{% stepper %}
{% step %}
### 1. Preparar el borrador original y los criterios de revisión

Colocar el borrador original en un directorio de trabajo independiente y crear una breve descripción de la revisión que especifique el público objetivo, el propósito, los hechos que no se pueden modificar y el formato de entrega.
{% endstep %}

{% step %}
### 2. Realizar primero una calibración a pequeña escala

Seleccionar un capítulo y pedir al Agent que genere la salida según "problema, ubicación en el texto original, impacto, sugerencia". Confirmar que la escala sea adecuada antes de procesar el texto completo.
{% endstep %}

{% step %}
### 3. Separar los hechos de la expresión

Solicitar al Agent que liste por separado los hechos que requieren verificación, sin usar la pulida del lenguaje para ocultar contenido incierto. Verificar las cifras clave contra los materiales originales.
{% endstep %}

{% step %}
### 4. Generar un nuevo archivo y finalizarlo manualmente

Solicitar que se conserve el archivo original y que se generen la lista de problemas y el borrador revisado en `review/`. Inspeccionar párrafo por párrafo usando 【Archivos】 en el panel derecho, y luego exportar o compartir.
{% endstep %}
{% endstepper %}

## Tarea de ejemplo

```
Revisa proposal.docx en el directorio actual. Enumera por sección los problemas de hechos, estructura y redacción, e indica su ubicación. No modifiques el archivo original; tras confirmar la lista, genera en review/ la versión revisada y los puntos pendientes.
```

## Preparación previa y criterios de finalización

| Elemento | Preparación sugerida |
| ---- | -------------------------------- |
| Archivos | Colocar el texto original, los requisitos de revisión y el directorio de salida por separado |
| Combinación recomendada | Agent dedicado + directorio de trabajo que contenga solo los archivos de este proyecto + 【Confirmación por turno】 |
| Método de verificación | Verificar primero un capítulo para confirmar el formato de citación y la escala de los juicios |
| Criterio de finalización | Cada opinión debe incluir la ubicación en el texto original; las partes no leídas deben marcarse explícitamente; el archivo original no debe sobrescribirse |

Adecuado para la revisión estructurada de contratos, informes, tesis o normas; cuando se traten conclusiones legales, médicas o financieras, la salida solo debe considerarse como material de apoyo.

{% hint style="info" %}
Cuando el documento es muy extenso, no pegue el texto completo repetidamente en una sola conversación. Permita que el Agent lea directamente el directorio de trabajo y deje productos intermedios por capítulo, lo que facilita la revisión y la recuperación.
{% endhint %}
