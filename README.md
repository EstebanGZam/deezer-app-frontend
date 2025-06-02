# Playlist Manager

Una aplicación web de gestión de playlists construida con React + TypeScript que permite crear, administrar y buscar canciones usando la API de Deezer.

## 🚀 Características

- **Gestión de Playlists**: Visualiza y administra tus playlists musicales
- **Búsqueda de Canciones**: Busca canciones en Deezer y agrégalas a tus playlists
- **Interfaz Intuitiva**: Navegación fluida entre pantallas con diseño responsive
- **Gestión de Tracks**: Agrega y elimina canciones de tus playlists

## 🛠️ Tecnologías

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Backend**: REST API (DeezerAPI)

## 📋 Prerequisitos

- Node.js (v16 o superior)
- npm o yarn
- Backend API ejecutándose en `http://localhost:8080`

## 🔧 Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/EstebanGZam/deezer-app-frontend.git
cd deezer-app-frontend
```

2. Instala las dependencias:

```bash
npm install
```

3. Asegúrate de que la API backend esté ejecutándose:

```bash
# Clona y ejecuta el backend
git clone https://github.com/Domiciano/DeezerAPI
```

4. Ejecuta la aplicación:

```bash
npm run dev
```

## 🎵 Funcionalidades

### 1. Pantalla Principal - Listado de Playlists

- Visualiza todas las playlists existentes
- Crea nuevas playlists con nombre y mood
- Elimina playlists existentes
- Navega a los tracks de cada playlist

### 2. Pantalla de Tracks

- Muestra todas las canciones de una playlist específica
- Elimina canciones individuales
- Accede a la búsqueda de nuevas canciones

### 3. Búsqueda de Canciones (Deezer)

- Busca canciones en la base de datos de Deezer
- Previsualiza canciones antes de agregar
- Agrega canciones directamente a la playlist activa

## 🏗️ Arquitectura

```
src/
├── components/          # Componentes reutilizables
│   ├── Header.tsx
│   ├── LoadingSpinner.tsx
│   ├── PlaylistCard.tsx
│   ├── SearchBar.tsx
│   └── TrackItem.tsx
├── hooks/              # Custom hooks
│   ├── usePlaylists.ts
│   ├── usePlaylistTracks.ts
│   └── useTrackSearch.ts
├── services/           # Servicios API
│   ├── DeezerServices.ts
│   └── PlaylistServices.ts
├── types/              # Definiciones de tipos
│   └── Playlist.ts
├── views/              # Pantallas principales
│   ├── PlaylistsView.tsx
│   ├── TracksView.tsx
│   └── SearchView.tsx
└── constants/          # Configuraciones
    └── global.ts
```

## 🔌 API Endpoints

La aplicación consume los siguientes endpoints:

- `GET /api/v1/playlists` - Obtener todas las playlists
- `POST /api/v1/playlists` - Crear nueva playlist
- `DELETE /api/v1/playlists/{id}` - Eliminar playlist
- `GET /api/v1/playlists/{id}/tracks` - Obtener tracks de una playlist
- `POST /api/v1/playlists/{id}/tracks` - Agregar track a playlist
- `DELETE /api/v1/playlists/{id}/tracks/{trackId}` - Eliminar track
- `GET /api/v1/deezer/search` - Buscar canciones en Deezer

## 🎨 Componentes Principales

- **PlaylistsView**: Pantalla principal con listado de playlists
- **TracksView**: Visualización de canciones de una playlist
- **SearchView**: Búsqueda y selección de canciones de Deezer
- **TrackItem**: Componente para mostrar información de cada canción
- **PlaylistCard**: Tarjeta individual de playlist

## 🚀 Scripts Disponibles

```bash
npm run dev          # Ejecutar en modo desarrollo
npm run build        # Construir para producción
npm run preview      # Previsualizar build de producción
npm run lint         # Ejecutar linter
```

## 📝 Notas de Desarrollo

- El estado se maneja localmente con React hooks
- Se implementó navegación por estados sin router externo
- Los tipos de Deezer se mapean al modelo interno de datos
- Responsive design implementado con Tailwind CSS
