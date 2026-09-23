---
icon: flask
---
# Revisión de investigación con múltiples modelos

Un equipo de producto se prepara para una revisión trimestral: la información interna ya está completa, pero aún se necesita complementar con información pública y comparar las perspectivas ofrecidas por diferentes modelos. El entregable final debe ser un informe de investigación que permita verificar las fuentes y distinguir claramente entre hechos y juicios.

<figure><img src="../../../../assets/290e0288048d57cd868cb443.webp" alt="Al iniciar la investigación, primero se deben definir los modelos de comparación y el alcance de las preguntas, sin cambiar los criterios arbitrariamente a mitad del proceso."><figcaption><p>Al iniciar la investigación, primero se deben definir los modelos de comparación y el alcance de las preguntas, sin cambiar los criterios arbitrariamente a mitad del proceso. </p></figcaption></figure>

<figure><img src="../../../../assets/49842a248b90a5707753efa1.webp" alt="Coloque diferentes hipótesis en ramas independientes y, al final, regrese a la rama principal para consolidar las conclusiones confirmadas."><figcaption><p>Coloque diferentes hipótesis en ramas independientes y, al final, regrese a la rama principal para consolidar las conclusiones confirmadas. </p></figcaption></figure>

<figure><img src="../../../../assets/20eae1a141993f3367a544b0.webp" alt="① Especifique en la pregunta las dimensiones de verificación y las condiciones conocidas; ② Desarrolle los resultados siguiendo la misma estructura para facilitar la comparación continua, las preguntas de seguimiento y la verificación manual."><figcaption><p>① Especifique en la pregunta las dimensiones de verificación y las condiciones conocidas; ② Desarrolle los resultados siguiendo la misma estructura para facilitar la comparación continua, las preguntas de seguimiento y la verificación manual. </p></figcaption></figure>

## Combinación recomendada

* 【Diálogo】Múltiples modelos: identificar consensos, divergencias y omisiones;
* Agente de investigación: avanzar en las tareas, dividir subtareas y generar el informe;
* Base de conocimientos: recuperar información interna;
* Búsqueda web o MCP confiable: complementar con fuentes externas;
* Directorio de trabajo: guardar los materiales originales y los productos finales.

## Flujo de operación

{% stepper %}
{% step %}
### 1. Comparar perspectivas con la misma pregunta

En 【Diálogo】, seleccione varios modelos y solicite que cada uno liste sus conclusiones, supuestos, fuentes e incertidumbres. Organice los conflictos reales como preguntas pendientes de investigación.
{% endstep %}

{% step %}
### 2. Crear un Agente de investigación

Vincule las bases de conocimientos y habilidades de investigación relevantes, manteniendo los permisos en modo 【Confirmación por cada acción】. En el directorio de trabajo, separe los materiales originales del directorio de salida de `report/`.
{% endstep %}

{% step %}
### 3. Asignar subtareas

Permita que el Agente verifique por separado la línea temporal de los hechos, los cambios en los datos y las perspectivas externas, y que el Agente principal compare los conflictos. La información que no pueda confirmarse debe mantenerse como pendiente de verificación, sin forzar su consolidación.
{% endstep %}

{% step %}
### 4. Generar el informe y realizar una revisión manual

El informe debe incluir conclusiones, fuentes, incertidumbres y acciones posteriores. En el panel 【Archivos】 de la derecha, verifique las citas, fechas y cifras antes de publicar.
{% endstep %}
{% endstepper %}

## Tarea de ejemplo

```
Revisa los documentos del proyecto en el directorio actual y complétalos con información pública. Separa hechos, evaluaciones y recomendaciones, y conserva los enlaces de las fuentes externas. Comprueba por separado la cronología, los datos y los riesgos, y genera el informe en report/review.md. No modifiques los archivos de raw/.
```

## Preparación previa y criterios de finalización

| Elemento | Preparación sugerida |
| ---- | ------------------------------- |
| Pregunta de investigación | Especifique en una frase la conclusión que se desea comparar |
| Requisitos de fuentes | Defina el rango de tiempo, la región y las fuentes aceptables |
| Combinación recomendada | La comparación de múltiples modelos se usa para recopilar diferencias, las ramas para preguntas de seguimiento y las notas para guardar las conclusiones confirmadas |
| Criterios de finalización | Cada conclusión clave debe poder rastrearse hasta su fuente; las divergencias deben listarse por separado; el contenido no confirmado no debe presentarse como hecho |

Este caso es adecuado para investigaciones que requieran comparar perspectivas y revisar procesos de toma de decisiones, pero no es apropiado para tratar la votación de múltiples modelos como un juicio de hecho directo.

{% hint style="danger" %}
En temas de alto riesgo como finanzas, medicina y derecho, no se debe depender exclusivamente de las conclusiones de los modelos. El informe debe conservar las fuentes y ser revisado por personas con la experiencia o las credenciales correspondientes.
{% endhint %}
