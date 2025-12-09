Orden de código (general):

┌─────────────────────────────────┐
│ SERVICES (readonly) │ ← Dependencias inyectadas
├─────────────────────────────────┤
│ STATE │ ← Variables del componente
├─────────────────────────────────┤
│ PUBLIC METHODS │ ← Llamados desde HTML
│ - onDegreeChange() │
│ - enrollSubject() │
├─────────────────────────────────┤
│ PRIVATE METHODS │ ← Lógica interna
│ - loadEnrollments() │
│ - loadDegrees() │
├─────────────────────────────────┤
│ EVENT HANDLERS │ ← Procesan respuestas HTTP
│ - handleEnrollmentsLoaded() │
│ - handleEnrollmentSuccess() │
├─────────────────────────────────┤
│ HELPER METHODS │ ← Utilidades reutilizables
│ - ensureArray() │
│ - showSuccess() │
└─────────────────────────────────┘

## 💡 **Señales de que necesitas dividir:**

1. ❌ La función tiene más de 10 líneas
2. ❌ Usas "Y" para describir lo que hace
3. ❌ Tiene múltiples niveles de indentación (`if` dentro de `if` dentro de `subscribe`)
4. ❌ Tienes código duplicado
5. ❌ No puedes pensar en un nombre corto y claro
