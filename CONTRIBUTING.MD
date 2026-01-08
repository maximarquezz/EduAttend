## 1️⃣ Orden del código – versión **más afilada**

### 🔹 A) Separar _estado derivado_ del _estado real_

```ts
┌─────────────────────────────────┐
│ DEPENDENCIAS (inject / ctor)    │
├─────────────────────────────────┤
│ INPUTS / OUTPUTS                │
├─────────────────────────────────┤
│ STATE (estado real mutable)     │
│ - tableData                     │
│ - role                          │
├─────────────────────────────────┤
│ DERIVED STATE (getters)         │
│ - attendanceIcon                │
│ - showAttendance                │
├─────────────────────────────────┤
│ LIFECYCLE HOOKS                 │
│ - ngOnInit                      │
├─────────────────────────────────┤
│ PUBLIC METHODS (UI actions)     │
│ - openModal                     │
│ - onDegreeChange                │
├─────────────────────────────────┤
│ PRIVATE ORCHESTRATION           │
│ - loadAttendances               │
│ - initUserRole                  │
├─────────────────────────────────┤
│ PURE HELPERS (sin efectos)      │
│ - mapPercentage                 │
│ - ensureArray                   │
└─────────────────────────────────┘
```

👉 Esto evita mezclar:

- Estado que **vive**
- Estado que **se calcula**

---

## 2️⃣ Checklist mejorado (más preciso)

Tu lista está bien, pero la mejoramos para que sea **accionable**, no solo descriptiva.

### 🚨 Señales de alerta **FUERTES** (divide sí o sí)

1. ❌ La función **decide y ejecuta**

   > “Si pasa esto hago X y además actualizo Y”

2. ❌ La función toca **más de un concepto**

   - HTTP + UI
   - UI + reglas de negocio
   - Datos + permisos

3. ❌ La función **no puede testearse sin Angular**

4. ❌ La función **necesita un comentario para entenderse**

---

### ⚠️ Señales de alerta **MEDIAS** (probable refactor)

5. ❌ Más de **1 subscribe** en el mismo método
6. ❌ Usa `this.` más de **5 veces**
7. ❌ Tiene `if/else` + `switch` mezclados
8. ❌ Depende de variables que no recibe por parámetro

---

### 🟢 Señales de que está bien

9. ✅ El nombre describe _qué_, no _cómo_
10. ✅ Podrías moverla a un service sin cambiar nada
11. ✅ Devuelve un valor **o** produce un efecto, no ambos
12. ✅ La puedes leer sin scrollear

---

## 3️⃣ Regla de oro para componentes Angular

👉 **Un componente NO debe:**

- Calcular reglas de negocio
- Tomar decisiones complejas
- Interpretar roles

👉 **Un componente SÍ debe:**

- Pedir datos
- Exponer estado
- Reaccionar a eventos
- Traducir estado → UI

Si dudas, pregúntate:

> “¿Esto podría vivir en un service y seguir teniendo sentido?”

Si la respuesta es sí → **no es UI**

---

## 4️⃣ Regla rápida de nombres (muy útil)

Si al nombrar una función usas:

| Palabra                       | Significado  |
| ----------------------------- | ------------ |
| `load`, `fetch`               | Orquestación |
| `calculate`, `resolve`, `map` | Lógica pura  |
| `handle`, `on`                | Evento       |
| `init`, `setup`               | Lifecycle    |
| `open`, `close`, `toggle`     | UI           |

Si mezclás categorías → **mal olor**

---

## 5️⃣ Mini-checklist diario (mental)

Antes de cerrar un componente, preguntate:

- ❓ ¿Podría alguien nuevo entender esto en 5 minutos?
- ❓ ¿Hay lógica que no depende del HTML?
- ❓ ¿Estoy calculando algo que podría venir listo?
- ❓ ¿Estoy usando `get` solo para derivar estado?

Si respondés “sí” a las malas → refactor.

---
