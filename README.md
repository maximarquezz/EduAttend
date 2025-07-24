<h1 align="center">
<p align="center">
  <img src="public/assets/images/logo.png" width="300px" style="filter: brightness(0) invert(1)" />
</p>
</h1>

<p align="center">Un sistema de gestión de asistencias como Single Page Application.</p>

<p align="center">
  <img src="https://img.shields.io/badge/Estado-En%20Desarrollo-yellow" alt="Estado" />
  <img src="https://img.shields.io/badge/Lenguaje-TypeScript-blue" alt="Lenguaje" />
  <img src="https://img.shields.io/badge/Versión-v1.0-blueviolet" alt="Versión" />
  <img src="https://img.shields.io/badge/Soporte-Activo-green" alt="Soporte" />
  <img src="https://img.shields.io/badge/Documentación-En%20progreso-orange" alt="Documentación" />
</p>

---

## 📋 Tabla de Contenidos

- [Descripción General](#🧩-descripción-general)
- [Uso](#⚙️-uso)
- [Estructura del Proyecto](#🗂️-estructura-del-proyecto)
- [Tecnologías Utilizadas](#🛠️-tecnologías-utilizadas)
- [Contribuciones](#🤝-contribuciones)
- [Licencia](#📄-licencia)

---

## 🧩 Descripción General

**EduAttend** es un sistema de gestión de asistencias construido como una Single Page Application, haciendo uso del Framework "Angular" en su versión 20.0.3, manteniendo algunas características de su versión anterior. Cuenta con una estructura pensada para ser escalable horizontalmente desde la concepción de su arquitectura, y hace uso de buenas prácticas de modularización, estilización y seguridad.

---

## ⚙️ Uso

### 🔸 Requisitos Previos

- Tener instaladas las siguientes tecnologías:
  - [Visual Studio Code](https://code.visualstudio.com/) (O cualquier editor de código)
  - [Node.js](https://nodejs.org/es)
  - [Git](https://git-scm.com/downloads)

### 🔸 Instalación

Clona este repositorio:

```bash
git clone "https://github.com/maximarquezz/EduAttend.git"
```

### 🔸 Uso

1. Navega a la raíz del repositorio clonado como carpeta.

2. Abre una nueva terminal y ejecuta:

```bash
npm install
```

3. Para abrir el sitio web ejecuta:

```bash
ng s -o
```

O también puedes ejecutar

```bash
ng serve --open
```

#### 📄 Nota: Para más información, visita la documentación oficial de [Angular](https://angular.dev/cli/serve).

## 📁 Estructura del Proyecto

```txt
EduAttend/
│
├── .vscode/           # Configuración del editor.
├── node_modules/      # Módulos de Node.js instalados con "NPM"
├── public/            # Recursos públicos estáticos
├── src/               # El contenido principal de la aplicación.
├── .editorconfig/     # Reglas de formato entre editores.
├── .gitignore         # Archivos y carpetas que Git no subirá al repositorio.
├── README.md          # Este archivo.
├── CONTRIBUTING.md    # Reglas para contribuir al proyecto.
├── LICENSE.md         # Información sobre licencia del proyecto.
├── angular.json       # Configuración del proyecto de Angular.
├── package.lock.json  # Historial de paquetes instalados.
├── package.json       # Metadatos, dependencias y scripts.
├── tsconfig.app.json  # Extiende la configuración de TypeScript y configura reglas de compilación.
├── tsconfig.json      # Configuración de TypeScript del proyecto.
└── tsconfig.spec.json # Extiende la configuración de TypeScript y configura reglas de compilación de archivos de pruebas.
```

#### 📄 Nota: Algunos de estos archivos se generan automáticamente, no te preocupes si no los encuentras en el repositorio.

## 🛠️ Tecnologías Utilizadas

| Tecnología       | Descripción                                              |
| ---------------- | -------------------------------------------------------- |
| HTML             | Estructura básica del Front-End                          |
| TypeScript       | Lógica general de la aplicación.                         |
| SCSS con BEM     | Estilos con convención de clases y anidamiento.          |
| Angular Material | Componentes reutilizables con Material Design.           |
| ECharts          | Para la generación de gráficos estadísticos.             |
