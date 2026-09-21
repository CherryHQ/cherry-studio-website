# LM Studio

LM Studio es una **interfaz gráfica de usuario (GUI) para modelos de lenguaje locales** muy popular, que permite descargar, cuantizar e inferir diversos modelos de código abierto en el propio equipo. Cherry Studio puede conectarse como frontend al servicio local de LM Studio, ofreciendo una mejor experiencia de conversación mientras se mantiene la privacidad local.

## Preparación previa

1. Descargue e instale el cliente desde el [sitio web oficial de LM Studio](https://lmstudio.ai/)
2. Descargue al menos un modelo en LM Studio (se recomienda probar primero Llama 3.x 8B o la serie Qwen)
3. Abra la pestaña **Server** en la parte superior de LM Studio y haga clic en **Start Server** (puerto predeterminado `1234`)

## Configuración en Cherry Studio

* Abra `Configuración → Servicios de modelos`, busque el proveedor **LM Studio** y acceda a la página de detalles
* La **dirección de la API** es `http://localhost:1234` por defecto; si ha cambiado el puerto de LM Studio, actualice este valor de forma sincronizada
* La **clave de API** puede dejarse en blanco (la inferencia local no requiere autenticación) o completarse si ha activado la autenticación en LM Studio
* Haga clic en **Obtener lista de modelos**; Cherry Studio recuperará automáticamente los modelos cargados en LM Studio

{% hint style="info" %}
**¿La lista de modelos está vacía?** LM Studio solo expone los modelos que están **`Load` en la memoria**; los que no se hayan cargado no aparecerán en la lista. Vuelva a LM Studio, cargue el modelo primero y luego vuelva a "Obtener lista de modelos".
{% endhint %}

## Uso recomendado

| Escenario | Sugerencia |
| -------------------- | --------------------------------------------------------------------- |
| Conversaciones sensibles a la privacidad | Elija modelos pequeños (menos de 8B) para ejecutarlos localmente, completamente sin conexión |
| Apple Silicon (chips serie M) | Utilice el backend MLX en LM Studio, que ofrece una eficiencia significativamente superior a llama.cpp |
| Modelos de incrustación | LM Studio también puede cargar modelos de incrustación para su uso en bases de conocimiento |

## Diferencias con Ollama

| | LM Studio | [Ollama](ollama.md) |
| ---- | ------------- | ------------------- |
| Formato | Interfaz gráfica + servidor | Línea de comandos / servicio en segundo plano |
| Gestión de modelos | Navegación/descarga por GUI | `ollama pull` |
| API | Compatible con OpenAI | Compatible con OpenAI |
| Adecuado para | Usuarios que prefieren la interacción gráfica | Usuarios que prefieren la línea de comandos / despliegue con Docker |

Ambos pueden integrarse con Cherry Studio; elija según sus preferencias personales.

## Preguntas frecuentes

* **Cherry Studio no puede conectarse**: verifique si el servidor en LM Studio se ha iniciado (estado de punto verde)
* **Respuesta muy lenta**: el modelo es demasiado grande o hay insuficiente memoria de video; cambie a un modelo más pequeño o a una cuantización más agresiva (por ejemplo, Q4 → Q3)
* **Texto ininteligible / salida truncada**: la longitud del contexto supera los límites del modelo; aumente `n_ctx` en LM Studio

***

### Obtener ayuda y enviar comentarios

Si tiene cualquier duda, detecta un error o tiene sugerencias de mejora de funciones durante la configuración o el uso, consulte los canales oficiales proporcionados en [Comentarios y sugerencias](../../question-contact/suggestions.md).
