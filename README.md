# 🌡️ Meteológica – Monitor de Temperatura en Tiempo Real

Aplicación web para visualizar datos de temperatura de forma continua con actualización en tiempo real mediante **Server-Sent Events (SSE)**. La interfaz gráfica está desarrollada en **Angular 18** y presenta una gráfica dinámica con enfoque eficiente para grandes volúmenes de datos.

---

## 🌍 Demo en Producción

✅ Aplicación desplegada y en funcionamiento:  
🔗 https://meteologica-front-end.vercel.app/

---

## 🚀 Tecnologías Utilizadas

| Área | Tecnología |
|------|------------|
| Frontend | Angular + Chart.js |
| Backend | Node.js + Express + SSE |
| Despliegue | Vercel (Frontend) • Fly.io (Backend) |
| Estilo visual | CSS nativo |
| Gestión de datos | Promedios por minuto + puntos en vivo |

---

## 🎯 Objetivo del Proyecto

✅ Mostrar datos en vivo sin sobrecargar el servidor  
✅ Permitir consulta eficiente de datos históricos por minuto  
✅ Visualización clara de la información  
✅ Diseño ligero y accesible

---

## ⚙️ Arquitectura del Sistema


📌 El servidor envía datos cada vez que se registran cambios  
📌 El cliente los consume sin polling, reduciendo carga

Esto permite escalar a miles de registros por minuto sin perder rendimiento ✅

---

## 📊 Funcionalidades

| Función | Descripción |
|--------|-------------|
| 🔴 Modo tiempo real | Muestra datos segundo a segundo con un buffer inteligente |
| ⏱️ Modo minutar | Predice y representa próximos 15 minutos según datos procesados |
| 🔄 Auto-actualización | Gráfico dinámico sin recarga de página |
| ⚡ Bajo consumo de recursos | Perfecto para altos volúmenes de datos |

---

## 🧠 Decisiones Técnicas

✅ Se utiliza **SSE** en lugar de WebSockets cuando solo se requiere comunicación servidor → cliente  
✅ El gráfico mantiene un **límite de puntos en memoria** para evitar saturación  
✅ Datos minutar se consultan bajo demanda optimizando tráfico  
✅ Angular seleccionado para modularidad y robustez en actualizaciones

---

## 🎨 Resultado artístico (UI/UX)

- Diseño minimalista
- Colores suaves que permiten claridad de lectura
- Animaciones fluidas sin afectar rendimiento
- Información clave destacada

📌 Se prioriza **legibilidad y visibilidad** sobre decoraciones innecesarias

---

## 🔥 Cómo ejecutar localmente

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm start
