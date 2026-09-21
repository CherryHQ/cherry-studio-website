# Guía de acceso a la plataforma ModelScope (Módulo Mágico)


## ¿Qué es ModelScope?
> ModelScope es una nueva generación de plataforma compartida de modelos como servicio (MaaS) de código abierto, dedicada a proporcionar a los desarrolladores de IA una solución integral para servicios de modelos **flexible, fácil de usar y de bajo costo**, ¡haciendo que la aplicación de modelos sea más sencilla!
>
> A través de la capacidad de servicio de **API-Inference**, la plataforma estandariza modelos de código abierto como interfaces API invocables, permitiendo a los desarrolladores integrar capacidades de modelos en diversas aplicaciones de IA de manera ligera y rápida, apoyando escenarios innovadores como invocación de herramientas y desarrollo de prototipos.

### Ventajas principales
- ✅ **Cuota gratuita**: Proporciona **2000 llamadas API gratuitas diarias** ([Reglas de facturación](#reglas-de-facturación-y-cuota))
- ✅ **Amplia biblioteca de modelos**: Cubre más de 1000 modelos de código abierto en PLN, CV, voz, multimodal, etc.
- ✅ **Listo para usar**: Sin necesidad de despliegue, invocación rápida mediante RESTful API

---

## Flujo de acceso en Cherry Studio
### Paso 1: Obtener token API de ModelScope
1. **Iniciar sesión en la plataforma**
   - Visite el [sitio oficial de ModelScope](https://modelscope.cn) → Haga clic en **Iniciar sesión** en la esquina superior derecha → Seleccione método de autenticación
   ![Interfaz de inicio de sesión](../../../../assets/81ab1f79d9eb105d47adeb7c.webp)
2. **Crear token de acceso**
   - Diríjase a **[Configuración de cuenta → Tokens de acceso](https://modelscope.cn/my/myaccesstoken)**
   - Haga clic en **`Nuevo token`** → Complete la descripción → **Copie el token generado** (*ver ejemplo en imagen*)
   ![Ejemplo de creación de token](../../../../assets/183749676e4437e61ed9168f.webp)
   > 🔑 **Importante**: ¡La exposición del token compromete la seguridad de la cuenta!

### Paso 2: Configurar Cherry Studio
- Abra **Cherry Studio** → **Configuración → Servicios de modelos → ModelScope**
- Pegue el token copiado en el campo `Clave API`
  ![Interfaz de configuración](../../../../assets/6c187aa7fa2ce14286cce6e6.webp)
- Haga clic en **`Guardar`** para completar la autorización

### Paso 3: Invocar API del modelo
1. **Buscar modelos compatibles con API**
   - Acceda a la [biblioteca de modelos de ModelScope](https://modelscope.cn/models)
   - Filtros: **Marque `API-Inference`** (o busque el ícono `API` en la tarjeta del modelo)
   ![Filtrado de modelos con API](../../../../assets/e74196f9b0677f509232b2a7.webp)
   > El alcance de los modelos cubiertos por API-Inference se determina principalmente por su relevancia en la comunidad (basado en datos como "likes" y descargas). Así, la lista de modelos admitidos evolucionará continuamente con el lanzamiento de modelos de código abierto más potentes y relevantes.
2. **Obtener ID del modelo**
   - Ingrese a la página de detalles del modelo objetivo → Copie el **Model ID** (formato: `damo/nlp_structbert_sentiment-classification_chinese-base`)
   ![Copiar Model ID](../../../../assets/b280b347b848c9336100c083.webp)
3. **Ingresar en Cherry Studio**
   - En la página de configuración de servicios de modelos, ingrese el ID en el campo `Model ID` → Seleccione tipo de tarea → Complete la configuración
   ![Ingresar Model ID](../../../../assets/a5685729023ae084554989bd.webp)

---

## Reglas de facturación y cuota
### Notas importantes
-  🎫 **Cuota gratuita**: Cada usuario tiene **2000 llamadas API diarias** (*sujeto a las últimas reglas oficiales*)
-  🔁 **Reinicio de cuota**: Se restablece automáticamente a las 00:00 UTC+8 diariamente, **no acumulable ni actualizable**
-  💡 **Exceso de cuota**:
  - Al alcanzar el límite diario, la API devolverá `error 429`
  - Soluciones: Cambiar a cuenta secundaria / Usar otra plataforma / Optimizar frecuencia de llamadas

### Verificar saldo disponible
- Inicie sesión en ModelScope → Haga clic en **`Nombre de usuario`** → **`Estado de uso de API`**
  ![Ubicación para ver cuota](../../../../assets/cf9952cb6a67762a088ade28.webp)

>  ⚠️ Atención: La cuota gratuita de API-Inference es de 2000 llamadas diarias. Para necesidades mayores, considere servicios en la nube como Alibaba Cloud Bailian.